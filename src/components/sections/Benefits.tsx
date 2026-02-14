import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { DotCluster } from '@/components/decorative/ArtShapes';

export function Benefits() {
  return (
    <section className="relative bg-secondary/50 px-5 py-16 md:px-8 md:py-24">
      <DotCluster className="absolute right-8 top-8 w-24 text-primary" />

      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.benefits.title}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {siteCopy.benefits.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/50 bg-card p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
