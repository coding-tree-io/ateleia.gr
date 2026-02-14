import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { FreehandCircle } from '@/components/decorative/ArtShapes';

export function WhoIsItFor() {
  return (
    <section className="relative px-5 py-16 md:px-8 md:py-24">
      <FreehandCircle className="absolute -right-10 bottom-0 w-36 text-accent" />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.whoIsItFor.title}
        </h2>

        <ul className="mt-8 space-y-4" role="list">
          {siteCopy.whoIsItFor.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-primary/60"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
