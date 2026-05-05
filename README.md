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

Copy `.env.example` to `.env` before expecting the public contact form to submit or the local CMS config to use project-specific overrides:

```sh
Copy-Item .env.example .env
```

Required variable:

- `PUBLIC_CONTACT_FORM_ENDPOINT`: the site-specific `form.taxi` endpoint for the public contact form. It must be configured in Form.taxi to deliver to the same inbox used by the `mailto:` contact item in `src/content/therapy-practice-website-content.ts`.
- The current configured endpoint is `https://form.taxi/s/tb10t33e`.
- GitHub Pages production builds inject the same endpoint from `.github/workflows/pages.yml`.

Optional Decap/DecapBridge overrides are also documented in `.env.example`.

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

CMS local development on an isolated port:

```sh
corepack pnpm cms:dev
```

This starts the Astro dev server on `http://localhost:4322/` and the local Decap proxy on `http://127.0.0.1:8082/api/v1`, so the admin works without live login at `http://localhost:4322/admin/`.
The generated admin config uses `backend: proxy` on localhost, so local editing works without DecapBridge. Production builds emit the DecapBridge `git-gateway` config instead.

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
$env:BASE_URL="https://ateleiatherapy.gr/"
npm --prefix .codex-pipeline run verify:all
```

For local dev verification, point `BASE_URL` to your local URL (for example `http://localhost:4321/`).

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
- `Announcements`
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

`astro.config.mjs` is configured for GitHub Pages deployment on the custom domain:

- `site: "https://ateleiatherapy.gr"`
- `base: "/"`
- `output: "static"`

Deployment workflow on `main` publishes the homepage artifact from `dist`. The canonical production URL is:

- `https://ateleiatherapy.gr/`

The CMS admin is served from the same deployment:

- `https://ateleiatherapy.gr/admin/`

### GitHub Actions caching

The Pages workflow intentionally caches generated tooling state, not committed build output:

- pnpm package store: handled by `actions/setup-node` with `cache: pnpm`
- Lighthouse npm CLI downloads: cached under `~/.npm` with keys tied to the package manifests and performance-budget script/config
- Astro/Vite generated state: cached for `.astro`, `node_modules/.astro`, and `node_modules/.vite`

The workflow does not cache `node_modules`, `dist`, Playwright browsers, Storybook output, or `.codex-pipeline` artifacts. `dist` is always rebuilt fresh and uploaded as the GitHub Pages artifact.

## Decap CMS

This repo includes a static Decap CMS admin configured as a section-led editor for the site copy plus the services and announcements sections.

- admin entry: `src/pages/admin/index.astro`
- generated config: `src/pages/admin/config.yml.ts`
- editable content: `src/data/site-global.json`, `src/data/hero.json`, `src/data/what-is.json`, `src/data/who-is-it-for.json`, `src/data/about.json`, `src/data/contact.json`, `src/data/services.json`, `src/data/announcements.json`
- content schema/query helpers: `src/content.config.ts`, `src/content/therapy-practice-website-content.ts`, `src/content/services.ts`, `src/content/announcements.ts`
- local unauthenticated mode: `corepack pnpm cms:dev`

Local development and production intentionally use different backends:

- localhost: `backend: proxy` via `decap-server`, with no DecapBridge dependency
- deployed GitHub Pages: DecapBridge PKCE via `git-gateway`, for Google login

Decap editor labels remain Greek only where the client edits site content. The surrounding code, docs, and configuration stay in English.
The CMS sidebar is grouped into client-facing editing areas:

- `Σταθερά στοιχεία site`: brand, SEO, navigation, and footer text
- `Ροή αρχικής σελίδας`: hero, `Τι είναι`, `Σε ποιους απευθύνεται`, and `Σχετικά`
- `Υπηρεσίες & ανακοινώσεις`: service cards, FAQ, and homepage update cards
- `Επικοινωνία & φόρμα`: contact details plus all visible form copy

- correct production login URL: `https://ateleiatherapy.gr/admin/index.html`
- `site_url` in the generated CMS config should resolve to the custom root domain in production

Optional build-time overrides:

