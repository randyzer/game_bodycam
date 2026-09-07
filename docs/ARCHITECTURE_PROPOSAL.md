# Architecture Proposal

## Status

- Phase: Phase 1 planning
- Human approval: PENDING
- Implementation authorized: No
- Production code created: No
- Deployment authorized: No

## Recommendation

Adopt frozen GAME_SITE_STARTER v2.6 as the Phase 2 technical foundation without Stable Core redesign.

This project does not currently justify a database, CMS, auth, remote image engine, generic page builder, generic entity engine, transport engine, media workflow engine, or visual/layout DSL.

## Proposed Local Project Workspace

Current planning workspace:

```text
/Users/randyz/work/coding/hot_words_web/gameweb/game_bodycam
```

Recommended Phase 2 repository structure after Human approval:

```text
/
├── docs/
│   ├── SOP_READING_REPORT.md
│   ├── PROJECT_BRIEF.md
│   ├── RESEARCH_SOURCES.md
│   ├── KEYWORD_RESEARCH.md
│   ├── COMPETITOR_ANALYSIS.md
│   ├── SITE_STRUCTURE.md
│   ├── PAGE_INVENTORY.md
│   ├── P0_P1_P2.md
│   ├── MEDIA_DECISION_TABLE.md
│   ├── HUMAN_VISUAL_REVIEW_EVIDENCE.md
│   ├── CURRENT_STATUS.md
│   └── ARCHITECTURE_PROPOSAL.md
├── game.config.ts
├── src/
│   ├── data/
│   │   ├── page-inventory.json
│   │   ├── media/media.json
│   │   └── facts/
│   ├── content/
│   │   ├── guides/
│   │   ├── news/
│   │   └── meta/
│   ├── pages/
│   ├── components/
│   ├── core/
│   └── styles/
├── public/
│   └── media/
├── scripts/
├── tests/
└── package.json
```

Phase 2 should copy/adopt Starter v2.6 source only after Human Planning Gate approval.

## Starter Capabilities To Reuse

- Astro static output.
- Runtime Page Inventory as publication SSOT.
- Grouped navigation by Page ID.
- Content/fact/config/media/theme separation.
- MDX guide/news/meta content collections.
- Local images under `/media/`, local video, and YouTube 11-character ID embeds.
- Fixed media placements: `hero`, `gallery`, `trailer`.
- Pagefind search.
- Validation, output reconciliation, HTML audit, media audit, and media readiness checks.
- v2.6 site chrome vs content media separation and optional media readiness signal.

## Project-Specific Edge Decisions

| Need | Decision | Reason |
|---|---|---|
| Bodycam visual identity | Project theme/config/content edge | Derived from official visuals; no Starter redesign. |
| Weapon builder | P1 tool edge | Demand exists, but data source is not verified. |
| Weapon/attachment data | Fact layer only after source approval | Avoid unsupported third-party stats. |
| Official media usage | Media manifest after Human rights decision | Source URL is provenance, not legal clearance. |
| Third-party embed fallback | Project implementation using Starter-compatible media component behavior | Required visually, but no generic provider framework. |
| Multilingual pages | Defer | Target market is en-US/global English. |

## Source Truth Hierarchy

```text
Methodology Truth = GAME_SOP v2.6
Technical Capability Truth = GAME_SITE_STARTER v2.6
Publication Truth = Runtime Page Inventory
Narrative Truth = Content Layer
Structured Game Fact Truth = Fact Layer
Runtime Media Mapping Truth = Media Manifest
Route Media Planning / Lifecycle Support = MEDIA_DECISION_TABLE.md
Visual Review Evidence Truth = HUMAN_VISUAL_REVIEW_EVIDENCE.md
Navigation / Feature Configuration = game.config.ts
Visual Identity Implementation = theme.css and approved project presentation
Execution Status = CURRENT_STATUS.md
```

## Architecture Risks

- Master Prompt internal Starter label drift: Human should acknowledge that user-provided Starter v2.6 is the active Starter authority.
- Media rights: official/Steam media candidates exist, but local reuse requires Human approval.
- Tool data: exact weapon/attachment stats are attractive but not verified official data.
- Search intent pollution: avoid Roblox codes, console pages, film review, and unrelated Bodycam products.
- Patch velocity: v0.8 hotfixes already landed; patch maintenance must stay lightweight and source-first.

## Approval Needed Before Phase 2

- Confirm this local directory should become the Bodycam project repository.
- Approve copying/adopting Starter v2.6 into the project workspace.
- Decide whether a remote repository should be created later; no remote write now.
- Approve or reject the P0/P1/P2 scope.
- Approve media risk path: official media local reuse, YouTube embeds only, or Human-provided media.
