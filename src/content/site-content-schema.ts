import { z } from 'astro/zod';

const seoSchema = z.object({
  pageTitle: z.string().min(1),
  pageDescription: z.string().min(1),
  openGraphTitle: z.string().min(1),
  openGraphDescription: z.string().min(1),
});

const navigationSchema = z.object({
  whatIs: z.string().min(1),
  whoIsItFor: z.string().min(1),
  about: z.string().min(1),
  services: z.string().min(1),
  contact: z.string().min(1),
});

const heroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primaryCta: z.string().min(1),
  secondaryCta: z.string().min(1),
  spotlightEyebrow: z.string().min(1),
});

const pullQuoteSchema = z.object({
  text: z.string().min(1),
  attribution: z.string().min(1),
});

const whatIsSchema = z.object({
  title: z.string().min(1),
  pullQuote: pullQuoteSchema,
  paragraphs: z.array(z.string().min(1)).min(1),
  practiceNoteLabel: z.string().min(1),
  practiceNote: z.string().min(1),
});

const whoIsItForSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

const aboutSchema = z.object({
  title: z.string().min(1),
  pullQuote: z.string().min(1),
  bio: z.array(z.string().min(1)).min(1),
  approach: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

const frequentlyAskedQuestionSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const servicesSectionSchema = z.object({
  title: z.string().min(1),
  audienceLabel: z.string().min(1),
  expectationsLabel: z.string().min(1),
  frequentlyAskedQuestionsTitle: z.string().min(1),
  frequentlyAskedQuestions: z.array(frequentlyAskedQuestionSchema).min(1),
});

const announcementsSectionSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  kindLabels: z.object({
    workshop: z.string().min(1),
    group: z.string().min(1),
    announcement: z.string().min(1),
  }),
});

const contactItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().min(1),
});

const contactFormLabelsSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  message: z.string().min(1),
  consent: z.string().min(1),
  submit: z.string().min(1),
  submitting: z.string().min(1),
});

const contactFormPlaceholdersSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  message: z.string().min(1),
});

const contactFormMessagesSchema = z.object({
  invalid: z.string().min(1),
  pending: z.string().min(1),
  success: z.string().min(1),
  error: z.string().min(1),
  unavailable: z.string().min(1),
});

const contactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  privacyNote: z.string().min(1),
  availabilityNote: z.string().min(1),
  formLabels: contactFormLabelsSchema,
  formPlaceholders: contactFormPlaceholdersSchema,
  formMessages: contactFormMessagesSchema,
  contactItems: z.array(contactItemSchema).min(1),
});

const footerSchema = z.object({
  copyright: z.string().min(1),
  rightsReserved: z.string().min(1),
  creditsLabel: z.string().min(1),
  legalLabel: z.string().min(1),
});

export const siteContentSchema = z.object({
  seo: seoSchema,
  brandName: z.string().min(1),
  brandSubtitle: z.string().min(1),
  navigation: navigationSchema,
  hero: heroSchema,
  whatIs: whatIsSchema,
  whoIsItFor: whoIsItForSchema,
  about: aboutSchema,
  servicesSection: servicesSectionSchema,
  announcementsSection: announcementsSectionSchema,
  contact: contactSchema,
  footer: footerSchema,
});

export const siteContentCollectionSchema = siteContentSchema.extend({
  id: z.string().min(1),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SiteContentCollectionEntry = z.infer<typeof siteContentCollectionSchema>;
