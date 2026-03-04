# Ateleia.gr (Astro + shadcn-ui)

Static Astro website for the selected client direction.

## Current brand lock

The theme is intentionally frozen to the current locked choice:

- Palette: `Terracotta Calm`
- Font: `Nunito`

Production does not include runtime palette/font switching.

## Archive branch

All previous chooser/lab work is preserved on:

- `archive/theme-lab-choices`

Use that branch only if you intentionally want to revisit palette/font exploration.

## Stack

- Astro 5 static output
- React integration for shadcn components
- Tailwind CSS v4
- shadcn-ui
- pnpm

## Prerequisites

- Node.js 20+
- Corepack (recommended)

## Setup

```sh
corepack pnpm install
```

Copy `.env.example` to `.env` before expecting the public contact form to submit:

```sh
Copy-Item .env.example .env
```

Required variable:

- `PUBLIC_CONTACT_FORM_ENDPOINT`: the site-specific `form.taxi` endpoint for the public contact form. It must be configured in Form.taxi to deliver to the same inbox used by the `mailto:` contact item in `src/content/therapy-practice-website-content.ts`.
- The current configured endpoint is `https://form.taxi/s/tb10t33e`.
- GitHub Pages production builds inject the same endpoint from `.github/workflows/pages.yml`.

## Local development

```sh
corepack pnpm dev
```

For a clean rerun that clears Astro/Vite caches before starting dev:

```sh
corepack pnpm dev:clean
```

Manual cache cleanup only:

```sh
corepack pnpm clean:dev-cache
```

Cache targets: `.astro`, `node_modules/.astro`, `node_modules/.vite`.

## Verification (Required)

### Core app checks

```sh
corepack pnpm check
corepack pnpm build
corepack pnpm perf:budget
```

### Sidecar design checks (`.codex-pipeline`)

```sh
npm --prefix .codex-pipeline install
npm --prefix .codex-pipeline run setup:browsers
$env:BASE_URL="https://coding-tree-io.github.io/ateleia.gr/"
npm --prefix .codex-pipeline run verify:all
```

For local dev verification, point `BASE_URL` to your local URL (for example `http://localhost:4321/ateleia.gr/`).

## SVG normalization workflow (Noun Project assets)

```sh
corepack pnpm svg:noun:normalize
```

This command now runs a full pipeline for the tracked Noun SVG assets:

- Inkscape CLI plain-SVG export pass (when available)
- Attribution text stripping from embedded SVG source text
- SVGO optimization into `src/assets/noun/normalized/`
- `svger-cli` conversion validation pass (output is temporary and removed)

Notes:

- GraphicsMagick is probed and reported, but not required for successful normalization.
- Public attribution remains on `/credits` and `ATTRIBUTIONS.md`.

## Homepage structure

The production homepage is intentionally limited to:

- `Hero`
- `WhatIs`
- `WhoIsItFor`
- `About`
- `Services`
- `Contact`

## Islands architecture

The homepage is static-first. Only three interactive islands are hydrated:

- `MobileNavigationMenu.tsx` via `client:media="(max-width: 767px)"`
- `HeaderCtaVisibilityObserver.tsx` via `client:load`
- `ContactForm.tsx` via `client:visible`

Detailed conventions are documented in `ISLANDS_POLICY.md`.

## Performance budget

A Lighthouse-backed mobile budget is enforced locally and in CI:

- config: `performance-budget.json`
- command: `corepack pnpm perf:budget`
- script: `scripts/check-lighthouse-budget.mjs`

## GitHub Pages configuration

`astro.config.mjs` is configured for GitHub project pages deployment:

- `site: "https://coding-tree-io.github.io"`
- `base: "/ateleia.gr/"`
- `output: "static"`

Deployment workflow on `main` publishes the homepage artifact from `dist` to:

- `https://coding-tree-io.github.io/ateleia.gr/`

## SEO and indexing status

The project now has a centralized metadata layer in:

- `src/config/site-metadata.ts`

Current strategy:

- temporary `noindex, nofollow` until the final production domain is known
- canonical, Open Graph, Twitter metadata, and JSON-LD emitted from `PublicDocumentLayout.astro`
- `robots.txt` generated from `src/pages/robots.txt.ts`
- sitemap generation enabled via `@astrojs/sitemap`

Launch-day SEO switch:

1. update the canonical origin in `src/config/site-metadata.ts`
2. switch temporary noindex off in `src/config/site-metadata.ts`
3. confirm generated `robots.txt`, canonical tags, and sitemap URLs
4. redeploy

## Legal page

An initial English privacy-first legal page lives at:

- `/legal/`

It covers:

- contact-form data collected
- Form.taxi as the delivery processor
- retention and privacy rights
- cookies / analytics status
- basic copyright / credits notice

## Key files

- `src/config/site-branding.ts`: frozen Terracotta Calm + Nunito brand/typography configuration
- `src/config/site-metadata.ts`: canonical origin, robots mode, OG defaults, structured-data helpers
- `src/config/contact.ts`: shared contact email extraction and Form.taxi endpoint wiring
- `src/config/legal-content.ts`: English privacy/legal copy source
- `src/content/therapy-practice-website-content.ts`: Greek-first homepage copy and shared labels
- `src/content.config.ts`: Astro content-collection definitions
- `src/content/services.ts`: ordered services collection query helper
- `src/data/services/*.json`: one data entry per service card, ready for future CMS mapping
- `src/components/sections/SiteHeader.astro`: static header shell with mobile menu island boundary
- `src/components/sections/MobileNavigationMenu.tsx`: mobile-only shadcn Sheet island
- `src/components/sections/HeaderCtaVisibilityObserver.tsx`: CTA visibility island tied to hero/header state
- `src/components/sections/ContactSection.astro`: production contact section shell
- `src/components/sections/ContactForm.tsx`: visible-on-demand contact form island that posts to Form.taxi
- `src/pages/legal.astro`: initial English privacy/legal notice
- `src/pages/robots.txt.ts`: generated robots file
- `src/pages/index.astro`: production entry page
- `performance-budget.json`: mobile performance budget thresholds
- `scripts/check-lighthouse-budget.mjs`: budget enforcement script
- `.codex-pipeline/README.md`: sidecar verification details and visual baseline workflow
