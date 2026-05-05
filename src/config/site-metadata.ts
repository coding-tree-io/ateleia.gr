import { getPrimaryContactEmail } from '@/config/contact';
import {
  therapyPracticeSiteBranding,
} from '@/config/site-branding';
import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

type SocialProfileUrl = {
  href: string;
};

type StructuredDataValue = Record<string, unknown>;

const canonicalOrigin = 'https://ateleiatherapy.gr';
const projectBasePathname = new URL(canonicalOrigin).pathname.replace(/\/+$/, '');

const socialProfileUrls: SocialProfileUrl[] = [];
const localBusinessStructuredDataId = `${canonicalOrigin}/#local-business`;
const therapistPersonStructuredDataId = `${canonicalOrigin}/#person-chrysoula-plakioti`;

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
  canonicalOrigin,
  defaultLocale: 'el_GR',
  defaultLanguage: 'el',
  robots: {
    temporaryNoindexDirective: 'noindex, nofollow',
    launchDirective: 'index, follow',
    isTemporaryNoindexEnabled: false,
  },
  openGraph: {
    fallbackImageRelativePath: 'images/social/og-minimal-referral.png',
    fallbackImageAlt:
      'Minimal Ateleia social preview card with logo and Greek share copy.',
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
  localSeo: {
    serviceArea: therapyPracticeWebsiteContent.contact.serviceArea,
    addressLocality: 'Αθήνα',
    addressCountry: 'GR',
    businessType: 'LocalBusiness',
    providerName: 'Χρυσούλα Πλακιώτη',
    providerJobTitle: 'Εικαστική ψυχοθεραπεύτρια',
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
    therapyPracticeSiteMetadata.canonicalOrigin
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

function createCanonicalAssetUrl(assetPath: string | undefined): string {
  if (!assetPath) {
    return createCanonicalUrl(therapyPracticeSiteMetadata.openGraph.fallbackImageRelativePath);
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  return createCanonicalUrl(assetPath.replace(/^\/+/, ''));
}

export function createLocalBusinessStructuredData(): StructuredDataValue {
  const { organization, localSeo } = therapyPracticeSiteMetadata;

  return {
    '@context': 'https://schema.org',
    '@type': localSeo.businessType,
    '@id': localBusinessStructuredDataId,
    name: organization.name,
    alternateName: 'Ateleia',
    url: createCanonicalUrl(),
    image: createCanonicalUrl(therapyPracticeSiteMetadata.openGraph.fallbackImageRelativePath),
    logo: createCanonicalUrl(organization.logoRelativePath),
    ...(organization.email ? { email: organization.email } : {}),
    ...(organization.telephone ? { telephone: organization.telephone } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: localSeo.addressLocality,
      addressCountry: localSeo.addressCountry,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: localSeo.serviceArea,
      address: {
        '@type': 'PostalAddress',
        addressLocality: localSeo.addressLocality,
        addressCountry: localSeo.addressCountry,
      },
    },
    founder: {
      '@id': therapistPersonStructuredDataId,
    },
    employee: {
      '@id': therapistPersonStructuredDataId,
    },
    ...(organization.sameAs.length > 0 ? { sameAs: organization.sameAs } : {}),
  };
}

export function createPersonStructuredData(): StructuredDataValue {
  const { localSeo } = therapyPracticeSiteMetadata;
  const portraitSource = therapyPracticeWebsiteContent.about.portrait?.src;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': therapistPersonStructuredDataId,
    name: localSeo.providerName,
    jobTitle: localSeo.providerJobTitle,
    worksFor: {
      '@id': localBusinessStructuredDataId,
    },
    url: createCanonicalUrl(),
    image: createCanonicalAssetUrl(portraitSource),
    knowsAbout: [
      'Εικαστική ψυχοθεραπεία',
      'Ψυχοθεραπεία μέσω τέχνης',
      'Δημιουργική έκφραση',
      'Αυτογνωσία',
    ],
  };
}

export function createFaqStructuredData(): StructuredDataValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${createCanonicalUrl()}#faq`,
    mainEntity: therapyPracticeWebsiteContent.frequentlyAskedQuestions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
    publisher: {
      '@id': localBusinessStructuredDataId,
    },
  };
}
