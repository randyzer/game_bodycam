# Research Sources

All source use follows GAME_SOP v2.6 `SOURCE_POLICY.md`. Discovery evidence helps plan coverage; it does not prove game facts.

## Official Sources

| Source | URL | Type | Reliability | Access State | Preferred Transport | Fallback Transport | Allowed Usage | Last Checked | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Steam Store | https://store.steampowered.com/app/2406770/Bodycam/ | official_store | High | READ | Jina Reader / Steam page | Steam appdetails API | Facts, media candidates, official links | 2026-09-07 | Verified Early Access release date, developer/publisher, tags, reviews summary, screenshots, videos, requirements. |
| Steam appdetails API | https://store.steampowered.com/api/appdetails?appids=2406770&cc=us&l=english | official_store_api | High | READ | Steam API | none needed | Structured facts and media candidates | 2026-09-07 | Verified name, platform data, categories, genres, screenshots, movies, requirements, price observed. |
| Steam News API | https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=2406770 | official_patch | High | READ | Steam API | Steam store news cards | Patch/update facts | 2026-09-07 | Verified v0.8 release and hotfix timing. |
| Steam Review Summary API | https://store.steampowered.com/api/appreviews/2406770 | official_store_api | High | TRANSPORT_BLOCKED | Steam appreviews API | Steam Store page text | Review summary only | 2026-09-07 | API returned `access denied`; Store page still showed review summaries. |
| Official website | https://www.playbodycam.com/en-US | official_site | High | READ | Jina Reader | CDP browser if needed | Facts, official media, visual identity | 2026-09-07 | Verified official positioning, feature sections, media URLs, newsletter/social links. |
| IGDB | https://www.igdb.com/games/bodycam | platform_database | Medium | READ | Jina Reader | none needed | Supplemental cross-check only | 2026-09-07 | Confirms release date/developer/publisher; not primary fact authority over Steam/official site. |
| Official X | https://x.com/ReissadStudio | official_social | High | PARTIAL | `twitter-cli` | CDP browser | Profile/source validation only | 2026-09-07 | `twitter-cli` installed but current process not authenticated. CDP read profile bio/followers but not full timeline. |
| Official YouTube | https://www.youtube.com/@ReissadStudio | official_video | High | READ | `yt-dlp --flat-playlist` | YouTube URL metadata | Official video evidence | 2026-09-07 | Recent videos include Locked & Loaded trailer and four v0.8 devlogs. |
| Official Discord invite | https://discord.gg/reissadstudio | official_community | High | READ | Discord invite API | none needed | Community channel validation | 2026-09-07 | API returned verified Reissad Studio guild and approximate counts. |
| Official Reddit | https://www.reddit.com/r/BodycamGame/ | official/community | Medium | PARTIAL | Reddit backend | CDP browser | Community discovery only | 2026-09-07 | Reddit backend unavailable. CDP read subreddit, posts, and several comment threads; do not use as market conclusion alone. |

## Verified Official Facts

| Fact | Source | Status | Last checked |
|---|---|---|---|
| Bodycam is a PC/Steam game by Reissad Studio. | Steam Store / appdetails | Verified | 2026-09-07 |
| Developer and publisher are Reissad Studio. | Steam Store / appdetails / IGDB | Verified | 2026-09-07 |
| Early Access release date is 2024-06-07. | Steam Store / appdetails / IGDB | Verified | 2026-09-07 |
| Steam page describes Bodycam as a tactical multiplayer FPS with true body-camera view in Unreal Engine 5. | Steam Store / official site | Verified | 2026-09-07 |
| v0.8 Locked & Loaded released on 2026-09-02 at 17:00 UTC. | Steam News API / Steam news cards | Verified | 2026-09-07 |
| v0.8 #1 patch notes posted 2026-09-03 17:03 UTC; v0.8 #2 posted 2026-09-04 15:30 UTC. | Steam News API | Verified | 2026-09-07 |
| Modes officially visible include Wingman, Body Bomb, Team Deathmatch, Deathmatch, Hardpoint, Gun Game, and Zombies. | Steam Store / official site | Verified | 2026-09-07 |
| Current official site discusses maps, Zombies, progression, weapon customization, FPV drone, RC car, and Early Access roadmap. | Official website | Verified | 2026-09-07 |
| PC minimum/recommended requirements are available from Steam appdetails. | Steam appdetails | Verified | 2026-09-07 |

