export const therapyPracticeSiteBranding = {
  visualIdentity: {
    themeColorHex: '#C7392E',
  },
  illustrationPalette: {
    terracotta: '#C7392E',
    terracottaSoft: '#D97F6F',
    teal: '#5C7A82',
    tealSoft: '#8CAEB5',
    ochre: '#C49A3C',
    ochreSoft: '#E0C987',
    sage: '#8D9A6B',
    ink: '#3D3534',
  },
  typography: {
    googleFontsStylesheetUrl:
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Nunito:wght@400;500;600;700&display=swap',
    headingFontFamily: '"Cormorant Garamond", Georgia, serif',
    bodyFontFamily: '"Nunito", "Noto Sans", system-ui, sans-serif',
  },
  projectPaths: {
    logoImageRelativePath: 'images/client-review/logo.png',
    codingTreeAttributionScriptRelativePath: 'assets/vendor/coding-tree-attribution/coding-tree-attribution.js',
    creditsPageRelativePath: 'credits/',
  },
} as const;

function normalizeProjectRelativePath(relativePath: string): string {
  return relativePath.replace(/^\/+/, '');
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

export function createProjectRelativeUrl(relativePath: string): string {
  const normalizedBaseUrl = normalizeBaseUrl(import.meta.env.BASE_URL);
  const normalizedRelativePath = normalizeProjectRelativePath(relativePath);
  return normalizedRelativePath ? `${normalizedBaseUrl}${normalizedRelativePath}` : normalizedBaseUrl;
}

export function createLogoImageUrl(): string {
  return createProjectRelativeUrl(therapyPracticeSiteBranding.projectPaths.logoImageRelativePath);
}

export function createCodingTreeAttributionScriptUrl(): string {
  return createProjectRelativeUrl(therapyPracticeSiteBranding.projectPaths.codingTreeAttributionScriptRelativePath);
}

export function createCreditsPageUrl(): string {
  return createProjectRelativeUrl(therapyPracticeSiteBranding.projectPaths.creditsPageRelativePath);
}
