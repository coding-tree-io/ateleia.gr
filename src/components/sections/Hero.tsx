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
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';

export function Hero() {
  const logoSrc = `${import.meta.env.BASE_URL}images/client-review/logo.png`;

  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ConcentricRings className="animate-slow-spin w-[580px] opacity-30 md:w-[840px]" />
      </div>

      <ParallaxLayer speed={0.08} className="absolute -left-28 -top-14 w-[520px] md:w-[700px]">
        <BotanicalCluster />
      </ParallaxLayer>
      <ParallaxLayer speed={0.2} className="absolute -right-10 bottom-[-18%] w-[520px] md:w-[760px]">
        <DancingFigures />
      </ParallaxLayer>
      <ParallaxLayer speed={0.28} className="absolute left-[56%] top-[14%] hidden w-[260px] md:block">
        <PaintSplashes />
      </ParallaxLayer>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="self-end">
          <span className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            <img src={logoSrc} alt="Σήμα Ατέλεια" className="size-5 rounded-md border border-border/45 bg-card object-cover" />
            {siteCopy.hero.kicker}
          </span>

          <h1 className="animate-fade-up stagger-1 font-serif text-5xl font-bold leading-[1.06] tracking-tight text-foreground text-balance sm:text-6xl md:text-7xl">
            {siteCopy.hero.headline}
          </h1>

          <p className="animate-fade-up stagger-2 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {siteCopy.hero.subheadline}
          </p>

          <div className="animate-fade-up stagger-3 mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            >
              <a href="#contact">{siteCopy.hero.primaryCta}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-border/60 bg-card/70 px-8 py-6 text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-md"
            >
              <a href="#contact">{siteCopy.hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <aside className="relative mt-4 lg:mt-0">
          <div className="paper-panel animate-card-glow rounded-[2rem] border border-border/45 p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--tone-teal)]">Therapeutic Atelier</p>
            <blockquote className="mt-4 font-serif text-3xl font-semibold leading-tight text-[var(--tone-ink)] md:text-[2.2rem]">
              «{siteCopy.whatIs.pullQuote.text}»
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{siteCopy.whatIs.practiceNote}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
              {siteCopy.whatIs.pullQuote.attribution}
            </p>
          </div>

          <ParallaxLayer speed={0.3} className="absolute -bottom-10 -left-10 hidden w-24 md:block">
            <HandCircle />
          </ParallaxLayer>
        </aside>
      </div>
    </section>
  );
}
