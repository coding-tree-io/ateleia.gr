import * as React from 'react';

import { useParallax } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

type ParallaxLayerProps = {
  speed?: number;
  className?: string;
  children: React.ReactNode;
};

export function ParallaxLayer({ speed = 0.12, className, children }: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={cn('parallax-layer pointer-events-none', className)} aria-hidden="true">
      {children}
    </div>
  );
}
