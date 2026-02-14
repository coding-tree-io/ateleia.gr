# Ateleia.gr (Astro + shadcn-ui)

Static Astro website for the approved client direction.

## Current brand lock

The theme is intentionally frozen to the approved choice:

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

## Verification

```sh
corepack pnpm check
corepack pnpm build
```

## GitHub Pages configuration

`astro.config.mjs` is configured for GitHub project pages deployment:

- `site: "https://coding-tree-io.github.io"`
- `base: "/ateleia.gr/"`
- `output: "static"`

Deployment workflow on `main` publishes the homepage artifact from `dist` to:

- `https://coding-tree-io.github.io/ateleia.gr/`

## Key files

- `src/config/approved-theme.ts`: frozen Terracotta Calm + Nunito tokens/typography
- `src/content/site-copy.ts`: structured Greek copy/placeholders for homepage
- `src/components/home/HomePageScaffold.tsx`: homepage sections built with shadcn components
- `src/pages/index.astro`: production entry page
