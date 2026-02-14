import { useEffect, useRef } from 'react';

export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const relativeCenter = rect.top + rect.height / 2 - viewportHeight / 2;
      const offset = (-relativeCenter / viewportHeight) * speed * 90;
      element.style.setProperty('--parallax-offset', `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      element.style.removeProperty('--parallax-offset');
    };
  }, [speed]);

  return ref;
}
