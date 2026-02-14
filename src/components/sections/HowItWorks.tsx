import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { ExpressiveStrokes } from '@/components/decorative/ArtShapes';
import { ParallaxLayer } from '@/components/decorative/ParallaxLayer';
import { useReveal } from '@/hooks/use-reveal';

export function HowItWorks() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <ParallaxLayer speed={0.14} className="absolute inset-x-0 top-4 h-[320px] w-full opacity-80 md:h-[380px]">
        <ExpressiveStrokes className="h-full w-full" />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.howItWorks.title}
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {siteCopy.howItWorks.steps.map((step, index) => (
            <article key={step.step} className="reveal-child group relative flex flex-col rounded-3xl border border-border/45 bg-card/72 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg">
              {index < siteCopy.howItWorks.steps.length - 1 && (
                <div className="absolute -right-8 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border/60 md:block" aria-hidden="true" />
              )}

              <span className="font-serif text-6xl font-bold text-accent/35 transition-colors duration-500 group-hover:text-accent/55 md:text-7xl">
                {step.step}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
