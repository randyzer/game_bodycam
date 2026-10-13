# Repair manifest

- `content/en/guides/system-requirements.mdx`: pipe-delimited rows rendered as a paragraph; replaced with semantic tables. Retest: browser accessibility tree exposes row/column headers.
- `src/app/globals.css`: local scroll container and focus style; 390px document width remains 390px while the table content scrolls inside 354px.
- Seven guide metadata descriptions and one title: normalized source-scoped snippet length. Content integrator validator: zero warnings.

- `src/components/ad-slot.tsx`, `src/components/home.tsx`, `src/app/globals.css`, `.env.example`, `README.md`: labelled homepage ad slot using the supplied script URL, controlled by a default-off build flag. Dual builds confirmed presence only when enabled.

Validation: 4 tests, typecheck, production build and 10-route verification passed. Remote Vercel settings and live-domain checks remain open.
