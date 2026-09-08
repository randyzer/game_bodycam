interface ThirdPartyEnv {
  PUBLIC_ADSTERRA_AD_KEY?: string;
  PUBLIC_ADSTERRA_BASE_URL?: string;
  PUBLIC_GA_MEASUREMENT_ID?: string;
}

export interface ThirdPartyScriptConfig {
  adsterraContainerId?: string;
  adsterraScriptSrc?: string;
  googleAnalyticsInlineConfig?: string;
  googleAnalyticsScriptSrc?: string;
}

function optionalEnv(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized || undefined;
}

function requirePattern(label: string, value: string, pattern: RegExp) {
  if (!pattern.test(value)) {
    throw new Error(`${label} has an invalid format.`);
  }
}

function normalizedHttpsBaseUrl(label: string, value: string): string {
  const parsed = new URL(value);
  if (parsed.protocol !== "https:") {
    throw new Error(`${label} must use HTTPS.`);
  }
  return parsed.href.replace(/\/+$/, "");
}

function buildGoogleAnalyticsInlineConfig(measurementId: string): string {
  return [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){window.dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    `gtag('config', ${JSON.stringify(measurementId)});`,
  ].join("\n");
}

export function buildThirdPartyScriptConfig(
  env: ThirdPartyEnv,
): ThirdPartyScriptConfig {
  const googleAnalyticsMeasurementId = optionalEnv(
    env.PUBLIC_GA_MEASUREMENT_ID,
  );
  const adsterraAdKey = optionalEnv(env.PUBLIC_ADSTERRA_AD_KEY);
  const adsterraBaseUrl = optionalEnv(env.PUBLIC_ADSTERRA_BASE_URL);
  const config: ThirdPartyScriptConfig = {};

  if (googleAnalyticsMeasurementId) {
    requirePattern(
      "PUBLIC_GA_MEASUREMENT_ID",
      googleAnalyticsMeasurementId,
      /^G-[A-Z0-9]+$/,
    );
    config.googleAnalyticsScriptSrc = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsMeasurementId)}`;
    config.googleAnalyticsInlineConfig = buildGoogleAnalyticsInlineConfig(
      googleAnalyticsMeasurementId,
    );
  }

  if (adsterraAdKey || adsterraBaseUrl) {
    if (!adsterraAdKey || !adsterraBaseUrl) {
      throw new Error(
        "PUBLIC_ADSTERRA_AD_KEY and PUBLIC_ADSTERRA_BASE_URL must be set together.",
      );
    }
    requirePattern(
      "PUBLIC_ADSTERRA_AD_KEY",
      adsterraAdKey,
      /^[a-f0-9]{32}$/i,
    );

    const baseUrl = normalizedHttpsBaseUrl(
      "PUBLIC_ADSTERRA_BASE_URL",
      adsterraBaseUrl,
    );
    config.adsterraContainerId = `container-${adsterraAdKey}`;
    config.adsterraScriptSrc = `${baseUrl}/${adsterraAdKey}/invoke.js`;
  }

  return config;
}
