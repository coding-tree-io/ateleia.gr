import type { CuratedResource } from '@/content/therapy-practice-website-content';

export function collectSortedResourceTags(resources: readonly CuratedResource[]): string[] {
  const uniqueTagSet = new Set<string>();

  for (const resource of resources) {
    for (const resourceTag of resource.tags) {
      uniqueTagSet.add(resourceTag);
    }
  }

  return Array.from(uniqueTagSet).sort((leftTag, rightTag) => leftTag.localeCompare(rightTag, 'el'));
}

export function createResourceSearchText(resource: CuratedResource): string {
  return `${resource.title} ${resource.source} ${resource.note}`.toLowerCase();
}

export function createResourceTagsSearchText(resource: CuratedResource): string {
  return resource.tags.map((resourceTag) => resourceTag.toLowerCase()).join('|');
}
