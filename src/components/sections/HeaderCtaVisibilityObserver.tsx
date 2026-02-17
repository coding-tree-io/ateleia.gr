import { useEffect } from 'react';

const desktopMediaQuery = '(min-width: 768px)';
const heroSectionId = 'hero';
const heroInViewClassName = 'hero-in-view';
const headerCtaSelector = '[data-header-cta]';

function isHeroCurrentlyVisible(heroSectionElement: HTMLElement): boolean {
  const heroSectionBounds = heroSectionElement.getBoundingClientRect();
  return heroSectionBounds.bottom > 0 && heroSectionBounds.top < window.innerHeight;
}

function applyHeroVisibilityClass(isHeroVisible: boolean): void {
  document.documentElement.classList.toggle(heroInViewClassName, isHeroVisible);
}

function removeHeroVisibilityClass(): void {
  document.documentElement.classList.remove(heroInViewClassName);
}

function applyHeaderCtaAccessibilityState(
  headerCtaElement: HTMLAnchorElement | null,
  shouldHideHeaderCta: boolean,
): void {
  if (!headerCtaElement) {
    return;
  }

  if (shouldHideHeaderCta) {
    headerCtaElement.setAttribute('aria-hidden', 'true');
    headerCtaElement.setAttribute('tabindex', '-1');
    return;
  }

  headerCtaElement.removeAttribute('aria-hidden');
  headerCtaElement.removeAttribute('tabindex');
}

export function HeaderCtaVisibilityObserver() {
  useEffect(() => {
    const heroSectionElement = document.getElementById(heroSectionId);
    const headerCtaElement = document.querySelector<HTMLAnchorElement>(headerCtaSelector);

    if (!heroSectionElement) {
      removeHeroVisibilityClass();
      applyHeaderCtaAccessibilityState(headerCtaElement, false);
      return undefined;
    }

    const desktopViewportMediaQueryList = window.matchMedia(desktopMediaQuery);
    let latestHeroVisibilityState = isHeroCurrentlyVisible(heroSectionElement);

    const syncHeaderCtaVisibilityState = () => {
      const shouldHideHeaderCta = !desktopViewportMediaQueryList.matches || latestHeroVisibilityState;
      applyHeaderCtaAccessibilityState(headerCtaElement, shouldHideHeaderCta);

      if (!desktopViewportMediaQueryList.matches) {
        removeHeroVisibilityClass();
        return;
      }

      applyHeroVisibilityClass(latestHeroVisibilityState);
    };

    syncHeaderCtaVisibilityState();

    const heroVisibilityObserver = new IntersectionObserver(
      ([heroVisibilityEntry]) => {
        latestHeroVisibilityState = heroVisibilityEntry?.isIntersecting ?? false;
        syncHeaderCtaVisibilityState();
      },
      {
        threshold: 0.05,
      },
    );

    heroVisibilityObserver.observe(heroSectionElement);

    const handleViewportBreakpointChange = () => {
      latestHeroVisibilityState = isHeroCurrentlyVisible(heroSectionElement);
      syncHeaderCtaVisibilityState();
    };

    desktopViewportMediaQueryList.addEventListener('change', handleViewportBreakpointChange);

    return () => {
      heroVisibilityObserver.disconnect();
      desktopViewportMediaQueryList.removeEventListener('change', handleViewportBreakpointChange);
      removeHeroVisibilityClass();
      applyHeaderCtaAccessibilityState(headerCtaElement, true);
    };
  }, []);

  return null;
}
