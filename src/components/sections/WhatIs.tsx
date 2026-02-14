import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { OrganicDivider, PaintSplashes } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { useReveal } from '@/hooks/use-reveal';

export function WhatIs() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.1} className="absolute -right-20 top-2 w-[340px] md:w-[460px]">
        <PaintSplashes />
      </ParallaxLayer>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-8 lg:pr-8">
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            {siteCopy.whatIs.title}
          </h2>

          <OrganicDivider className="h-4 w-52" />

          <div className="paper-panel rounded-3xl border border-border/45 p-6 md:p-8">
            <p className="font-serif text-2xl leading-tight text-[var(--tone-ink)] md:text-3xl">
              «{siteCopy.whatIs.pullQuote.text}»
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--tone-ochre)]">
              {siteCopy.whatIs.pullQuote.attribution}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {siteCopy.whatIs.paragraphs.map((paragraph, index) => (
            <p key={index} className="reveal-child text-base leading-[1.8] text-muted-foreground md:text-lg">
              {paragraph}
            </p>
          ))}

          <aside className="reveal-child rounded-2xl border border-border/45 bg-card/70 p-6 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--tone-teal)]">Πρακτική σημείωση</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {siteCopy.whatIs.practiceNote}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
