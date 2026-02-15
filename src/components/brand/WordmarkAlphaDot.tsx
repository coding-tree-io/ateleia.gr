import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaDot({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.3rem]' : 'text-2xl',
        className
      )}
    >
      <span className="text-primary/90">α</span>
      <span aria-hidden="true" className="animate-alpha-dot mx-[0.04em] text-primary/70">
        .
      </span>
      <span>τέλεια</span>
    </span>
  );
}
