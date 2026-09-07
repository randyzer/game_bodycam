# Competitor Analysis

## Scope

- Snapshot date: 2026-09-07
- Search/discovery method: official URLs, Bing CDP queries, Jina Reader, competitor sitemap reads, selected page samples.
- Competitors inspected: `bodycamgame.wiki`, `gamebodycam.wiki`, `bodycam.wiki`, `bodycamwiki.wiki`, `bodycamloadout.com`, `buildlab.bodycam.workers.dev`.
- Pages/sitemaps sampled: homepage, sitemaps where available, strongest competitor weapon builder/update/maps/settings pages, two independent tool pages.
- Known access limitations: Bing resolved via `cn.bing.com`; no keyword volumes; no competitor analytics; competitor claims not treated as factual authority.

## Competitor Summary

| Competitor | URL | Observed scale | Main model | Strongest page families | Main weakness |
|---|---|---:|---|---|---|
| Bodycamgame Wiki | https://bodycamgame.wiki/ | 40+ sitemap URLs plus multilingual routes | Current fan wiki | Guides, updates, maps, loadouts, Zombies, tools, tier-list, official links | Some claims require independent verification; tool is more guide-like than data tool. |
| Bodycam Wiki | https://bodycam.wiki/ | 40+ English URLs plus Chinese routes | Broad SEO wiki | Steam, guide, console, comparison, updates, community, codes | Mixed/unrelated intent: horror film, Roblox codes, console products. |
| GameBodycam Wiki | https://www.gamebodycam.wiki/ | small, mostly landing/previews | Visual landing/wiki | Beginner, settings, weapons, maps/modes, updates | Limited depth; sitemap unavailable/empty in this pass. |
| Bodycamwiki Wiki | https://bodycamwiki.wiki/ | many programmatic long-tail URLs | Long-tail guide page factory | gameplay, modes, maps, settings, performance | Repetition and thin-page risk. |
| Bodycam Loadout | https://bodycamloadout.com/ | tool/database | Weapon builder | Attachments, share build, stats table | Data provenance not verified as official. |
| Bodycam Build Lab | https://buildlab.bodycam.workers.dev/ | tool/database | Weapon/build ranker | Weapons, parts, rankings, compare | Data provenance and scoring methodology require review. |

## Strongest Competitor: Bodycamgame Wiki

- URL: https://bodycamgame.wiki/
- Main content type: guide/wiki with update and tool sections.
- Main navigation: Guides, Tier List, Updates, Tools, Links.
- Sitemap/page count observed: 40+ URLs including guides, tools, updates, multilingual roots, and legal pages.

Observed tree:

```text
/
├── guides/
│   ├── getting-started/
│   ├── how-to-play/
│   ├── controls/
│   ├── best-settings/
│   ├── game-modes/
│   ├── maps/
│   ├── loadouts-and-attachments/
│   ├── tactical-tablet/
│   ├── reissad-points-and-progression/
│   ├── drones-and-rc-vehicles/
│   ├── zombies/
│   └── mode/map/tactic pages
├── updates/
│   ├── latest/
│   ├── locked-and-loaded/
│   ├── devlog-2-sound/
│   ├── devlog-3-trenches/
│   ├── devlog-4-qol/
│   └── v0-8-2/
├── tools/
│   └── weapon-builder/
├── tier-list/
│   ├── weapons/
│   └── zombies/
└── links/
```

Strong coverage:

- Current v0.8 Locked & Loaded update page.
- Loadout/attachments and tactical tablet coverage.
- Settings/performance, controls, maps, game modes, Zombies, and official links.
- Homepage clearly disambiguates Bodycam on Steam.

Weak / thin coverage:

- Weapon builder page is useful but text-led; exact data/tool depth is below standalone tool competitors.
- Tier lists require stronger methodology and should not be copied.
- Some map/weapon claims need independent verification before reuse.

Tools / database / entity depth:

- Has `tools/weapon-builder/`, but standalone tools have deeper stats and comparison UX.
- Strong evidence for a future tool opportunity, but exact stats require P1 verification.

Media / Visual UX:

