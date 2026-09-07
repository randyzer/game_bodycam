import { describe, expect, it } from "vitest";

import {
  enabledPageCatalog,
  pageInventory,
  resolvedNavigationGroups,
  siteConfig,
} from "../src/core/site-data";

const p0Routes = [
  "/",
  "/guides/",
  "/guides/getting-started/",
  "/guides/controls/",
  "/guides/best-settings/",
  "/guides/system-requirements/",
  "/updates/locked-and-loaded/",
  "/updates/v0-8-patch-notes/",
  "/guides/loadouts-and-attachments/",
  "/guides/tactical-tablet/",
  "/guides/game-modes/",
  "/guides/maps/",
  "/guides/zombies/",
  "/official-links/",
  "/faq/",
  "/search/",
];

const futureP1Routes = [
  "/guides/progression-and-rp/",
  "/guides/drones-and-rc-cars/",
  "/guides/trenches/",
  "/tools/weapon-builder/",
];

const excludedSupportRoutes = ["/about/", "/privacy/", "/terms/", "/404.html"];

describe("Bodycam Phase 2 publication boundary", () => {
  it("identifies the approved Bodycam project", () => {
    expect(siteConfig.brand.name).toBe("Bodycam Guide");
    expect(siteConfig.brand.tagline).toContain("Reissad Studio");
    expect(siteConfig.seo.defaultTitle).toContain("Bodycam");
    expect(siteConfig.seo.defaultDescription).toContain("Steam");
  });

  it("implements the approved 25-page planning inventory and 16-page P0 catalog", () => {
    const phaseCounts = pageInventory.reduce<Record<string, number>>(
      (counts, page) => {
        const phase = page.tags.find((tag) => /^phase-p[0-2]$/.test(tag));
        if (phase) counts[phase] = (counts[phase] ?? 0) + 1;
        return counts;
      },
      {},
    );

    expect(pageInventory).toHaveLength(25);
    expect(phaseCounts).toEqual({ "phase-p0": 16, "phase-p1": 6, "phase-p2": 3 });
    expect(enabledPageCatalog.map((page) => page.route).sort()).toEqual(
      [...p0Routes].sort(),
    );
  });

  it("keeps P1 and P2 routes private, noindex, and disabled from public output", () => {
    const backlogPages = pageInventory.filter((page) =>
      page.tags.some((tag) => tag === "phase-p1" || tag === "phase-p2"),
    );

    expect(backlogPages).toHaveLength(9);
    expect(
      backlogPages.every(
        (page) =>
          page.visibility === "private" &&
          page.publicationStatus !== "published" &&
          page.indexability === "noindex",
      ),
    ).toBe(true);

    const enabledRoutes = new Set(enabledPageCatalog.map((page) => page.route));
    for (const route of [...futureP1Routes, "/tier-list/weapons/"]) {
      expect(enabledRoutes.has(route)).toBe(false);
    }
  });

  it("uses only P0 launch routes in current navigation", () => {
    const navigationRoutes = resolvedNavigationGroups.flatMap((group) => [
      group.page.route,
      ...group.children.map((page) => page.route),
    ]);

    expect(navigationRoutes.sort()).toEqual([
      "/",
      "/guides/getting-started/",
      "/guides/best-settings/",
      "/guides/loadouts-and-attachments/",
      "/guides/maps/",
      "/guides/zombies/",
      "/updates/locked-and-loaded/",
      "/search/",
      "/guides/controls/",
      "/guides/system-requirements/",
      "/guides/tactical-tablet/",
      "/guides/game-modes/",
      "/updates/v0-8-patch-notes/",
      "/official-links/",
    ].sort());

    for (const route of futureP1Routes) {
      expect(navigationRoutes).not.toContain(route);
    }
  });

  it("does not publish support or system route bypasses", () => {
    const inventoryRoutes = new Set(pageInventory.map((page) => page.route));
    const enabledRoutes = new Set(enabledPageCatalog.map((page) => page.route));

    for (const route of excludedSupportRoutes) {
      expect(inventoryRoutes.has(route)).toBe(false);
      expect(enabledRoutes.has(route)).toBe(false);
    }
  });
});
