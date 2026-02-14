import * as React from 'react';
import { ShieldCheck } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';
import { useReveal } from '@/hooks/use-reveal';

export function Trust() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-border/30 bg-card/80 p-8 text-center backdrop-blur-sm md:flex-row md:p-10 md:text-left">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <ShieldCheck className="size-7" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium leading-relaxed text-foreground">
            {siteCopy.trust.credentials}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {siteCopy.trust.ethics}
          </p>
        </div>
      </div>
    </section>
  );
}