- Homepage uses game-specific hero and overview images.
- Pages use visual rhythm, but many guide pages remain mostly text.
- Visual benchmark is materially above a text-only launch, but not unreachable if we use approved official media and embeds.

## Bodycam.wiki

- URL: https://bodycam.wiki/
- Main content type: broad SEO pages.
- Main navigation: Home, Guide, Steam, Console, Comparison, Updates, Community, Codes.
- Sitemap/page count observed: 40+ English URLs plus Chinese routes.

Strong coverage:

- Broad long-tail targeting around Steam/download/price/release date/settings/zombies/comparisons/community.
- Strong disambiguation lesson: it captures search variants that may not belong to Reissad Studio Bodycam.

Weak / thin coverage:

- Mixes unrelated intent such as Roblox codes, Bodycam film review, VR/console pages, and other “bodycam shooter” products.
- Some pages target user search phrases more than verified player tasks.

Planning effect:

- Do not copy its page sprawl.
- Add explicit disambiguation to avoid Roblox/film/console contamination.

## GameBodycam.wiki

- URL: https://www.gamebodycam.wiki/
- Main content type: visually polished landing page with a few article/previews.
- Main navigation: Start, Settings, Weapons, Maps & Modes, Updates, About.

Strong coverage:

- Strong first viewport and visual identity.
- Good concise framing for beginner/settings/weapons/maps/modes.

Weak / thin coverage:

- Most sections appear to route to previews or anchors, not a deep wiki.
- Sitemap returned no useful URLs in this pass.

Planning effect:

- Useful visual benchmark, not strongest content benchmark.

## Bodycamwiki.wiki

- URL: https://bodycamwiki.wiki/
- Main content type: programmatic long-tail page set.
- Sitemap observed: gameplay, deathmatch, team-deathmatch, wingman, maps, weapons, best-weapons, loadout, best-settings, performance, sensitivity, controller, update, player-count, review, price, and multilingual versions.

Strong coverage:

- Captures many individual long-tail pages.
- Uses official stills/videos as page media.

Weak / thin coverage:

- Repetition and page-factory feel.
- Some copy loops and generic advice reduce trust.

Planning effect:

- Supports need for long-tail intent mapping but reinforces `Keyword != Page`.

## Strongest Competitor Visual / Media Benchmark

| Area | Strongest competitor evidence | Our planned/actual support | Materially below? | Recovery / waiver / justified reason |
|---|---|---|---|---|
| Homepage hero | `bodycamgame.wiki` uses a game-specific hero image, quick facts, and update status. | Plan HIGH PRIORITY official media hero via official site/Steam/YouTube. | No, if Human approves media or embed fallback. | Approve official media usage or use official YouTube embed with fallback. |
| Guide/article hero usage | Strong competitor has some visual support but many guides are text-led. | P0 guides get recommended semantic media where available. | No, if major pages receive media decisions. | Use Steam screenshots/videos or original diagrams. |
| Representative screenshot density | Strong competitor uses homepage images and selected guide media. | Planned per-route media lifecycle; no quotas. | Potentially below until media approved. | Track in `MEDIA_DECISION_TABLE.md`. |
| Videos | Strong competitor links/embeds official devlogs. | Plan official YouTube trailer/devlog embeds. | No. | Starter YouTube ID contract fits. |
| Maps | Strong competitor map guide is deep but mostly text. | P0 maps guide plus P1 Trenches/detail expansion. | No for P0; P1 for depth. | Use official devlog/media for Trenches. |
| Thumbnails | Strong competitor cards use some images. | Planned compact cards and page-family accents. | Possible. | Use approved thumbnails sparingly. |
| Galleries where relevant | Not a dominant competitor feature. | Optional only. | N/A. | Do not create quota. |
| Visual pacing | Strong homepage; guide pages vary. | Use quick facts, tables, callouts, screenshots, and videos where useful. | No. | Must be validated in Phase 4. |
| Semantic media matching | Strong competitor matches home/maps/update reasonably. | Plan requires semantic matching per page. | No if followed. | Record in media table and visual review. |

Required planning question:

