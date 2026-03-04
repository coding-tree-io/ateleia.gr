import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/services' }),
  schema: z.object({
    order: z.number().int().nonnegative(),
    title: z.string().min(1),
    description: z.string().min(1),
    idealFor: z.array(z.string().min(1)).min(1),
    format: z.string().min(1).optional(),
    duration: z.string().min(1).optional(),
    whatToExpect: z.array(z.string().min(1)).default([]),
  }),
});

export const collections = { services };
