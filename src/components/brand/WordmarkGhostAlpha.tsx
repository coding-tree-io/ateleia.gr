import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkGhostAlpha({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.35rem]' : 'text-2xl',
        className
      )}
    >
      <span className="relative inline-flex pl-[0.58em]">
        <span aria-hidden="true" className="absolute left-0 top-[0.03em] font-semibold text-primary/65">
          α
        </span>
        <span>τέλεια</span>
      </span>
    </span>
  );
}
