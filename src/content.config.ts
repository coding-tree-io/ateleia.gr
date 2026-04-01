import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

import {
  aboutCollectionSchema,
  announcementCollectionEntrySchema,
  contactCollectionSchema,
  heroCollectionSchema,
  serviceCollectionEntrySchema,
  siteGlobalCollectionSchema,
  whatIsCollectionSchema,
  whoIsItForCollectionSchema,
} from './content/site-content-schema';

function createSingleDocumentCollection(
  path: string,
  id: string,
  schema: z.ZodTypeAny,
) {
  return defineCollection({
    loader: file(path, {
      parser: (text) => [
        {
          id,
          ...JSON.parse(text),
        },
      ],
    }),
    schema,
  });
}

const siteGlobal = createSingleDocumentCollection(
  'src/data/site-global.json',
  'site-global',
  siteGlobalCollectionSchema,
);

const hero = createSingleDocumentCollection('src/data/hero.json', 'hero', heroCollectionSchema);

const whatIs = createSingleDocumentCollection(
  'src/data/what-is.json',
  'what-is',
  whatIsCollectionSchema,
);

const whoIsItFor = createSingleDocumentCollection(
  'src/data/who-is-it-for.json',
  'who-is-it-for',
  whoIsItForCollectionSchema,
);

const about = createSingleDocumentCollection('src/data/about.json', 'about', aboutCollectionSchema);

const contact = createSingleDocumentCollection(
  'src/data/contact.json',
  'contact',
  contactCollectionSchema,
);

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
  schema: serviceCollectionEntrySchema,
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
  schema: announcementCollectionEntrySchema,
});

export const collections = {
  siteGlobal,
  hero,
  whatIs,
  whoIsItFor,
  about,
  contact,
  services,
  announcements,
};
