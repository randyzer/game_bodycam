# Bodycam Field Guide

Independent English-language Bodycam guide site built from the selected `temp5_based_bombfarm.wiki` structural template. The original Bodycam `main` branch was read-only reference; this branch replaces its Astro source with a new Next.js/MDX site. Site content is based on the source records under `backgroundinformation/`.

## Local validation

Node 22+ and pnpm are required. Use the existing lockfile:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
SITE_URL=https://bodycamwiki.top SITE_INDEXABLE=false pnpm build
SITE_URL=https://bodycamwiki.top SITE_INDEXABLE=false pnpm start
VERIFY_BASE_URL=http://localhost:3000 VERIFY_SITE_ORIGIN=https://bodycamwiki.top pnpm verify:routes
```

Production deployment should set `SITE_URL=https://bodycamwiki.top` and `SITE_INDEXABLE=true` only after the prelaunch gate and approved Vercel branch switch. Without `SITE_INDEXABLE=true`, the site remains `noindex` and robots disallows crawling.

## Content and provenance

English MDX articles live in `content/en/guides/`. Adding a published article adds its route and sitemap entry through `discoverContent()`. Every article cites first-party material and uses an as-of date. Draft or blocked keyword intents stay in `docs/CONTENT_PAGE_MANIFEST.json` and are not published. Search discovery results are not treated as evidence. The generated tactical diagram is original explanatory art, not a Bodycam screenshot.

The site is not affiliated with Reissad Studio or Valve. Dynamic prices, reviews and player counts are intentionally absent. No advertising, analytics, tracking, account or newsletter code is active in this branch pending separate release checks. The favicon package was produced locally under the user's earlier authorization.

The supplied display-ad placement is included after the homepage guide cards. It loads the external provider script only when `SITE_ADS_ENABLED=true` at build time; leave it off until operator privacy/consent and placement checks are complete.
