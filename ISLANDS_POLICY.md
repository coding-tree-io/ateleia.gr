# Islands Policy

This project follows Astro islands architecture with a static-first baseline.

## Rules

- Default every component to static rendering.
- Hydrate only the smallest interactive unit.
- Prefer `client:media` for mobile-only UI controls.
- Prefer `client:visible` for below-the-fold interactivity.
- Avoid `client:load` unless interaction is immediately required on initial paint.
- Keep decorative visuals non-interactive and CSS-only.
- Keep third-party scripts deferred and visibility-gated when possible.

## Current boundaries

- `SiteHeader.astro`: static logo + desktop nav + desktop CTA.
- `MobileNavigationMenu.tsx`: mobile-only island (`client:media`).
- `ResourcesSection.astro`: static card list and copy.
- `ResourcesFilters.tsx`: filters/search island (`client:visible`).

## Performance target

- Mobile first-party script transfer: `<= 120 KB`.
- Lighthouse budget is enforced via `pnpm run perf:budget`.
