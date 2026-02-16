import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const sidecarRoot = resolve(scriptsDir, '..');

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (!current.startsWith('--')) {
      continue;
    }

    const key = current.slice(2);
    args[key] = next && !next.startsWith('--') ? next : 'true';

    if (args[key] === next) {
      index += 1;
    }
  }

  return args;
}

function getPngDimensions(buffer) {
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

  for (let index = 0; index < pngSignature.length; index += 1) {
    if (buffer[index] !== pngSignature[index]) {
      throw new Error('Source file is not a PNG image.');
    }
  }

  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  return { width, height };
}

const args = parseArgs(process.argv.slice(2));
const sourceArg = args.source;
const targetArg = args.target;
const projectArg = args.project;

if (!sourceArg || !targetArg || !projectArg) {
  console.error('Usage: npm run visual:promote-devtools -- --source <path> --target <name> --project <desktop-chromium|mobile-chromium>');
  process.exit(1);
}

const expectedWidths = {
  'desktop-chromium': 1440,
  'mobile-chromium': 390,
};

if (!expectedWidths[projectArg]) {
  console.error(`Unsupported project: ${projectArg}`);
  process.exit(1);
}

const sourcePath = resolve(sidecarRoot, sourceArg);
const destinationPath = resolve(sidecarRoot, 'tests', '__screenshots__', projectArg, `${targetArg}.png`);
const pngBuffer = await readFile(sourcePath);
const { width, height } = getPngDimensions(pngBuffer);

if (width !== expectedWidths[projectArg]) {
  console.error(`Width mismatch for ${projectArg}: expected ${expectedWidths[projectArg]}, got ${width}.`);
  process.exit(1);
}

if (height < 200) {
  console.error(`Height ${height} is unexpectedly small for a full-page baseline.`);
  process.exit(1);
}

await mkdir(dirname(destinationPath), { recursive: true });
await copyFile(sourcePath, destinationPath);

console.log(`Promoted ${sourcePath} to ${destinationPath}`);
