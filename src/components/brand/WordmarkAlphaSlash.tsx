import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaSlash({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.3rem]' : 'text-2xl',
        className
      )}
    >
      <span className="text-primary/85">α</span>
      <span aria-hidden="true" className="animate-alpha-sheen px-[0.07em] text-muted-foreground/75">
        /
      </span>
      <span>τέλεια</span>
    </span>
  );
}
