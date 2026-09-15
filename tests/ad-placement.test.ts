import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { existsSync, readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getPageByRoute } from "../src/core/site-data";
import BaseLayout from "../src/layouts/BaseLayout.astro";
import HomePage from "../src/pages/index.astro";

type AstroComponent = Parameters<AstroContainer["renderToString"]>[0];
const adComponents = import.meta.glob<{ default: AstroComponent }>(
  "../src/components/ads/*.astro",
);
const adKey = "a".repeat(32);
const baseUrl = "https://pl31237762.profitableratecpmnetwork.com";
const containerId = `container-${adKey}`;

function configureAds() {
  vi.stubEnv("PUBLIC_ADSTERRA_AD_KEY", adKey);
  vi.stubEnv("PUBLIC_ADSTERRA_BASE_URL", baseUrl);
  vi.stubEnv("PUBLIC_GA_MEASUREMENT_ID", "G-ABCDE12345");
}

function source(path: string) {
  const url = new URL(path, import.meta.url);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
}

function expectOneProvider(html: string) {
  expect(html.match(/src="[^"]+\/invoke\.js"/g)).toHaveLength(1);
  expect(html.match(new RegExp(`id="${containerId}"`, "g"))).toHaveLength(1);
}

afterEach(() => vi.unstubAllEnvs());

describe("advertising placement", () => {
  it("renders exactly one homepage primary inside main after Start here and before categories", async () => {
    configureAds();
    const container = await AstroContainer.create();
    const html = await container.renderToString(HomePage);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
    const start = main.indexOf('id="start-here"');
    const primary = main.indexOf('data-ad-placement="home-primary"');
    const categories = main.indexOf('id="browse-by-category"');

    expect(start).toBeGreaterThan(-1);
    expect(primary).toBeGreaterThan(start);
    expect(categories).toBeGreaterThan(primary);
    expect(html.match(/data-ad-placement="home-primary"/g)).toHaveLength(1);
    expect(html).not.toContain('data-ad-placement="before-footer"');
    expectOneProvider(html);
  });

  it("renders the indexable non-home fallback between main and Footer", async () => {
    configureAds();
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { page: getPageByRoute("/guides/getting-started/") },
      slots: { default: '<main id="main-content">Guide content</main>' },
    });

    const ad = html.indexOf('data-ad-placement="before-footer"');
    expect(ad).toBeGreaterThan(html.indexOf("</main>"));
    expect(html.indexOf("<footer")).toBeGreaterThan(ad);
    expect(html).not.toContain('data-ad-placement="home-primary"');
    expectOneProvider(html);
    const head = html.match(/<head\b[\s\S]*?<\/head>/)?.[0] ?? "";
    expect(head).toContain("googletagmanager.com/gtag/js?id=G-ABCDE12345");
    expect(head).not.toContain("invoke.js");
  });

  it("does not render the global fallback on the homepage even without an explicit opt-out", async () => {
    configureAds();
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, {
      props: { page: getPageByRoute("/") },
    });
    expect(html).not.toContain("invoke.js");
    expect(html).not.toContain(containerId);
  });

  it.each([
    {
      name: "noindex",
      props: {
        page: {
          ...getPageByRoute("/guides/getting-started/"),
          indexability: "noindex",
        },
      },
    },
    {
      name: "local opt-out",
      props: {
        page: getPageByRoute("/guides/getting-started/"),
        footerAd: false,
      },
    },
  ])("omits ads for a $name page", async ({ props }) => {
    configureAds();
    const container = await AstroContainer.create();
    const html = await container.renderToString(BaseLayout, { props });
    expect(html).not.toContain("invoke.js");
    expect(html).not.toContain(containerId);
  });

  it("omits the homepage ad and its reservation when public configuration is absent", async () => {
    vi.stubEnv("PUBLIC_ADSTERRA_AD_KEY", "");
    vi.stubEnv("PUBLIC_ADSTERRA_BASE_URL", "");
    const container = await AstroContainer.create();
    const html = await container.renderToString(HomePage);
    expect(html).not.toContain("invoke.js");
    expect(html).not.toContain("data-ad-placement=");
    expect(html).not.toContain("site-ad__container");
  });

  it("uses a labeled shared provider boundary that can be disabled locally", async () => {
    configureAds();
    const load = adComponents["../src/components/ads/AdSlot.astro"];
    expect(load).toBeTypeOf("function");
    if (!load) return;
    const { default: AdSlot } = await load();
    const container = await AstroContainer.create();
    const html = await container.renderToString(AdSlot, {
      props: { placement: "home-primary" },
    });
    expect(html).toMatch(/<aside\b[^>]*aria-label="Advertisement"/);
    expect(html).toContain("data-pagefind-ignore");
    expect(html).toContain('data-cfasync="false"');
    expectOneProvider(html);
    const disabled = await container.renderToString(AdSlot, {
      props: { placement: "home-primary", enabled: false },
    });
    expect(disabled.trim()).toBe("");
    expect(source("../src/layouts/BaseLayout.astro")).not.toContain("adsterraScriptSrc");
  });

  it("reserves responsive height without hiding an unfilled slot or adding tracking hooks", () => {
    const styles = source("../src/styles/global.css");
    expect(styles).toMatch(/\.site-ad__container\s*\{[^}]*min-height:\s*clamp\(72px,\s*10vw,\s*120px\)/s);
    expect(styles).toMatch(/\.site-ad__container\s*\{[^}]*max-width:\s*100%/s);
    expect(styles).not.toMatch(/\[data-ad-state=[^\]]*unfilled[^\]]*\][^{]*\{[^}]*(?:display:\s*none|min-height:\s*0)/s);
    expect(source("../src/components/ads/AdSlot.astro")).not.toMatch(/dataLayer|CustomEvent|MutationObserver|IntersectionObserver/);
  });
});
