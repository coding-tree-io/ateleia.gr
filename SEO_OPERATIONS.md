# SEO Operations

Operational reference for live indexing, Search Console follow-up, and launch-state verification.

## Current production SEO baseline

These facts should remain true for the live custom-domain deployment:

- canonical production origin is `https://ateleiatherapy.gr`
- intended indexed URLs are:
  - `https://ateleiatherapy.gr/`
  - `https://ateleiatherapy.gr/legal/`
- utility/reference routes remain intentionally non-indexed:
  - `/admin/`
  - `/favicon-lab/`
  - `/social-preview-variants/`
  - `/credits/`

Implementation sources of truth:

- [`src/config/site-metadata.ts`](C:/Users/SVall/WebstormProjects/ateleia.gr/src/config/site-metadata.ts)
- [`src/pages/robots.txt.ts`](C:/Users/SVall/WebstormProjects/ateleia.gr/src/pages/robots.txt.ts)
- [`src/layouts/PublicDocumentLayout.astro`](C:/Users/SVall/WebstormProjects/ateleia.gr/src/layouts/PublicDocumentLayout.astro)
- [`astro.config.mjs`](C:/Users/SVall/WebstormProjects/ateleia.gr/astro.config.mjs)

## Launch gate

Indexable directives are enabled only when both conditions are true:

- `SITE` resolves to `https://ateleiatherapy.gr`
- `PUBLIC_SEO_LAUNCH_READY=true` or production launch mode otherwise evaluates true

Non-launch or mismatched-domain builds must stay in temporary noindex mode.

## Required live checks

Run these checks whenever SEO behavior, routing, metadata, or deployment config changes:

1. confirm `https://ateleiatherapy.gr/robots.txt` serves `Allow: /`
2. confirm `https://ateleiatherapy.gr/` emits canonical `https://ateleiatherapy.gr/`
3. confirm `https://ateleiatherapy.gr/` emits `meta robots="index, follow"`
4. confirm `https://ateleiatherapy.gr/legal/` emits `meta robots="index, follow"`
5. confirm `https://ateleiatherapy.gr/sitemap-index.xml` and `sitemap-0.xml` only list intended public URLs

## Search Console coverage review

### Reviewed on May 14, 2026

Live production verification matched the expected baseline:

- `robots.txt` allowed crawling
- homepage canonical pointed to `https://ateleiatherapy.gr/`
- homepage and `/legal/` emitted `index, follow`
- sitemap listed only `/` and `/legal/`

One drilldown issue was confirmed exactly:

- issue: `Page with redirect`
- affected URL: `http://ateleiatherapy.gr/`
- last crawled: `2026-05-08`

Interpretation:

- this is the expected HTTP to HTTPS normalization path
- it is not a production SEO bug
- do not try to make `http://ateleiatherapy.gr/` indexable
- keep all controlled references on `https://ateleiatherapy.gr/`

### Triage rules for future coverage exports

For each Search Console issue URL, classify it as:

- intended public page
- intentional utility/reference page
- stale or alternate URL variant

Decision rules:

- intended public page:
  - verify live canonical, robots, sitemap presence, and internal linking
  - only change code if one of those signals is actually wrong
- intentional utility/reference page:
  - keep explicit `noindex`
  - do not broaden indexability just to clear Search Console noise
- stale or alternate URL variant:
  - normalize controlled references
  - prefer revalidation over behavior changes

## Additional drilldowns reviewed on May 14, 2026

The remaining two coverage drilldowns were resolved to exact URLs:

- `Discovered - currently not indexed` -> `https://ateleiatherapy.gr/legal/`
- `Excluded by 'noindex' tag` -> `https://ateleiatherapy.gr/credits/`

Interpretation:

- `/legal/` is meant to rank and already serves the correct live signals:
  - `index, follow`
  - self-canonical `https://ateleiatherapy.gr/legal/`
  - sitemap inclusion
- `/credits/` is intentionally non-indexed, so the `noindex` is correct
- `/credits/` previously emitted a homepage canonical while also being `noindex, follow`; this was cleaned up by setting the page canonical to `/credits/`

Remaining action:

1. request indexing or validate fix for `https://ateleiatherapy.gr/legal/` in Search Console
2. keep `/credits/` non-indexed and treat future reports about its `noindex` as expected unless product intent changes
