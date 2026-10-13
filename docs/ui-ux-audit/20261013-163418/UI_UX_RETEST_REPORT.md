# UI/UX retest

Before: browser accessibility tree exposed each system-requirements table as a pipe-delimited paragraph; see `screenshots/system-requirements-before.png`.

After: two semantic tables expose column and row headers. At 390px, the document is 390px wide; each 354px table region contains 600px of horizontally scrollable table content. See `screenshots-after/system-requirements-table-mobile-390.png` and `screenshots-after/system-requirements-table-desktop-1440.png`.

`pnpm test` (4 passed), `pnpm typecheck`, production build and 10-route verification passed. UX-001: FIXED. Remaining release risks are remote Vercel settings, live-domain checks and optional advertising/legal review.
