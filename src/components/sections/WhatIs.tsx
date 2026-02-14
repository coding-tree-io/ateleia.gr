import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { OrganicDivider } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

export function WhatIs() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.whatIs.title}
        </h2>

        <OrganicDivider className="my-8 h-4 w-48 text-primary" />

        <div className="space-y-6">
          {siteCopy.whatIs.paragraphs.map((p, i) => (
            <p key={i} className="reveal-child text-base leading-[1.8] text-muted-foreground md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
