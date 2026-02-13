# Base Astro + shadcn-ui Starter

Baseline project for a static Astro site with shadcn-ui components and React islands.
This repo is configured for GitHub Pages project deployments under `coding-tree-io/ateleia.gr`.

## What this is

- Astro 5 static site starter.
- Tailwind CSS v4 + shadcn-ui token setup.
- React integration for Astro islands.
- One shadcn `Button` and one interactive island example.

## Prerequisites

- Node.js 20+
- pnpm (or Corepack)

If `pnpm` is not globally available on your machine, use `corepack pnpm` in all commands below.

## Setup

```sh
corepack pnpm install
```

## Run locally

```sh
corepack pnpm dev
```

## Verification

```sh
corepack pnpm check
corepack pnpm build
```

## GitHub Pages configuration

`astro.config.mjs` is preconfigured for GitHub Pages project mode:

- `site: "https://coding-tree-io.github.io"`
- `base: "/ateleia.gr"`
- `output: "static"`

This matches deployment to:

`https://coding-tree-io.github.io/ateleia.gr`

If the repository slug changes, update `base` to the new repo path.

## Key files

- `src/pages/index.astro`: starter page with shadcn + island demo
- `src/pages/client-review.astro`: client-facing selection page (colors + fonts)
- `src/components/ClientReviewIsland.tsx`: interactive client review island with URL persistence
- `src/components/ui/button.tsx`: shadcn button component
- `src/components/ExampleIsland.tsx`: minimal hydrated React island
- `src/styles/global.css`: Tailwind + shadcn theme tokens
- `components.json`: shadcn registry config

## Client review page

Use the client-facing page locally at:

`/client-review`

It supports:
- color and font switching
- desktop/mobile frame toggle
- URL-persisted selections for easy sharing
