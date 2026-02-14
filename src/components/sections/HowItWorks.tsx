import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { ExpressiveStrokes } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

export function HowItWorks() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, var(--background) 100%)' }}>
      <ExpressiveStrokes className="absolute inset-0 h-full w-full text-accent" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.howItWorks.title}
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-12">
          {siteCopy.howItWorks.steps.map((step, i) => (
            <div key={step.step} className="reveal-child group relative flex flex-col">
              {/* Connector line between steps (desktop) */}
              {i < siteCopy.howItWorks.steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-12 translate-x-full bg-border/60 md:block" aria-hidden="true" />
              )}
              <span className="font-serif text-6xl font-bold text-primary/15 transition-colors duration-500 group-hover:text-primary/30 md:text-7xl">
                {step.step}
              </span>
              <h3 className="mt-1 font-serif text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
