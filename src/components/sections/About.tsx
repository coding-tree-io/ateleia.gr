import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { OrganicBlob2, ScribbleLine } from '@/components/decorative/ArtShapes';

export function About() {
  return (
    <section id="about" className="relative px-5 py-16 md:px-8 md:py-24">
      <OrganicBlob2 className="absolute -left-20 top-0 w-80 text-accent" />

      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.about.title}
        </h2>

        <ScribbleLine className="my-6 w-32 text-primary" />

        {/* Professional bio */}
        <div className="space-y-4">
          {siteCopy.about.bio.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        {/* Values */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {siteCopy.about.values.title}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {siteCopy.about.values.items.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border/40 bg-secondary/30 p-5"
              >
                <h4 className="font-sans text-sm font-semibold text-foreground">
                  {v.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {siteCopy.about.approach.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {siteCopy.about.approach.description}
          </p>
        </div>
      </div>
    </section>
  );
}
