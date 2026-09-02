# HANDOFF — 项目交接文档

> 更新时间：2026-09-01 · 状态：v1 已完成并验证

## 1. 项目是什么

「王浩」前端工程师个人主页。纯黑 + Apple 简洁风格，Three.js 炫酷背景，
核心叙事是 **AI Coding 工作流**。技术栈：**Vue 3 + Vite + TS + Three.js(0.185)**。

## 2. 如何运行

```bash
npm install      # 已安装
npm run dev      # http://localhost:5173/
npm run build    # 生产构建（vue-tsc 严格类型检查）
npm run preview  # 预览构建产物
```

## 3. 目录结构

```
src/
  main.ts / App.vue / style.css   # 入口 + 组装 + 设计系统(全部 CSS 变量)
  composables/
    useReveal.ts        # 滚动显现 IntersectionObserver
    useParallax.ts      # 视差滚动（[data-parallax]，仅 transform + rAF 节流）
  components/
    NavBar.vue          # 固定导航，滚动毛玻璃，≤900px 汉堡菜单（已移除"写邮件"）
    HeroSection.vue     # 首屏：ParticleCanvas + 打字机角色词 + 聚光扫描
    ParticleCanvas.vue  # Three.js 星系：螺旋星云+流星+鼠标视差；亮色下自动降亮
    TypedText.vue       # 打字机组件（首词预填、min 1 字符防塌陷）
    AboutSection.vue    # 个人简介：头像光环 + 数据 + 技能条 + 工具标签
    HobbiesSection.vue  # 爱好：电影 / 游戏 / 模型 三卡（位于页脚联系 CTA 之后）
    ExperienceSection.vue # 工作经历：居中渐变时间轴，交替卡片 (05/经历)
    ProjectsSection.vue # 项目卡（含 AI Code Tutor + "电脑硬件信息可视化" AI Code 卡）
    AiSection.vue       # AI Coding：三支柱文案 + 对话终端轮播动画
    ThemeToggle.vue     # 右上角日/月主题切换（localStorage 持久化 + 全屏色彩过渡）
    Footer.vue          # 联系 CTA → 爱好(HobbiesSection) → GitHub/微信/邮箱 → "AI 编程完成"标注
assets/concept/         # 设计概念图（hero.jpg / projects.jpg）
qa/                     # 浏览器验证截图
```

## 4. 关键决策

- **Three.js 场景**：节点 hub-卫星拓扑 + 邻近连线；AI 晶核 = 粒子晶格（顶点噪点位移呼吸）

  - 内层点壳 + 光晕 Sprite + 数据射线 + 三环 + 三颗绕转光球；**支持鼠标拖拽旋转 + 惯性**

- **视差**：`useParallax` 只作用于带 `[data-parallax]` 且无 `[data-reveal]` 的装饰元素

- **性能**：`pointer: coarse` 粒子数 \*0.55；离屏暂停 rAF；DPR 上限 2

- **健壮性**：WebGL 初始化失败 → `data-fallback` CSS 星空；卸载 `forceContextLoss()`

- **联系方式**：GitHub `https://github.com/z-xiaofen` · 邮箱 `wanghaohao1129@163.com` ·
  微信 `18503760936`（点击复制）

## 5. 已知问题 / 后续建议

- [ ] 浏览器自动化环境无法模拟移动端视口（锁定 1083×838），移动端按源码断点审查，
  建议真机/DevTools 复核一遍 ≤390px

- [ ] 头像为代码风格字标（wh），如要真人照片需替换 `.avatar-mono`

- [ ] 「Neo Design」「AI Code Tutor」「交通大屏」三张卡的项目链接为占位 `#`，上线前替换

- [ ] **经历时间轴为示例数据**（公司名/时间/职责），上线前替换为真实履历

- [ ] 文案（年限、项目描述）是示例数据，请按真实经历修订

- [ ] 爱好区块内嵌于页脚 CTA 之后（用户指定顺序：…→联系 → 爱好收尾）

- [ ] 产物 JS \~636KB（three.js 主因），如在意可后续 vite 代码分割按需加载

- [ ] 微信复制依赖 `navigator.clipboard`，非 HTTPS 环境自动走 execCommand 兜底

- [ ] 打字机角色词、终端会话文案都在各组件 script 内维护，方便增删

## 6. 已完成的验证（2026-09-02 增量）

- 布局切换按钮仅图标（去文字）；全局 `user-select:none`（pre/code 区域可选中）

- 流星重做为「亮核 + 渐变粒子拖尾」（自定义 ShaderMaterial，5 条 × 40 点）

- 3D 交互增强：光标光斑跟随 + 点击涟漪/星尘爆发 + 星系基础倾角与反向星云雾

- 项目卡全部加视觉预览区（首字母 + 霓虹点），对齐 AI 卡密度；电脑硬件卡去「今日」

- 导航 active 水滴形（border-radius 不规则呼吸 + 相邻 hover 融合吸附动画）

- 截图存档：`qa/v6-*.png`

