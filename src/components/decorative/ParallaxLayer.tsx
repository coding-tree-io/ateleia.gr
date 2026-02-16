import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ParallaxLayerProps = {
  speed?: number;
  renderOnMobile?: boolean;
  renderOnDesktop?: boolean;
  className?: string;
  children: ReactNode;
};

function resolveParallaxLayerVisibilityClassName(
  shouldRenderOnMobile: boolean,
  shouldRenderOnDesktop: boolean
): string {
  if (!shouldRenderOnMobile && !shouldRenderOnDesktop) {
    return 'hidden';
  }

  if (!shouldRenderOnMobile) {
    return 'hidden md:block';
  }

  if (!shouldRenderOnDesktop) {
    return 'block md:hidden';
  }

  return '';
}

export function ParallaxLayer({
  speed: _speed = 0.12,
  renderOnMobile = true,
  renderOnDesktop = true,
  className,
  children,
}: ParallaxLayerProps) {
  const parallaxLayerVisibilityClassName = resolveParallaxLayerVisibilityClassName(
    renderOnMobile,
    renderOnDesktop
  );

  return (
    <div
      className={cn('pointer-events-none', parallaxLayerVisibilityClassName, className)}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
