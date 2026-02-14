import * as React from 'react';
import { ExternalLink, Search } from 'lucide-react';

import { siteCopy, type ResourceItem } from '@/content/site-copy';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FreehandCircle } from '@/components/decorative/ArtShapes';

function getAllTags(items: readonly ResourceItem[]): string[] {
  const tagSet = new Set<string>();
  for (const item of items) {
    for (const tag of item.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function Resources() {
  const [search, setSearch] = React.useState('');
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => getAllTags(siteCopy.resources.items), []);

  const filtered = React.useMemo(() => {
    return siteCopy.resources.items.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.note.toLowerCase().includes(search.toLowerCase()) ||
        item.source.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || item.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  return (
    <section id="resources" className="relative px-5 py-16 md:px-8 md:py-24">
      <FreehandCircle className="absolute -right-12 top-16 w-40 text-primary" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.resources.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {siteCopy.resources.subtitle}
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Αναζήτηση..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Αναζήτηση πόρων"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Φίλτρα ετικετών">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                !activeTag
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50'
              }`}
            >
              {'Όλα'}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Resource cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-5 transition-shadow duration-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {item.title}
                  </h3>
                  <ExternalLink
                    className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-xs text-accent font-medium">{item.source}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {'Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε διαφορετική αναζήτηση.'}
          </p>
        )}
      </div>
    </section>
  );
}
