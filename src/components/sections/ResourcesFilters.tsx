import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ResourcesFiltersProps = {
  sectionRootElementId: string;
  availableTags: readonly string[];
  allTagsLabel: string;
  searchPlaceholder: string;
  searchInputLabel: string;
};

const buttonBaseClassName =
  'inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300';
const buttonSelectedClassName =
  'border border-primary bg-primary text-primary-foreground shadow-sm';
const buttonUnselectedClassName =
  'border border-border/45 bg-card/65 text-muted-foreground hover:border-accent hover:text-foreground';

function createFilterButtonClassName(isSelected: boolean): string {
  return cn(buttonBaseClassName, isSelected ? buttonSelectedClassName : buttonUnselectedClassName);
}

function collectVisibleResourceCount(sectionRootElement: HTMLElement): number {
  const resourceCardElements = sectionRootElement.querySelectorAll<HTMLElement>('[data-resource-card]');
  let visibleResourceCount = 0;

  for (const resourceCardElement of resourceCardElements) {
    if (!resourceCardElement.hidden) {
      visibleResourceCount += 1;
    }
  }

  return visibleResourceCount;
}

function updateResourceCardVisibility(
  sectionRootElement: HTMLElement,
  normalizedSearchQuery: string,
  selectedTagValue: string | null
): void {
  const resourceCardElements = sectionRootElement.querySelectorAll<HTMLElement>('[data-resource-card]');

  for (const resourceCardElement of resourceCardElements) {
    const searchText = resourceCardElement.dataset.resourceSearchText ?? '';
    const tagsText = resourceCardElement.dataset.resourceTags ?? '';
    const tagValues = tagsText.split('|').filter((tagValue) => tagValue.length > 0);

    const matchesSearchQuery =
      normalizedSearchQuery.length === 0 || searchText.includes(normalizedSearchQuery);
    const matchesSelectedTag =
      selectedTagValue === null || tagValues.some((tagValue) => tagValue === selectedTagValue);

    resourceCardElement.hidden = !(matchesSearchQuery && matchesSelectedTag);
  }

  const emptyStateElement = sectionRootElement.querySelector<HTMLElement>('[data-resource-empty-state]');
  if (!emptyStateElement) {
    return;
  }

  const hasVisibleResources = collectVisibleResourceCount(sectionRootElement) > 0;
  emptyStateElement.hidden = hasVisibleResources;
}

export function ResourcesFilters({
  sectionRootElementId,
  availableTags,
  allTagsLabel,
  searchPlaceholder,
  searchInputLabel,
}: ResourcesFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagValue, setSelectedTagValue] = useState<string | null>(null);

  const normalizedTagItems = useMemo(
    () =>
      availableTags.map((tagLabel) => ({
        label: tagLabel,
        value: tagLabel.toLowerCase(),
      })),
    [availableTags]
  );

  useEffect(() => {
    const sectionRootElement = document.getElementById(sectionRootElementId);
    if (!sectionRootElement) {
      return;
    }

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    updateResourceCardVisibility(sectionRootElement, normalizedSearchQuery, selectedTagValue);
  }, [searchQuery, selectedTagValue, sectionRootElementId]);

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full flex-1">
        <Search
          className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="resources-search"
          name="resources-search"
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="rounded-xl border-border/45 bg-card/80 pl-10"
          aria-label={searchInputLabel}
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Φίλτρα ετικετών">
        <button
          type="button"
          onClick={() => setSelectedTagValue(null)}
          className={createFilterButtonClassName(selectedTagValue === null)}
          aria-pressed={selectedTagValue === null}
        >
          {allTagsLabel}
        </button>

        {normalizedTagItems.map((tagItem) => {
          const isSelected = selectedTagValue === tagItem.value;

          return (
            <button
              key={tagItem.value}
              type="button"
              onClick={() => setSelectedTagValue(isSelected ? null : tagItem.value)}
              className={createFilterButtonClassName(isSelected)}
              aria-pressed={isSelected}
            >
              {tagItem.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
