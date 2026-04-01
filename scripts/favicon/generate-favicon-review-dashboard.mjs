import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const currentLivePngPath = path.join(repoRoot, 'public', 'android-chrome-512x512.png');
const outputDir = path.join(repoRoot, 'public', 'images', 'favicon-review');
const originalSourcePngPath = path.join(outputDir, 'base-b-original-source.png');

mkdirSync(outputDir, { recursive: true });

if (!existsSync(originalSourcePngPath)) {
  copyFileSync(currentLivePngPath, originalSourcePngPath);
}

for (const entryName of readdirSync(outputDir)) {
  if (entryName === 'base-b-original-source.png') {
    continue;
  }

  rmSync(path.join(outputDir, entryName), { force: true, recursive: true });
}

const variants = [
  {
    slug: 'original-balance',
    sourceArgs: [originalSourcePngPath],
  },
  {
    slug: 'crop-118',
    sourceArgs: [originalSourcePngPath, '-gravity', 'center', '-crop', '432x432+0+0', '+repage', '-background', 'none', '-extent', '512x512'],
  },
  {
    slug: 'crop-123',
    sourceArgs: [originalSourcePngPath, '-gravity', 'center', '-crop', '416x416+0+0', '+repage', '-background', 'none', '-extent', '512x512'],
  },
  {
    slug: 'crop-128',
    sourceArgs: [originalSourcePngPath, '-gravity', 'center', '-crop', '400x400+0+0', '+repage', '-background', 'none', '-extent', '512x512'],
  },
  {
    slug: 'crop-133',
    sourceArgs: [originalSourcePngPath, '-gravity', 'center', '-crop', '384x384+0+0', '+repage', '-background', 'none', '-extent', '512x512'],
  },
  {
    slug: 'live-crop-139',
    sourceArgs: [originalSourcePngPath, '-gravity', 'center', '-crop', '368x368+0+0', '+repage', '-background', 'none', '-extent', '512x512'],
  },
];

for (const variant of variants) {
  const baseOutputPath = path.join(outputDir, `${variant.slug}-512.png`);

  execFileSync('magick', [...variant.sourceArgs, baseOutputPath], { stdio: 'pipe' });

  for (const size of [16, 32, 64, 128]) {
    execFileSync(
      'magick',
      [baseOutputPath, '-background', 'none', '-resize', `${size}x${size}`, path.join(outputDir, `${variant.slug}-${size}.png`)],
      { stdio: 'pipe' },
    );
  }

  execFileSync(
    'magick',
    [
      path.join(outputDir, `${variant.slug}-16.png`),
      path.join(outputDir, `${variant.slug}-32.png`),
      path.join(outputDir, `${variant.slug}-64.png`),
      path.join(outputDir, `${variant.slug}.ico`),
    ],
    { stdio: 'pipe' },
  );
}

copyFileSync(path.join(outputDir, 'live-crop-139-512.png'), path.join(outputDir, 'base-b-live-source.png'));
