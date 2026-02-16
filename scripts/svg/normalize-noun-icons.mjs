import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import { optimize } from 'svgo';

import svgoConfig from '../../svgo.noun.config.mjs';

const runCommand = promisify(execFile);

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'docs');
const outputDir = path.join(rootDir, 'src', 'assets', 'noun', 'normalized');

const sourceFiles = [
  'noun-abstract-art-4348146.svg',
  'noun-labyrinth-5703299.svg',
  'noun-abstract-art-4348166.svg',
];

async function canRun(command, args) {
  try {
    await runCommand(command, args, { windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

function stripAttributionText(svg) {
  // Remove embedded visual credit text from source files. Attribution is published on /credits.
  return svg.replace(/<text[\s\S]*?<\/text>/gi, '');
}

function stripXmlPreamble(svg) {
  return svg.replace(/^<\?xml[\s\S]*?\?>\s*/i, '');
}

async function exportPlainWithInkscape(sourcePath, stagingPath) {
  await runCommand(
    'inkscape',
    [
      sourcePath,
      '--export-type=svg',
      '--export-plain-svg',
      `--export-filename=${stagingPath}`,
    ],
    {
      windowsHide: true,
    },
  );
}

async function normalizeFile(fileName, context) {
  const sourcePath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, fileName);

  let rawSvg;

  if (context.hasInkscape) {
    const stagingPath = path.join(context.stagingDir, fileName);
    try {
      await exportPlainWithInkscape(sourcePath, stagingPath);
      rawSvg = await readFile(stagingPath, 'utf8');
    } catch (error) {
      console.warn(`[warn] Inkscape export failed for ${fileName}, falling back to source SVG.`);
      console.warn(String(error));
      rawSvg = await readFile(sourcePath, 'utf8');
    }
  } else {
    rawSvg = await readFile(sourcePath, 'utf8');
  }

  const sanitizedSvg = stripXmlPreamble(stripAttributionText(rawSvg));

  const optimized = optimize(sanitizedSvg, {
    path: sourcePath,
    ...svgoConfig,
  });

  if (!('data' in optimized)) {
    throw new Error(`SVGO failed for ${fileName}`);
  }

  await writeFile(outputPath, optimized.data, 'utf8');
  return fileName;
}

async function runSvgerValidation() {
  const validationOutputDir = path.join(rootDir, '.tmp-svger-validate');
  const command = 'npx --yes svger-cli build src/assets/noun/normalized .tmp-svger-validate';

  await rm(validationOutputDir, { recursive: true, force: true });

  try {
    if (process.platform === 'win32') {
      const shell = process.env.ComSpec || 'cmd.exe';
      await runCommand(shell, ['/d', '/s', '/c', command], {
        cwd: rootDir,
        windowsHide: true,
      });
    } else {
      await runCommand('sh', ['-lc', command], {
        cwd: rootDir,
        windowsHide: true,
      });
    }

    console.log('[info] svger-cli conversion validation completed.');
  } catch (error) {
    console.warn('[warn] svger-cli conversion validation failed.');
    console.warn(String(error));
  } finally {
    await rm(validationOutputDir, { recursive: true, force: true });
  }
}

async function run() {
  await mkdir(outputDir, { recursive: true });

  const stagingDir = await mkdtemp(path.join(os.tmpdir(), 'noun-svg-stage-'));

  const hasInkscape = await canRun('inkscape', ['--version']);

  const graphicsMagickBinary = process.platform === 'win32' ? 'gm.exe' : 'gm';
  const hasGraphicsMagick = await canRun(graphicsMagickBinary, ['version']);

  if (!hasInkscape) {
    console.warn('[warn] Inkscape CLI not found. Using source SVGs directly.');
  }

  if (!hasGraphicsMagick) {
    console.warn('[warn] GraphicsMagick CLI not found. Skipping gm pass.');
  }

  const completed = [];

  try {
    for (const fileName of sourceFiles) {
      const name = await normalizeFile(fileName, { hasInkscape, stagingDir });
      completed.push(name);
    }

    await runSvgerValidation();
  } finally {
    await rm(stagingDir, { recursive: true, force: true });
  }

  console.log(`Normalized ${completed.length} SVG files:`);
  completed.forEach((file) => console.log(`- ${file}`));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
