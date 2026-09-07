import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import pageInventory from "../src/data/page-inventory.json";

const editorialFiles = [
  "src/content/guides/getting-started.mdx",
  "src/content/guides/controls.mdx",
  "src/content/guides/best-settings.mdx",
  "src/content/guides/system-requirements.mdx",
  "src/content/guides/loadouts-and-attachments.mdx",
  "src/content/guides/tactical-tablet.mdx",
  "src/content/guides/game-modes.mdx",
  "src/content/guides/maps.mdx",
  "src/content/guides/zombies.mdx",
  "src/content/news/locked-and-loaded.mdx",
  "src/content/news/v0-8-patch-notes.mdx",
  "src/pages/faq.astro",
  "src/pages/official-links.astro",
] as const;

const p1p2Routes = [
  "/guides/progression-and-rp/",
  "/guides/drones-and-rc-cars/",
  "/guides/trenches/",
  "/weapons/weapons-overview/",
  "/weapons/attachments/",
  "/tools/weapon-builder/",
  "/tier-list/weapons/",
  "/comparison/bodycam-vs-unrecord/",
  "/community/player-count/",
] as const;

const publicPlanningTerms =
  /\bP[0-2]\b|\bPhase\s+[0-3]\b|Human approval|Human Content Gate|Human Visual Gate|planning approval|publication backlog|priority tier|private route|private\/noindex|noindex|internal roadmap/i;
const publicWorkflowPhrases =
  /approved observation before publication|before publication|later approval|release approval|reverify before (?:publication|release)|review before publication|planning evidence|planning note|publication check|Human approval|approval pending|Human review status|evidence workflow/i;

function source(path: string) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

function bodyWithoutFrontmatter(markdown: string) {
  return markdown.replace(/^---[\s\S]*?---\s*/, "");
}

function markdownLinksTo(route: string) {
  return new RegExp(String.raw`\]\(${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\)`);
}

describe("Bodycam Phase 3 content candidates", () => {
  it("replaces Phase 2 stub markers in public P0 editorial surfaces", () => {
    for (const file of editorialFiles) {
      const body = bodyWithoutFrontmatter(source(file));

      expect(body, file).not.toMatch(
        /Phase 2 Scope|Launch Stub|Source Boundary|reserves? (?:the )?(?:controls|co-op|sourced|a sourced|Bodycam)|before full editorial content is written/i,
      );
    }
  });

  it("does not link public P0 content to private P1/P2 routes", () => {
    for (const file of editorialFiles) {
      const text = source(file);

      for (const route of p1p2Routes) {
        expect(text, `${file} links ${route}`).not.toMatch(markdownLinksTo(route));
        expect(text, `${file} hrefs ${route}`).not.toContain(`href="${route}"`);
      }
    }
  });

  it("does not expose internal planning terminology in public P0 player-facing copy", () => {
    for (const file of editorialFiles) {
      const body = bodyWithoutFrontmatter(source(file));

      expect(body, file).not.toMatch(publicPlanningTerms);
    }
  });

  it("does not expose internal website workflow phrases in public P0 player-facing copy", () => {
    for (const file of editorialFiles) {
      const body = bodyWithoutFrontmatter(source(file));

      expect(body, file).not.toMatch(publicWorkflowPhrases);
    }
  });

  it("covers representative Phase 3 fact requirements from approved official sources", () => {
    expect(source("src/content/guides/getting-started.mdx")).toMatch(
      /Steam App ID 2406770[\s\S]*Reissad Studio|Reissad Studio[\s\S]*Steam App ID 2406770/,
    );
    expect(source("src/content/guides/system-requirements.mdx")).toMatch(
      /Ryzen 7 3700X[\s\S]*RTX 2070[\s\S]*50 GB|RTX 2070[\s\S]*Ryzen 7 3700X[\s\S]*50 GB/,
    );
    expect(source("src/content/news/locked-and-loaded.mdx")).toMatch(
      /2026-09-02[\s\S]*Trenches[\s\S]*loadout[\s\S]*tactical tablet/i,
    );
    expect(source("src/pages/faq.astro")).toMatch(
      /Roblox[\s\S]*console[\s\S]*weapon builder|weapon builder[\s\S]*Roblox[\s\S]*console/i,
    );
  });

  it("keeps runtime publication metadata player-facing and P0-only", () => {
    const counts = { p0: 0, p1: 0, p2: 0 };

    for (const page of pageInventory) {
      const phase = page.tags.find((tag) => /^phase-p[0-2]$/.test(tag));
      if (phase === "phase-p0") counts.p0 += 1;
      if (phase === "phase-p1") counts.p1 += 1;
      if (phase === "phase-p2") counts.p2 += 1;

      if (phase === "phase-p0") {
        expect(`${page.title} ${page.description}`, page.pageId).not.toMatch(
          /\bP0\b|\bstub\b|planning|deferred|source-approved|later content work/i,
        );
      } else {
        expect(page.visibility, page.pageId).toBe("private");
        expect(page.publicationStatus, page.pageId).toBe("draft");
        expect(page.indexability, page.pageId).toBe("noindex");
      }
    }

    expect(pageInventory).toHaveLength(25);
    expect(counts).toEqual({ p0: 16, p1: 6, p2: 3 });
  });
});