## Official Visual Evidence

| Source | URL | Evidence status | Identity dimension supported | What it supports | Last checked | Notes |
|---|---|---|---|---|---|---|
| Official website hero video | https://www.playbodycam.com/en-US | VERIFIED | lighting / motion / first-screen | Dark tactical bodycam motion, real footage framing | 2026-09-07 | Source URL only; rights not automatically cleared for rehosting. |
| Official logo | https://www.playbodycam.com/en-US | VERIFIED | logo / typography | White Bodycam logo and stark tactical presentation | 2026-09-07 | Site chrome candidate; Human rights decision needed. |
| Steam capsule/header | https://store.steampowered.com/app/2406770/Bodycam/ | VERIFIED | key art / composition | Official Steam visual identity | 2026-09-07 | Prefer embedded/source-linked or Human-approved local asset. |
| Steam screenshots | Steam appdetails screenshots | VERIFIED | gameplay screenshots / maps / UI | Semantically matched page media candidates | 2026-09-07 | 46 screenshot records observed in appdetails output. |
| Steam videos/extras | Steam appdetails and store page | VERIFIED | gameplay motion / systems | Reloads, loadout, drone, tablet, maps, Zombies | 2026-09-07 | Local rehosting not approved. |
| YouTube Locked & Loaded trailer | https://www.youtube.com/watch?v=AQ3DPo2fvSc | VERIFIED | update media / trailer | v0.8 launch/update media anchor | 2026-09-07 | Starter supports 11-character YouTube ID. |

## Media Asset Inventory

| Asset ID | Type | Source URL | First-party/Observed? | Candidate State | Rights State | Integration State | Visual Gate State | Intended Page(s) / Route Reference | Usage/Rights Note | Alt/Caption Note | Last Checked |
|---|---|---|---|---|---|---|---|---|---|---|---|
| official-site-hero-video | video | https://www.playbodycam.com/en-US | First-party | FOUND | UNRESOLVED | NOT INTEGRATED | PENDING | `home` | Do not rehost without Human rights decision. | Official Bodycam hero footage. | 2026-09-07 |
| steam-capsule | image | https://store.steampowered.com/app/2406770/Bodycam/ | First-party/platform | FOUND | UNRESOLVED | NOT INTEGRATED | PENDING | `home`, `guide.getting-started` | Steam/media terms need Human review. | Bodycam Steam capsule/header. | 2026-09-07 |
| steam-screenshots | image | Steam appdetails screenshots | First-party/platform | FOUND | UNRESOLVED | NOT INTEGRATED | PENDING | maps, loadouts, Zombies, settings | Use source/provenance; no competitor media. | Gameplay screenshots from official Steam page. | 2026-09-07 |
| youtube-locked-loaded | video | https://www.youtube.com/watch?v=AQ3DPo2fvSc | First-party | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | INTEGRATED | PENDING | `update.locked-loaded`, `home` | Embedded via YouTube ID only; no local rehosting. | Official Locked & Loaded trailer. | 2026-09-07 |
| youtube-devlog-animation-loadout | video | https://www.youtube.com/watch?v=6YUWQXv0MTk | First-party | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | INTEGRATED | PENDING | `guide.loadouts`, `guide.tactical-tablet` | Embedded via YouTube ID only; no local rehosting. | Official animation/loadout devlog. | 2026-09-07 |
| youtube-devlog-trenches | video | https://www.youtube.com/watch?v=hRDSX1RLtnw | First-party | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | INTEGRATED | PENDING | `guide.maps` | Embedded for P0 maps route via YouTube ID only; P1 `guide.trenches` remains a future candidate. | Official Trenches devlog. | 2026-09-07 |

## Discovery - Web / SERP

