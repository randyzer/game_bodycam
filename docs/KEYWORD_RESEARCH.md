# Keyword Research

## Evidence Limits

- Checked official Steam, official website, official YouTube, Steam news, Bing SERP, competitor pages, Reddit CDP samples, and tool competitors.
- No reliable keyword volume, difficulty, or trend tool was available.
- Bing CDP still resolved through `cn.bing.com` even with en-US parameters; results were useful for discovery but not rank-proof for the United States.
- Reddit backend was unavailable; Reddit data is partial community discovery only.
- Do not infer traffic, ranking, or market size from this artifact.

## Seed Cluster

```text
bodycam
bodycam game
bodycam steam
bodycam wiki
bodycam locked and loaded
bodycam v0.8
bodycam best settings
bodycam loadout
bodycam weapon builder
bodycam attachments
bodycam maps
bodycam trenches
bodycam zombies
bodycam controls
bodycam system requirements
bodycam ultrawide issue
bodycam no crosshair no HUD
```

## Keyword Table

| Keyword | Source | Intent | Entity | Player Task | Cluster | Volume | Trend | Difficulty | Priority | Target URL | Status |
|---|---|---|---|---|---|---:|---|---:|---:|---|---|
| Bodycam wiki | Bing / competitors | informational | game | Find a reliable hub | Core wiki | Unknown | Unknown | Unknown | 100 | `/` | P0 |
| Bodycam game wiki | Bing | informational | game | Avoid unrelated Bodycam products | Core wiki | Unknown | Unknown | Unknown | 95 | `/` | P0 |
| Bodycam Steam | Steam / Bing | navigational | game | Confirm correct game/store | Official links | Unknown | Unknown | Unknown | 90 | `/official-links/` | P0 |
| Bodycam Locked and Loaded | Steam news / Bing | update/patch | v0.8 | Understand the major update | Updates | Unknown | current | Unknown | 100 | `/updates/locked-and-loaded/` | P0 |
| Bodycam v0.8 patch notes | Steam news | update/patch | v0.8 | Find patch changes and hotfixes | Updates | Unknown | current | Unknown | 95 | `/updates/v0-8-patch-notes/` | P0 |
| Bodycam best settings | Bing / competitors / Reddit issue | troubleshooting | settings | Improve FPS/visibility/input | Settings | Unknown | current | Unknown | 95 | `/guides/best-settings/` | P0 |
| Bodycam performance settings | Bing / Steam requirements | troubleshooting | settings | Tune UE5 performance | Settings | Unknown | current | Unknown | 88 | `/guides/best-settings/` | P0 |
| Bodycam ultrawide issue | Reddit CDP | troubleshooting | settings | Fix resolution/input issue | Settings FAQ | Unknown | Unknown | Unknown | 70 | `/guides/best-settings/` | P0 FAQ |
| Bodycam controls | Competitor sitemap / Steam | how-to | controls | Learn inputs/tablet/ammo check | Onboarding | Unknown | Unknown | Unknown | 85 | `/guides/controls/` | P0 |
| Bodycam how to play | Competitors | how-to | gameplay | Survive first matches | Onboarding | Unknown | Unknown | Unknown | 92 | `/guides/getting-started/` | P0 |
| Bodycam game modes | Official site / competitors | informational | modes | Understand playlists/objectives | Modes | Unknown | current | Unknown | 90 | `/guides/game-modes/` | P0 |
| Bodycam maps | Official site / competitors | informational | maps | Learn map families and v0.8 Trenches | Maps | Unknown | current | Unknown | 90 | `/guides/maps/` | P0 |
| Bodycam Trenches map | Steam news / YouTube / competitors | informational | map | Understand new v0.8 map | Maps | Unknown | current | Unknown | 82 | `/guides/maps/` | P0 section / P1 page |
| Bodycam Zombies guide | Bing / official site / competitors | how-to | Zombies | Survive co-op Zombies | Zombies | Unknown | current | Unknown | 90 | `/guides/zombies/` | P0 |
| Bodycam loadout | Steam / Bing / competitors | how-to | loadouts | Build a kit after v0.8 | Loadouts | Unknown | current | Unknown | 96 | `/guides/loadouts-and-attachments/` | P0 |
| Bodycam weapon builder | Bing / tool competitors | calculator/tool | weapons | Build/share/evaluate a weapon | Tools | Unknown | current | Unknown | 86 | `/tools/weapon-builder/` | P1 |
| Bodycam attachments | Steam / tools | database | attachments | Compare parts | Weapons data | Unknown | current | Unknown | 78 | `/weapons/attachments/` | P1 |
| Bodycam Reissad Points | Steam patch / competitors | informational | progression | Understand rewards/unlocks | Progression | Unknown | current | Unknown | 78 | `/guides/progression-and-rp/` | P1 or P0 section |
| Bodycam FPV drone | Official site / Steam | how-to | gadget | Use drones/RC cars | Gadgets | Unknown | current | Unknown | 76 | `/guides/drones-and-rc-cars/` | P1 |
| Bodycam weapon tier list | Competitor | best/meta | weapons | Pick strongest weapons | Meta | Unknown | Unknown | Unknown | 45 | `/tier-list/weapons/` | P2 |
| Bodycam player count | Competitor | informational | community | Track popularity | Community | Unknown | Unknown | Unknown | 35 | `/community/player-count/` | DEFER |
| Bodycam codes | Competitor / disambiguation | obtain/unlock | codes | Find redeem codes | Codes | Unknown | polluted | Unknown | 20 | no page or FAQ note | DEFER / caution |
| Bodycam Roblox codes | SERP/competitor pollution | obtain/unlock | unrelated Roblox | Roblox rewards | Wrong product | Unknown | Unknown | Unknown | 0 | no page | NOT_RELEVANT |

