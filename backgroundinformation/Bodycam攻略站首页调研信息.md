# Bodycam攻略站首页调研信息

调研日期：2026-10-14（Asia/Taipei）。目标：英文优先的美国 PC 玩家；站点为独立粉丝攻略，不代表 Reissad Studio。

## 游戏身份与第一手来源

| 字段 | 已核实信息 | 来源 |
| --- | --- | --- |
| 游戏 / App ID | Bodycam / 2406770 | https://store.steampowered.com/app/2406770/Bodycam/ |
| 开发及发行 | Reissad Studio | Steam 商店 |
| 平台 | Steam / Windows 10、11 | Steam 商店系统要求 |
| 类型与状态 | Tactical multiplayer FPS；Early Access | Steam 商店 |
| 引擎与视角 | Unreal Engine 5，body-camera view | Steam 商店和游戏官网 |
| 已列出的模式 | Deathmatch、Team Deathmatch、Wingman；商店正文另列 Body Bomb、Hardpoint、Gun Game、co-op Zombies | Steam 商店，版本变化需复核 |

- 官网：https://www.playbodycam.com/en-US
- Steam：https://store.steampowered.com/app/2406770/Bodycam/
- 官方公告：https://steamcommunity.com/app/2406770/allnews/
- Steam 社区：https://steamcommunity.com/app/2406770/
- Discord：https://discord.gg/reissadstudio
- X：https://x.com/ReissadStudio
- YouTube：https://www.youtube.com/@ReissadStudio
- Reddit：https://www.reddit.com/r/BodycamGame/
- 官方视频：https://www.youtube.com/watch?v=AQ3DPo2fvSc （Reissad Studio, Locked & Loaded 官方预告，2026-09-03）

Steam 在此次浏览器地区显示 Early Access 日期为 2024-06-08；用户提供的是 2024-06-07。此差异可能与地区时区展示有关，公开页暂不写无时区限定的具体日期。价格、评论与玩家数是动态值，不放在静态首页。

## 玩家可用事实与边界

Steam 官方商店当前明确列出 Windows 10/11、最低 8 GB RAM、推荐 16 GB RAM、50 GB 可用存储与 SSD 建议。主页只展示稳定身份事实；具体配置放入单独页面并以访问日期标注。官方描述提及多人模式和 Zombies，但单人战役、主机版、VR 原生支持、跨平台联机、精确配队步骤均不由现有资料确认。

## 首页 JSON

