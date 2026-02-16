import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteCopy } from '@/content/site-copy';
import { cn } from '@/lib/utils';
import { WordmarkAlphaDot } from '@/components/brand/WordmarkAlphaDot';
import { WordmarkAlphaEcho } from '@/components/brand/WordmarkAlphaEcho';
import { WordmarkAlphaEmphasis } from '@/components/brand/WordmarkAlphaEmphasis';
import { WordmarkAlphaRing } from '@/components/brand/WordmarkAlphaRing';
import { WordmarkAlphaSlash } from '@/components/brand/WordmarkAlphaSlash';
import { WordmarkAlphaThread } from '@/components/brand/WordmarkAlphaThread';
import { WordmarkGhostAlpha } from '@/components/brand/WordmarkGhostAlpha';
import { WordmarkParentheticalAlpha } from '@/components/brand/WordmarkParentheticalAlpha';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

type WordmarkComponent = React.ComponentType<WordmarkProps>;

type VariantSpec = {
  id: string;
  title: string;
  description: string;
  Wordmark: WordmarkComponent;
};

const variants: VariantSpec[] = [
  {
    id: 'parenthetical-alpha',
    title: 'Parenthetical Alpha',
    description: 'Explicit and elegant: the alpha appears inside parentheses before the full name.',
    Wordmark: WordmarkParentheticalAlpha,
  },
  {
    id: 'ghost-alpha',
    title: 'Ghost Alpha Overlay',
    description: 'Primary focus on τέλεια with a subtle alpha prefix as a quiet conceptual marker.',
    Wordmark: WordmarkGhostAlpha,
  },
  {
    id: 'alpha-dot',
    title: 'Alpha Dot Signature',
    description: 'A poetic α.τέλεια reading where the dot feels like a tiny brush mark.',
    Wordmark: WordmarkAlphaDot,
  },
  {
    id: 'alpha-slash',
    title: 'Alpha Slash Cut',
    description: 'A directional α/τέλεια lockup, crisp and editorial with controlled contrast.',
    Wordmark: WordmarkAlphaSlash,
  },
  {
    id: 'alpha-ring',
    title: 'Alpha Orbit Seal',
    description: 'The alpha sits in a seal-like ring before the wordmark, adding symbolic weight.',
    Wordmark: WordmarkAlphaRing,
  },
  {
    id: 'alpha-emphasis',
    title: 'Alpha Pulse',
    description: 'Alpha takes visual lead with a subtle pulse, then hands focus to τέλεια.',
    Wordmark: WordmarkAlphaEmphasis,
  },
  {
    id: 'alpha-echo',
    title: 'Echo Impression',
    description: 'A ghosted echo layer references process and imperfection without hurting clarity.',
    Wordmark: WordmarkAlphaEcho,
  },
  {
    id: 'alpha-thread',
    title: 'Threaded Parenthesis',
    description: 'A refined (α)τέλεια lockup with a drawn thread underline for handcrafted character.',
    Wordmark: WordmarkAlphaThread,
  },
];

type HeaderBarPreviewProps = {
  Wordmark: WordmarkComponent;
  state: 'default' | 'scrolled';
  mobile?: boolean;
};

function HeaderBarPreview({ Wordmark, state, mobile = false }: HeaderBarPreviewProps) {
  const logoSrc = `${import.meta.env.BASE_URL}images/client-review/logo.png`;

  return (
    <div
      className={cn(
        'rounded-2xl border transition-colors',
        state === 'scrolled' ? 'border-border/65 bg-background/95 shadow-sm' : 'border-border/35 bg-background/70'
      )}
    >
      <div className={cn('flex items-center justify-between', mobile ? 'px-3 py-3' : 'px-4 py-3.5 md:px-5')}>
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logoSrc}
            alt="Λογότυπο Ατέλεια"
            className={cn(
              'shrink-0 rounded-lg border border-border/60 bg-card object-contain px-1 shadow-sm',
              mobile ? 'h-8 w-12' : 'h-9 w-14'
            )}
          />
          <div className="min-w-0">
            <Wordmark compact={mobile} className="truncate" />
            {!mobile && <p className="truncate text-[10px] tracking-[0.12em] text-muted-foreground">{siteCopy.brandSubtitle}</p>}
          </div>
        </div>

        {mobile ? (
          <span className="inline-flex size-11 items-center justify-center rounded-md border border-border/55 text-muted-foreground">≡</span>
        ) : (
          <nav className="hidden items-center gap-4 md:flex" aria-label="Header preview navigation">
            {siteCopy.navItems.slice(0, 3).map((item) => (
              <span key={item.label} className="text-xs font-semibold text-muted-foreground">
                {item.label}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export function HeaderWordplayLab() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <header className="mb-8 space-y-3 md:mb-10">
        <Badge variant="outline" className="border-border/60 bg-card/70">
          Header exploration
        </Badge>
        <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">(α)τέλεια Wordmark Variants</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Side-by-side review page for explicit static header concepts. Production header remains unchanged until one variant is selected.
        </p>
      </header>

      <div className="space-y-6">
        {variants.map(({ id, title, description, Wordmark }) => (
          <Card key={id} className="border-border/55 bg-card/80 py-0 shadow-sm">
            <CardHeader className="border-b border-border/45 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="font-serif text-2xl text-foreground">{title}</CardTitle>
                  <CardDescription className="mt-1 text-sm">{description}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground">
                  ID: {id}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-6">
              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Desktop header states</p>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-border/55 text-[11px]">
                      Default
                    </Badge>
                    <HeaderBarPreview Wordmark={Wordmark} state="default" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-border/55 text-[11px]">
                      Scrolled
                    </Badge>
                    <HeaderBarPreview Wordmark={Wordmark} state="scrolled" />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Mobile header states</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-border/55 text-[11px]">
                      Default
                    </Badge>
                    <HeaderBarPreview Wordmark={Wordmark} state="default" mobile />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="border-border/55 text-[11px]">
                      Scrolled
                    </Badge>
                    <HeaderBarPreview Wordmark={Wordmark} state="scrolled" mobile />
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
