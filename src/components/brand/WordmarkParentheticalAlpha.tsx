import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkParentheticalAlpha({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.35rem]' : 'text-2xl',
        className
      )}
    >
      <span className="text-muted-foreground/75">(</span>
      <span className="text-primary/80">α</span>
      <span className="text-muted-foreground/75">)</span>
      <span>τέλεια</span>
    </span>
  );
}
