import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { BotanicalCluster, OrganicDivider } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <BotanicalCluster className="absolute -left-28 -top-10 w-[420px] text-accent animate-gentle-drift md:w-[520px]" />

      <div className="relative mx-auto max-w-3xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.about.title}
        </h2>

        <OrganicDivider className="my-8 h-4 w-40 text-primary" />

        {/* Professional bio */}
        <div className="space-y-5">
          {siteCopy.about.bio.map((p, i) => (
            <p key={i} className="reveal-child text-base leading-[1.8] text-muted-foreground md:text-lg">
              {p}
            </p>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {siteCopy.about.values.title}
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteCopy.about.values.items.map((v) => (
              <div
                key={v.title}
                className="reveal-child group rounded-2xl border border-border/30 bg-secondary/40 p-6 transition-all duration-500 hover:-translate-y-0.5 hover:bg-secondary/70 hover:shadow-md"
              >
                <h4 className="font-sans text-sm font-bold text-foreground">
                  {v.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {siteCopy.about.approach.title}
          </h3>
          <p className="mt-5 text-base leading-[1.8] text-muted-foreground md:text-lg">
            {siteCopy.about.approach.description}
          </p>
        </div>
      </div>
    </section>
  );
}
