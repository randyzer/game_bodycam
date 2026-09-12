import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { pageInventory, siteConfig } from "../src/core/site-data";

const gettingStartedUrl = new URL(
  "../src/content/guides/getting-started.mdx",
  import.meta.url,
);

function page(pageId: string) {
  const entry = pageInventory.find((candidate) => candidate.pageId === pageId);

  if (!entry) {
    throw new Error(`Missing Page Inventory entry: ${pageId}`);
  }

  return entry;
}

describe("Bodycam search intent optimization", () => {
  it("aligns homepage and getting-started metadata with observed queries", () => {
    expect(page("home")).toMatchObject({
      title: "Bodycam Guide: Tutorial, Modes, Settings & Updates",
      description:
        "Use this Bodycam guide for beginner tutorials, how to start a game, modes, PC settings, loadouts, maps, Zombies, and current updates.",
      updatedAt: "2026-09-12",
      primaryKeyword: "Bodycam guide",
    });
    expect(page("guide.getting-started")).toMatchObject({
      title: "How to Start a Game in Bodycam: Beginner Tutorial",
      description:
        "Learn how to start a game in Bodycam on Steam, choose a mode, prepare controls and settings, and handle the realistic no-HUD first match.",
      updatedAt: "2026-09-12",
      primaryKeyword: "how to start a game in Bodycam",
    });
  });

  it("answers how to start a game with stable, update-safe guidance", () => {
    const guide = readFileSync(gettingStartedUrl, "utf8");

    expect(guide).toContain('question: "How do I start a game in Bodycam?"');
    expect(guide).toContain("## How to Start a Game in Bodycam");
    expect(guide).toContain("Steam App ID 2406770");
    expect(guide).toContain("Follow the current lobby prompts");
    expect(guide).toContain("Menu labels and mode availability can change after updates");
  });

  it("features the existing game-modes guide without replacing Start Here", () => {
    expect(siteConfig.homepage.featuredPageIds[0]).toBe(
      "guide.getting-started",
    );
    expect(siteConfig.homepage.featuredPageIds).toContain("guide.game-modes");
  });
});
