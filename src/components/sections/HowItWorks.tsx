import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { BrushStroke1 } from '@/components/decorative/ArtShapes';

export function HowItWorks() {
  return (
    <section className="relative bg-secondary/50 px-5 py-16 md:px-8 md:py-24">
      <BrushStroke1 className="absolute left-0 top-12 w-full text-accent" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance md:text-4xl">
          {siteCopy.howItWorks.title}
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {siteCopy.howItWorks.steps.map((step) => (
            <div key={step.step} className="flex flex-col">
              <span className="font-serif text-5xl font-bold text-primary/20">
                {step.step}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
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
