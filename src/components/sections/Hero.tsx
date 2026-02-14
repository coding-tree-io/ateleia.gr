import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { OrganicBlob1, OrganicBlob2, BrushStroke1, FreehandCircle } from '@/components/decorative/ArtShapes';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24"
    >
      {/* Decorative background shapes */}
      <OrganicBlob1 className="absolute -left-32 -top-20 w-[500px] text-primary" />
      <OrganicBlob2 className="absolute -right-24 bottom-0 w-[400px] text-accent" />
      <FreehandCircle className="absolute left-1/2 top-10 w-48 -translate-x-1/2 text-primary" />
      <BrushStroke1 className="absolute bottom-8 left-0 w-full text-muted-foreground" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
          {siteCopy.hero.headline}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {siteCopy.hero.subheadline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <a href="#contact">{siteCopy.hero.primaryCta}</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-7">
            <a href="#contact">{siteCopy.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
