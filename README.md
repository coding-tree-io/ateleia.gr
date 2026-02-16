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

## Islands architecture

The homepage is static-first. Only two interactive islands are hydrated:

- `MobileNavigationMenu.tsx` via `client:media="(max-width: 767px)"`
- `ResourcesFilters.tsx` via `client:visible`

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

## Key files

- `src/config/site-branding.ts`: frozen Terracotta Calm + Nunito brand/typography configuration
- `src/content/therapy-practice-website-content.ts`: structured Greek copy/placeholders for homepage
- `src/components/sections/SiteHeader.astro`: static header shell with mobile menu island boundary
- `src/components/sections/MobileNavigationMenu.tsx`: mobile-only shadcn Sheet island
- `src/components/sections/ResourcesSection.astro`: static resources section shell
- `src/components/sections/ResourcesFilters.tsx`: resources filtering/search island
- `src/pages/index.astro`: production entry page
- `performance-budget.json`: mobile performance budget thresholds
- `scripts/check-lighthouse-budget.mjs`: budget enforcement script
- `.codex-pipeline/README.md`: sidecar verification details and visual baseline workflow
