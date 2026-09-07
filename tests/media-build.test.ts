import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { defineGameConfig } from "../src/config/schema";
import { buildEnabledPageCatalog } from "../src/core/catalog";
import {
  pageInventory,
  resolveNavigationGroups,
  siteConfig,
} from "../src/core/site-data";
import { collectOutputReconciliationErrors, routeToOutputFile } from "../src/core/output-reconciliation";
import { getSitemapRoutes } from "../src/core/seo";
import mediaFixture from "./fixtures/media/media-rich.json";

let fixtureRoot: string;
let buildLog = "";
const projectRoot = process.cwd();
const mediaBuildConfig = defineGameConfig({
  ...siteConfig,
  navigation: {
    groups: [
      { label: "Home", pageId: "home" },
      {
        label: "Guides",
        pageId: "hub.guides",
        children: ["guide.getting-started"],
      },
      { label: "Search", pageId: "search" },
    ],
  },
  homepage: { featuredPageIds: ["guide.getting-started"] },
  features: {
    ...siteConfig.features,
    guides: true,
    heroes: false,
    weapons: false,
    items: false,
    maps: false,
    tierLists: false,
    news: true,
    search: true,
    calculator: false,
    planner: false,
  },
});
const mediaBuildCatalog = buildEnabledPageCatalog(
  mediaBuildConfig,
  pageInventory,
);
const mediaBuildNavigation = resolveNavigationGroups(
  mediaBuildConfig.navigation.groups,
  mediaBuildCatalog,
);
const publicPlanningTerms =
  /\bP[0-2]\b|\bPhase\s+[0-3]\b|Human approval|Human Content Gate|Human Visual Gate|planning approval|publication backlog|priority tier|private route|private\/noindex|noindex|internal roadmap/i;
const publicWorkflowPhrases =
  /approved observation before publication|before publication|later approval|release approval|reverify before (?:publication|release)|review before publication|planning evidence|planning note|publication check|Human approval|approval pending|Human review status|evidence workflow|(?:requirement|feature|systems|update|notes|map-family|mode|gadget|attachment|loadout|gameplay feature|patch chronology)\s+planning/i;

function visibleText(html: string) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " ")
    .replace(/\s+/g, " ");
}

beforeAll(() => {
  fixtureRoot = mkdtempSync(join(tmpdir(), "starter-media-build-"));
  for (const file of ["src", "public", "scripts", "game.config.ts", "astro.config.ts", "tsconfig.json", "package.json", "package-lock.json"]) {
    cpSync(resolve(projectRoot, file), join(fixtureRoot, file), { recursive: true });
  }
  symlinkSync(resolve(projectRoot, "node_modules"), join(fixtureRoot, "node_modules"), "dir");
  const astroConfigPath = join(fixtureRoot, "astro.config.ts");
  writeFileSync(
    astroConfigPath,
    readFileSync(astroConfigPath, "utf8").replace(
      'output: "static",',
      'cacheDir: "./.astro-cache",\n  output: "static",',
    ),
  );
  writeFileSync(
    join(fixtureRoot, "game.config.ts"),
    `import { defineGameConfig } from "./src/config/schema";\n\nexport default defineGameConfig(${JSON.stringify(mediaBuildConfig, null, 2)});\n`,
  );
  writeFileSync(join(fixtureRoot, "src/data/media/media.json"), JSON.stringify(mediaFixture));
  for (const file of ["qa-overview.svg", "qa-detail.svg"]) {
    cpSync(resolve(projectRoot, "tests/fixtures/media", file), join(fixtureRoot, "public/media", file));
  }
  buildLog = execFileSync("npm", ["run", "build"], {
    cwd: fixtureRoot,
    encoding: "utf8",
    timeout: 60_000,
    // Vitest's NODE_ENV=test must not select development React for the production build.
    env: { ...process.env, NODE_ENV: "production" },
  });
}, 60_000);

