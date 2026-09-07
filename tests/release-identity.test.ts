import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const currentStarterFiles = [
  "../README.md",
  "../docs/PROJECT_BRIEF.md",
  "../docs/CURRENT_STATUS.md",
  "../docs/SITE_STRUCTURE.md",
  "../public/media/README.md",
] as const;

function read(path: string): string {
  const url = new URL(path, import.meta.url);
  expect(existsSync(url), `${url.pathname} exists`).toBe(true);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

describe("release identity", () => {
  it("uses the approved Bodycam V2.6 project identity in active docs", () => {
    for (const path of currentStarterFiles) {
      const source = read(path);
      expect(source).not.toMatch(/GAME_SITE_STARTER v2\.5(?!\.0)/);
      expect(source).not.toMatch(/\bStarter v2\.5(?!\.0)/);
    }
  });
});
