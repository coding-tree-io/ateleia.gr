import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { Button } from '@/components/ui/button';
import {
  BotanicalCluster,
  ConcentricRings,
  DancingFigures,
  HandCircle,
  PaintSplashes,
} from '@/components/decorative/ArtShapes';
import { NounAbstractArt } from '@/components/decorative/NounAbstractArt';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function Hero() {
  const logoSrc = `${import.meta.env.BASE_URL}images/client-review/logo.png`;

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:px-10 md:pb-28 md:pt-28 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ConcentricRings className="w-[360px] opacity-20 md:w-[840px] md:animate-slow-spin md:opacity-30" />
      </div>

      <ParallaxLayer
        speed={0.08}
        className="absolute -left-20 -top-8 w-[260px] opacity-55 md:-left-28 md:-top-14 md:w-[700px] md:opacity-100"
      >
        <BotanicalCluster />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.12}
        className="pointer-events-none absolute right-1 top-8 w-[128px] opacity-55 md:right-14 md:top-12 md:w-[320px] md:opacity-85"
      >
        <NounAbstractArt variant="whisper" className="md:animate-gentle-drift" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.2}
        className="absolute -right-16 bottom-[-20%] w-[300px] opacity-55 md:-right-10 md:bottom-[-18%] md:w-[760px] md:opacity-100"
      >
        <DancingFigures />
      </ParallaxLayer>
      <ParallaxLayer
        speed={0.28}
        className="absolute left-[62%] top-[10%] w-[86px] opacity-50 md:left-[56%] md:top-[14%] md:w-[260px] md:opacity-100"
      >
        <PaintSplashes />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="self-end">
          <span className="animate-fade-up mb-5 inline-flex items-center rounded-full border border-border/50 bg-card/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            <img
              src={logoSrc}
              alt="Σήμα Ατέλεια"
              className="h-5 w-9 rounded-sm border border-border/45 bg-card object-contain px-0.5"
            />
          </span>

          <h1 className="animate-fade-up stagger-1 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl md:text-7xl">
            {siteCopy.hero.headline}
          </h1>

          <p className="animate-fade-up stagger-2 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteCopy.hero.subheadline}
          </p>

          <div className="animate-fade-up stagger-3 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 sm:w-auto"
            >
              <a href="#contact">{siteCopy.hero.primaryCta}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-full border-border/60 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-md sm:w-auto"
            >
              <a href="#contact">{siteCopy.hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <aside className="relative mt-3 lg:mt-0">
          <div className="paper-panel rounded-[1.75rem] border border-border/45 p-6 md:animate-card-glow md:rounded-[2rem] md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--tone-teal)]">Therapeutic Atelier</p>
            <blockquote className="mt-4 font-serif text-[1.85rem] font-semibold leading-tight text-[var(--tone-ink)] md:text-[2.2rem]">
              «{siteCopy.whatIs.pullQuote.text}»
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{siteCopy.whatIs.practiceNote}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
              {siteCopy.whatIs.pullQuote.attribution}
            </p>
          </div>

          <ParallaxLayer
            speed={0.3}
            className="absolute -bottom-7 -left-7 w-16 opacity-60 md:-bottom-10 md:-left-10 md:w-24 md:opacity-100"
          >
            <HandCircle />
          </ParallaxLayer>
        </aside>
      </div>
    </section>
  );
}
