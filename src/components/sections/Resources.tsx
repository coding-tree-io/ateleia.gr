import * as React from 'react';
import { ExternalLink, Search } from 'lucide-react';

import { siteCopy, type ResourceItem } from '@/content/site-copy';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DancingFigures } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

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
  const ref = useReveal<HTMLElement>();
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
    <section id="resources" ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <DancingFigures className="absolute -left-24 bottom-0 w-[600px] text-primary animate-gentle-drift" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.resources.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {siteCopy.resources.subtitle}
        </p>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Αναζήτηση..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border-border/40 bg-card/80 pl-10 backdrop-blur-sm"
              aria-label="Αναζήτηση πόρων"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Φίλτρα ετικετών">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                !activeTag
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border/40 bg-card/60 text-muted-foreground backdrop-blur-sm hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {'Όλα'}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  activeTag === tag
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border/40 bg-card/60 text-muted-foreground backdrop-blur-sm hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Resource cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-border/30 bg-card/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <ExternalLink
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-accent">{item.source}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full text-[10px] font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {'Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε διαφορετική αναζήτηση.'}
          </p>
        )}
      </div>
    </section>
  );
}
