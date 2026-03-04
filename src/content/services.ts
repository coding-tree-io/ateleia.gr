import { getCollection, type CollectionEntry } from 'astro:content';

type ServicesCollectionEntry = CollectionEntry<'services'>;

export type TherapyService = ServicesCollectionEntry['data'] & {
  id: string;
};

export async function getServices(): Promise<TherapyService[]> {
  const services = await getCollection('services');

  return services
    .sort((left, right) => left.data.id.localeCompare(right.data.id, 'en'))
    .map(({ data }) => data);
}
