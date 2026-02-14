import { useEffect, useRef } from 'react';

/**
 * Adds the `.is-visible` class when the element enters the viewport.
 * Pairs with the `.reveal` CSS class.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
