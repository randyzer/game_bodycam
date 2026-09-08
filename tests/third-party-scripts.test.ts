import { describe, expect, it } from "vitest";

import { buildThirdPartyScriptConfig } from "../src/core/third-party-scripts";

describe("third-party script configuration", () => {
  it("omits Google Analytics and Adsterra when public env vars are absent", () => {
    expect(buildThirdPartyScriptConfig({})).toEqual({});
  });

  it("builds Google Analytics from the public measurement id", () => {
    const config = buildThirdPartyScriptConfig({
      PUBLIC_GA_MEASUREMENT_ID: "G-ABCDE12345",
    });

    expect(config.googleAnalyticsScriptSrc).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-ABCDE12345",
    );
    expect(config.googleAnalyticsInlineConfig).toContain(
      "gtag('config', \"G-ABCDE12345\");",
    );
  });

  it("builds Adsterra placement markup values from the public ad key", () => {
    const config = buildThirdPartyScriptConfig({
      PUBLIC_ADSTERRA_AD_KEY: "fbac69be15ca4c593ac0152236caf565",
      PUBLIC_ADSTERRA_BASE_URL:
        "https://pl31237762.profitableratecpmnetwork.com",
    });

    expect(config.adsterraScriptSrc).toBe(
      "https://pl31237762.profitableratecpmnetwork.com/fbac69be15ca4c593ac0152236caf565/invoke.js",
    );
    expect(config.adsterraContainerId).toBe(
      "container-fbac69be15ca4c593ac0152236caf565",
    );
  });

  it("rejects partial or invalid Adsterra configuration", () => {
    expect(() =>
      buildThirdPartyScriptConfig({
        PUBLIC_ADSTERRA_AD_KEY: "fbac69be15ca4c593ac0152236caf565",
      }),
    ).toThrow(/must be set together/i);

    expect(() =>
      buildThirdPartyScriptConfig({
        PUBLIC_ADSTERRA_AD_KEY: "not-a-valid-key",
        PUBLIC_ADSTERRA_BASE_URL:
          "https://pl31237762.profitableratecpmnetwork.com",
      }),
    ).toThrow(/invalid format/i);
  });
});
