import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaEcho({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.3rem]' : 'text-2xl',
        className
      )}
    >
      <span aria-hidden="true" className="animate-alpha-echo pointer-events-none absolute left-[0.08em] top-[0.08em] text-primary/22">
        ατέλεια
      </span>
      <span className="relative z-10">
        <span className="text-primary/88">α</span>
        <span>τέλεια</span>
      </span>
    </span>
  );
}
