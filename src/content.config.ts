import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { services };
