import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { ScribbleLine } from '@/components/decorative/ArtShapes';

export function WhatIs() {
  return (
    <section className="relative px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.whatIs.title}
        </h2>

        <ScribbleLine className="my-6 w-40 text-primary" />

        <div className="space-y-5">
          {siteCopy.whatIs.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
