import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaRing({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.25rem]' : 'text-2xl',
        className
      )}
    >
      <span className="relative mr-1.5 inline-flex items-center justify-center">
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full border border-primary/45 font-sans font-semibold text-primary/85',
            compact ? 'size-5 text-[0.7rem]' : 'size-6 text-[0.78rem]'
          )}
        >
          α
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute rounded-full border border-primary/25 animate-alpha-orbit',
            compact ? '-inset-[3px]' : '-inset-1'
          )}
        />
      </span>
      <span>τέλεια</span>
    </span>
  );
}
