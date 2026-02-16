import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { optimize } from 'svgo';

import svgoConfig from '../../svgo.noun.config.mjs';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'docs');
const outputDir = path.join(rootDir, 'src', 'assets', 'noun', 'normalized');

const sourceFiles = [
  'noun-abstract-art-4348146.svg',
  'noun-labyrinth-5703299.svg',
  'noun-abstract-art-4348166.svg',
];

function stripAttributionText(svg) {
  // Remove embedded visual credit text from source files. Attribution is published on /credits.
  return svg.replace(/<text[\s\S]*?<\/text>/gi, '');
}

async function normalizeFile(fileName) {
  const sourcePath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, fileName);

  const rawSvg = await readFile(sourcePath, 'utf8');
  const sanitizedSvg = stripAttributionText(rawSvg);

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

async function run() {
  await mkdir(outputDir, { recursive: true });

  const completed = [];
  for (const fileName of sourceFiles) {
    const name = await normalizeFile(fileName);
    completed.push(name);
  }

  console.log(`Normalized ${completed.length} SVG files:`);
  completed.forEach((file) => console.log(`- ${file}`));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
