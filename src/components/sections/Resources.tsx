import { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

import { DancingFigures, HandCircle } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  therapyPracticeWebsiteContent,
  type CuratedResource,
} from '@/content/therapy-practice-website-content';
import { cn } from '@/lib/utils';

const curatedResourceItems = therapyPracticeWebsiteContent.resources.items;
const curatedResourceTags = collectSortedResourceTags(curatedResourceItems);
const tagFilterButtonBaseClassName =
  'inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300';
const selectedTagFilterButtonClassName =
  'border border-primary bg-primary text-primary-foreground shadow-sm';
const unselectedTagFilterButtonClassName =
  'border border-border/45 bg-card/65 text-muted-foreground hover:border-accent hover:text-foreground';

function collectSortedResourceTags(resources: readonly CuratedResource[]): string[] {
  const uniqueTagSet = new Set<string>();

  for (const resource of resources) {
    for (const tag of resource.tags) {
      uniqueTagSet.add(tag);
    }
  }

  return Array.from(uniqueTagSet).sort();
}

function filterCuratedResources(
  resources: readonly CuratedResource[],
  searchQuery: string,
  selectedTag: string | null
): CuratedResource[] {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  return resources.filter((resource) => {
    const matchesSearchQuery =
      !normalizedSearchQuery ||
      resource.title.toLowerCase().includes(normalizedSearchQuery) ||
      resource.note.toLowerCase().includes(normalizedSearchQuery) ||
      resource.source.toLowerCase().includes(normalizedSearchQuery);

    const matchesSelectedTag = !selectedTag || resource.tags.some((tag) => tag === selectedTag);

    return matchesSearchQuery && matchesSelectedTag;
  });
}

function createTagFilterButtonClassName(isSelected: boolean): string {
  return cn(
    tagFilterButtonBaseClassName,
    isSelected ? selectedTagFilterButtonClassName : unselectedTagFilterButtonClassName
  );
}

export function Resources() {
  const {
    resources: {
      title: resourcesSectionTitle,
      subtitle: resourcesSectionSubtitle,
    },
  } = therapyPracticeWebsiteContent;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredResources = useMemo(
    () => filterCuratedResources(curatedResourceItems, searchQuery, selectedTag),
    [searchQuery, selectedTag]
  );

  return (
    <section
      id="resources"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
      <ParallaxLayer
        speed={0.18}
        className="absolute -left-14 bottom-[-10%] w-[280px] opacity-45 md:-left-20 md:bottom-[-12%] md:w-[620px] md:opacity-100"
      >
        <DancingFigures />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.25}
        className="absolute right-[6%] top-[6%] w-14 opacity-55 md:right-[8%] md:top-[8%] md:w-24 md:opacity-100"
      >
        <HandCircle />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
          {resourcesSectionTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {resourcesSectionSubtitle}
        </p>

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
              placeholder="Αναζήτηση..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="rounded-xl border-border/45 bg-card/80 pl-10"
              aria-label="Αναζήτηση πόρων"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Φίλτρα ετικετών">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={createTagFilterButtonClassName(!selectedTag)}
            >
              {'Όλα'}
            </button>

            {curatedResourceTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={createTagFilterButtonClassName(selectedTag === tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group paper-panel flex min-h-52 flex-col justify-between rounded-2xl border border-border/45 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="break-words font-sans text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                    {resource.title}
                  </h3>
                  <ExternalLink
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-[var(--tone-teal)]">{resource.source}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.note}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border border-border/35 text-[10px] font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {'Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε διαφορετική αναζήτηση.'}
          </p>
        )}
      </div>
    </section>
  );
}
