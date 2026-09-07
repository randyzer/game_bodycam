# Media Decision Table - Bodycam V2.6

This artifact references Page Inventory page IDs/routes for media planning only. It does not create routes, control navigation, authorize publication, change sitemap/indexability, or replace the Runtime Page Inventory SSOT.

## Phase 4 Human Visual Gate Note

Human Visual Gate was approved by explicit Human decision on 2026-09-08 using the current fresh Phase 3 screenshot evidence.

This approval accepts the current P0 visual/media composition for release-readiness with non-blocking visual notes. It does not grant local rehosting rights for Steam, official-site, or other third-party media assets.

## Route Decisions

| pageId_or_route | page_family | media_need | need_rationale | intended_placement | candidate_state | rights_state | human_decision | integration_state | visual_gate_state | source_or_provenance | owner_or_defer_reason | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `home` | homepage | HIGH PRIORITY | First viewport must identify Bodycam with official game cues. | hero / trailer | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | APPROVED FOR EMBED | INTEGRATED | APPROVED WITH NOTES | Official YouTube `AQ3DPo2fvSc` | Official YouTube embed wired; Human Visual Gate approved. | Rendered as a first-viewport trailer embed; no local rehosting. |
| `hub.guides` | hub | RECOMMENDED | Hub should feel game-specific but can rely on cards and accents. | hero / quick-reference | FOUND | UNRESOLVED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam screenshots / original cards | Future local media decision remains deferred. | No quota. |
| `guide.getting-started` | guide | RECOMMENDED | New players benefit from a semantically matched screenshot/trailer. | inline / trailer | FOUND | UNRESOLVED / NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam, official site, YouTube | Future local media decision remains deferred. | Can launch with intentional no-media under Human Visual approval. |
| `guide.controls` | guide | OPTIONAL | Controls can be useful as text/table; screenshots improve tablet/no-HUD clarity. | inline / quick-reference | NOT FOUND | UNRESOLVED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | In-game observation needed | Defer exact UI screenshot. | Original control diagram may be enough. |
| `guide.best-settings` | guide | RECOMMENDED | Settings/performance guide benefits from UI screenshot or table. | inline / quick-reference | NOT FOUND | UNRESOLVED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam requirements; observation needed | In-game settings screenshot later. | Text/table can be P0 if clear. |
| `guide.system-requirements` | guide | NO MEDIA NEEDED | Requirements table remains useful, comprehensible, and visually complete without media. | none | NOT FOUND | NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam appdetails | none | Positive no-media rationale. |
| `update.locked-loaded` | update | HIGH PRIORITY | Current major update page should include official trailer/devlog media. | trailer / hero | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | APPROVED FOR EMBED | INTEGRATED | APPROVED WITH NOTES | Official YouTube `AQ3DPo2fvSc`, Steam news | Official YouTube embed wired; Human Visual Gate approved. | Rendered on the Locked & Loaded page; no local rehosting. |
| `update.v0-8-patch-notes` | update | RECOMMENDED | Patch page can use update thumbnail or trailer link. | inline / trailer | FOUND | UNRESOLVED / NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam news / YouTube | Future local media decision remains deferred. | Text-first patch notes acceptable. |
| `guide.loadouts` | guide | RECOMMENDED | Loadout system is visual/mechanical; media helps recognition. | inline / trailer | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | APPROVED FOR EMBED | INTEGRATED | APPROVED WITH NOTES | YouTube devlog `6YUWQXv0MTk` | Official YouTube embed wired; Human Visual Gate approved. | Avoid unsupported weapon stats; no local rehosting. |
| `guide.tactical-tablet` | guide | RECOMMENDED | Tablet UI is a visual system; screenshot/video useful. | inline / trailer | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | APPROVED FOR EMBED | INTEGRATED | APPROVED WITH NOTES | YouTube devlog `6YUWQXv0MTk` | Official YouTube embed wired; Human Visual Gate approved. | In-game observation ideal for future copy; no local rehosting. |
| `guide.game-modes` | guide | OPTIONAL | Mode objectives can be explained with tables; media improves scan but not required. | quick-reference | NOT FOUND | NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam / official site | none | Positive text-first route possible. |
| `guide.maps` | guide | RECOMMENDED | Map pages benefit from official map/world visuals. | hero / inline | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | APPROVED FOR EMBED | INTEGRATED | APPROVED WITH NOTES | YouTube devlog `hRDSX1RLtnw` | Official YouTube embed wired; Human Visual Gate approved. | Detailed layout media P1; no local rehosting. |
| `guide.zombies` | guide | RECOMMENDED | Zombies has distinctive low-light/horror visual language. | hero / trailer | FOUND | UNRESOLVED / NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Official site, Steam, YouTube | Future local media decision remains deferred. | Avoid horror film confusion. |
| `official-links` | guide | NO MEDIA NEEDED | Trust/link page is complete as source list. | none | NOT FOUND | NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam official links / official site | none | Positive no-media. |
| `faq` | FAQ | NO MEDIA NEEDED | FAQ remains useful with concise sourced answers. | none | NOT FOUND | NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Steam, official site, community discovery | none | Positive no-media. |
| `search` | search | NO MEDIA NEEDED | Search interface does not need content media. | none | NOT FOUND | NOT REQUIRED FOR EMBED | APPROVED CURRENT STATE | NOT INTEGRATED | APPROVED WITH NOTES | Starter | none | Positive no-media. |

## Third-party Media Failure State

- [x] Intentional visible fallback/context exists for YouTube embeds through captions and source links.
- [x] Fallback/context includes useful title/context.
- [x] Fallback/context includes source/play/source-link affordance when appropriate.
- [ ] No large blank or broken-looking rectangle remains.

## Blocking Checks For Phase 2+

- [x] Every public P0 Page Inventory route appears here.
- [x] `HIGH PRIORITY` routes have semantically verified and integrated technical media; Human Visual Gate is approved.
- [x] Homepage `HIGH PRIORITY` media is integrated through an official YouTube embed; Human Visual Gate is approved.
- [ ] No selected media is broken, unsourced, rights-blocked, semantically mismatched, or copied from competitors by default.
- [x] `NO MEDIA NEEDED` routes have intentional composition rationale.
- [x] `NO MEDIA NEEDED` is not used as a substitute for unresolved rights.
- [x] Deferred recommended/optional media has owner or defer reason.
- [ ] Third-party media failure states look intentional where blank rendering would look broken.
- [x] Phase 4 reconciles current manifest mappings with this table; release still requires separate Human release authorization.

## Release Notes

- Unresolved high-priority media: none for current P0 release-readiness.
- Human-approved no-media exceptions: current P0 no-media routes are approved for release-readiness.
- Human-approved media debt: recommended/optional local media remains deferred for future polish.
- Broken media / delivery warnings: no local media rehosting; YouTube embed loading surfaces are approved with non-blocking visual notes.
