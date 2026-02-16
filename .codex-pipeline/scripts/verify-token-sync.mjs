import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const sidecarRootDirectory = resolve(scriptsDirectory, '..');
const repositoryRootDirectory = resolve(sidecarRootDirectory, '..');

const sidecarTokensPath = resolve(sidecarRootDirectory, 'tokens/core/tokens.json');
const projectGlobalStylesPath = resolve(repositoryRootDirectory, 'src/styles/global.css');
const siteBrandingConfigPath = resolve(repositoryRootDirectory, 'src/config/site-branding.ts');

const sidecarTokens = JSON.parse(await readFile(sidecarTokensPath, 'utf8'));
const projectGlobalStylesSource = await readFile(projectGlobalStylesPath, 'utf8');
const siteBrandingConfigSource = await readFile(siteBrandingConfigPath, 'utf8');

function readCssVariable(cssVariableName) {
  const cssVariableMatch = projectGlobalStylesSource.match(new RegExp(`--${cssVariableName}:\\s*([^;]+);`));
  return cssVariableMatch ? cssVariableMatch[1].trim().toLowerCase() : null;
}

function normalizeColorValue(colorValue) {
  return String(colorValue).trim().toLowerCase();
}

const tokenToCssColorChecks = [
  {
    label: 'brand.primary <-> --primary',
    tokenValue: sidecarTokens?.color?.brand?.primary?.$value,
    cssValue: readCssVariable('primary'),
  },
  {
    label: 'brand.accent <-> --tone-teal',
    tokenValue: sidecarTokens?.color?.brand?.accent?.$value,
    cssValue: readCssVariable('tone-teal'),
  },
  {
    label: 'surface.page <-> --background',
    tokenValue: sidecarTokens?.color?.surface?.page?.$value,
    cssValue: readCssVariable('background'),
  },
  {
    label: 'text.primary <-> --foreground',
    tokenValue: sidecarTokens?.color?.text?.primary?.$value,
    cssValue: readCssVariable('foreground'),
  },
];

const verificationFailures = [];

for (const tokenToCssColorCheck of tokenToCssColorChecks) {
  if (!tokenToCssColorCheck.tokenValue || !tokenToCssColorCheck.cssValue) {
    verificationFailures.push(`${tokenToCssColorCheck.label}: missing token or CSS var`);
    continue;
  }

  if (
    normalizeColorValue(tokenToCssColorCheck.tokenValue) !==
    normalizeColorValue(tokenToCssColorCheck.cssValue)
  ) {
    verificationFailures.push(
      `${tokenToCssColorCheck.label}: token ${tokenToCssColorCheck.tokenValue} does not match CSS ${tokenToCssColorCheck.cssValue}`
    );
  }
}

const bodyFontToken = sidecarTokens?.typography?.family?.body?.$value;
const headingFontToken = sidecarTokens?.typography?.family?.heading?.$value;
const bodyFontTokenString = Array.isArray(bodyFontToken) ? bodyFontToken.join(',') : String(bodyFontToken ?? '');
const headingFontTokenString = Array.isArray(headingFontToken)
  ? headingFontToken.join(',')
  : String(headingFontToken ?? '');

if (!bodyFontTokenString.toLowerCase().includes('nunito')) {
  verificationFailures.push('typography.family.body must include Nunito');
}

if (!headingFontTokenString.toLowerCase().includes('cormorant garamond')) {
  verificationFailures.push('typography.family.heading must include Cormorant Garamond');
}

if (!/themeColorHex:\s*'#C7392E'/i.test(siteBrandingConfigSource)) {
  verificationFailures.push('site-branding.ts must keep the locked Terracotta theme color (#C7392E)');
}

if (!/bodyFontFamily:\s*'"Nunito"/i.test(siteBrandingConfigSource)) {
  verificationFailures.push('site-branding.ts bodyFontFamily must include Nunito');
}

if (!/headingFontFamily:\s*'"Cormorant Garamond"/i.test(siteBrandingConfigSource)) {
  verificationFailures.push('site-branding.ts headingFontFamily must include Cormorant Garamond');
}

if (verificationFailures.length > 0) {
  console.error('[tokens:verify-sync] Theme/token drift detected:');
  for (const verificationFailure of verificationFailures) {
    console.error(`- ${verificationFailure}`);
  }
  process.exit(1);
}

console.log(
  '[tokens:verify-sync] Sidecar tokens are aligned with the locked Terracotta Calm + Nunito branding configuration.'
);
