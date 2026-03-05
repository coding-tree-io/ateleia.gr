import { getPrimaryContactEmail } from '@/config/contact';
import {
  therapyPracticeSiteBranding,
} from '@/config/site-branding';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

type SocialProfileUrl = {
  href: string;
};

type StructuredDataValue = Record<string, unknown>;

const temporaryPublicOrigin = 'https://coding-tree-io.github.io';
const temporaryCanonicalOrigin = `${temporaryPublicOrigin}/ateleia.gr`;
const projectBasePathname = new URL(temporaryCanonicalOrigin).pathname.replace(/\/+$/, '');

const socialProfileUrls: SocialProfileUrl[] = [];

function normalizeStructuredDataEmail(emailAddress: string | undefined): string | undefined {
  if (!emailAddress) {
    return undefined;
  }

  return emailAddress.includes('example.com') ? undefined : emailAddress;
}

function normalizeStructuredDataTelephone(telephoneNumber: string | undefined): string | undefined {
  if (!telephoneNumber) {
    return undefined;
  }

  return /x/i.test(telephoneNumber) ? undefined : telephoneNumber;
}

export const therapyPracticeSiteMetadata = {
  siteName: therapyPracticeWebsiteContent.brandName,
  temporaryCanonicalOrigin,
  defaultLocale: 'el_GR',
  defaultLanguage: 'el',
  robots: {
    temporaryNoindexDirective: 'noindex, nofollow',
    launchDirective: 'index, follow',
    isTemporaryNoindexEnabled: true,
  },
  openGraph: {
    fallbackImageRelativePath: 'images/social/og-b3-terracotta.png',
    fallbackImageAlt:
      'Ateleia Art Therapy social preview image in terracotta editorial style.',
  },
  legalPageRelativePath: 'legal/',
  organization: {
    name: therapyPracticeWebsiteContent.brandName,
    email: normalizeStructuredDataEmail(getPrimaryContactEmail()),
    telephone: normalizeStructuredDataTelephone(
      therapyPracticeWebsiteContent.contact.contactItems.find((contactItem) =>
        contactItem.href.startsWith('tel:')
      )?.value
    ),
    logoRelativePath: therapyPracticeSiteBranding.projectPaths.logoImageRelativePath,
    sameAs: socialProfileUrls.map((socialProfileUrl) => socialProfileUrl.href),
  },
  themeColorHex: therapyPracticeSiteBranding.visualIdentity.themeColorHex,
} as const;

function normalizeCanonicalOrigin(canonicalOrigin: string): string {
  return canonicalOrigin.replace(/\/+$/, '');
}

function normalizeCanonicalPath(canonicalPath: string): string {
  if (!canonicalPath || canonicalPath === '/') {
    return '';
  }

  if (/^https?:\/\//i.test(canonicalPath)) {
    return canonicalPath;
  }

  let normalizedCanonicalPath = canonicalPath.trim();

  if (normalizedCanonicalPath === projectBasePathname) {
    return '';
  }

  if (normalizedCanonicalPath.startsWith(`${projectBasePathname}/`)) {
    normalizedCanonicalPath = normalizedCanonicalPath.slice(projectBasePathname.length + 1);
  }

  normalizedCanonicalPath = normalizedCanonicalPath.replace(/^\/+/, '');

  return normalizedCanonicalPath ? `/${normalizedCanonicalPath}` : '';
}

export function getRobotsDirective(): string {
  return therapyPracticeSiteMetadata.robots.isTemporaryNoindexEnabled
    ? therapyPracticeSiteMetadata.robots.temporaryNoindexDirective
    : therapyPracticeSiteMetadata.robots.launchDirective;
}

export function createCanonicalUrl(canonicalPath = ''): string {
  if (/^https?:\/\//i.test(canonicalPath)) {
    return canonicalPath;
  }

  const normalizedCanonicalOrigin = normalizeCanonicalOrigin(
    therapyPracticeSiteMetadata.temporaryCanonicalOrigin
  );
  const normalizedCanonicalPath = normalizeCanonicalPath(canonicalPath);

  return normalizedCanonicalPath
    ? `${normalizedCanonicalOrigin}${normalizedCanonicalPath}`
    : `${normalizedCanonicalOrigin}/`;
}

export function createOrganizationStructuredData(): StructuredDataValue {
  const { organization } = therapyPracticeSiteMetadata;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${createCanonicalUrl()}#organization`,
    name: organization.name,
    url: createCanonicalUrl(),
    logo: createCanonicalUrl(organization.logoRelativePath),
    image: createCanonicalUrl(therapyPracticeSiteMetadata.openGraph.fallbackImageRelativePath),
    ...(organization.email ? { email: organization.email } : {}),
    ...(organization.telephone ? { telephone: organization.telephone } : {}),
    ...(organization.sameAs.length > 0 ? { sameAs: organization.sameAs } : {}),
  };
}

export function createWebSiteStructuredData(): StructuredDataValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${createCanonicalUrl()}#website`,
    name: therapyPracticeSiteMetadata.siteName,
    url: createCanonicalUrl(),
    inLanguage: therapyPracticeSiteMetadata.defaultLanguage,
  };
}