- `DECAPBRIDGE_BASE_URL`
- `DECAPBRIDGE_AUTH_ENDPOINT`
- `DECAPBRIDGE_AUTH_TOKEN_ENDPOINT`
- `DECAPBRIDGE_GATEWAY_URL`
- `DECAP_LOGO_URL`
- `DECAP_REPOSITORY`, `DECAP_BRANCH`, `DECAP_SITE_URL`

Committed defaults target the current DecapBridge site:

- `base_url: https://auth.decapbridge.com`
- `auth_endpoint: /sites/1731d52f-3a01-4de9-8c6f-98598c438922/pkce`
- `auth_token_endpoint: /sites/1731d52f-3a01-4de9-8c6f-98598c438922/token`
- `gateway_url: https://gateway.decapbridge.com`

Remaining DecapBridge dashboard checks:

- confirm Google is the only enabled sign-in provider
- confirm the DecapBridge site login URL is exactly `https://ateleiatherapy.gr/admin/index.html`

## SEO and indexing status

The project now has a centralized metadata layer in:

- `src/config/site-metadata.ts`

Current strategy:

- production `index, follow` on the custom domain
- canonical, Open Graph, Twitter metadata, and JSON-LD emitted from `PublicDocumentLayout.astro`
- `robots.txt` generated from `src/pages/robots.txt.ts`
- sitemap generation enabled via `@astrojs/sitemap`
- production social preview image is now the B3 terracotta asset at `public/images/social/og-b3-terracotta.png`, wired through `src/config/site-metadata.ts`
- full favicon/app icon set is now wired globally from the selected Base B asset (`favicon.svg`, `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`, `browserconfig.xml`)

Launch-day SEO checks:

1. confirm generated `robots.txt`, canonical tags, and sitemap URLs use `https://ateleiatherapy.gr/`
2. confirm GitHub Pages HTTPS is enforced after certificate provisioning
3. redeploy after any domain or DNS changes

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
- `public/images/social/og-b3-terracotta.png`: current Open Graph/Twitter fallback social preview asset
- `public/site.webmanifest`: PWA/app icon metadata
- `src/config/contact.ts`: shared contact email extraction and Form.taxi endpoint wiring
- `src/config/legal-content.ts`: English privacy/legal copy source
- `src/content/therapy-practice-website-content.ts`: typed adapter that composes the split CMS documents for the homepage sections and metadata
- `src/content/site-content-schema.ts`: shared Zod schemas for the editable CMS documents
- `src/content.config.ts`: Astro content-collection definitions
- `src/content/announcements.ts`: ordered announcements collection query helper
- `src/content/services.ts`: ordered services collection query helper
- `src/data/site-global.json`: editable site-wide brand, navigation, footer, and SEO content
- `src/data/hero.json`: editable hero content
- `src/data/what-is.json`: editable what-is section content
- `src/data/who-is-it-for.json`: editable audience phrases
- `src/data/about.json`: editable about section content
- `src/data/contact.json`: editable contact section content
- `src/data/announcements.json`: editable announcements document used by the homepage notices section
- `src/data/services.json`: editable services document used by the services cards
- `src/components/sections/SiteHeader.astro`: static header shell with mobile menu island boundary
- `src/components/sections/MobileNavigationMenu.tsx`: mobile-only shadcn Sheet island
- `src/components/sections/HeaderCtaVisibilityObserver.tsx`: CTA visibility island tied to hero/header state
- `src/components/sections/ContactSection.astro`: production contact section shell
- `src/components/sections/ContactForm.tsx`: visible-on-demand contact form island that posts to Form.taxi
- `src/pages/admin/index.astro`: Decap admin entrypoint with Greek locale wiring and simplified section previews
- `src/pages/admin/config.yml.ts`: generated Decap config with local backend and DecapBridge settings
- `src/pages/legal.astro`: initial English privacy/legal notice
- `src/pages/robots.txt.ts`: generated robots file
- `src/pages/index.astro`: production entry page
- `scripts/start-cms-dev.mjs`: isolated local CMS/dev runner on port `4322`
- `scripts/start-decap-proxy.mjs`: local Decap proxy runner on port `8082`
- `performance-budget.json`: mobile performance budget thresholds
- `scripts/check-lighthouse-budget.mjs`: budget enforcement script
- `.codex-pipeline/README.md`: sidecar verification details and visual baseline workflow
