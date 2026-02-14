# Codex Web Design Pipeline Sidecar

This folder is a project-local pipeline for:

- Playwright + axe accessibility checks
- Storybook + Chromatic visual workflow
- Style Dictionary + DTCG design tokens

## Quick Start

1. `npm install`
2. `npm run setup:browsers`
3. `npm run tokens:build`
4. `npm run storybook` or `npm run storybook:build`
5. `BASE_URL=https://your-site-url npm run a11y:test`

## Notes

- Set `BASE_URL` before running accessibility tests.
- Set `CHROMATIC_PROJECT_TOKEN` before running `npm run chromatic`.
