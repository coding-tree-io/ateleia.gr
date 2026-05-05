import { z } from 'astro/zod';

const seoSchema = z.object({
  pageTitle: z.string().min(1),
  pageDescription: z.string().min(1),
  openGraphTitle: z.string().min(1),
  openGraphDescription: z.string().min(1),
});

const navigationLabelSchema = z.string().min(1).max(32);

const navigationSchema = z.object({
  whatIs: navigationLabelSchema,
  whoIsItFor: navigationLabelSchema,
  about: navigationLabelSchema,
  services: navigationLabelSchema,
  contact: navigationLabelSchema,
});

const footerSchema = z.object({
  copyright: z.string().min(1),
  rightsReserved: z.string().min(1),
  creditsLabel: z.string().min(1),
  legalLabel: z.string().min(1),
});

export const siteGlobalSchema = z.object({
  seo: seoSchema,
  brandName: z.string().min(1),
  brandSubtitle: z.string().min(1),
  navigation: navigationSchema,
  footer: footerSchema,
});

export const siteGlobalCollectionSchema = siteGlobalSchema.extend({
  id: z.string().min(1),
});

export const heroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primaryCta: z.string().min(1),
  secondaryCta: z.string().min(1),
  spotlight: z.object({
    eyebrow: z.string().min(1),
    quote: z.string().min(1),
    body: z.string().min(1),
    attribution: z.string().min(1),
  }),
});

export const heroCollectionSchema = heroSchema.extend({
  id: z.string().min(1),
});

export const whatIsSchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

export const whatIsCollectionSchema = whatIsSchema.extend({
  id: z.string().min(1),
});

export const whoIsItForSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const whoIsItForCollectionSchema = whoIsItForSchema.extend({
  id: z.string().min(1),
});

export const aboutSchema = z.object({
  title: z.string().min(1),
  portrait: z.object({
    src: z.string().default(''),
    alt: z.string().default(''),
    caption: z.string().optional(),
  }).optional(),
  pullQuote: z.string().min(1),
  bio: z.array(z.string().min(1)).min(1),
  approach: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const aboutCollectionSchema = aboutSchema.extend({
  id: z.string().min(1),
});

const frequentlyAskedQuestionSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const serviceItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  idealFor: z.array(z.string().min(1)).default([]),
  format: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  whatToExpect: z.array(z.string().min(1)).default([]),
});

export const serviceCollectionEntrySchema = serviceItemSchema.extend({
  id: z.string().min(1),
});

export const servicesDocumentSchema = z.object({
  title: z.string().min(1),
  audienceLabel: z.string().min(1),
  expectationsLabel: z.string().min(1),
  frequentlyAskedQuestionsTitle: z.string().min(1),
  frequentlyAskedQuestions: z.array(frequentlyAskedQuestionSchema).min(1),
  services: z.array(serviceItemSchema).min(1),
});

export const servicesDocumentCollectionSchema = servicesDocumentSchema.extend({
  id: z.string().min(1),
});

const announcementKindSchema = z.enum(['workshop', 'group', 'announcement']);

const announcementItemSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  kind: announcementKindSchema,
  dateLabel: z.string().min(1).optional(),
  callToActionLabel: z.string().min(1).optional(),
  callToActionHref: z.string().min(1).optional(),
  isPublished: z.boolean().default(true),
});

export const announcementCollectionEntrySchema = announcementItemSchema.extend({
  id: z.string().min(1),
});

export const announcementsDocumentSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  kindLabels: z.object({
    workshop: z.string().min(1),
    group: z.string().min(1),
    announcement: z.string().min(1),
  }),
  announcements: z.array(announcementItemSchema).default([]),
});

export const announcementsDocumentCollectionSchema = announcementsDocumentSchema.extend({
  id: z.string().min(1),
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

export const contactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  serviceArea: z.string().min(1),
  privacyNote: z.string().min(1),
  availabilityNote: z.string().min(1),
  formLabels: contactFormLabelsSchema,
  formPlaceholders: contactFormPlaceholdersSchema,
  formMessages: contactFormMessagesSchema,
  contactItems: z.array(contactItemSchema).min(1),
});

export const contactCollectionSchema = contactSchema.extend({
  id: z.string().min(1),
});
