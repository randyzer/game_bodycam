import { defineGameConfig } from "./src/config/schema";

export default defineGameConfig({
  brand: {
    name: "Bodycam Guide",
    shortName: "Bodycam",
    mark: "BC",
    logoPath: "/logo.svg",
    tagline: "Source-aware guides for Reissad Studio's Bodycam.",
  },
  site: {
    url: "https://bodycam-guide.example",
    locale: "en-US",
    timezone: "Asia/Taipei",
  },
  seo: {
    defaultTitle: "Bodycam Guide - Wiki, Settings, Updates",
    titleTemplate: "%s | Bodycam Guide",
    defaultDescription:
      "A source-aware Bodycam wiki for Steam players, covering guides, settings, official updates, and Reissad Studio links.",
  },
  social: {},
  navigation: {
    groups: [
      { label: "Home", pageId: "home" },
      { label: "Start", pageId: "guide.getting-started", children: ["guide.controls"] },
      {
        label: "Settings",
        pageId: "guide.best-settings",
        children: ["guide.system-requirements"],
      },
      {
        label: "Loadouts",
        pageId: "guide.loadouts",
        children: ["guide.tactical-tablet"],
      },
      {
        label: "Maps & Modes",
        pageId: "guide.maps",
        children: ["guide.game-modes"],
      },
      { label: "Zombies", pageId: "guide.zombies" },
      {
        label: "Updates",
        pageId: "update.locked-loaded",
        children: ["update.v0-8-patch-notes"],
      },
      { label: "Info", pageId: "official-links" },
      { label: "Search", pageId: "search" },
    ],
  },
  homepage: {
    displayHeading: "Bodycam Wiki",
    featuredPageIds: [
      "guide.getting-started",
      "guide.best-settings",
      "update.locked-loaded",
      "guide.loadouts",
      "guide.maps",
    ],
  },
  features: {
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
