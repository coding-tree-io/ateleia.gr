import aboutSource from '@/data/about.json';
import announcementsSource from '@/data/announcements.json';
import contactSource from '@/data/contact.json';
import heroSource from '@/data/hero.json';
import servicesSource from '@/data/services.json';
import siteGlobalSource from '@/data/site-global.json';
import whatIsSource from '@/data/what-is.json';
import whoIsItForSource from '@/data/who-is-it-for.json';

import {
  aboutSchema,
  announcementsDocumentSchema,
  contactSchema,
  heroSchema,
  servicesDocumentSchema,
  siteGlobalSchema,
  whatIsSchema,
  whoIsItForSchema,
} from '@/content/site-content-schema';

const parsedSiteGlobal = siteGlobalSchema.parse(siteGlobalSource);
const parsedHero = heroSchema.parse(heroSource);
const parsedWhatIs = whatIsSchema.parse(whatIsSource);
const parsedWhoIsItFor = whoIsItForSchema.parse(whoIsItForSource);
const parsedAbout = aboutSchema.parse(aboutSource);
const parsedServices = servicesDocumentSchema.parse(servicesSource);
const parsedAnnouncements = announcementsDocumentSchema.parse(announcementsSource);
const parsedContact = contactSchema.parse(contactSource);

const navigationItems = [
  { label: parsedSiteGlobal.navigation.whatIs, href: '#what-is' },
  { label: parsedSiteGlobal.navigation.whoIsItFor, href: '#who-is-it-for' },
  { label: parsedSiteGlobal.navigation.about, href: '#about' },
  { label: parsedSiteGlobal.navigation.services, href: '#services' },
  { label: parsedSiteGlobal.navigation.contact, href: '#contact' },
] as const;

export const therapyPracticeWebsiteContent = {
  ...parsedSiteGlobal,
  hero: parsedHero,
  whatIs: parsedWhatIs,
  whoIsItFor: parsedWhoIsItFor,
  about: parsedAbout,
  servicesSection: {
    title: parsedServices.title,
    audienceLabel: parsedServices.audienceLabel,
    expectationsLabel: parsedServices.expectationsLabel,
    frequentlyAskedQuestionsTitle: parsedServices.frequentlyAskedQuestionsTitle,
    frequentlyAskedQuestions: parsedServices.frequentlyAskedQuestions,
  },
  announcementsSection: {
    title: parsedAnnouncements.title,
    intro: parsedAnnouncements.intro,
    kindLabels: parsedAnnouncements.kindLabels,
  },
  contact: parsedContact,
  navigationItems,
  servicesTitle: parsedServices.title,
  frequentlyAskedQuestionsTitle: parsedServices.frequentlyAskedQuestionsTitle,
  frequentlyAskedQuestions: parsedServices.frequentlyAskedQuestions,
} as const;

export type TherapyPracticeWebsiteContent = typeof therapyPracticeWebsiteContent;
