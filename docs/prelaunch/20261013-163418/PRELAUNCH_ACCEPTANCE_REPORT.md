# Bodycam prelaunch acceptance

## Decision

**暂不建议上线** until the reviewed GitHub push and Vercel changes are complete. Open findings: P1 × 2, P2 × 1; no P0. One local UX finding was fixed and retested.

## Scope and coverage

`/Users/randyz/work/coding/hot_words_web/gameweb/game_bodycam/.worktrees/codex-bodycam-template-rebuild-20261013`; domain `https://bodycamwiki.top`; local production preview `http://localhost:3109`; 10/10 intended public routes checked. Local build used `SITE_INDEXABLE=false`, so preview robots disallows crawling as intended. Live production responses remain unverified. Chrome extension overlays appear in screenshots and extension requests failed independently of the site.

## Inventory

Published routes: `/`, `/guides`, `/guides/gameplay`, `/guides/system-requirements`, `/guides/zombies`, `/guides/trenches`, `/guides/locked-and-loaded`, `/guides/steam`, `/guides/updates`, `/guides/discord`. The sitemap contains exactly those 10 paths; no draft/blocked keyword page is present. No internal link points to an unknown route. `/en/*` redirects to English canonical paths by configuration. No route-source discrepancy found.

## Findings

| ID | Severity | Page | Evidence | Status |
| --- | --- | --- | --- | --- |
| PL-001 | P1 | / | Vercel first-party CLI reports project framework Astro, install command npm ci, build command npm run build and output directory dist, while the new branch is Next.js/pnpm. | OPEN |
| PL-002 | P1 | / | Vercel project is still bound to productionBranch main. SITE_URL and SITE_INDEXABLE are absent from the production variable-name listing; local preview intentionally uses SITE_INDEXABLE=false. | OPEN |
| PL-003 | P2 | / | The supplied external ad snippet is included but disabled by default. The site does not yet state operator/privacy/consent details for that ad provider. | OPEN |

## Per-page TDH and keyword

Word counts use whitespace-like English tokens from the rendered `main` element, excluding header/footer and scripts. Exact phrase counts are case-insensitive, not a search-volume estimate. `未配置` means the navigation/home page has no single target keyword.

| Route | Title | Description chars | H1 | Target keyword | Main words | Exact phrase count |
| --- | --- | ---: | --- | --- | ---: | ---: |
| `/` | Bodycam guides, settings and modes &#124; Bodycam Wiki | 114 | BODYCAMFIELD GUIDE | 未配置 | 625 | 0 |
| `/guides` | Bodycam Guides &#124; Bodycam Wiki | 128 | Bodycam Guides | 未配置 | 445 | 0 |
| `/guides/gameplay` | Bodycam Gameplay: What the Official Sources Confirm &#124; Bodycam Wiki | 140 | Bodycam Gameplay: What the Official Sources Confirm | Bodycam gameplay | 495 | 2 |
| `/guides/system-requirements` | Bodycam System Requirements for Windows PC &#124; Bodycam Wiki | 152 | Bodycam System Requirements for Windows PC | Bodycam system requirements | 480 | 2 |
| `/guides/zombies` | Bodycam Zombies: Official Co-op Mode Overview &#124; Bodycam Wiki | 153 | Bodycam Zombies: Official Co-op Mode Overview | Bodycam Zombies | 451 | 2 |
| `/guides/trenches` | Bodycam Trenches: What the Developer Revealed &#124; Bodycam Wiki | 149 | Bodycam Trenches: What the Developer Revealed | Bodycam trenches | 450 | 2 |
| `/guides/locked-and-loaded` | Bodycam Locked & Loaded v0.8: Verified Update Scope &#124; Bodycam Wiki | 150 | Bodycam Locked & Loaded v0.8: Verified Update Scope | Bodycam Locked and Loaded | 439 | 0 |
| `/guides/steam` | Bodycam on Steam: Find the Correct Reissad Studio Game &#124; Bodycam Wiki | 151 | Bodycam on Steam: Find the Correct Reissad Studio Game | Bodycam Steam | 452 | 2 |
| `/guides/updates` | Bodycam Updates: The Official v0.8 Patch Trail &#124; Bodycam Wiki | 154 | Bodycam Updates: The Official v0.8 Patch Trail | Bodycam update | 444 | 3 |
| `/guides/discord` | Bodycam Official Discord: Find the Developer Community &#124; Bodycam Wiki | 147 | Bodycam Official Discord: Find the Developer Community | Bodycam Discord | 425 | 1 |

## Content, links and source gaps

Eight keyword pages use dated official sources. Nine partial and three blocked intents remain unpublished; see `CONTENT_GAPS.md`. Internal route checks passed. External links were not bulk-crawled; official Steam/site/developer pages were opened during research. A 403 or login wall would not by itself prove a broken destination.

## Technical SEO, responsive and security

Local `/robots.txt` and `/sitemap.xml` both returned 200. The robots Sitemap directive points to `https://bodycamwiki.top/sitemap.xml`; all 10 sitemap URLs use the confirmed domain and match published paths. Canonical and noindex preview state passed the route verifier. Live-domain responses, production indexability, ad/privacy requirements, Lighthouse/Core Web Vitals, and provider-side build settings still need release follow-up. Home/list/article browser checks found no page-wide horizontal overflow, and the mobile menu opened. Source scan found no source-template game identity or placeholder public links. No credential values were emitted or scanned from ignored dependency/build caches; this is not a penetration test or remote-secret audit.

## Build and repairs

`pnpm test`: 4 passed; `pnpm typecheck`: passed; `SITE_URL=https://bodycamwiki.top SITE_INDEXABLE=false pnpm build`: passed; `VERIFY_BASE_URL=http://localhost:3109 VERIFY_SITE_ORIGIN=https://bodycamwiki.top pnpm verify:routes`: 10 pages passed. Replaced the plain-text hardware rows with semantic, mobile-scrollable tables; browser retest passed.

## Exact remaining gate

Review branch name, full replacement diff and push plan; then push, update Vercel framework/build/install/output settings, switch production branch, set production SEO environment, deploy and verify live domain. Advertising activation requires an operator/privacy/placement decision; dual build checks confirmed the script appears only when explicitly enabled.