```json
{
  "home": {
    "meta": {
      "title": "Bodycam Wiki — Guides, Settings & Modes",
      "description": "Independent Bodycam guides for PC players: learn multiplayer modes, setup, performance, Zombies and current updates with links back to official sources."
    },
    "hero": {
      "eyebrow": "Independent Fan-Made Guide",
      "title": "Bodycam",
      "description": "Find clear, source-backed answers for Bodycam on PC. Start with the multiplayer modes, check your setup, and follow official updates as Early Access evolves.",
      "stats": [
        "Early Access on Steam",
        "Windows 10/11",
        "Unreal Engine 5",
        "Multiplayer FPS"
      ],
      "primaryCta": "Explore Guides",
      "secondaryCta": "Check System Requirements",
      "tertiaryCta": "See Official Updates",
      "videoLabel": "Reissad Studio official trailer"
    },
    "start": {
      "eyebrow": "Start Here",
      "title": "Get Ready for Bodycam",
      "cards": [
        {
          "number": "1",
          "title": "Game Overview",
          "description": "Understand the game and its available modes."
        },
        {
          "number": "2",
          "title": "System Requirements",
          "description": "Compare your Windows PC with the official minimum and recommended specs."
        },
        {
          "number": "3",
          "title": "Play With Friends",
          "description": "Find the current party and match options, with version-sensitive details noted."
        },
        {
          "number": "4",
          "title": "Zombies",
          "description": "See what the official store confirms about co-op wave survival."
        }
      ]
    },
    "aboutGame": {
      "title": "What is Bodycam?",
      "paragraphs": [
        "Bodycam is a tactical multiplayer first-person shooter by Reissad Studio, available in Steam Early Access for Windows PCs. Its body-camera viewpoint and Unreal Engine 5 presentation emphasize close-quarters tension.",
        "The official store lists competitive modes as well as co-op Zombies. Features and balance can change during Early Access, so this independent guide points readers to dated official sources."
      ],
      "stats": [
        {
          "label": "Developer",
          "value": "Reissad Studio"
        },
        {
          "label": "Platform",
          "value": "Windows PC / Steam"
        },
        {
          "label": "Engine",
          "value": "Unreal Engine 5"
        }
      ],
      "cta": "Browse All Guides"
    },
    "finalCta": {
      "title": "Ready to play?",
      "description": "Check the current Steam listing before purchasing or installing, then use the guide index to prepare.",
      "primary": "Read the Guides",
      "secondary": "View on Steam"
    }
  },
  "footer": {
    "aboutTitle": "Bodycam Wiki",
    "about": "An independent, fan-made guide to Bodycam for English-speaking PC players. We are not affiliated with Reissad Studio or Valve.",
    "description": "Source-backed tactical FPS guides and update notes.",
    "playGame": "View Bodycam on Steam",
    "officialDiscord": "Reissad Studio Discord — https://discord.gg/reissadstudio",
    "officialYoutube": "Reissad Studio YouTube — https://www.youtube.com/@ReissadStudio",
    "communityTool": "Steam Community — https://steamcommunity.com/app/2406770/",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  },
  "sidebarCodes": "暂无",
  "metadata": {
    "title": "Bodycam Wiki — Guides, Settings & Modes",
    "description": "Independent Bodycam guides for PC players: learn multiplayer modes, setup, performance, Zombies and current updates with links back to official sources.",
    "keywords": "Bodycam wiki, Bodycam guides, Bodycam settings, Bodycam modes"
  }
}
```

## SEO 自检

- home.meta.title: 39 字符（≤60）。
- metadata.title: 39 字符（≤60）。
- metadata.description: 152 字符（140–160）。
- metadata.keywords: 61 字符（≤100）。
- hero.stats 为纯字符串；start.cards 恰好 4 项；aboutGame.stats 每项有 label/value；footer.about 为两句；未证实官方代码，sidebarCodes 为「暂无」。

## 视觉与本地化

默认深色。身体摄像机视角和近距离战斗适合石墨色背景、低饱和钢蓝、少量琥珀色强调；不复制官方徽标。CSS 建议：

```css
/* Navigation theme - light */
--nav-theme: 211 24% 93%;
--nav-theme-light: 210 19% 97%;
/* Navigation theme - dark */
--nav-theme: 212 29% 10%;
--nav-theme-light: 210 20% 16%;
```

首发只推荐 English（根路径 `/`）。德语和法语虽有 Steam 界面支持，暂无人工核实的完整译文；不要用模板演示译文充当 Bodycam 内容。品牌名保持 Bodycam。

## 图标与实现边界

图标为原创独立粉丝站标识，透明 512×512 PNG 源文件 `Bodycam-icon-master.png`，七文件 ZIP 为 `Bodycam图标.zip`。本次按用户先前授权在本机生成图标包，未通过 favicon.io。

English icon prompt:

> Use case: logo-brand. Asset type: square favicon master for an independent Bodycam tactical FPS guide website, target 512 x 512 PNG. Create one original highly recognizable emblem: a simplified body-camera lens aperture nested in a restrained tactical shield silhouette, with at most two supporting angular corner marks. Clean premium game UI icon, crisp vector-like raster rendering, simplified bold silhouette, centered emblem about 76 percent of the square with safe transparent padding, legible at 16 x 16 pixels. Mood: tense, photoreal tactical shooter; palette charcoal graphite, muted steel blue, restrained warm amber highlight. No words, letters, captions, tiny details, watermark, mockup, rectangular background or border touching canvas. Genuine transparent background, isolated emblem, high contrast. Do not copy or resemble the official Bodycam game logo or any copyrighted character.

站点须明确非官方身份。任何更新、平台可用性、价格、配队流程、武器强度、地图名称、代码或玩家统计均需在对应页面标注来源与复核日期；无法核实的搜索词进入待办而非编造页面。
