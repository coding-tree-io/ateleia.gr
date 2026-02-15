import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaEmphasis({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.3rem]' : 'text-2xl',
        className
      )}
    >
      <span className="animate-alpha-pulse text-primary">α</span>
      <span>τέλεια</span>
    </span>
  );
}
