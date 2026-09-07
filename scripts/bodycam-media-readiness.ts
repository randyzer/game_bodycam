import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  collectMediaReadinessSignals,
  parseMediaDecisionTableMarkdown,
  type MediaReadinessDecision,
  type MediaReadinessPriority,
  type MediaReadinessSignals,
  type MediaReadinessStatus,
} from "../src/core/media-readiness";
import type { PageInventoryEntry } from "../src/data/schemas/page-inventory";

interface MarkdownTableRow {
  cells: string[];
  lineNumber: number;
}

interface CollectOptions {
  projectRoot: string;
  inventory: PageInventoryEntry[];
  decisions?: MediaReadinessDecision[];
}

const bodycamDocsTable = "docs/MEDIA_DECISION_TABLE.md";
const legacyRootTable = "MEDIA_DECISION_TABLE.md";
const mediaNeeds: MediaReadinessPriority[] = [
  "HIGH PRIORITY",
  "OPTIONAL",
  "RECOMMENDED",
  "NO MEDIA NEEDED",
];
const integrationStates = ["NOT INTEGRATED", "INTEGRATED", "FALLBACK ONLY"] as const;

function normalizeCell(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeHeader(value: string): string {
  return normalizeCell(value).toLocaleLowerCase("en").replace(/[^a-z0-9]+/g, "");
}

function splitMarkdownRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(normalizeCell);
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseMediaNeed(value: string): MediaReadinessPriority | undefined {
  const normalized = normalizeCell(value).toLocaleUpperCase("en");
  return mediaNeeds.find((need) => need === normalized);
}

function parseIntegrationState(value: string): (typeof integrationStates)[number] | undefined {
  const normalized = normalizeCell(value).toLocaleUpperCase("en");
  return integrationStates.find((state) => state === normalized);
}

function statusFromIntegrationState(
  state: (typeof integrationStates)[number],
): MediaReadinessStatus {
  return state === "NOT INTEGRATED" ? "unresolved" : "resolved";
}

function listValues(values: readonly string[]): string {
  return values.map((value) => `"${value}"`).join(", ");
}

function markdownRows(markdown: string): MarkdownTableRow[] {
  return markdown
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter(({ line }) => line.startsWith("|") && line.endsWith("|"))
    .map(({ line, lineNumber }) => ({
      cells: splitMarkdownRow(line),
      lineNumber,
    }));
}

export function resolveBodycamMediaDecisionTablePath(projectRoot: string): string | undefined {
  const docsPath = resolve(projectRoot, bodycamDocsTable);
  if (existsSync(docsPath)) return docsPath;

  const rootPath = resolve(projectRoot, legacyRootTable);
  return existsSync(rootPath) ? rootPath : undefined;
}

export function parseBodycamMediaDecisionTableMarkdown(markdown: string) {
  const errors: string[] = [];
  const decisions: MediaReadinessDecision[] = [];

  if (!markdown.trim()) {
    return {
      decisions,
      errors: ["docs/MEDIA_DECISION_TABLE.md is present but empty."],
    };
  }

  const rows = markdownRows(markdown);
  const headerIndex = rows.findIndex((row, index) => {
    const headers = row.cells.map(normalizeHeader);
    return (
      rows[index + 1] &&
      isSeparatorRow(rows[index + 1].cells) &&
      headers.includes("pageidorroute") &&
      headers.includes("medianeed")
    );
  });

  if (headerIndex === -1) {
    return {
      decisions,
      errors: [
        "docs/MEDIA_DECISION_TABLE.md must contain the Route Decisions table with pageId_or_route, media_need, and integration_state columns.",
      ],
    };
  }

  const headers = rows[headerIndex].cells.map(normalizeHeader);
  const locatorIndex = headers.indexOf("pageidorroute");
  const mediaNeedIndex = headers.indexOf("medianeed");
  const integrationStateIndex = headers.indexOf("integrationstate");
  const rationaleIndex = headers.indexOf("needrationale");

  if (locatorIndex === -1) {
    errors.push("docs/MEDIA_DECISION_TABLE.md is missing required column: pageId_or_route.");
  }
  if (mediaNeedIndex === -1) {
    errors.push("docs/MEDIA_DECISION_TABLE.md is missing required column: media_need.");
  }
  if (integrationStateIndex === -1) {
    errors.push("docs/MEDIA_DECISION_TABLE.md is missing required column: integration_state.");
  }
  if (errors.length > 0) return { decisions, errors };

  const dataRows = rows
    .slice(headerIndex + 2)
    .filter((row) => !isSeparatorRow(row.cells));

  for (const row of dataRows) {
    if (row.cells.every((cell) => !cell)) continue;

    const locator = row.cells[locatorIndex] ?? "";
    const mediaNeedValue = row.cells[mediaNeedIndex] ?? "";
    const integrationValue = row.cells[integrationStateIndex] ?? "";
    const priority = parseMediaNeed(mediaNeedValue);
    const integrationState = parseIntegrationState(integrationValue);
    const rowErrors: string[] = [];

    if (!locator) {
      rowErrors.push(`docs/MEDIA_DECISION_TABLE.md row ${row.lineNumber} requires pageId_or_route.`);
    }
    if (!priority) {
      rowErrors.push(
        `docs/MEDIA_DECISION_TABLE.md row ${row.lineNumber} has unsupported media_need "${mediaNeedValue || "(blank)"}". Supported values: ${listValues(mediaNeeds)}.`,
      );
    }
    if (!integrationState) {
      rowErrors.push(
        `docs/MEDIA_DECISION_TABLE.md row ${row.lineNumber} has unsupported integration_state "${integrationValue || "(blank)"}". Supported values: ${listValues(integrationStates)}.`,
      );
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
      continue;
    }
    if (!priority || !integrationState) continue;

    const rationale = rationaleIndex === -1 ? undefined : row.cells[rationaleIndex] || undefined;
    decisions.push({
      ...(locator.startsWith("/") ? { route: locator } : { pageId: locator }),
      priority,
      status: statusFromIntegrationState(integrationState),
      ...(rationale ? { rationale } : {}),
    });
  }

  if (decisions.length === 0 && errors.length === 0) {
    errors.push("docs/MEDIA_DECISION_TABLE.md must contain at least one non-empty Route Decisions row.");
  }

  return { decisions, errors };
}

export function collectBodycamMediaReadiness({
  projectRoot,
  inventory,
  decisions,
}: CollectOptions): MediaReadinessSignals {
  if (decisions) {
    return collectMediaReadinessSignals({ inventory, decisions });
  }

  const docsPath = resolve(projectRoot, bodycamDocsTable);
  const rootPath = resolve(projectRoot, legacyRootTable);
  if (existsSync(docsPath) && existsSync(rootPath)) {
    return {
      errors: [
        "Duplicate media readiness authority detected: use docs/MEDIA_DECISION_TABLE.md only, not a root MEDIA_DECISION_TABLE.md copy.",
      ],
      warnings: [],
      info: [],
    };
  }

  const tablePath = resolveBodycamMediaDecisionTablePath(projectRoot);
  if (!tablePath) return { errors: [], warnings: [], info: [] };

  const parsed = tablePath === docsPath
    ? parseBodycamMediaDecisionTableMarkdown(readFileSync(tablePath, "utf8"))
    : parseMediaDecisionTableMarkdown(readFileSync(tablePath, "utf8"));
  const signals = collectMediaReadinessSignals({
    inventory,
    decisions: parsed.decisions,
  });

  return {
    errors: [...parsed.errors, ...signals.errors],
    warnings: signals.warnings,
    info: signals.info,
  };
}
