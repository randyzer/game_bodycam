# Site Structure

## Structure Status

- Planning status: Proposed for Human Planning Gate
- Human approval: PENDING
- Runtime Page Inventory SSOT: Phase 2 should create `src/data/page-inventory.json` from the planning view in `PAGE_INVENTORY.md`
- Total proposed pages: 25 planning rows
- P0: 16
- P1: 6
- P2: 3

## Primary / P0 Launch Navigation

Only this P0 launch navigation may be implemented during the current Phase 2 P0-only pass.

| Label | Target | Player task | Why primary |
|---|---|---|---|
| Home | `/` | Understand what the site covers | Required core portal. |
| Start | `/guides/getting-started/` | Survive first sessions | Highest beginner intent. |
| Settings | `/guides/best-settings/` | Fix performance/input/audio | Strong SERP and Reddit troubleshooting signal. |
| Loadouts | `/guides/loadouts-and-attachments/` | Build v0.8 kits | Current update changed this system. |
| Maps & Modes | `/guides/maps/` | Learn spaces and playlists | Core tactical player task. |
| Zombies | `/guides/zombies/` | Understand co-op Zombies | Official and SERP-supported family. |
| Updates | `/updates/locked-and-loaded/` | Read current patch context | v0.8 is the current planning center. |
| Search | `/search/` | Find content quickly | Starter-supported local search. |

## Secondary / P0 Launch Navigation

| Parent | Child label | Target | Why exposed |
|---|---|---|---|
| Start | Controls | `/guides/controls/` | Bodycam input/no-HUD learning curve. |
| Settings | System Requirements | `/guides/system-requirements/` | Steam-verified requirements and performance intent. |
| Loadouts | Tactical Tablet | `/guides/tactical-tablet/` | v0.8 menu/loadout UX change. |
| Maps & Modes | Game Modes | `/guides/game-modes/` | Objective/mode clarity. |
| Updates | v0.8 Patch Notes | `/updates/v0-8-patch-notes/` | Hotfix/current patch tracking. |
| Info | Official Links | `/official-links/` | Disambiguation/trust page. |

## Future Navigation After P1 Approval

This table is planning-only. It must not be implemented during the current P0-only Phase 2 pass, and it must not create rendered navigation, mobile navigation, footer navigation, sitemap entries, Pagefind/search entries, or generated public HTML until Human explicitly approves a later P1 implementation pass and Runtime Page Inventory publication fields are updated.

| Parent | Child label | Target | Why future-only |
|---|---|---|---|
| Loadouts | Progression & RP | `/guides/progression-and-rp/` | P1 backlog route; exact RP reward/unlock detail needs observation. |
| Loadouts | Drones & RC Cars | `/guides/drones-and-rc-cars/` | P1 backlog route; gadget controls and constraints need deeper verification. |
| Maps & Modes | Trenches | `/guides/trenches/` | P1 backlog route; detailed layout/callout work needs observation. |
| Tools | Weapon Builder | `/tools/weapon-builder/` | P1 backlog route; no public tool until data/formulas are verified and tested. |

## P0 Implementation Navigation Contract

- During current Phase 2, only `Primary / P0 Launch Navigation` and `Secondary / P0 Launch Navigation` may be implemented.
- P1/P2 future navigation must remain absent from rendered navigation, mobile navigation, footer navigation if applicable, sitemap, Pagefind/search, and generated public HTML.
- Runtime Page Inventory remains the publication SSOT; this structural/navigation planning document does not override `private`, `noindex`, or backlog status for P1/P2 rows.

## Proposed Full Site Tree

This tree records the full 25-page planning inventory shape, including P1/P2 backlog routes. It is not current launch navigation and does not authorize publication.

```text
/
├── guides/
│   ├── getting-started/
│   ├── controls/
│   ├── best-settings/
│   ├── system-requirements/
│   ├── loadouts-and-attachments/
│   ├── tactical-tablet/
│   ├── progression-and-rp/
│   ├── drones-and-rc-cars/
│   ├── game-modes/
│   ├── maps/
│   ├── trenches/
│   └── zombies/
├── updates/
│   ├── locked-and-loaded/
│   └── v0-8-patch-notes/
├── weapons/
│   ├── weapons-overview/
│   └── attachments/
├── tools/
│   └── weapon-builder/
├── official-links/
├── faq/
└── search/
```

