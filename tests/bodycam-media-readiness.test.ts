import { existsSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  collectBodycamMediaReadiness,
  parseBodycamMediaDecisionTableMarkdown,
  resolveBodycamMediaDecisionTablePath,
} from "../scripts/bodycam-media-readiness";
import { pageInventory } from "../src/core/site-data";

const projectRoot = process.cwd();

describe("Bodycam media readiness compatibility repair", () => {
  it("consumes the approved docs media table and does not create a duplicate root authority", () => {
    expect(existsSync(resolve(projectRoot, "docs/MEDIA_DECISION_TABLE.md"))).toBe(true);
    expect(existsSync(resolve(projectRoot, "MEDIA_DECISION_TABLE.md"))).toBe(false);
    expect(resolveBodycamMediaDecisionTablePath(projectRoot)).toBe(
      resolve(projectRoot, "docs/MEDIA_DECISION_TABLE.md"),
    );

    const signals = collectBodycamMediaReadiness({
      projectRoot,
      inventory: pageInventory,
    });

    expect(signals.errors).toEqual([]);
    expect(signals.info.join("\n")).toMatch(/hub\.guides.*RECOMMENDED.*unresolved/i);
  });

  it("fails when a root media table duplicates the approved docs authority", () => {
    const root = mkdtempSync(join(tmpdir(), "bodycam-duplicate-media-authority-"));
    mkdirSync(join(root, "docs"));
    writeFileSync(
      join(root, "docs/MEDIA_DECISION_TABLE.md"),
      `
| pageId_or_route | media_need | integration_state |
|---|---|---|
| faq | NO MEDIA NEEDED | NOT INTEGRATED |
      `,
    );
    writeFileSync(
      join(root, "MEDIA_DECISION_TABLE.md"),
      `
| Page ID | Priority | Status |
| --- | --- | --- |
| faq | NO MEDIA NEEDED | unresolved |
      `,
    );

    const signals = collectBodycamMediaReadiness({
      projectRoot: root,
      inventory: pageInventory,
    });

    expect(signals.errors.join("\n")).toMatch(/Duplicate media readiness authority/i);
  });

  it("fails deterministically when the approved docs table is malformed", () => {
    const root = mkdtempSync(join(tmpdir(), "bodycam-media-readiness-"));
    mkdirSync(join(root, "docs"));
    writeFileSync(
      join(root, "docs/MEDIA_DECISION_TABLE.md"),
      `
| pageId_or_route | media_need |
|---|---|
| home | HIGH PRIORITY |
      `,
    );

    const signals = collectBodycamMediaReadiness({
      projectRoot: root,
      inventory: pageInventory,
    });

    expect(signals.errors.join("\n")).toMatch(/integration_state/i);
  });

  it("preserves Bodycam/SOP readiness severity when normalizing lifecycle rows", () => {
    const parsed = parseBodycamMediaDecisionTableMarkdown(`
| pageId_or_route | page_family | media_need | need_rationale | intended_placement | candidate_state | rights_state | human_decision | integration_state | visual_gate_state | source_or_provenance | owner_or_defer_reason | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| \`home\` | homepage | HIGH PRIORITY | First viewport. | hero | FOUND | UNRESOLVED | PENDING | NOT INTEGRATED | PENDING | Official | Human | Pending. |
| \`update.locked-loaded\` | update | HIGH PRIORITY | Update media. | trailer | SEMANTICALLY VERIFIED | NOT REQUIRED FOR EMBED | PENDING | NOT INTEGRATED | PENDING | YouTube | Human | Pending. |
| \`guide.getting-started\` | guide | RECOMMENDED | Guide media. | trailer | FOUND | UNRESOLVED | PENDING | NOT INTEGRATED | PENDING | YouTube | Human | Pending. |
| \`faq\` | FAQ | NO MEDIA NEEDED | Complete without media. | none | NOT FOUND | NOT REQUIRED FOR EMBED | PENDING | NOT INTEGRATED | PENDING | Steam | none | Positive no-media. |
    `);

    const signals = collectBodycamMediaReadiness({
      projectRoot,
      inventory: pageInventory,
      decisions: parsed.decisions,
    });

    expect(parsed.errors).toEqual([]);
    expect(signals.errors.join("\n")).toMatch(/home.*HIGH PRIORITY.*unresolved/i);
    expect(signals.warnings.join("\n")).toMatch(
      /update\.locked-loaded.*HIGH PRIORITY.*unresolved/i,
    );
    expect(signals.info.join("\n")).toMatch(/guide\.getting-started.*RECOMMENDED.*unresolved/i);
  });

  it("keeps absent readiness input backward compatible only when no planning artifact exists", () => {
    const root = mkdtempSync(join(tmpdir(), "bodycam-no-media-table-"));

    expect(
      collectBodycamMediaReadiness({
        projectRoot: root,
        inventory: pageInventory,
      }),
    ).toEqual({ errors: [], warnings: [], info: [] });
  });
});