## Search-Intent Merge

Keyword is not equal to page.

| Cluster | Merged queries | Page intent | Target page |
|---|---|---|---|
| Core wiki | Bodycam wiki, Bodycam game wiki, Bodycam guide | Disambiguated Bodycam hub for Reissad Studio Steam game | `/` |
| Official links | Bodycam Steam, Bodycam Discord, Bodycam official site | Confirm correct first-party URLs | `/official-links/` |
| v0.8 updates | Locked & Loaded, v0.8, patch notes, new update | Summarize verified update and hotfixes | `/updates/locked-and-loaded/`, `/updates/v0-8-patch-notes/` |
| Settings | best settings, performance, ultrawide, DLSS/FSR/XeSS | Practical settings/troubleshooting | `/guides/best-settings/` |
| Onboarding | how to play, controls, no HUD, ammo check | First match and controls | `/guides/getting-started/`, `/guides/controls/` |
| Modes/maps | game modes, maps, Trenches, Body Bomb, Wingman, Zombies | Explain objectives and spaces | `/guides/game-modes/`, `/guides/maps/`, `/guides/zombies/` |
| Loadouts/tools | loadout, attachments, weapon builder, Reissad Points | Build kits and understand unlocks | `/guides/loadouts-and-attachments/`, P1 `/tools/weapon-builder/` |
| Meta/comparison | tier list, best weapons, vs Unrecord, vs Ready or Not | Opinion/meta/comparison content | P2 only |
| Polluted intent | Roblox codes, console/PS5/Xbox lookalikes, horror film Bodycam | Distinguish unrelated products | FAQ note, no thin pages |

## Target Mapping

- Existing target: none; project is planning-only.
- Proposed P0 target: update-aware guide hub with 16 planned P0 rows.
- Partial target: maps, loadouts, progression, and settings can publish verified overview scope before full data tables exist.
- Deferred/no page: codes, console guides, player-count pages, and tier lists until better evidence exists.

## Deferred Intents

| Intent | Decision | Why | Partial possible? | Revisit trigger |
|---|---|---|---|---|
| Weapon builder | P1 | Tool competitors show demand, but exact official stats/attachments are not verified. | Yes: P0 loadout guide. | Human approves data source or in-game observation workflow. |
| Weapon tier list | P2 | Requires repeated testing/community consensus and patch stability. | Yes: explain weapon classes without rankings. | Stable v0.8 meta evidence and methodology. |
| Player count / charts | DEFER | Would depend on SteamDB or platform data; not core player task for launch. | Maybe FAQ/source link. | Human requests community/status pages. |
| Codes | DEFER / disambiguation | SERP contains Roblox/unrelated code intent; official Bodycam code system not verified. | FAQ can state no verified official code system if sourced. | Official code/redeem system appears. |
| Console/PS5/Xbox | NOT_RELEVANT for P0 | User specified PC/Steam/Windows; competitor pages mix unrelated products. | No. | Official Reissad console announcement. |
