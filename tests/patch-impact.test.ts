import { describe, expect, it } from "vitest";

import {
  findAffectedPageIds,
  parsePatchImpactArgs,
} from "../src/core/patch-impact";
import { pageInventory } from "../src/core/site-data";
import type { PageInventoryEntry } from "../src/data/schemas/page-inventory";

describe("findAffectedPageIds", () => {
  it("finds direct and related entity consumers without mutating workflow state", () => {
    const heroPage: PageInventoryEntry = {
      ...pageInventory.find((page) => page.pageId === "home")!,
      pageId: "hero.demo-sentinel",
      route: "/heroes/demo-sentinel/",
      pageType: "hero",
      module: "heroes",
      feature: "heroes",
      primaryKeyword: "demo sentinel hero",
      entityRef: { entityType: "hero", entityId: "demo-sentinel" },
      relatedEntityRefs: [],
    };
    const guidePage = {
      ...pageInventory.find((page) => page.pageId === "guide.getting-started")!,
      pageId: "guide.hero-counter",
      route: "/guides/hero-counter/",
      primaryKeyword: "demo hero counter",
      relatedEntityRefs: [
        { entityType: "hero" as const, entityId: "demo-sentinel" },
      ],
    };
    const before = {
      updatedAt: guidePage.updatedAt,
      needsUpdate: guidePage.needsUpdate,
    };

    expect(
      findAffectedPageIds([heroPage, guidePage], [
        { entityType: "hero", entityId: "demo-sentinel" },
      ]),
    ).toEqual(["hero.demo-sentinel", "guide.hero-counter"]);
    expect({
      updatedAt: guidePage.updatedAt,
      needsUpdate: guidePage.needsUpdate,
    }).toEqual(before);
  });

  it("parses an explicit entity type and ID for the CLI", () => {
    expect(
      parsePatchImpactArgs([
        "--entity-type",
        "hero",
        "--entity-id",
        "demo-sentinel",
      ]),
    ).toEqual({ entityType: "hero", entityId: "demo-sentinel" });
    expect(() => parsePatchImpactArgs(["--entity-type", "hero"])).toThrow(
      /entity-id/i,
    );
    expect(() =>
      parsePatchImpactArgs([
        "--entity-type",
        "account",
        "--entity-id",
        "demo-sentinel",
      ]),
    ).toThrow(/entity-type/i);
  });
});
