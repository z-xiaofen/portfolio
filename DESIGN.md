# DESIGN — 个人主页设计规范

> 依据 2026-09-01 生成的概念图（`assets/concept/hero.jpg`、`assets/concept/projects.jpg`）提炼

## 1. 设计方向

纯黑底 + Apple 简洁风 + AI 霓虹点缀：**干净、克制、留白充足**，霓虹仅用于强调 AI 相关内容。

## 2. 色彩系统

| Token        | 值                       | 用途      |
| ------------ | ----------------------- | ------- |
| `--bg`       | `#000000`               | 页面背景    |
| `--surface`  | `#0a0a0f`               | 卡片表面    |
| `--border`   | `rgba(255,255,255,.09)` | 常规描边    |
| `--text`     | `#ffffff`               | 主文字     |
| `--text-dim` | `rgba(255,255,255,.68)` | 次要文字    |
| `--cyan`     | `#00e5ff`               | AI / 强调 |
| `--violet`   | `#7c4dff`               | AI 卡片霓虹 |
| `--magenta`  | `#f50057`               | 点缀（内核心） |
| `--lime`     | `#4af7c4`               | 在线状态点   |

渐变主轴：`--grad-ai = linear-gradient(100deg, cyan → violet → magenta)`，用于按钮/渐变文字/进度条。

## 3. 字体

- 正文/标题：`Inter` + `PingFang SC`（Apple 风格），标题字重 700–800，紧字距 `-0.02em`

- 代码/标签/序号：`JetBrains Mono`

字号阶梯：标题 `clamp(30px, 4.4vw, 46px)`；正文 16.5px / 行高 1.75。

## 4. 组件规范

- 圆角：卡片 20–28px，胶囊 999px

- 按钮：主按钮走 `--grad-ai` + 紫色辉光；次按钮描边幽灵样式

- 卡片：`--surface` + 细描边，hover 上抬 6px；**AI 高亮卡**双层紫色 `box-shadow`

- 区块序号 eyebrow：mono 青色 `01 / 02 / ...`

- 代码块：模拟 macOS 红黄绿灯 + 文件 Tab + 高亮行（紫/青）

## 5. 动效原则

- 入场：`fade-up`（22px 位移 + 0.9s `cubic-bezier(0.22,1,0.36,1)`），`--reveal-delay` 交错

- 滚动显现：IntersectionObserver 触发 `.is-visible`，16% 阈值

- 3D：粒子网络 + 线框二十面体 + 光环，鼠标视差平滑跟随（lerp 0.06）

- 全部动效支持 `prefers-reduced-motion: reduce` 降级

## 6. 交互约定

- 导航：固定顶部，滚动后毛玻璃（blur 18px）；≤900px 汉堡菜单

- 滚动指示器：圆环扩散 + 圆点下落，2.4s 循环

- 打字机角色词、AI 终端会话轮播：逐字 + 闪烁光标

- WebGL 不可用时降级为 CSS 星空背景（`data-fallback`）