| Query | Platform | Page Title | URL | Date | Source Class | Observed Intent | Planning Effect |
|---|---|---|---|---|---|---|---|
| Bodycam game wiki | Bing CDP | Bodycam Wiki: Guides, Loadouts, Maps, Zombies (Sep 2026) | https://bodycamgame.wiki/ | 2026-09-07 | discovery | broad wiki/guides/updates/tools | Identify strongest SEO competitor and page families. |
| Bodycam best settings Steam | Bing CDP | Best Bodycam Settings for Optimal Performance and Visual Quality | https://bodycam.wiki/guide/bodycam-settings | 2026-09-07 | discovery | settings/performance | P0 settings guide. |
| Bodycam weapon builder loadout | Bing CDP | Bodycam Loadout / Build Lab / Bodycamgame weapon builder | https://bodycamloadout.com/ | 2026-09-07 | discovery | tool/loadout data | P1 tool opportunity; P0 guide first. |
| Bodycam zombies guide | Bing CDP | Bodycam Asylum/Zombies guides | https://bodycam.wiki/guide/bodycam-asylum-guide | 2026-09-07 | discovery | Zombies survival/map guide | P0 Zombies guide. |

## Discovery - Competitors

| Competitor/Page | URL | Date | Coverage | Navigation/UX Observation | Media Observation | Planning Effect |
|---|---|---|---|---|---|---|
| bodycamgame.wiki homepage | https://bodycamgame.wiki/ | 2026-09-07 | Guides, tier list, updates, tools, links, multilingual | Strong hub structure with current update sections | Hero and overview images; cards and quick facts | Strongest benchmark; do not copy. |
| bodycamgame.wiki weapon builder | https://bodycamgame.wiki/tools/weapon-builder/ | 2026-09-07 | Loadout guide/tool intent | Explains slots and attachment priorities | Text-led, low media | Confirms tool/search intent; exact stats need independent verification. |
| bodycam.wiki homepage | https://bodycam.wiki/ | 2026-09-07 | Many thin pages across guide/steam/console/comparison/codes | Large coverage but mixed intent | Hero video/image | Shows risk of Bodycam film/Roblox/console contamination. |
| gamebodycam.wiki | https://www.gamebodycam.wiki/ | 2026-09-07 | Compact guide landing page | Mostly anchors/previews | Strong hero/media but limited depth | Secondary benchmark. |
| bodycamwiki.wiki | https://bodycamwiki.wiki/ | 2026-09-07 | Programmatic long-tail pages | Repetitive page-factory feel | Some official stills/videos | Coverage caution; avoid thin-page factory. |

## Discovery - YouTube / Community

| Query/Surface | Platform | URL | Date | Source Class | Observed Question | Planning Effect |
|---|---|---|---|---|---|---|
| Official channel recent videos | YouTube via `yt-dlp` | https://www.youtube.com/@ReissadStudio | 2026-09-07 | official_video | v0.8 trailer/devlogs drive update-specific intent | Use videos as official system evidence and media candidates. |
| r/BodycamGame homepage | Reddit via CDP | https://www.reddit.com/r/BodycamGame/ | 2026-09-07 | community/discovery | roadmap, update, ultrawide issue, gun builder | Use only as community question discovery. |
| Gun Builder post/comments | Reddit via CDP | https://www.reddit.com/r/BodycamGame/comments/1w9klk6/ | 2026-09-07 | community/discovery | players compare builder depth; ammo check question appears | Supports P1 tool interest and FAQ candidates. |
| Ultra Wide issue comments | Reddit via CDP | https://www.reddit.com/r/BodycamGame/comments/1pqir15/ | 2026-09-07 | community/discovery | resolution/config troubleshooting | Supports P0 troubleshooting/settings page. |
| 2026 Roadmap Part 1 | Reddit via CDP | https://www.reddit.com/r/BodycamGame/comments/1rmtn8a/ | 2026-09-07 | official/community | loadout, tablet, sound, Trenches, drone, UI | Use as supplemental; Steam news/devlogs remain preferred. |

## Unsupported / Inaccessible Evidence

- Reddit dedicated backend: unavailable. `agent-reach doctor --json` reported no Reddit backend installed; CDP browser provided partial read. Reddit conclusions are limited to community discovery, not market judgment.
- X timeline: current process `twitter-cli` not authenticated; CDP read profile only. No X market/social timeline conclusions.
- Steam appreviews API: returned `access denied`; Steam Store page provided equivalent review-summary text.
- Discord message contents: invite/guild metadata only; no channel content read and no Discord market conclusion.
- Exact live weapon/attachment stats: third-party tools observed, but not official. Do not publish exact stats until observed in-game or verified from approved data.
- Search volumes/difficulty: no keyword-volume tool available; do not invent metrics.
- Media reuse rights: unresolved pending Human decision.
