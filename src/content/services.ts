import { getCollection } from 'astro:content';

export type TherapyService = {
  id: string;
  title: string;
  description: string;
  idealFor: string[];
  format?: string;
  duration?: string;
  whatToExpect: string[];
};

export async function getServices(): Promise<TherapyService[]> {
  const services = await getCollection('services');

  return services
    .sort((left, right) => left.data.id.localeCompare(right.data.id, 'en'))
    .map(({ data }) => {
      const service: TherapyService = {
        id: data.id,
        title: data.title,
        description: data.description,
        idealFor: data.idealFor,
        whatToExpect: data.whatToExpect,
      };

      if (data.format) {
        service.format = data.format;
      }

      if (data.duration) {
        service.duration = data.duration;
      }

      return service;
    });
}
