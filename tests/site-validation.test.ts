import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { defineGameConfig } from "../src/config/schema";
import { entityModuleDefinitions } from "../src/data/entity-modules";
import { pageTypeSchema } from "../src/data/schemas/page-inventory";
import { loadFactModule } from "../src/core/fact-loader";
import {
  pageInventory,
  siteConfig,
} from "../src/core/site-data";
import { collectSiteValidationErrors } from "../src/core/site-validation";
import type { PageInventoryEntry } from "../src/data/schemas/page-inventory";

const allContentEntries = pageInventory.flatMap((page) =>
  page.contentRef
    ? [
        {
          collection: page.contentRef.collection,
          id: page.contentRef.slug,
          data: { pageId: page.pageId },
        },
      ]
    : [],
);
const heroPage: PageInventoryEntry = {
  ...pageInventory.find((page) => page.pageId === "home")!,
  pageId: "hero.demo-sentinel",
  route: "/heroes/demo-sentinel/",
  pageType: "hero",
  module: "heroes",
  feature: "heroes",
  primaryKeyword: "demo sentinel hero",
  entityRef: { entityType: "hero", entityId: "demo-sentinel" },
  relatedPageIds: [],
  relatedEntityRefs: [],
};

describe("collectSiteValidationErrors", () => {
  it("delegates navigation resolution to the site-data resolver", () => {
    const source = readFileSync(
      new URL("../src/core/site-validation.ts", import.meta.url),
      "utf8",
    );

    expect(source).toMatch(/import\s*\{[^}]*resolveNavigationGroups[^}]*\}\s*from\s*["']\.\/site-data["']/s);
    expect(source).not.toMatch(
      /for\s*\([^)]*of\s+input\.config\.navigation\.groups/,
    );
  });

  it("aggregates independent route, content, implementation, and fact errors", () => {
    const configWithHeroes = defineGameConfig({
      ...siteConfig,
      features: {
        ...siteConfig.features,
        guides: true,
        heroes: true,
      },
    });
    const inventoryWithoutHome = pageInventory.filter(
      (page) => page.pageId !== "home",
    ).concat(heroPage);

    const errors = collectSiteValidationErrors({
      config: configWithHeroes,
      inventory: inventoryWithoutHome,
      contentEntries: [],
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    });

    expect(errors.join("\n")).toMatch(/fixed route.*\//i);
    expect(errors.join("\n")).toMatch(/content entry.*guide\.getting-started/i);
    expect(errors).toContain(
      'No route family is implemented for enabled page type "hero" (hero.demo-sentinel). Supported page types: home, guide, hub, search.',
    );
    expect(errors.join("\n")).toMatch(/heroes\.json/i);
  });

  it("accepts the starter's enabled pages and content", () => {
    const contentEntries = pageInventory.flatMap((page) =>
      page.contentRef
        ? [
            {
              collection: page.contentRef.collection,
              id: page.contentRef.slug,
              data: { pageId: page.pageId },
            },
          ]
        : [],
    );
    const errors = collectSiteValidationErrors({
      config: siteConfig,
      inventory: pageInventory,
      contentEntries,
      factModules: Object.fromEntries(
        entityModuleDefinitions
          .filter((definition) => siteConfig.features[definition.module])
          .map((definition) => [
            definition.module,
            loadFactModule(definition.module, siteConfig),
          ]),
      ),
      fixedRoutes: ["/"],
      implementedPageTypes: [...pageTypeSchema.options],
    });

    expect(errors).toEqual([]);
  });

  it("reports broken configured, related, and indexability references together", () => {
    const brokenConfig = defineGameConfig({
      ...siteConfig,
      features: { ...siteConfig.features, heroes: false },
      navigation: {
        groups: [
          { pageId: "home" },
        { pageId: "guide.trenches" },
        ],
      },
      homepage: {
        featuredPageIds: ["guide.missing"],
      },
    });
    const brokenInventory = pageInventory.map((page) => {
      if (page.pageId === "home") {
        return { ...page, relatedPageIds: ["guide.missing"] };
      }
      if (page.pageId === "faq") {
        return { ...page, visibility: "private" as const };
      }
      return page;
    });

    const errors = collectSiteValidationErrors({
      config: brokenConfig,
      inventory: brokenInventory,
      contentEntries: allContentEntries,
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    }).join("\n");

    expect(errors).toMatch(/navigation.*guide\.trenches/i);
    expect(errors).toMatch(/homepage.*guide\.missing/i);
    expect(errors).toMatch(/related page.*guide\.missing/i);
    expect(errors).toMatch(/indexable.*faq/i);
  });

  it.each([
    ["draft", { publicationStatus: "draft" as const }],
    ["scheduled", { publicationStatus: "scheduled" as const }],
    ["archived", { publicationStatus: "archived" as const }],
    ["private", { visibility: "private" as const }],
    ["unlisted", { visibility: "unlisted" as const }],
  ])("rejects a %s page referenced by navigation", (_label, override) => {
    const config = defineGameConfig({
      ...siteConfig,
      navigation: { groups: [{ pageId: "faq" }] },
    });
    const inventory = pageInventory.map((page) =>
      page.pageId === "faq"
        ? { ...page, ...override, indexability: "noindex" as const }
        : page,
    );

    const errors = collectSiteValidationErrors({
      config,
      inventory,
      contentEntries: allContentEntries,
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    }).join("\n");

    expect(errors).toMatch(/navigation.*faq.*enabled catalog/i);
  });

  it("rejects a feature-disabled page referenced by navigation", () => {
    const config = defineGameConfig({
      ...siteConfig,
      features: { ...siteConfig.features, news: false },
      navigation: { groups: [{ pageId: "update.locked-loaded" }] },
    });

    const errors = collectSiteValidationErrors({
      config,
      inventory: pageInventory,
      contentEntries: allContentEntries,
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    }).join("\n");

    expect(errors).toMatch(/navigation.*update\.locked-loaded.*enabled catalog/i);
  });

  it("rejects an entity page gated by another module's feature", () => {
    const mismatchedInventory = [
      ...pageInventory,
      { ...heroPage, feature: "items" as const },
    ];

    const errors = collectSiteValidationErrors({
      config: siteConfig,
      inventory: mismatchedInventory,
      contentEntries: allContentEntries,
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    }).join("\n");

    expect(errors).toMatch(/hero\.demo-sentinel.*feature.*heroes/i);
  });

  it("lists supported modules when an unsupported module reaches validation", () => {
    const unsupportedModuleInventory = pageInventory.map((page) =>
      page.pageId === "home"
        ? { ...page, module: "unsupported" as never }
        : page,
    );

    const errors = collectSiteValidationErrors({
      config: siteConfig,
      inventory: unsupportedModuleInventory,
      contentEntries: allContentEntries,
      factModules: {},
      fixedRoutes: ["/"],
      implementedPageTypes: [
        "home",
        "guide",
        "hub",
        "search",
      ],
    });

    expect(errors).toContain(
      'Page "home" uses unsupported module "unsupported". Supported modules: core, guides, heroes, weapons, items, maps, tierLists, news, search, tools.',
    );
  });
});