## Support / System Route Decision

- Current published Bodycam project routes are exactly the routes represented in `PAGE_INVENTORY.md`.
- `/about/`, `/privacy/`, `/terms/`, and `/404.html` are not part of the current 25-page published project plan.
- Do not generate or publish those routes during P0 implementation unless they are first added to the Runtime Page Inventory with explicit page ID, route, priority, visibility, indexability, and source/rationale.
- No separate "Starter route," "system route," or "support route" publication exception exists for this project.
- 404 handling should follow the adopted Starter convention only after Phase 2 begins; if it creates a Bodycam project route, it must be reconciled into the Runtime Page Inventory before publication.

## Topic Clusters

### Cluster: Core / Disambiguation

- Hub: `/`
- Primary intent: confirm this is Reissad Studio Bodycam on Steam App ID 2406770.
- Primary entities: game, official links, update status.
- Main data source: Steam Store, official website, Steam News.
- Competitive coverage decision: COVER_NOW.
- P0/P1/P2: P0.

Child pages: `/official-links/`, `/faq/`, `/search/`.

### Cluster: First Match

- Hub: `/guides/getting-started/`
- Primary intent: help new players adapt to true body-camera FPS combat.
- Primary entities: controls, no HUD, movement, audio, first mode choice.
- Main data source: Steam Store, official website, official videos, partial community discovery.
- Competitive coverage decision: COVER_NOW.
- P0/P1/P2: P0.

Child pages: `/guides/controls/`, `/guides/best-settings/`, `/guides/system-requirements/`.

### Cluster: v0.8 Locked & Loaded

- Hub: `/updates/locked-and-loaded/`
- Primary intent: explain what changed in the September 2, 2026 update.
- Primary entities: loadouts, RP, tablet, drones, RC cars, sound, Trenches, hotfixes.
- Main data source: Steam News, official YouTube, official website.
- Competitive coverage decision: COVER_NOW.
- P0/P1/P2: P0 with P1 deeper pages.

Child pages: `/updates/v0-8-patch-notes/`, `/guides/loadouts-and-attachments/`, `/guides/tactical-tablet/`, `/guides/progression-and-rp/`.

### Cluster: Combat Systems

- Hub: `/guides/loadouts-and-attachments/`
- Primary intent: explain loadout slots and current customization safely.
- Primary entities: weapons, attachments, gadgets, RP.
- Main data source: official site/Steam/YouTube; in-game observation needed for exact stats.
- Competitive coverage decision: COVER_PARTIAL.
- P0/P1/P2: P0 overview, P1 database/tool.

Child pages: `/weapons/weapons-overview/`, `/weapons/attachments/`, `/tools/weapon-builder/`.

### Cluster: Maps, Modes, Zombies

- Hub: `/guides/maps/`
- Primary intent: orient players to game modes and map types.
- Primary entities: Wingman, Body Bomb, Team Deathmatch, Deathmatch, Hardpoint, Gun Game, Zombies, Trenches.
- Main data source: Steam, official site, Steam News, YouTube.
- Competitive coverage decision: COVER_NOW.
- P0/P1/P2: P0 overview, P1 map detail expansions.

Child pages: `/guides/game-modes/`, `/guides/trenches/`, `/guides/zombies/`.

## Minimum Wiki Coverage Review

| Family | Relevant to game? | Coverage decision | Target page(s) | Notes |
|---|---|---|---|---|
| Getting Started / How to Play | Yes | COVER | `/guides/getting-started/` | High priority because true bodycam/no-HUD learning curve is central. |
| Core Gameplay / Progression | Yes | PARTIAL | `/guides/getting-started/`, `/guides/progression-and-rp/` | RP detail needs deeper observation. |
| Heroes / Characters | No | N/A | none | No hero/class system verified. |
| Gear / Items | Yes | PARTIAL | `/guides/loadouts-and-attachments/`, P1 weapon/attachment pages | Exact data deferred. |
| Major Systems | Yes | COVER | loadouts, tablet, drones/RC, settings | v0.8 changed several systems. |
| Worlds / Maps / Stages | Yes | COVER | `/guides/maps/`, `/guides/trenches/` | P0 overview; detail pages P1. |
| Updates | Yes | COVER | `/updates/locked-and-loaded/`, `/updates/v0-8-patch-notes/` | Current release lead verified. |
| FAQ / recurring questions | Yes | COVER | `/faq/` | Include disambiguation and platform/status questions. |
| Tools | Yes | PARTIAL / P1 | `/tools/weapon-builder/` | Tool demand exists; exact data source unresolved. |
| Tier / Builds | Yes but unstable | DEFER | `/tier-list/weapons/` later | P2 only. |
| Codes | Not verified / polluted | N/A | FAQ note only | Avoid Roblox code confusion. |

