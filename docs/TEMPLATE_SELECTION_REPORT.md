# Bodycam Template Selection Report

## Decision

- Game: Bodycam (Steam app 2406770)
- Selected main template: `temp5_based_bombfarm.wiki`
- Template source path: `/Users/randyz/work/coding/hot_words_web/gamewiki_site_auto_generator_line/template/temp5_based_bombfarm.wiki`
- Destination path: `/Users/randyz/work/coding/hot_words_web/gameweb/game_bodycam/.worktrees/codex-bodycam-template-rebuild-20261013`
- Decision status: SELECTED
- Research date: 2026-10-13 (Asia/Taipei)
- Copy status: COPIED
- Source integrity: VERIFIED UNCHANGED

## Game design brief

| Attribute | Finding | Evidence |
| --- | --- | --- |
| Platform and genre | PC/Steam tactical multiplayer FPS by Reissad Studio; Unreal Engine 5 | [Steam](https://store.steampowered.com/app/2406770/Bodycam/), [official site](https://www.playbodycam.com/en-US) |
| Core player loop | Join a multiplayer match, coordinate and survive short tactical engagements; Deathmatch, Team Deathmatch and Wingman are documented modes | Steam store and official Steam announcements |
| Visual tone | Body-camera lens, low-light contrast, realistic footage and tense close-range action | [Official site](https://www.playbodycam.com/en-US), [Steam](https://store.steampowered.com/app/2406770/Bodycam/) |
| Main search intents | Getting started, modes, friends, performance/settings, platform availability, updates, equipment and Zombies | User's `background_information/keyword-materials/关键词.md`; intents are editorial planning, not measured demand |
| Expected IA | English-first homepage, guide directory, factual long-form articles, related guides and verified official links | Inference from supplied keywords and official multiplayer positioning |
| Article/media needs | TOC, FAQs, source notes, tables and scoped illustrations; no template game screenshots may be reused | Inference from guide intents and source-truth requirement |

Steam's displayed early-access release date can vary by region. The site will avoid a timezone-free date claim until the final copy cites the display context. Dynamic price, review and player counts will not be hardcoded.

## Template scorecard

| Rank | Template | IA /25 | Visual /20 | Content /20 | Article /15 | Discovery /10 | Safety /10 | Total /100 |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | temp5_based_bombfarm.wiki | 23 | 16 | 17 | 14 | 8 | 5 | 83 |
| 2 | temp3_based_gamblewithyourfriends.net | 21 | 13 | 17 | 14 | 6 | 5 | 76 |
| 3 | temp6_based_theskinstapler.com | 17 | 17 | 15 | 10 | 9 | 5 | 73 |
| 4 | temp4_based_miniwars.art | 20 | 17 | 15 | 7 | 6 | 6 | 71 |
| 5 | temp1_based_vvultimatum.net | 16 | 12 | 13 | 10 | 7 | 6 | 64 |
| 6 | temp2_based_farevergame.wiki | 13 | 14 | 11 | 7 | 5 | 5 | 55 |

## Evidence by template

### temp5_based_bombfarm.wiki

- Strengths for this game: homepage has broad guide-category and second-click structure; MDX article renders breadcrumbs, TOC, FAQ and related cards; dynamic route and sitemap generation accommodate the keyword set.
- Mismatches: fictional mining copy, five-language demo content, fake statistics, preview cards and quarry art must all be removed or replaced.
- Evidence inspected: `README.md`, `src/components/{home,document,header}.tsx`, `src/lib/{content,guide-items,seo}.ts`, `content/en/guides/*.mdx`, `src/app/`, `tests/content.test.ts`, `public/`.
- Score rationale: strongest broad editorial shell and article utility, with a substantial but bounded identity/content cleanup and limited test depth.

### temp3_based_gamblewithyourfriends.net

- Strengths for this game: instructional MDX blocks support tactical steps, mistakes, figures, and FAQs; route discovery is data-driven.
- Mismatches: social/casino composition and guide-list density are less suited to the desired wide Bodycam wiki; related discovery is weak.
- Evidence inspected: `README.md`, `components/{home-page,article-page,mdx-components}.tsx`, `content/en/`, `lib/`, `scripts/*.test.ts`, `public/images/`.
- Score rationale: excellent how-to detail but weaker homepage IA and greater visual replacement cost.

### temp6_based_theskinstapler.com

- Strengths for this game: dark editorial treatment, strong keyboard search and article index, documented browser/accessibility verification.
- Mismatches: horror/evidence framing and narrower page family do not cover the full tactical guide hierarchy as directly.
- Evidence inspected: `README.md`, `app/`, `components/`, `content/`, `package.json`, tests and verification scripts.
- Score rationale: strong discovery and tone; less suitable for broad multi-category homepage.

### temp4_based_miniwars.art

- Strengths for this game: tactical visual density, responsive navigation and related content scoring.
- Mismatches: no article TOC, rich figures or article FAQ; sample rankings and online labels are fictional/static.
- Evidence inspected: `README.md`, `src/components/{home,article,header}.tsx`, `src/lib/`, `content/`, `tests/`, `public/`.
- Score rationale: tactical feel is close, but content/detail gaps matter for the keyword-led guide site.

### temp1_based_vvultimatum.net

- Strengths for this game: wiki/archive browsing, sidebar and explicit unavailable states.
- Mismatches: race/entity-centered model and archive tone are less aligned with tactical how-to searches; media pipeline is sparse.
- Evidence inspected: `README.md`, `src/app/`, `src/components/`, `content/`, `tests/`, `public/`.
- Score rationale: good structured browsing, lower player-intent and visual fit.

### temp2_based_farevergame.wiki

- Strengths for this game: coherent atmospheric presentation and MDX editorial baseline.
- Mismatches: fantasy/lore framing, simpler article utilities and weaker mobile/discovery depth.
- Evidence inspected: `README.md`, `src/app/`, `src/components/`, `content/`, `tests/`, `public/`.
- Score rationale: largest genre mismatch and most article/navigation adaptation.

## Why the selected template wins

The Bodycam keyword set spans multiple questions rather than a single gameplay path. Temp5 already provides a rich homepage, guide directory, TOC/FAQ article shell and related links. Its route model can publish English articles from MDX and generate sitemap entries from the same source. Temp3 has stronger instructional blocks, but temp5 wins the player-intent and homepage comparison by seven points.

The chosen template is only a structural starting point. Its Quarry Field identity, placeholder guide data, fake statistics, other-language demo pages, dates and media have no authority for Bodycam and must be removed before release.

## Supplemental module recommendations

| Priority | Module | Source template and file | Player value | Dependencies | Conflict/risk | Effort |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Instructional Step/Callout MDX blocks | `temp3_based_gamblewithyourfriends.net/components/mdx-components.tsx` | Makes setup and match-preparation guides scannable | MDX component registration and local CSS | Styling and props differ from temp5; recommendation only, no code copied | Medium |

## Copy record

- Eligible source file count: 58
- Aggregate source hash: `3e1fb6cbdf2c392620168b780596cd1f2ef80f4e807d7314485f584e03ff2417`
- Aggregate destination hash: `3e1fb6cbdf2c392620168b780596cd1f2ef80f4e807d7314485f584e03ff2417`
- Excluded patterns: `.git`, `.next`, `node_modules`, `.turbo`, coverage, caches, `.DS_Store`, `*.tsbuildinfo`, `.env*`.
- Manifest: `docs/template-copy-manifest.json`
- Source before/after match: yes
- Destination file verification: yes
- `TEMPLATE_RESIDUE_SCAN.json`: COMPLETE across source, MDX, metadata, assets and routes; 90 known identity-marker matches in 19 files. It detects source residue, not proof of target-site correctness.

## Adaptation boundaries

The content phase must replace branding, copy, art, taxonomy and SEO from verified Bodycam sources. No source template file or old Bodycam `main` source file will be adapted in place. The selected template's original sample content and screenshots are not Bodycam evidence.

## Open decisions

- Confirm final production indexability and Vercel branch switch only after the release gate and the reviewed push plan.
