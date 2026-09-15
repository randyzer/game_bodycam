# Bodycam 广告位深度修复记录

日期：2026-09-15。范围：当前 Bodycam 项目，用户已确认方案 A。

状态：项目代码、渲染测试和构建验证通过；未提交、推送或部署。尚未进行真实创意的桌面/移动端浏览器验收，不能宣称生产广告投放或收入提升已经验证。

## 根因与参考范围

基线：`f15be01`，`main`，开始时工作区干净。旧 BaseLayout 固定输出 `Header → 页面内容 → Footer → Adsterra script/container`，广告实际位于 Footer 之后，而非附件讨论中的 Footer 之前。首页没有较早的主广告位；旧容器没有预留高度。

参考 Bomb Farm 报告及已发布修复 `cbfd378` 的共享组件、首页单实例与非首页补充位策略。Bomb Farm 当前还有未提交的架构变化；本修复没有复制这些变化，也没有修改该项目。参考文件里的发布授权和统计事件不视为本项目授权。

## 最小修复

首页：`Hero / Trailer → At a glance → Start here → home-primary 广告 → Browse by category → 原有其余内容 → Footer`。

可索引非首页：`Header → main → before-footer 补充广告 → Footer`。这仍是页尾补充位，不代表已完成攻略页正文广告优化。

- 新增 `src/components/ads/AdSlot.astro`，统一合法配置解析、广告标识、provider script/container。支持类型化语义位置及本地禁用。
- 首页设置 `footerAd=false`。布局也检查 `page.route !== "/"`，防止忘记显式禁用时再次输出同一 key 的实例。
- `footerAd=false` 或非可索引页面不输出全局广告。没有广告配置时不输出空容器、标识或预留区域；部分/非法配置沿用原有显式报错。
- 使用 `min-height: clamp(72px, 10vw, 120px)` 预留空间，显示 Advertisement 标识；实际广告更高时允许自然撑开，不固定或裁剪高度。此值参考 Bomb Farm 的保守估算，并非已确认的 provider 格式尺寸；不能保证消除全部 CLS，真实创意尺寸仍需验收。
- 广告区域标记 `data-pagefind-ignore`，不把标识或创意当作站内搜索正文。
- 每个适用页面只有一个现有 key 实例；不新增第二广告位。现有环境变量名称、provider URL 生成规则与 GA head 初始化不变。
- 未加入自定义遥测、dataLayer 事件、观察器、刷新逻辑、外部请求渠道或新的广告平台。

## 验证

所有验证使用本机 Node `22.22.0`，通过命令前缀 `PATH=/Users/randyz/.nvm/versions/node/v22.22.0/bin:$PATH` 选择。默认 shell 的 `22.16.0` 不满足项目 `>=22.19.0 <23` 要求；未安装或下载运行时。

1. TDD 红阶段：新增 8 个测试中 7 个在旧代码按预期失败，1 个无配置行为测试通过。失败涉及主位置缺失、全局实例限制缺失及预留 CSS 缺失；原有 4 个配置测试通过。
2. `npm test -- tests/ad-placement.test.ts tests/third-party-scripts.test.ts`：修复后 2 文件、12 测试全部通过。
3. `npm run check`：37 文件、405 测试通过；Astro 检查 0 errors、0 warnings、0 hints。
4. `PUBLIC_ADSTERRA_AD_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa PUBLIC_ADSTERRA_BASE_URL=https://pl31237762.profitableratecpmnetwork.com npm run build`：通过。此 key 为合成测试值；没有修改环境配置文件，不能作为生产配置发布。
5. 构建验证：16 enabled pages、11 content entries；16 页面生成及路由核对通过；15 页面进入搜索索引；生成 HTML 审计通过。
6. 对全部 16 个生成 HTML 的额外本地断言：适用页面一个 script/container、不适用页面零个、无重复广告容器 ID、所有广告位于 Footer 之前；首页位于 main 内且 Start here 与分类之间，非首页补充位位于 main 与 Footer 之间。通过。
7. `git diff --check`：通过。
8. 交付前重新运行未覆盖广告环境变量的 `npm run build`：通过，恢复项目正常配置的构建产物；本地断言确认最终 `dist` 不含合成广告 key。再次运行 `npm test`：37 文件、405 测试通过。

原有空 `src/content/meta` collection 的 glob-loader 非阻断提示及部分页面媒体 readiness 提示仍在，与此次广告修复无关。

## 修改文件

- `src/components/ads/AdSlot.astro`（新增）
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `tests/ad-placement.test.ts`（新增）
- `docs/superpowers/plans/2026-09-15-ad-placement.md`（新增）
- `docs/ADS_MONETIZATION_REPAIR_REPORT.md`（新增）

## 后续人工验收与发布边界

当前仅证明项目输出结构已修复，未打开生产网站、测量真实广告滚动深度或请求 provider。不把 Bomb Farm 的 HTTP 200/403、人工批准或收入情况外推为 Bodycam 的结果。

发布仍需另行授权。发布构建必须使用本项目现有获批 public key/base URL，不能发布本地合成测试 key 的 dist。

建议桌面与手机验收新位置、真实创意尺寸、横向溢出、内容间距及跳动；正常人工浏览器检查 invoke.js 请求和可见创意。第二首页广告位待取得独立获批 key 后再规划。

收入效果需要在真实发布后比较同类流量/设备条件下的曝光、可见性（平台提供时）和 Page RPM；本代码修复不能保证收入涨幅。
