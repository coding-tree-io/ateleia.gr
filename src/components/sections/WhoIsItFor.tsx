import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { AbstractFace, HandCircle } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { useReveal } from '@/hooks/use-reveal';

export function WhoIsItFor() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.15} className="absolute -right-16 -top-10 w-[360px] md:w-[430px]">
        <AbstractFace />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22} className="absolute left-[8%] top-[10%] hidden w-24 md:block">
        <HandCircle />
      </ParallaxLayer>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.whoIsItFor.title}
        </h2>

        <ul className="space-y-5 rounded-3xl border border-border/45 bg-card/72 p-7 backdrop-blur-sm md:p-9" role="list">
          {siteCopy.whoIsItFor.items.map((item, index) => (
            <li key={index} className="reveal-child flex items-start gap-4 text-base leading-relaxed text-muted-foreground">
              <span className="mt-2.5 flex size-2.5 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span className="md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
