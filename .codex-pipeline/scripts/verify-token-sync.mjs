import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const sidecarRoot = resolve(scriptsDir, '..');
const repoRoot = resolve(sidecarRoot, '..');

const tokensPath = resolve(sidecarRoot, 'tokens/core/tokens.json');
const cssPath = resolve(repoRoot, 'src/styles/global.css');
const approvedThemePath = resolve(repoRoot, 'src/config/approved-theme.ts');

const tokens = JSON.parse(await readFile(tokensPath, 'utf8'));
const cssSource = await readFile(cssPath, 'utf8');
const approvedThemeSource = await readFile(approvedThemePath, 'utf8');

function getCssVar(name) {
  const match = cssSource.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return match ? match[1].trim().toLowerCase() : null;
}

function normalizeColor(value) {
  return String(value).trim().toLowerCase();
}

const checks = [
  {
    label: 'brand.primary <-> --primary',
    tokenValue: tokens?.color?.brand?.primary?.$value,
    cssValue: getCssVar('primary'),
  },
  {
    label: 'brand.accent <-> --tone-teal',
    tokenValue: tokens?.color?.brand?.accent?.$value,
    cssValue: getCssVar('tone-teal'),
  },
  {
    label: 'surface.page <-> --background',
    tokenValue: tokens?.color?.surface?.page?.$value,
    cssValue: getCssVar('background'),
  },
  {
    label: 'text.primary <-> --foreground',
    tokenValue: tokens?.color?.text?.primary?.$value,
    cssValue: getCssVar('foreground'),
  },
];

const failures = [];

for (const check of checks) {
  if (!check.tokenValue || !check.cssValue) {
    failures.push(`${check.label}: missing token or CSS var`);
    continue;
  }

  if (normalizeColor(check.tokenValue) !== normalizeColor(check.cssValue)) {
    failures.push(`${check.label}: token ${check.tokenValue} does not match CSS ${check.cssValue}`);
  }
}

const bodyFontToken = tokens?.typography?.family?.body?.$value;
const headingFontToken = tokens?.typography?.family?.heading?.$value;
const bodyFontString = Array.isArray(bodyFontToken) ? bodyFontToken.join(',') : String(bodyFontToken ?? '');
const headingFontString = Array.isArray(headingFontToken) ? headingFontToken.join(',') : String(headingFontToken ?? '');

if (!bodyFontString.toLowerCase().includes('nunito')) {
  failures.push('typography.family.body must include Nunito');
}

if (!headingFontString.toLowerCase().includes('cormorant garamond')) {
  failures.push('typography.family.heading must include Cormorant Garamond');
}

if (!approvedThemeSource.includes('paletteName: \'Terracotta Calm\'')) {
  failures.push('approved-theme.ts is no longer locked to Terracotta Calm');
}

if (!approvedThemeSource.includes('Nunito')) {
  failures.push('approved-theme.ts no longer includes Nunito');
}

if (failures.length > 0) {
  console.error('[tokens:verify-sync] Theme/token drift detected:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('[tokens:verify-sync] Sidecar tokens are aligned with the locked Terracotta/Nunito theme.');
