# Bodycam Search Intent Optimization Design

## Goal

Improve organic click-through and intent satisfaction for the homepage and `/guides/getting-started/` without changing URLs, indexation rules, analytics, or unsupported gameplay claims.

## Evidence

- GSC domain-property data for September 7–10, 2026 shows 688 impressions, 9 clicks, 1.3% CTR, and average position 8.0.
- `/guides/getting-started/` received 463 impressions and 3 clicks (0.6% CTR), while `/` received 228 impressions and 6 clicks (2.6% CTR).
- Observed queries include `bodycam tutorial`, `how to start bodycam game`, `how to start a game in bodycam`, `bodycam guide`, and `bodycam modes`.
- Mobile accounts for 299 impressions but only 0.7% CTR, so the strongest intent phrase must appear early in titles.
- The sitemap is healthy with 15 discovered URLs; canonical and robots metadata are already correct.

## Selected Approach

Use a focused intent-and-CTR patch:

1. Retitle the homepage around `Bodycam Guide`, `Tutorial`, `Modes`, `Settings`, and `Updates` while keeping the visible brand heading unchanged.
2. Retitle the getting-started guide around the exact intent `How to Start a Game in Bodycam` and update its description and primary keyword.
3. Replace the generic first-session heading with an explicit start-a-game section, using only stable, source-safe instructions.
4. Add an exact-question FAQ answer and keep existing identity disambiguation.
5. Feature the existing game-modes guide on the homepage; do not create another page that could compete with the getting-started URL.

## Boundaries

- Keep all existing routes, canonical URLs, robots directives, sitemap generation, GA configuration, and schema architecture.
- Do not invent exact UI labels, matchmaking details, or mode availability guarantees.
- Do not modify Afterworld or Bomb Farm.
- Do not request reindexing or change GSC/GA settings in this code change.

## Verification

- A focused Vitest contract will assert the new metadata, exact start-game answer, FAQ, and homepage mode feature.
- `npm run check` will validate Astro types and the full test suite.
- `npm run build` will validate the publication inventory and generated static output.
- After pushing, the matching Vercel deployment must be Ready and aliased to `bodycamwiki.top`.
- Live HTML must expose the expected title, description, H1/H2, canonical, robots, updated date, and sitemap entries.

