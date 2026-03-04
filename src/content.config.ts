import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

import { siteContentCollectionSchema } from './content/site-content-schema';

const siteContent = defineCollection({
  loader: file('src/data/site-content.json', {
    parser: (text) => [
      {
        id: 'site-content',
        ...JSON.parse(text),
      },
    ],
  }),
  schema: siteContentCollectionSchema,
});

const services = defineCollection({
  loader: file('src/data/services.json', {
    parser: (text) => {
      const document = JSON.parse(text) as {
        services?: Array<Record<string, unknown>>;
      };

      return (document.services ?? []).map((service, index) => ({
        id: `service-${String(index + 1).padStart(3, '0')}`,
        ...service,
      }));
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    idealFor: z.array(z.string().min(1)).min(1),
    format: z.string().min(1).optional(),
    duration: z.string().min(1).optional(),
    whatToExpect: z.array(z.string().min(1)).default([]),
  }),
});

const announcements = defineCollection({
  loader: file('src/data/announcements.json', {
    parser: (text) => {
      const document = JSON.parse(text) as {
        announcements?: Array<Record<string, unknown>>;
      };

      return (document.announcements ?? []).map((announcement, index) => ({
        id: `announcement-${String(index + 1).padStart(3, '0')}`,
        ...announcement,
      }));
    },
  }),
  schema: z.object({
    id: z.string(),
    title: z.string().min(1),
    summary: z.string().min(1),
    kind: z.enum(['workshop', 'group', 'announcement']),
    dateLabel: z.string().min(1).optional(),
    callToActionLabel: z.string().min(1).optional(),
    callToActionHref: z.string().min(1).optional(),
    isPublished: z.boolean().default(true),
  }),
});

export const collections = { siteContent, services, announcements };
