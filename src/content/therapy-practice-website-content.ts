import siteContentSource from '@/data/site-content.json';

import { siteContentSchema } from '@/content/site-content-schema';

const parsedSiteContent = siteContentSchema.parse(siteContentSource);

const navigationItems = [
  { label: parsedSiteContent.navigation.whatIs, href: '#what-is' },
  { label: parsedSiteContent.navigation.whoIsItFor, href: '#who-is-it-for' },
  { label: parsedSiteContent.navigation.about, href: '#about' },
  { label: parsedSiteContent.navigation.services, href: '#services' },
  { label: parsedSiteContent.navigation.contact, href: '#contact' },
] as const;

export const therapyPracticeWebsiteContent = {
  ...parsedSiteContent,
  navigationItems,
  servicesTitle: parsedSiteContent.servicesSection.title,
  frequentlyAskedQuestionsTitle: parsedSiteContent.servicesSection.frequentlyAskedQuestionsTitle,
  frequentlyAskedQuestions: parsedSiteContent.servicesSection.frequentlyAskedQuestions,
} as const;

export type TherapyPracticeWebsiteContent = typeof therapyPracticeWebsiteContent;
