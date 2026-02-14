import * as React from 'react';

import { siteCopy } from '@/content/site-copy';
import { PaintSplashes } from '@/components/decorative/ArtShapes';
import { useReveal } from '@/hooks/use-reveal';

const icons = [
  /* Palette */ 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zM6.5 13c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10 8 10.67 8 11.5 7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm3 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  /* Eye */ 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  /* Heart */ 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  /* Star */ 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
];

export function Benefits() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal relative overflow-hidden px-6 py-20 md:px-10 md:py-28" style={{ background: 'linear-gradient(180deg, var(--secondary) 0%, var(--background) 100%)' }}>
      <PaintSplashes className="absolute -right-16 top-0 w-[500px] text-primary animate-gentle-drift" />

      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl lg:text-5xl">
          {siteCopy.benefits.title}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {siteCopy.benefits.items.map((item, i) => (
            <div
              key={item.title}
              className="reveal-child group rounded-2xl border border-border/30 bg-card/80 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary/80 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <svg className="size-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={icons[i]} />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