afterAll(() => {
  if (!fixtureRoot) return;
  if (process.env.STARTER_MEDIA_QA_KEEP === "1") {
    console.log(`Media QA fixture retained at: ${fixtureRoot}`);
  } else {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

describe("media-rich static build", () => {
  it("preserves exact inventory routes and Pagefind inclusion", () => {
    const routeCount = mediaBuildCatalog.length;
    const indexableCount = getSitemapRoutes(mediaBuildCatalog).length;

    expect(collectOutputReconciliationErrors(mediaBuildCatalog, join(fixtureRoot, "dist"))).toEqual([]);
    expect(buildLog).toContain(`Static output reconciliation passed: ${routeCount} inventory routes matched.`);
    expect(buildLog).toMatch(new RegExp(`Indexed ${indexableCount} pages?`));
    expect(buildLog).toContain(`Generated build audit passed for ${routeCount} pages.`);
    expect(existsSync(join(fixtureRoot, "dist/guides/progression-and-rp/index.html"))).toBe(false);
  });

  it("keeps generated public P0 visible text free of internal planning terms", () => {
    for (const page of mediaBuildCatalog) {
      const html = readFileSync(join(fixtureRoot, "dist", routeToOutputFile(page.route)), "utf8");

      expect(visibleText(html), page.route).not.toMatch(publicPlanningTerms);
    }
  });

  it("keeps generated public P0 visible text free of internal workflow language", () => {
    for (const page of mediaBuildCatalog) {
      const html = readFileSync(join(fixtureRoot, "dist", routeToOutputFile(page.route)), "utf8");

      expect(visibleText(html), page.route).not.toMatch(publicWorkflowPhrases);
    }
  });

  it("renders all fixed guide placements and retains no-media pages", () => {
    const rich = readFileSync(join(fixtureRoot, "dist/guides/getting-started/index.html"), "utf8");
    expect(rich.match(/<img\b[^>]*src="\/media\//g)).toHaveLength(3);
    expect(rich.match(/<iframe\b/g)).toHaveLength(1);
    for (const placement of ["hero", "gallery", "trailer"]) expect(rich).toContain(`data-media-placement="${placement}"`);
    expect(rich).toContain('loading="eager"');
    expect(rich).toContain("youtube-nocookie.com/embed/aqz-KE-bpKQ");
    const plain = readFileSync(join(fixtureRoot, "dist/official-links/index.html"), "utf8");
    expect(plain).not.toMatch(/<iframe\b|data-media-placement|class="game-media/);
  });

  it("renders mapped trailer media on update pages", () => {
    const update = readFileSync(
      join(fixtureRoot, "dist/updates/locked-and-loaded/index.html"),
      "utf8",
    );

    const headerTrailerIndex = update.indexOf('data-media-placement="header-trailer"');
    const proseIndex = update.indexOf('class="prose"');

    expect(headerTrailerIndex).toBeGreaterThan(-1);
    expect(headerTrailerIndex).toBeLessThan(proseIndex);
    expect(update).not.toContain('data-media-placement="trailer"');
    expect(update).toContain("youtube-nocookie.com/embed/aqz-KE-bpKQ");
  });

  it("preserves every resolved desktop/mobile navigation link", () => {
    const expected = mediaBuildNavigation.flatMap((group) => [group.page, ...group.children]);
    for (const page of mediaBuildCatalog) {
      const html = readFileSync(join(fixtureRoot, "dist", routeToOutputFile(page.route)), "utf8");
      for (const className of ["desktop-nav", "mobile-nav__panel"]) {
        const nav = html.match(new RegExp(`<nav class="${className}"[^>]*>([\\s\\S]*?)</nav>`))?.[1] ?? "";
        expect([...nav.matchAll(/data-nav-page-id="([^"]+)"/g)].map((match) => match[1])).toEqual(expected.map((item) => item.pageId));
        expect([...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1])).toEqual(expected.map((item) => item.route));
      }
    }
  });

  it("fails CLI validation for a missing referenced file without network probes", () => {
    const path = join(fixtureRoot, "public/media/qa-detail.svg");
    rmSync(path);
    try {
      expect(() => execFileSync("npm", ["run", "validate"], { cwd: fixtureRoot, encoding: "utf8", stdio: "pipe" })).toThrow();
    } finally {
      cpSync(resolve(projectRoot, "tests/fixtures/media/qa-detail.svg"), path);
    }
  });
});
