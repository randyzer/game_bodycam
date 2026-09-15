# Bodycam Ad Placement Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement the approved scheme A inline, with test-driven-development and verification-before-completion. Do not commit, push, deploy, or change the Bomb Farm project.

**Goal:** Move the homepage's single existing Adsterra instance from after the Footer to after Start here and before Browse by category.

**Architecture:** A project-local AdSlot owns validated provider markup, labeling, and responsive reserved space. BaseLayout keeps GA bootstrapping and renders a single before-footer fallback only for eligible non-home pages; the homepage disables that fallback. Existing public environment names and provider URLs are unchanged. No second key, telemetry, observer, or extra network integration is added.

**Tech Stack:** Astro, TypeScript, CSS, Vitest, Node 22.22.0.

## Task 1 — Regression tests

- [x] Add `tests/ad-placement.test.ts` using AstroContainer and `vi.stubEnv` with a synthetic public key, restored by `vi.unstubAllEnvs` after each test.
- [x] Render the homepage and assert `start-here < home-primary < browse-by-category`, that the primary sits inside main, one invoke.js and one provider container, and no before-footer slot.
- [x] Render BaseLayout with an indexable guide and assert `main < before-footer < Footer`, one provider instance, and unchanged GA bootstrapping in head.
- [x] Assert no slot when configuration is absent, local enabled is false, footerAd is false, or the page is noindex. Check component semantics and responsive reservation CSS.
- [x] Run `PATH=/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH npm test -- tests/ad-placement.test.ts tests/third-party-scripts.test.ts`; observe missing placement failures on old production code.

## Task 2 — Minimal implementation

- [x] Create `src/components/ads/AdSlot.astro`: typed home-primary/before-footer placement, label default Advertisement, enabled default true, existing buildThirdPartyScriptConfig resolver, aside with data-pagefind-ignore, label, provider script, and container. Omit everything when disabled or unconfigured.
- [x] Modify `src/layouts/BaseLayout.astro`: import AdSlot; add footerAd boolean default true; retain GA env resolution in head; remove provider env and body markup; render fallback before Footer when footerAd, non-home route, and indexability=index.
- [x] Modify `src/pages/index.astro`: import AdSlot; pass footerAd=false; render enabled home-primary immediately after Start here and before WikiCategories.
- [x] Modify `src/styles/global.css`: add separated ad label and centered container with min-height clamp(72px, 10vw, 120px), max-width 100%, responsive child constraints. Do not collapse an unfilled reservation or change content/hero styles.
- [x] Repeat the targeted test command; all cases must pass.

## Task 3 — Verification and handoff

- [x] Run `PATH=/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH npm run check` (Astro diagnostics and full test suite).
- [x] Run `PATH=/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH npm run build` (validation, build, route reconciliation, search indexing, HTML audit).
- [x] Inspect a build with synthetic ad configuration for one primary between Start here and categories, no after-footer markup, and no duplicate container IDs. Synthetic configuration does not prove production ad delivery.
- [x] Run `git diff --check` and inspect `git diff`/`git status --short`.
- [x] Write `docs/ADS_MONETIZATION_REPAIR_REPORT.md` with exact results, scope, and limits: revenue improvement and production delivery require human verification after an authorized release.