## Partial Page Plan

| Page | Verified scope we can publish now | Missing deeper data | Deferred expansion |
|---|---|---|---|
| `/guides/loadouts-and-attachments/` | Slots, official system existence, RP unlock framing, safe starting advice | Exact attachment catalog/stats | Weapon/attachment database and builder |
| `/guides/maps/` | Official/observed map families, modes, Trenches overview | Exact layouts/callouts/mode rotations | Individual map pages |
| `/guides/progression-and-rp/` | v0.8 #2 reward multiplier changes and RP concept | Full unlock economy | P1 progression reference |
| `/guides/zombies/` | Official Zombies mode, co-op survival framing, maps mentioned by official site | Exact objectives/bosses/spawns | P1 Zombies map guide |
| `/tools/weapon-builder/` | Demand and competitor/tool existence | Verified formulas/stats | P1 implementation after data approval |

## Media Plan by Page Family

| Page family | Media need | Hero/cover media | Inline screenshots | Video | Quick facts/cards | Semantic matching notes | Failure-state needs | Notes |
|---|---|---|---|---|---|---|---|---|
| Homepage | HIGH PRIORITY | Official site hero, Steam capsule, or YouTube trailer | Optional | Locked & Loaded trailer | Yes | Must clearly be Bodycam, not generic tactical FPS. | YouTube fallback required if embedded. | Human media approval required. |
| Guides | RECOMMENDED | Steam/official screenshot where relevant | Yes when explaining settings/maps/loadouts | Devlogs by topic | Yes | Media must match page topic. | Fallback for video embeds. | Text-only allowed only with positive rationale. |
| Updates | HIGH PRIORITY | Trailer/update still | Optional | Official v0.8 trailer/devlogs | Yes | Update pages should show official update media. | Fallback for embeds. | No speculative patch behavior. |
| Weapons/Loadouts | RECOMMENDED | Official loadout/weapon footage | Optional | Devlog animation/loadout | Tables/cards | Do not use unofficial stats as fact. | Fallback for video. | Tool P1. |
| Maps/Zombies | RECOMMENDED | Official map/Zombies screenshots | Yes | Map/Zombies trailers/devlogs | Yes | Avoid unrelated horror/film imagery. | Fallback for video. | Detailed map images P1. |
| FAQ/Links/Search | NO MEDIA NEEDED | none | none | none | Yes | Useful, complete without media. | N/A | Positive no-media rationale. |

## Internal Linking Rules

Each child page should link to:

- Parent hub.
- 2-4 related pages.
- Official links page where source verification matters.
- Update page when v0.8 changed the topic.

## URL Rules

- lowercase
- hyphen-separated
- stable slugs
- no duplicate intent
- no unnecessary dates in core guide URLs
- dates acceptable in source dates and patch body, not URL unless needed
- no published support/legal/error route may bypass the Runtime Page Inventory

## Navigation Coverage Gate

- [x] Major P0 families are visible in primary or secondary navigation.
- [x] Important published pages are not hidden only in deep links.
- [x] Navigation labels match player language.
- [x] Dropdown/grouping is planned where a flat nav would hide major content.
- [ ] Navigation plan requires Human approval.

## Structure Validation

- [x] Every P0 page appears in the tree.
- [x] Every page has one owner Cluster.
- [x] No duplicate intent.
- [x] No page exists only because a competitor has it.
- [x] Every material competitor/player-intent family has a coverage decision.
- [x] Important incomplete-data families considered partial-page coverage before deferral.
- [x] Public P0 routes have route-level media lifecycle decisions in `MEDIA_DECISION_TABLE.md`.
