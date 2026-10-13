# Bodycam content integration report

## Input resolution

- Worktree: `/Users/randyz/work/coding/hot_words_web/gameweb/game_bodycam/.worktrees/codex-bodycam-template-rebuild-20261013` on `codex/bodycam-template-rebuild-20261013`.
- Keywords: `backgroundinformation/keyword-materials/关键词.md`; normalized list: `backgroundinformation/keyword-materials/keywords.json` (20 final topics).
- Homepage research, per-keyword source notes, and validated local icon package: `backgroundinformation/`.

## Baseline Git status

Branch created from `main` commit `76fcb7290f678af389b58f0b071c8d63073b25d2` with `--no-checkout`; old Astro source is staged for deletion in this isolated worktree. The original `main` checkout has no tracked edits. No commit or push has occurred.

## Template/content model inspected

Selected `temp5_based_bombfarm.wiki` after scoring all six candidates. Source hash and copy manifest are in `TEMPLATE_SELECTION_REPORT.md` and `template-copy-manifest.json`. Adapted the existing `content/en/guides/*.mdx` and Next route discovery, rather than adding a second page registry.

## Homepage field-to-component mapping

| Research field | Public component |
| --- | --- |
| Game identity, Steam app ID, developer, Early Access | `src/components/home.tsx` hero and facts |
| PC requirements, official modes and updates | `src/components/home.tsx` guide collections |
| Official channels and independent-site disclosure | `src/components/footer.tsx` |
| Canonical site origin and metadata | `src/lib/seo.ts`, `src/app/[[...path]]/page.tsx` |

## Identity and favicon

Replaced source-template game names, brands, paths, dates, assets and five-language demo content with English Bodycam copy. `public/images/bodycam-field.svg` is an original abstract drawing, labelled as such. Favicon and manifest assets came from the locally validated `Bodycam图标.zip`.

## Inner-page outcomes

8 PUBLISHED keyword pages, 9 DRAFT research intents without public routes, 3 BLOCKED intents without public routes. The guides index is an additional navigation page. See `CONTENT_PAGE_MANIFEST.json` and `CONTENT_GAPS.md`.

## Residue and SEO

`TEMPLATE_RESIDUE_SCAN.json` records 90 initial source-identity matches in 19 template files; current public source scan found no `quarry`, `bomb farm`, source domain, fake preview or demo identity. Canonical origin is `https://bodycamwiki.top`. `src/app/robots.ts` and `src/app/sitemap.ts` generate URLs from that origin; no stale static source-template robots/sitemap artifacts remain. Local route verification checked 10 pages, canonical, index state, sitemap and 404s with `SITE_INDEXABLE=false`.

## Validation

- `pnpm test`: 4 passed.
- `pnpm typecheck`: passed.
- `SITE_URL=https://bodycamwiki.top SITE_INDEXABLE=false pnpm build`: passed, 10 content routes rendered.
- `VERIFY_BASE_URL=http://localhost:3109 VERIFY_SITE_ORIGIN=https://bodycamwiki.top pnpm verify:routes`: passed.
- Browser at 390px: semantic system-requirement tables and local horizontal scroll; mobile menu opens.

## Files changed

Replaced the old Astro implementation with the selected Next template adapted under `src/`, `content/`, `public/`, `tests/`, `scripts/`, root configuration, `backgroundinformation/`, and `docs/`. The user-supplied ad slot is implemented behind `SITE_ADS_ENABLED=false`.

## Remaining blockers and final status

**PARTIAL.** Local content integration is complete for the eight publishable keyword intents. The other twelve remain unpublished by evidence status. GitHub push, Vercel branch switch, live-domain checks, indexability and advertising need the reviewed release plan and production follow-up.
