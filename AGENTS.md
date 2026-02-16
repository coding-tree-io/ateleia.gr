# AGENTS.md - ateleia.gr

## Purpose
This file is the agent operating contract for this repository.
It follows harness-style principles: keep instructions short, enforce invariants in code/config, and verify with objective checks.

## Repo Invariants (Do Not Break)
- Stack: Astro 5 + React integration + Tailwind CSS v4 + shadcn/ui.
- Deployment target: GitHub Pages project site.
- Astro config is static and currently pinned for Pages:
  - `site: "https://coding-tree-io.github.io"`
  - `base: "/ateleia.gr/"`
  - `output: "static"`
- Theme is locked to the selected brand direction (Terracotta Calm + Nunito).
- Primary language is Greek-first.

## Source-Of-Truth Map
- Project setup and runbook: `README.md`
- Astro deploy/runtime config: `astro.config.mjs`
- Package scripts and verification commands: `package.json`
- TypeScript strictness and aliases: `tsconfig.json`
- shadcn/ui config and aliases: `components.json`
- Theme tokens and typography lock: `src/config/site-branding.ts`, `src/styles/global.css`
- Main page entrypoint: `src/pages/index.astro`
- Homepage composition: `src/components/home/HomePageScaffold.tsx`
- Copy source: `src/content/therapy-practice-website-content.ts`
- Deployment workflow: `.github/workflows/pages.yml`
- Design intent/reference docs: `docs/pre-design-checklist.md`, `docs/v0-redesign-brief.md`, `docs/reference-benchmark.md`
- Sidecar verification stack: `.codex-pipeline/README.md`

## Harness-Aligned Working Rules
- Keep changes small, reversible, and easy to review.
- Prefer updating existing abstractions over creating new layers.
- Do not rely on memory for repo facts; read source files first.
- Convert repeated mistakes into enforceable guardrails (tests, scripts, or explicit rules in docs/config).
- If behavior changes, update docs in the same change set.
- Treat unverified claims as hypotheses; verify or mark as unverified.

## Mandatory Framework MCP Consultation
- Always consult `astro_docs` MCP before implementing, refactoring, or verifying Astro-specific behavior (routing, islands, config, static output, content collections, integrations, rendering semantics).
- Always consult `shadcn` MCP before implementing or changing shadcn/ui components, theming, composition patterns, CLI usage, or styling conventions.
- Treat MCP guidance as required input and then reconcile it with this repo's constraints.
- If MCP guidance conflicts with pinned project constraints in this file, follow repo invariants and document the tradeoff in the task report.

## Mandatory `.codex-pipeline` Verification Stack
Use this stack in task verification for every task completion claim.

Required sidecar tools:
- Style Dictionary + DTCG tokens (`tokens:verify-sync`, `tokens:build`)
- Storybook build against project components (`storybook:build`)
- Playwright + axe accessibility checks (`a11y:test`)
- Playwright visual regression baselines (`visual:test`)

Canonical command sequence:
1. `npm --prefix .codex-pipeline install`
2. `npm --prefix .codex-pipeline run setup:browsers`
3. Set `BASE_URL` to the environment under test
4. `npm --prefix .codex-pipeline run verify:all`

Rules:
- `BASE_URL` is mandatory for `a11y:test`, `visual:test`, and `verify:all`.
- Do not skip sidecar checks when claiming a task is done.
- For baseline refreshes, use `visual:update` explicitly and report why it changed.
- Prefer reusing existing DevTools screenshots via `visual:promote-devtools` before recapturing.

## Astro + Islands Policy
- Default to static Astro rendering; hydrate only where interaction is required.
- Keep React islands as small leaf boundaries, not page-wide wrappers.
- Current baseline hydrates `HomePageScaffold` with `client:load`; do not expand this pattern further.
- For new or refactored interaction, prefer:
  - `client:visible` for below-the-fold interactive UI.
  - `client:idle` for non-critical interaction after first paint.
  - `client:load` only when interaction is required immediately on first paint.
- Keep island props serializable and avoid leaking non-serializable runtime state.
- Keep browser-only APIs (`window`, `document`, `matchMedia`) inside client code paths.
- Respect `prefers-reduced-motion` for all animations.

## shadcn/ui + Styling Rules
- Reuse primitives from `src/components/ui/*` before adding new base components.
- Keep visual tokens in semantic variables (`--primary`, `--background`, etc.), not scattered raw hex values.
- Match existing style system in `src/styles/global.css` and `components.json`.
- Keep motion subtle and intentional; avoid gratuitous animation.
- Preserve accessibility defaults (focus ring visibility, keyboard reachability, contrast).

## GitHub Pages Guardrails
- Use `import.meta.env.BASE_URL` for static asset and internal path safety.
- Do not introduce root-absolute URLs that ignore project base path.
- Do not add server-only runtime features/adapters.
- Ensure output remains static and publishable from `dist`.
- Keep CI deployment workflow (`.github/workflows/pages.yml`) compatible with the build.

## Required Workflow Per Non-Trivial Task
1. Recon
- Read relevant files and existing conventions before editing.

2. Plan
- Write a compact KERNEL plan with: Objective, Constraints, Definition of done, Plan steps.
- Keep steps small and include file paths plus verification per step.

3. Implement
- Apply minimal diffs first.
- Avoid drive-by refactors.

4. Verify
- Run fast core checks after meaningful edits:
  - `corepack pnpm check`
  - `corepack pnpm build`
- Run the mandatory sidecar gate:
  - `npm --prefix .codex-pipeline run verify:all`

5. Report
- Summarize changed files, commands run, results, and remaining risks.

## Mandatory DevTools MCP Verification For Visual Changes
For any UI/layout/style/motion change, do a full DevTools verification loop and iterate until it passes.

Verification loop (repeat until pass):
1. Open the page under test (local dev URL).
2. Capture desktop evidence (screenshot and/or targeted snapshot).
3. Capture mobile evidence for the same changed area.
4. Check console messages for errors introduced by the change.
5. Check network requests for failed/blocked critical assets.
6. Validate changed interactions (hover/click/focus/keyboard) where relevant.
7. If any visual, behavior, console, or network issue is found, refactor and rerun this loop.

Pass criteria:
- No new console errors.
- No critical failed requests.
- No obvious layout regressions on desktop/mobile for touched areas.
- Interaction works via keyboard where applicable.
- Motion respects reduced-motion expectations.

Token discipline for DevTools MCP:
- Keep each verification pass targeted to changed areas.
- Prefer 5-10 DevTools MCP calls per pass.
- Prefer targeted snapshots/evaluations over repeated full-page captures.
- Do not spam snapshots; gather only evidence needed to decide pass/fail.

## Definition Of Done
A task is done only when all are true:
- Requested behavior is implemented.
- `pnpm check` and `pnpm build` succeed.
- `.codex-pipeline` verification passes (`verify:all`).
- Visual tasks pass the DevTools MCP loop on desktop and mobile.
- GitHub Pages base-path/static constraints remain intact.
- Documentation is updated if commands, behavior, or constraints changed.

## Entropy Control
- Remove dead code introduced by experiments.
- Keep one canonical implementation path for each feature.
- When temporary files/scripts are needed, delete or document them before completion.
- Keep this file concise; move deep detail to focused docs and link from here.
