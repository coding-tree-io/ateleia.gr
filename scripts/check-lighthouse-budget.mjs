import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { constants as fileSystemConstants } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const currentScriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRootDirectory = join(currentScriptDirectory, '..');
const budgetConfigurationPath = join(projectRootDirectory, 'performance-budget.json');

const pnpmCommandName = 'pnpm';
const npxCommandName = 'npx';

async function fileExists(filePath) {
  try {
    await access(filePath, fileSystemConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createProcessInvocation(commandName, commandArguments) {
  if (process.platform !== 'win32') {
    return {
      executableCommandName: commandName,
      executableCommandArguments: commandArguments,
    };
  }

  const escapedArguments = commandArguments.map((commandArgument) => {
    if (/[\s"]/u.test(commandArgument)) {
      return `"${commandArgument.replace(/"/g, '\\"')}"`;
    }

    return commandArgument;
  });

  return {
    executableCommandName: 'cmd.exe',
    executableCommandArguments: ['/d', '/s', '/c', `${commandName} ${escapedArguments.join(' ')}`],
  };
}

function runCommand(commandName, commandArguments, workingDirectory) {
  return new Promise((resolve, reject) => {
    const { executableCommandName, executableCommandArguments } = createProcessInvocation(
      commandName,
      commandArguments
    );

    const commandProcess = spawn(executableCommandName, executableCommandArguments, {
      cwd: workingDirectory,
      stdio: 'inherit',
      shell: false,
      env: {
        ...process.env,
        FORCE_COLOR: '0',
      },
    });

    commandProcess.on('error', reject);
    commandProcess.on('close', (exitCode) => {
      resolve(exitCode ?? 1);
    });
  });
}

async function waitForPageToRespond(pageUrl, timeoutMilliseconds = 45_000) {
  const timeoutTimestamp = Date.now() + timeoutMilliseconds;

  while (Date.now() < timeoutTimestamp) {
    try {
      const response = await fetch(pageUrl, { redirect: 'manual' });
      if (response.ok || response.status === 304) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await sleep(500);
  }

  throw new Error(`Preview server did not respond in time: ${pageUrl}`);
}

function findAvailablePort(startPort, hostName) {
  return new Promise((resolve) => {
    const tryPort = (candidatePort) => {
      const candidateServer = createServer();
      candidateServer.unref();

      candidateServer.once('error', () => {
        tryPort(candidatePort + 1);
      });

      candidateServer.listen(candidatePort, hostName, () => {
        candidateServer.close(() => {
          resolve(candidatePort);
        });
      });
    };

    tryPort(startPort);
  });
}

async function terminateProcessTree(processIdentifier) {
  if (!processIdentifier) {
    return;
  }

  if (process.platform === 'win32') {
    await runCommand('taskkill', ['/pid', String(processIdentifier), '/t', '/f'], projectRootDirectory);
    return;
  }

  try {
    process.kill(processIdentifier, 'SIGTERM');
  } catch {
    // Process already closed.
  }
}

function readBudgetViolations(lighthouseReport, budgetConfiguration, testedPageUrl) {
  const pageOrigin = new URL(testedPageUrl).origin;

  const performanceScore = lighthouseReport.categories.performance.score ?? 0;
  const largestContentfulPaintMilliseconds =
    lighthouseReport.audits['largest-contentful-paint'].numericValue ?? 0;
  const totalBlockingTimeMilliseconds = lighthouseReport.audits['total-blocking-time'].numericValue ?? 0;

  const networkRequestItems = lighthouseReport.audits['network-requests']?.details?.items ?? [];
  const firstPartyScriptBytes = networkRequestItems
    .filter(
      (requestItem) =>
        requestItem.resourceType === 'Script' &&
        typeof requestItem.url === 'string' &&
        requestItem.url.startsWith(pageOrigin)
    )
    .reduce((accumulator, requestItem) => accumulator + (requestItem.transferSize ?? 0), 0);
  const firstPartyScriptKilobytes = firstPartyScriptBytes / 1024;

  const violations = [];

  if (performanceScore < budgetConfiguration.lighthouse.minPerformanceScore) {
    violations.push(
      `Performance score ${performanceScore.toFixed(2)} is lower than ${budgetConfiguration.lighthouse.minPerformanceScore.toFixed(2)}`
    );
  }

  if (largestContentfulPaintMilliseconds > budgetConfiguration.lighthouse.maxLargestContentfulPaintMs) {
    violations.push(
      `LCP ${Math.round(largestContentfulPaintMilliseconds)}ms exceeds ${budgetConfiguration.lighthouse.maxLargestContentfulPaintMs}ms`
    );
  }

  if (totalBlockingTimeMilliseconds > budgetConfiguration.lighthouse.maxTotalBlockingTimeMs) {
    violations.push(
      `TBT ${Math.round(totalBlockingTimeMilliseconds)}ms exceeds ${budgetConfiguration.lighthouse.maxTotalBlockingTimeMs}ms`
    );
  }

  if (firstPartyScriptKilobytes > budgetConfiguration.javascript.maxFirstPartyScriptKilobytes) {
    violations.push(
      `First-party script transfer ${firstPartyScriptKilobytes.toFixed(1)}KB exceeds ${budgetConfiguration.javascript.maxFirstPartyScriptKilobytes}KB`
    );
  }

  return {
    performanceScore,
    largestContentfulPaintMilliseconds,
    totalBlockingTimeMilliseconds,
    firstPartyScriptKilobytes,
    violations,
  };
}

async function main() {
  const budgetConfiguration = JSON.parse(await readFile(budgetConfigurationPath, 'utf8'));

  if (!(await fileExists(join(projectRootDirectory, 'dist', 'index.html')))) {
    throw new Error('Build output was not found. Run `pnpm build` before running the performance budget check.');
  }

  const configuredPageUrl = new URL(budgetConfiguration.pageUrl);
  const previewHost = configuredPageUrl.hostname;
  const previewStartPort = Number(configuredPageUrl.port || 4321);
  const previewPort = await findAvailablePort(previewStartPort, previewHost);
  const testedPageUrl = `${configuredPageUrl.protocol}//${previewHost}:${previewPort}${configuredPageUrl.pathname}`;

  const temporaryReportDirectory = await mkdtemp(join(tmpdir(), 'ateleia-lighthouse-'));
  const lighthouseReportPath = join(temporaryReportDirectory, 'lighthouse-mobile.json');

  const previewCommandArguments = ['preview', '--host', previewHost, '--port', String(previewPort)];
  const { executableCommandName, executableCommandArguments } = createProcessInvocation(
    pnpmCommandName,
    previewCommandArguments
  );

  const previewServerProcess = spawn(executableCommandName, executableCommandArguments, {
    cwd: projectRootDirectory,
    stdio: 'inherit',
    shell: false,
    env: {
      ...process.env,
      FORCE_COLOR: '0',
    },
  });

  try {
    await waitForPageToRespond(testedPageUrl);
    console.log(`Running Lighthouse budget check on ${testedPageUrl}`);

    const lighthouseExitCode = await runCommand(
      npxCommandName,
      [
        '--yes',
        'lighthouse',
        testedPageUrl,
        '--only-categories=performance',
        '--output=json',
        `--output-path=${lighthouseReportPath}`,
        '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
      ],
      projectRootDirectory
    );

    const hasReportFile = await fileExists(lighthouseReportPath);
    if (lighthouseExitCode !== 0 && !hasReportFile) {
      throw new Error(`Lighthouse failed with exit code ${lighthouseExitCode}.`);
    }

    if (lighthouseExitCode !== 0 && hasReportFile) {
      console.warn('Lighthouse returned a non-zero code, but report output exists. Continuing with budget checks.');
    }

    const lighthouseReport = JSON.parse(await readFile(lighthouseReportPath, 'utf8'));
    const {
      performanceScore,
      largestContentfulPaintMilliseconds,
      totalBlockingTimeMilliseconds,
      firstPartyScriptKilobytes,
      violations,
    } = readBudgetViolations(lighthouseReport, budgetConfiguration, testedPageUrl);

    console.log('Performance budget report');
    console.log(`- Performance score: ${(performanceScore * 100).toFixed(0)}`);
    console.log(`- Largest Contentful Paint: ${Math.round(largestContentfulPaintMilliseconds)}ms`);
    console.log(`- Total Blocking Time: ${Math.round(totalBlockingTimeMilliseconds)}ms`);
    console.log(`- First-party script transfer: ${firstPartyScriptKilobytes.toFixed(1)}KB`);

    if (violations.length > 0) {
      console.error('Performance budget violations:');
      for (const violation of violations) {
        console.error(`- ${violation}`);
      }

      throw new Error('Performance budget check failed.');
    }

    console.log('Performance budget check passed.');
  } finally {
    await terminateProcessTree(previewServerProcess.pid);
    await rm(temporaryReportDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
