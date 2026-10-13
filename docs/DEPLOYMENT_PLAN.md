# Bodycam branch review and deployment plan

**Status: approved by user. Execution is in progress; GitHub push and Vercel release results are recorded after verification.**

## Branch and diff

- Worktree: `/Users/randyz/work/coding/hot_words_web/gameweb/game_bodycam/.worktrees/codex-bodycam-template-rebuild-20261013`.
- New local branch: `codex/bodycam-template-rebuild-20261013`, based on `main` commit `76fcb7290f678af389b58f0b071c8d63073b25d2`.
- GitHub remote: `https://github.com/randyzer/game_bodycam.git`; remote `main` is at the same commit; the target branch does not exist remotely.
- Complete proposed file list: `DEPLOYMENT_PLAN.json` → `github_sync.file_changes` (293 paths: 98 added, 5 modified, 190 deleted). The large deletion count is intentional: this is a full replacement of the old Astro site, not a patch to its source.
- The original `main` checkout has no tracked edits; its user-provided `background_information/` is still untracked and untouched. The new branch contains a copied keyword input under `backgroundinformation/` plus its research outputs.
- Include only the listed paths. Exclude `.env` values, `.vercel/`, `.next/`, `node_modules/`, caches and any unrelated files.

## What changes

The selected `temp5_based_bombfarm.wiki` template was adapted to a Bodycam Next.js site. Six templates were compared and the copy/residue evidence is in `TEMPLATE_SELECTION_REPORT.md`. The site includes a home page, guide directory, eight source-backed keyword articles, SEO generators, original abstract art and validated favicons. Nine partial and three blocked keyword intents remain unpublished. The user-supplied ad script is wired into a labelled homepage slot but disabled by default. Old Astro routes, generated media, content and tests are removed. CI now uses pnpm/Node 22.

## Validation completed locally

- Frozen offline install passed; four tests passed; typecheck and production build passed.
- Production preview checked all ten intended public routes, canonical/noindex state, sitemap membership and 404s.
- Browser checks covered home at 360/390/768/1024/1440/1920px and list/article at 390/1440px. The table rendering defect was fixed and retested.
- `git diff HEAD --check` passed and a credential-pattern scan found no likely secrets in the 98 added/modified text files inspected.
- Detailed acceptance: `docs/prelaunch/20261013-163418/PRELAUNCH_ACCEPTANCE_REPORT.md`. It currently says **暂不建议上线** because provider settings and the live branch/domain are still unverified.

## Approved execution sequence

1. Stage **only** the exact paths in `github_sync.file_changes`; inspect the staged diff again, run final checks, and commit as `feat: rebuild Bodycam guide site from verified template`.
2. In the existing Vercel project `randyzers-projects/game-bodycam`, change the framework preset from Astro to Next.js, clear the old `npm ci` / `npm run build` / `dist` overrides, keep Node 22.x and root `.`. Set `SITE_URL=https://bodycamwiki.top`, `SITE_INDEXABLE=false`, `SITE_ADS_ENABLED=false` for preview. These changes precede the preview push because the current Astro overrides would fail a Next.js build.
3. Push **only** `codex/bodycam-template-rebuild-20261013` to `origin`; the project still tracks `main` as Production Branch, so this push should create a preview deployment, not a production deployment. Inspect install logs carefully: Vercel's documented pnpm support and local pnpm 12 may differ. Stop and revise if preview build fails.
4. Verify the preview's ten routes, assets, mobile layout, robots/noindex, canonical and sitemap. Rerun the prelaunch gate against that exact commit and resolve blocking findings.
5. Configure production `SITE_URL=https://bodycamwiki.top`, `SITE_INDEXABLE=true`, `SITE_ADS_ENABLED=false`. Change Vercel Production Branch from `main` to `codex/bodycam-template-rebuild-20261013` and create a production deployment from the verified branch commit if branch-switching alone does not deploy it. Confirm `bodycamwiki.top` and `www` behavior, HTTPS, all routes, indexable robots, canonical and sitemap.

Current Vercel project: Astro, `npm ci`, `npm run build`, `dist`, Production Branch `main`; both `bodycamwiki.top` and `www.bodycamwiki.top` are attached. The domain's current nameservers are Cloudflare. No DNS or nameserver change is proposed. GitHub `main` remains unchanged and remains the repository default branch. Existing GSC/GA4 state has not been established; no Google-account or analytics change is proposed. Hobby plan is observed, but future usage/cost is unknown.

Rollback: keep the existing production deployment during preview. If production verification fails, select `main` again in Vercel, restore Astro/npm/dist project settings and redeploy the previous known-good commit. No force push, history rewrite or DNS edit is planned.

**Approval requested:** the exact 293-path replacement diff, commit message, push to `origin/codex/bodycam-template-rebuild-20261013` (triggering preview), Vercel build/environment settings and Production Branch switch described above. Advertising activation, GSC/GA4 changes and DNS edits are outside this approval.
