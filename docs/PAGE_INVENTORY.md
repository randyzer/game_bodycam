# Page Inventory

## Purpose

This is a Phase 1 human-readable planning view. In Phase 2, the real publication SSOT must be the structured runtime inventory at `src/data/page-inventory.json`.

Do not treat this Markdown file as a second publication ledger.

## Planning Inventory

| pageId | route | pageType | cluster | phase | coverageMode | visibility | publicationStatus | contentStatus | developmentStatus | indexability | primaryKeyword | relatedPageIds | sources |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `home` | `/` | home | core | P0 | partial | public | planned | research | not-started | index | Bodycam wiki | `guide.getting-started`, `update.locked-loaded`, `guide.best-settings` | Steam, official site, Steam news |
| `hub.guides` | `/guides/` | hub | core | P0 | partial | public | planned | research | not-started | index | Bodycam guides | P0 guides | Steam, official site, competitors |
| `guide.getting-started` | `/guides/getting-started/` | guide | first-match | P0 | partial | public | planned | research | not-started | index | Bodycam how to play | `guide.controls`, `guide.game-modes`, `guide.best-settings` | Steam, official site |
| `guide.controls` | `/guides/controls/` | guide | first-match | P0 | partial | public | planned | research | not-started | index | Bodycam controls | `guide.getting-started`, `guide.tactical-tablet` | Steam, official site, Reddit discovery |
| `guide.best-settings` | `/guides/best-settings/` | guide | settings | P0 | partial | public | planned | research | not-started | index | Bodycam best settings | `guide.system-requirements`, `guide.controls` | Steam, official site, Reddit discovery |
| `guide.system-requirements` | `/guides/system-requirements/` | guide | settings | P0 | full | public | planned | research | not-started | index | Bodycam system requirements | `guide.best-settings` | Steam appdetails |
| `update.locked-loaded` | `/updates/locked-and-loaded/` | patch | updates | P0 | partial | public | planned | research | not-started | index | Bodycam Locked and Loaded | `update.v0-8-patch-notes`, `guide.loadouts` | Steam news, YouTube |
| `update.v0-8-patch-notes` | `/updates/v0-8-patch-notes/` | patch | updates | P0 | partial | public | planned | research | not-started | index | Bodycam v0.8 patch notes | `update.locked-loaded` | Steam news |
| `guide.loadouts` | `/guides/loadouts-and-attachments/` | guide | combat-systems | P0 | partial | public | planned | research | not-started | index | Bodycam loadout | `guide.tactical-tablet`, `weapons.overview`, `tool.weapon-builder` | Steam, official site, YouTube |
| `guide.tactical-tablet` | `/guides/tactical-tablet/` | guide | combat-systems | P0 | partial | public | planned | research | not-started | index | Bodycam tactical tablet | `guide.loadouts`, `guide.controls` | Steam, official site, YouTube |
| `guide.game-modes` | `/guides/game-modes/` | guide | maps-modes | P0 | partial | public | planned | research | not-started | index | Bodycam game modes | `guide.maps`, `guide.zombies` | Steam, official site |
| `guide.maps` | `/guides/maps/` | guide | maps-modes | P0 | partial | public | planned | research | not-started | index | Bodycam maps | `guide.game-modes`, `guide.trenches`, `guide.zombies` | Steam, official site, YouTube |
| `guide.zombies` | `/guides/zombies/` | guide | maps-modes | P0 | partial | public | planned | research | not-started | index | Bodycam zombies guide | `guide.maps`, `guide.loadouts` | Steam, official site, YouTube |
| `official-links` | `/official-links/` | guide | core | P0 | full | public | planned | research | not-started | index | Bodycam official links | `home`, `faq` | Steam official links, official site |
| `faq` | `/faq/` | guide | core | P0 | partial | public | planned | research | not-started | index | Bodycam FAQ | `home`, `official-links` | Steam, official site, community discovery |
| `search` | `/search/` | search | core | P0 | full | public | planned | planned | not-started | noindex | search Bodycam guides | `home` | Starter |
| `guide.progression-rp` | `/guides/progression-and-rp/` | guide | combat-systems | P1 | partial | private | planned | research | not-started | noindex | Bodycam Reissad Points | `guide.loadouts`, `update.v0-8-patch-notes` | Steam news |
| `guide.drones-rc` | `/guides/drones-and-rc-cars/` | guide | combat-systems | P1 | partial | private | planned | research | not-started | noindex | Bodycam FPV drone | `guide.loadouts`, `guide.maps` | Official site, Steam |
| `guide.trenches` | `/guides/trenches/` | guide | maps-modes | P1 | partial | private | planned | research | not-started | noindex | Bodycam Trenches map | `guide.maps`, `update.locked-loaded` | Steam news, YouTube |
| `weapons.overview` | `/weapons/weapons-overview/` | database | combat-systems | P1 | partial | private | planned | research | not-started | noindex | Bodycam weapons | `guide.loadouts`, `tool.weapon-builder` | Official site, tool discovery |
| `weapons.attachments` | `/weapons/attachments/` | database | combat-systems | P1 | deferred | private | planned | research | not-started | noindex | Bodycam attachments | `weapons.overview`, `tool.weapon-builder` | Tool discovery; official observation needed |
| `tool.weapon-builder` | `/tools/weapon-builder/` | calculator | combat-systems | P1 | deferred | private | planned | research | not-started | noindex | Bodycam weapon builder | `guide.loadouts`, `weapons.overview` | Tool competitors; exact data unverified |
| `tier.weapons` | `/tier-list/weapons/` | meta | meta | P2 | deferred | private | planned | blocked | not-started | noindex | Bodycam weapon tier list | `weapons.overview` | Community/testing needed |
| `compare.unrecord` | `/comparison/bodycam-vs-unrecord/` | meta | comparisons | P2 | deferred | private | planned | research | not-started | noindex | Bodycam vs Unrecord | `home` | SERP/competitors only |
| `community.player-count` | `/community/player-count/` | meta | community | P2 | deferred | private | planned | blocked | not-started | noindex | Bodycam player count | `home` | Requires approved data source |

## Runtime SSOT Rules For Phase 2

- Every implemented page must exist once in `src/data/page-inventory.json`.
- Runtime Page Inventory is the only publication SSOT; `SITE_STRUCTURE.md`, `P0_P1_P2.md`, and `MEDIA_DECISION_TABLE.md` cannot independently authorize publication.
- Current Phase 2 first implementation scope is P0 only.
- Draft/private/P1/P2 rows are backlog planning entries and must not leak into navigation, sitemap, rendered HTML, Pagefind, or search unless explicitly approved and updated in the Runtime Page Inventory.
- Media lifecycle decisions remain in `MEDIA_DECISION_TABLE.md`, not in the runtime inventory.
- Any future `/about/`, `/privacy/`, `/terms/`, or `/404.html` route must be added to the Runtime Page Inventory before it is generated or published.
- `PAGE_INVENTORY.md` may be replaced by a generated readable view after Phase 2.