```text
Are we materially below the strongest competitor in useful visual/media support?
```

Decision: No for Phase 1 plan, conditional on Human media/risk approval before implementation. A text-only P0 implementation would be materially below and should be REVISE.

## Competitive Coverage Matrix

| Page Family / Player Task | Competitor Evidence | Player/Search Intent Evidence | Our Decision | Partial Coverage Possible? | Missing Data | Cost of Deferral | Human Approval Needed? |
|---|---|---|---|---|---|---|---|
| Getting Started / How to Play | All major wiki competitors cover it. | Core beginner query intent. | COVER_NOW | Yes | Some exact current UI details | High UX cost if omitted | No |
| Controls / Tablet / Ammo Check | Strong competitor has controls/tablet; Reddit comments include ammo-check question. | Practical onboarding and v0.8 tablet changes. | COVER_NOW | Yes | Exact bind table may need observation | Medium | No |
| Settings / Performance / Ultrawide | SERP and competitors; Reddit ultrawide issue. | High troubleshooting intent. | COVER_NOW | Yes | Exact v0.8 settings list should be source/observed | High | No |
| Loadouts / Attachments | Official v0.8 and competitors. | Strong update and tool intent. | COVER_NOW | Yes | Exact attachment catalog | High | No |
| Weapon Builder Tool | Tool competitors and SERP. | Player wants build/share/evaluate. | COVER_PARTIAL / P1 | Yes, guide first | Official/in-game stats and formulas | Medium-high | Yes before tool build |
| Weapons Database | Tool competitors. | Useful but data-heavy. | COVER_PARTIAL / P1 | Yes, class overview first | Weapon list/stats provenance | Medium | Yes |
| Game Modes | Official site/Steam; competitors. | Core player task. | COVER_NOW | Yes | Objective scoring details may need observation | High | No |
| Maps / Trenches | Official site/Steam v0.8; competitors. | Current update map intent. | COVER_NOW | Yes | Exact layouts/callouts | High | No |
| Zombies | Official site/Steam; SERP/competitors. | Clear guide intent. | COVER_NOW | Yes | Detailed map/boss data | High | No |
| Reissad Points / Progression | Steam v0.8 #2 and competitors. | Unlock/reward question. | COVER_PARTIAL | Yes | Exact rewards after hotfix | Medium | No |
| Drones / RC Cars | Official site/Steam; roadmap. | New tactical gadget intent. | COVER_PARTIAL / P1 | Yes | Controls/stats/loadout details | Medium | No |
| Updates / Patch Notes | Steam News; competitors. | Current search intent. | COVER_NOW | Yes | Future patches | High | No |
| Official Links / Disambiguation | Steam official links; competitor pollution. | Avoid wrong Roblox/film pages. | COVER_NOW | Yes | none | High trust cost | No |
| FAQ | Competitors/community. | Recurring questions. | COVER_NOW | Yes | More community samples | Medium | No |
| Tier / Builds | Competitors cover; tool comments debate. | Meta intent exists. | DEFER / P2 | Partial class guidance only | Testing/community methodology | Risk of misinformation if rushed | Yes |
| Comparisons | Bodycam vs Unrecord/Ready or Not pages exist. | Informational/comparison. | DEFER / P2 | Yes later | Needs careful scope | Low for launch | Yes |
| Codes | Competitor captures Roblox codes. | Polluted/unrelated. | NOT_RELEVANT / FAQ caution | Yes, short disambiguation | Official code system not verified | Low if FAQ handles | No |
| Console/PS5/Xbox | Competitor pages exist. | Likely unrelated/polluted for this project. | NOT_RELEVANT | No | Official announcement absent | Low | No |

## Competitive Coverage Gate

- [x] Every material competitor/player-intent family has a decision.
- [x] `DEFER` decisions explain why.
- [x] Partial-page coverage considered before suppressing high-value families.
- [x] Competitor content not treated as factual authority.
- [x] Material gaps surfaced for Human approval.
- [x] Strongest-competitor visual/media benchmark complete.
- [x] Material visual/media gap has recovery plan, Human waiver path, or justified reason.
