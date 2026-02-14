import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import { BotanicalCluster, DancingFigures, ConcentricRings, HandCircle } from '@/components/decorative/ArtShapes';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-24 pt-20 md:px-10 md:pb-36 md:pt-32 lg:pb-44 lg:pt-40"
    >
      {/* Rich art backgrounds */}
      <BotanicalCluster className="absolute -left-20 -top-10 w-[520px] text-primary animate-gentle-float md:w-[640px]" />
      <DancingFigures className="absolute -right-16 bottom-0 w-[500px] text-accent animate-gentle-drift md:w-[700px]" />
      <ConcentricRings className="absolute left-1/2 top-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 text-primary animate-slow-spin md:w-[800px]" />
      <HandCircle className="absolute right-12 top-16 w-28 text-primary animate-gentle-float md:w-36" />
      <HandCircle className="absolute bottom-20 left-16 w-20 text-accent animate-gentle-drift md:w-24" />

      {/* Content */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="animate-fade-up mb-6 inline-block rounded-full border border-border/60 bg-card/80 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
          {siteCopy.brandSubtitle}
        </span>

        <h1 className="animate-fade-up stagger-1 font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground text-balance sm:text-6xl md:text-7xl">
          {siteCopy.hero.headline}
        </h1>

        <p className="animate-fade-up stagger-2 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {siteCopy.hero.subheadline}
        </p>

        <div className="animate-fade-up stagger-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/20">
            <a href="#contact">{siteCopy.hero.primaryCta}</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-border/60 bg-card/60 px-8 py-6 text-base backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-md">
            <a href="#contact">{siteCopy.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
