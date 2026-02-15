import * as React from 'react';

import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  compact?: boolean;
};

export function WordmarkAlphaThread({ className, compact = false }: WordmarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-baseline pb-1 font-serif font-bold tracking-tight text-foreground',
        compact ? 'text-[1.3rem]' : 'text-2xl',
        className
      )}
    >
      <span className="text-muted-foreground/75">(</span>
      <span className="text-primary/85">α</span>
      <span className="text-muted-foreground/75">)</span>
      <span>τέλεια</span>
      <span
        aria-hidden="true"
        className="animate-alpha-underline pointer-events-none absolute bottom-0 left-[0.15em] h-[2px] w-[95%] origin-left rounded-full bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0"
      />
    </span>
  );
}
