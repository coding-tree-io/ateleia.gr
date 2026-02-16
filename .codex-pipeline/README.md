# Codex Web Design Pipeline Sidecar

This folder is the project-local verification sidecar for UI and design quality.

## What It Verifies

- Style Dictionary + DTCG tokens (`tokens/core/tokens.json`)
- Theme-token sync against production theme lock (`src/styles/global.css`, `src/config/site-branding.ts`)
- Storybook build for real project React components
- Playwright + axe accessibility checks
- Playwright screenshot-based visual regression (desktop + mobile)

## Required Environment

- Node.js 20+
- Playwright Chromium browser (`npm run setup:browsers`)
- `BASE_URL` pointing to the page under test

## Commands

1. `npm install`
2. `npm run setup:browsers`
3. `npm run tokens:verify-sync`
4. `npm run tokens:build`
5. `npm run storybook:build`
6. `BASE_URL=https://your-site-url npm run a11y:test`
7. `BASE_URL=https://your-site-url npm run visual:test`
8. `BASE_URL=https://your-site-url npm run verify:all`

## Baselines

Visual baselines are committed in:

- `tests/__screenshots__/desktop-chromium/`
- `tests/__screenshots__/mobile-chromium/`

Update baselines intentionally only:

- `BASE_URL=https://your-site-url npm run visual:update`

## Reusing DevTools Screenshots

When DevTools MCP already captured a target screenshot, promote it into the baseline path instead of recapturing:

```sh
npm run visual:promote-devtools -- --source <path-to-screenshot.png> --target <home|credits> --project <desktop-chromium|mobile-chromium>
```

Rules enforced by the promotion script:

- PNG required
- Width must match project viewport (`1440` desktop, `390` mobile)
- Screenshot is copied to `tests/__screenshots__/<project>/<target>.png`
