import { useEffect, useRef } from 'react';

export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia('(max-width: 767px)');

    const shouldDisable = () => reducedMotionMedia.matches || mobileMedia.matches;

    let frame = 0;

    const update = () => {
      frame = 0;

      if (shouldDisable()) {
        element.style.setProperty('--parallax-offset', '0px');
        return;
      }

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
    reducedMotionMedia.addEventListener('change', requestUpdate);
    mobileMedia.addEventListener('change', requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotionMedia.removeEventListener('change', requestUpdate);
      mobileMedia.removeEventListener('change', requestUpdate);
      element.style.removeProperty('--parallax-offset');
    };
  }, [speed]);

  return ref;
}
