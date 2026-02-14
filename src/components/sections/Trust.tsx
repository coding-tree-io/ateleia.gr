import * as React from 'react';
import { ShieldCheck } from 'lucide-react';

import { siteCopy } from '@/content/site-copy';

export function Trust() {
  return (
    <section className="px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border/40 bg-card p-8 text-center md:flex-row md:text-left">
        <ShieldCheck className="size-10 shrink-0 text-accent" aria-hidden="true" />
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-foreground">
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
