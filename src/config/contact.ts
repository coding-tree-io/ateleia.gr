import { therapyPracticeWebsiteContent } from '@/content/therapy-practice-website-content';

const mailtoSchemePattern = /^mailto:/i;

function findPrimaryEmailContactItem() {
  return therapyPracticeWebsiteContent.contact.contactItems.find((contactItem) =>
    mailtoSchemePattern.test(contactItem.href)
  );
}

export function getPrimaryContactEmail(): string {
  const primaryEmailContactItem = findPrimaryEmailContactItem();

  if (!primaryEmailContactItem) {
    throw new Error('Missing mailto contact item in therapyPracticeWebsiteContent.contact.contactItems.');
  }

  const normalizedEmailAddress = primaryEmailContactItem.href
    .replace(mailtoSchemePattern, '')
    .split('?')[0]
    ?.trim();

  if (!normalizedEmailAddress) {
    throw new Error('Configured mailto contact item does not contain a valid email address.');
  }

  return normalizedEmailAddress;
}

export function getPrimaryContactMailtoHref(): string {
  return `mailto:${getPrimaryContactEmail()}`;
}

export function getContactFormEndpoint(): string {
  return import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? '';
}

export function getContactFormSubject(): string {
  return `${therapyPracticeWebsiteContent.brandName} contact form`;
}
