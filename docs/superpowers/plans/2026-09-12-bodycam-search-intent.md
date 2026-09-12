# Bodycam Search Intent Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the two highest-impression Bodycam landing pages with observed tutorial, start-game, guide, and mode queries.

**Architecture:** Keep `src/data/page-inventory.json` as the runtime metadata source, MDX as the guide content source, and `game.config.ts` as the homepage feature source. Add one file-level contract test so each change is observable without coupling tests to rendered styling.

**Tech Stack:** Astro 7, MDX, TypeScript, Vitest, Node.js 22.22.0

---

### Task 1: Lock the intended search-facing behavior

**Files:**
- Create: `tests/bodycam-search-intent.test.ts`

- [ ] **Step 1: Write the failing metadata test**

Assert that the homepage title is `Bodycam Guide: Tutorial, Modes, Settings & Updates`, the getting-started title is `How to Start a Game in Bodycam: Beginner Tutorial`, its primary keyword is `how to start a game in Bodycam`, and both records have `updatedAt` set to `2026-09-12`.

- [ ] **Step 2: Write the failing content and discovery test**

Read `src/content/guides/getting-started.mdx` and `game.config.ts`; assert the exact `How to Start a Game in Bodycam` section, a matching FAQ question, stable Steam App ID identity, current-lobby qualification, and `guide.game-modes` in `featuredPageIds`.

- [ ] **Step 3: Verify the test fails for missing behavior**

Run:

```bash
PATH="/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH" npm test -- tests/bodycam-search-intent.test.ts
```

Expected: failing assertions showing the old titles, keyword, heading, FAQ, and featured page list.

### Task 2: Implement the focused metadata and content patch

**Files:**
- Modify: `src/data/page-inventory.json`
- Modify: `src/content/guides/getting-started.mdx`
- Modify: `game.config.ts`

- [ ] **Step 1: Update inventory metadata**

Set the homepage and getting-started title, description, primary keyword, and updated date to the approved values from the design.

- [ ] **Step 2: Update the first-match answer**

Add `How do I start a game in Bodycam?` to the MDX FAQ. Rename the checklist section to `How to Start a Game in Bodycam` and express the path as Steam identity check, settings preparation, mode choice, current lobby prompts, and no-HUD first-minute behavior.

- [ ] **Step 3: Add the existing modes page to homepage features**

Append `guide.game-modes` to `homepage.featuredPageIds`; keep the getting-started guide first so it remains the Start Here destination.

- [ ] **Step 4: Verify the focused contract passes**

Run:

```bash
PATH="/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH" npm test -- tests/bodycam-search-intent.test.ts
```

Expected: one test file passes with no failures.

### Task 3: Verify and deploy

**Files:**
- Verify generated files under: `dist/`

- [ ] **Step 1: Run the full quality gate**

Run:

```bash
PATH="/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH" npm run check
PATH="/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH" npm run build
```

Expected: Astro check reports zero errors and the full Vitest suite and production build exit successfully.

- [ ] **Step 2: Inspect the generated output**

Confirm `dist/index.html` and `dist/guides/getting-started/index.html` contain the approved title, description, headings, canonical, robots directive, and updated date. Confirm `dist/sitemap-0.xml` still contains both URLs.

- [ ] **Step 3: Review and push the exact diff**

Run `git diff --check`, inspect `git diff`, commit only the Bodycam files, fetch `origin/main`, confirm no remote divergence, and push `main`.

- [ ] **Step 4: Confirm production deployment**

Use the official Vercel CLI to wait for the deployment whose Git commit matches the pushed commit. Require Ready state and the `bodycamwiki.top` production alias.

- [ ] **Step 5: Verify the live pages**

Use the logged-in browser tool to inspect the live homepage, getting-started page, and sitemap. Confirm the deployed metadata and content match the generated output; note that GSC ranking and CTR changes require new search data and cannot be verified immediately.
