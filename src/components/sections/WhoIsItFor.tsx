import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { AbstractFace } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

export function WhoIsItFor() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <AbstractFace className="absolute -right-16 -top-10 w-[380px] text-accent animate-gentle-float md:w-[440px]" />

      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.whoIsItFor.title}
        </h2>

        <ul className="mt-10 space-y-5" role="list">
          {siteCopy.whoIsItFor.items.map((item, i) => (
            <li
              key={i}
              className="reveal-child flex items-start gap-4 text-base leading-relaxed text-muted-foreground"
            >
              <span className="mt-2.5 flex size-2.5 shrink-0 rounded-full bg-primary/50" aria-hidden="true" />
              <span className="md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
