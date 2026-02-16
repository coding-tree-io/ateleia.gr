import * as React from 'react';
import { ExternalLink, Search } from 'lucide-react';

import { siteCopy, type ResourceItem } from '@/content/site-copy';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DancingFigures, HandCircle } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
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
    <section id="resources" ref={ref} className="reveal relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.18} className="absolute -left-14 bottom-[-10%] w-[280px] opacity-45 md:-left-20 md:bottom-[-12%] md:w-[620px] md:opacity-100">
        <DancingFigures />
      </ParallaxLayer>
      <ParallaxLayer speed={0.25} className="absolute right-[6%] top-[6%] w-14 opacity-55 md:right-[8%] md:top-[8%] md:w-24 md:opacity-100">
        <HandCircle />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-balance text-foreground md:text-4xl lg:text-5xl">
          {siteCopy.resources.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {siteCopy.resources.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="resources-search"
              name="resources-search"
              type="search"
              placeholder="Αναζήτηση..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="rounded-xl border-border/45 bg-card/80 pl-10 backdrop-blur-sm"
              aria-label="Αναζήτηση πόρων"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Φίλτρα ετικετών">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                !activeTag
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border/45 bg-card/65 text-muted-foreground backdrop-blur-sm hover:border-accent hover:text-foreground'
              }`}
            >
              {'Όλα'}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeTag === tag
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border/45 bg-card/65 text-muted-foreground backdrop-blur-sm hover:border-accent hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group paper-panel flex min-h-52 flex-col justify-between rounded-2xl border border-border/45 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="break-words font-sans text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <ExternalLink
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-[var(--tone-teal)]">{item.source}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full border border-border/35 text-[10px] font-semibold">
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
