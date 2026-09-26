# SEO Operations

Operational reference for live indexing, Search Console follow-up, and launch-state verification.

## Name and brand SEO: September 26, 2026

The homepage uses this metadata, including its Open Graph and Twitter equivalents:

- title: `Ατέλεια | Χρύσα Πλακιώτη — Εικαστική Ψυχοθεραπεία`
- description: `Εικαστική ψυχοθεραπεία με τη Χρύσα Πλακιώτη στην Ατέλεια (Ateleia Therapy). Ατομικές συνεδρίες στην Αθήνα και online, ομαδικές συνεδρίες στην Αθήνα.`

The visible page remains unchanged. Person JSON-LD retains `Χρυσούλα Πλακιώτη`
and its existing entity ID, with `Χρύσα Πλακιώτη` as `alternateName`. Organization,
LocalBusiness, and WebSite share the aliases `Ateleia`, `Ateleia Therapy`, and
`Ατέλεια Art Therapy`. Existing relationships and service-area information remain.
No verified professional profile URL has been established, so no `sameAs` link
has been added. A mention in an article is not an identity profile. No permanent
office, new credential, review, or Maps listing is implied by this change.

### Measurement procedure

Use [OpenSEO hosted MCP](https://openseo.so/docs/mcp) or its signed-in web app
outside the website. Reuse a project for `https://ateleiatherapy.gr/` and record
that visible site changes are out of scope. Keep reports private. Use existing
or free access; obtaining paid credits requires a separate spending decision.

Use Google organic results, Greek language, mobile device, and Athens where
supported (otherwise Greece). Record the actual location, date, device, language,
result depth, ranking URL, position, and competing identities. An absent result
means "not found within checked depth", not "not indexed". Keep relevant name
queries even when a provider reports zero volume.

Initial query set:

```text
Χρύσα Πλακιώτη
Χρυσούλα Πλακιώτη
Χρυσα Πλακιωτη
Χρυσουλα Πλακιωτη
Χρύσα Πλακιώτη ψυχοθεραπεία
Χρυσούλα Πλακιώτη ψυχοθεραπεία
ατέλεια
ateleia
ατέλεια therapy
ateleia therapy
ατέλεια ψυχοθεραπεία
ateleia ψυχοθεραπεία
```

For Search Console, use the latest available 90 days of Web search data and record
the exact date range and filters. Capture clicks, impressions, CTR, average
position, queries, and homepage URL inspection (index status, selected canonical,
last crawl). Missing or anonymized query data is unavailable, not zero. Search
Console averages and location-specific rank snapshots are different measurements.

Save baseline data in a private OpenSEO report or an ignored local
`.codex-artifacts/seo/` report, never in public site assets. Do not commit private
Search Console exports or credentials. Repeat checks four and eight weeks after
deployment using the same settings; no recurring automation is configured.

### Release checks

OpenSEO setup on September 26, 2026: project `Ατέλεια Therapy` is configured for
`ateleiatherapy.gr` with Greece/Greek defaults. All 12 queries are saved with
original case in an Athens-city, Greek, mobile-only tracker, manual schedule,
top-10 depth. Project context records the unchanged-page constraint. Ranking
checks require a paid plan on the current account, so positions are unavailable;
no purchase was made. Search Console connection remains pending. The private
local setup/baseline report is `.codex-artifacts/seo/baseline-2026-09-26.md`.

Local validation on September 26, 2026:

- `pnpm check`: 60 files, zero diagnostics; `pnpm build`: passed.
- `pnpm perf:budget`: passed (96/100 performance, LCP 2426 ms, TBT 0 ms).
- Homepage body is byte-identical to the pre-change build after normalizing
  generated JavaScript bundle filenames. Metadata changes alter bundle hashes
  because shared content is imported by existing islands.
- Exact, unique title/description/Open Graph/Twitter tags and valid JSON-LD
  aliases/stable entity IDs passed generated-HTML checks.
- Production canonical, robots, sitemap and utility-route noindex checks passed;
  the local development homepage emits `noindex, nofollow`.
- Native browser desktop/mobile inspection, mobile menu, FAQ expansion, console,
  and observed network checks passed. No contact message was submitted.
- The full sidecar verification suite reports homepage screenshot mismatches on
  desktop and mobile. Both also reproduce with the pre-change homepage HTML;
  stored screenshot baselines were not changed. This is an existing baseline
  discrepancy, not a visual regression introduced by this metadata change.
- Builds report the existing empty announcements collection warning.

After the existing GitHub Pages workflow deploys the change, verify the live title,
description, JSON-LD, canonical, robots directives, and sitemap. Inspect the
homepage in Search Console and request recrawling where account access permits.
Record the actual deployment date to anchor the four/eight-week reviews. Do not
claim a local build is deployed or guarantee rankings from metadata changes.

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
