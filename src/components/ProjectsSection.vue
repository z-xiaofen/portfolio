<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Project {
  featured?: boolean
  tag: string
  title: string
  desc: string
  stack: string[]
  links: { label: string; href: string }[]
  code?: { file: string; lines: [string, string][] } // [text, highlight]
}

const projects: Project[] = [
  {
    tag: '设计系统',
    title: 'Neo Design 组件库',
    desc: '为 10+ 企业级中后台产品定制的 Vue 3 设计系统，内置暗色模式、主题令牌与无障碍支持，覆盖 40+ 基础组件。',
    stack: ['Vue 3', 'TypeScript', 'Tailwind', 'VitePress'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: '在线文档', href: '#' },
    ],
  },
  {
    featured: true,
    tag: 'AI 赋能',
    title: 'AI Code Tutor',
    desc: '在编辑器内实时生成补全与解释的 AI 编程助手，支持多模型切换，把「提问-生成-落地」压成一个快捷键。',
    stack: ['TypeScript', 'OpenAI API', 'Node.js', 'WebSocket'],
    links: [
      { label: '演示视频', href: '#' },
      { label: '技术拆解', href: '#' },
    ],
    code: {
      file: 'prompt.ts',
      lines: [
        ['// 用 AI 把描述变成可运行代码', ''],
        [`const prompt = (desc: string) => \``, ''],
        ['  你是资深前端工程师，', 'hl-violet'],
        [`  请实现：\${desc}`, ''],
        [`  输出完整可运行代码。\``, ''],
        ['', ''],
        ['await ai.complete(prompt(description))', 'hl-cyan'],
      ],
    },
  },
  {
    tag: '可视化',
    title: '实时交通大数据大屏',
    desc: '基于 Three.js 与 WebSocket 的实时数据大屏，流畅渲染上万节点的路径动画，峰值帧率稳定在 60fps。',
    stack: ['Three.js', 'ECharts', 'WebSocket', 'Vue 3'],
    links: [
      { label: '在线体验', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    tag: 'AI Code',
    title: '电脑硬件信息可视化 · 已上线',
    desc: '基于 Three.js 的电脑硬件信息可视化页面：CPU / GPU / 内存与 FPS 实时监控面板，配合可拖拽的 3D 像素地球联动展示。整个页面由 AI 编程完成，已部署至 GitHub Pages 线上访问。',
    stack: ['Three.js', 'Vue 3', 'Vite', 'TypeScript'],
    links: [
      { label: '在线访问', href: 'https://z-xiaofen.github.io/quantum-entanglement/' },
      { label: 'GitHub 源码', href: 'https://github.com/z-xiaofen/quantum-entanglement' },
    ],
  },
  // ---- 待补充占位项目（后续逐个替换为真实作品） ----
  {
    tag: '待补充',
    title: '占位项目 ①',
    desc: '这里将介绍我的下一个项目。计划做一款面向创作者的工具型产品，正在打磨交互与视觉细节。',
    stack: ['Vue 3', 'Vite'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: '在线体验', href: '#' },
    ],
  },
  {
    tag: '待补充',
    title: '占位项目 ②',
    desc: '占位：一个全栈练习项目，覆盖登录鉴权、文件上传与后台管理。',
    stack: ['TypeScript', 'Node.js'],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    tag: '待补充',
    title: '占位项目 ③',
    desc: '占位：基于 Three.js 的 Web 端 3D 展示页，包含模型加载、轨道控制器与布光方案。',
    stack: ['Three.js', 'GSAP'],
    links: [{ label: '演示', href: '#' }],
  },
  {
    tag: '待补充',
    title: '占位项目 ④',
    desc: '占位：小程序 + H5 一体化的电商活动页模板。',
    stack: ['Vue 3', 'Pinia'],
    links: [{ label: 'GitHub', href: '#' }],
  },
  {
    tag: '待补充',
    title: '占位项目 ⑤',
    desc: '占位：一个长描述的完整示例项目。这个项目会包含大量细节，从需求文档、视觉走查、动效打磨到线上数据监控，覆盖一整条完整的产品研发链路，字数较长以便在瀑布流里形成高低落差。',
    stack: ['React', 'Vite', 'AI Coding'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: '在线访问', href: '#' },
    ],
  },
  {
    tag: '待补充',
    title: '占位项目 ⑥',
    desc: '占位：Node.js + 数据库的完整后端项目，提供 REST API 与 WebSocket 实时推送，配套 Docker 一键部署与接口文档。',
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'API 文档', href: '#' },
    ],
  },
  {
    tag: '待补充',
    title: '占位项目 ⑦',
    desc: '占位：跨端小程序 + H5 一体化项目，覆盖商城、直播与会员体系，沉淀可复用的营销组件与埋点规范。',
    stack: ['Vue 3', 'Pinia', 'uni-app'],
    links: [
      { label: '小程序码', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    tag: '待补充',
    title: '占位项目 ⑧',
    desc: '占位：3D 交互可视化作品集，WebGPU 渲染 + 粒子系统 + 轨道控制器，探索下一代 Web 图形边界。',
    stack: ['Three.js', 'WebGPU', 'GSAP'],
    links: [
      { label: '在线体验', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
]

/* ---------- 布局：普通网格 / 类淘宝瀑布流 ---------- */
const savedLayout = (() => {
  try {
    return localStorage.getItem('whh-project-layout')
  } catch {
    return null
  }
})()
const layout = ref<'grid' | 'masonry'>(savedLayout === 'masonry' ? 'masonry' : 'grid')

function setLayout(v: 'grid' | 'masonry') {
  layout.value = v
  try {
    localStorage.setItem('whh-project-layout', v)
  } catch {
    /* ignore */
  }
}

/* ---------- 卡片交互：光标 3D 倾斜 + 光斑跟随 ---------- */
interface TiltState {
  curRX: number
  curRY: number
  targetRX: number
  targetRY: number
  hover: boolean
}

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const cards: HTMLElement[] = []
const tilt = new Map<HTMLElement, TiltState>()
let rafTilt = 0

function setCard(el: unknown) {
  if (!(el instanceof HTMLElement)) return
  if (!cards.includes(el)) {
    cards.push(el)
    tilt.set(el, { curRX: 0, curRY: 0, targetRX: 0, targetRY: 0, hover: false })
  }
}

function onTiltMove(e: PointerEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
  el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  const s = tilt.get(el)!
  s.targetRX = (0.5 - py) * 6
  s.targetRY = (px - 0.5) * 8
  s.hover = true
}

function onTiltLeave(el: HTMLElement) {
  const s = tilt.get(el)!
  s.targetRX = 0
  s.targetRY = 0
  s.hover = false
}

function tiltLoop() {
  rafTilt = requestAnimationFrame(tiltLoop)
  for (const el of cards) {
    const s = tilt.get(el)!
    // 平滑趋近目标角度，中断可逆（光标来回移动不跳变）
    s.curRX += (s.targetRX - s.curRX) * 0.14
    s.curRY += (s.targetRY - s.curRY) * 0.14
    const lift = s.hover ? -6 : 0
    const a = s.curRX.toFixed(2)
    const b = s.curRY.toFixed(2)
    el.style.transform = `perspective(900px) translate3d(0, ${lift}px, 0) rotateX(${a}deg) rotateY(${b}deg)`
  }
}

onMounted(() => {
  if (canTilt && !reduced) tiltLoop()
})

onBeforeUnmount(() => cancelAnimationFrame(rafTilt))
</script>

<template>
  <section id="projects" class="section projects">
    <div class="container">
      <div class="projects-head">
        <div>
          <span class="section-eyebrow" data-reveal><em>03</em> / 项目精选</span>
          <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
            亲手做过的东西
          </h2>
          <p class="section-sub" data-reveal style="--reveal-delay: 160ms">
            从设计系统到数据大屏，从 AI 工具到三维交互 —— 每个项目都是一次
            对新技术的认真尝试。
          </p>
        </div>

        <div class="projects-tools" data-reveal style="--reveal-delay: 240ms">
          <div class="layout-switch" role="group" aria-label="项目布局切换">
            <button
              class="layout-btn"
              :class="{ active: layout === 'grid' }"
              :aria-pressed="layout === 'grid'"
              :aria-label="'网格布局'"
              title="普通卡片排列"
              @click="setLayout('grid')"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            </button>
            <button
              class="layout-btn"
              :class="{ active: layout === 'masonry' }"
              :aria-pressed="layout === 'masonry'"
              :aria-label="'瀑布流布局'"
              title="类淘宝瀑布流"
              @click="setLayout('masonry')"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h6v12H4zM14 3h6v7h-6zM14 14h6v7h-6zM4 19h6v2H4z"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="projects-grid" :class="{ 'is-masonry': layout === 'masonry' }">
        <article
          v-for="(p, i) in projects"
          :key="p.title"
          class="project-card"
          :class="{ featured: p.featured }"
          data-reveal
          :ref="setCard"
          @pointermove="onTiltMove($event, ($event.currentTarget as HTMLElement))"
          @pointerleave="onTiltLeave(($event.currentTarget as HTMLElement))"
          :style="{ '--reveal-delay': (i * 120 + 200) + 'ms' }"
        >
          <div class="card-top">
            <span class="card-tag" :class="{ 'tag-featured': p.featured }">{{ p.tag }}</span>
            <span v-if="p.featured" class="card-spark" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg>
            </span>
          </div>

          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-desc">{{ p.desc }}</p>

          <!-- AI 卡片代码片段 -->
          <div v-if="p.code" class="code-block">
            <div class="code-head">
              <span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="code-file">{{ p.code.file }}</span>
              <span class="code-ai" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg>
                AI
              </span>
            </div>
            <pre class="code-body"><code><span
                v-for="(line, li) in p.code.lines"
                :key="li"
                class="code-line"
                :class="line[1]"
              >{{ line[0] || '\u00A0' }}</span></code></pre>
          </div>

          <div class="card-stack">
            <span v-for="s in p.stack" :key="s" class="stack-chip">{{ s }}</span>
          </div>

          <div class="card-links">
            <a
              v-for="l in p.links"
              :key="l.label"
              :href="l.href"
              class="card-link"
              target="_blank"
              rel="noopener"
            >
              {{ l.label }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 56px;
}

.projects-tools {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.layout-switch {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
}

.layout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 34px;
  padding: 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dim);
  transition:
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;
}

.layout-btn:hover {
  color: var(--text);
  transform: translateY(-1px);
}

.layout-btn:active {
  transform: scale(0.9);
}

.layout-btn.active {
  color: #fff;
  background: var(--grad-ai);
  box-shadow: 0 0 14px rgba(124, 77, 255, 0.35);
}

.layout-btn.active svg {
  color: inherit;
}

/* 瀑布流模式：CSS 多列，瀑布错落 */
.projects-grid.is-masonry {
  display: block;
  columns: 3;
  column-gap: 22px;
}

.projects-grid.is-masonry .project-card {
  break-inside: avoid;
  margin-bottom: 22px;
}

@media (max-width: 1024px) {
  .projects-grid.is-masonry {
    columns: 2;
  }
}

@media (max-width: 720px) {
  .projects-grid.is-masonry {
    columns: 1;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  align-items: stretch;
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  will-change: transform;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 光标光斑：跟随 --mx / --my 移动的霓虹散射 */
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    300px circle at var(--mx, 50%) var(--my, 50%),
    rgba(124, 77, 255, 0.16),
    transparent 62%
  );
  transition: opacity 0.3s ease;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card.featured::before {
  background: radial-gradient(
    300px circle at var(--mx, 50%) var(--my, 50%),
    rgba(0, 229, 255, 0.14),
    rgba(124, 77, 255, 0.1),
    transparent 62%
  );
}

.project-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-card);
}

/* 高亮的 AI 卡片 */
.project-card.featured {
  border-color: rgba(124, 77, 255, 0.4);
  background:
    radial-gradient(120% 90% at 50% 0%, var(--featured-tint) 0%, transparent 55%),
    var(--surface);
  box-shadow: var(--glow-featured-base);
}

.project-card.featured:hover {
  border-color: rgba(124, 77, 255, 0.75);
  box-shadow: var(--shadow-featured);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-tag {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
}

.tag-featured {
  color: var(--tag-violet-text);
  border-color: rgba(124, 77, 255, 0.55);
  background: var(--violet-soft);
}

.card-spark {
  color: var(--violet);
  animation: spark-spin 4s linear infinite;
}

.card-title {
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.card-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-dim);
  flex-grow: 1;
}

/* 代码块 */
.code-block {
  border-radius: var(--radius-sm);
  border: 1px solid rgba(124, 77, 255, 0.3);
  background: var(--code-bg);
  overflow: hidden;
  box-shadow: inset 0 0 30px rgba(124, 77, 255, 0.06);
}

.code-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-raised);
}

.code-dots {
  display: inline-flex;
  gap: 5px;
}

.code-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--glow-strong);
}

.code-dots i:first-child {
  background: rgba(245, 0, 87, 0.8);
}
.code-dots i:nth-child(2) {
  background: rgba(220, 170, 60, 0.8);
}
.code-dots i:nth-child(3) {
  background: rgba(74, 247, 196, 0.8);
}

.code-file {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-faint);
}

.code-ai {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--tag-violet-text);
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--violet-soft);
  border: 1px solid rgba(124, 77, 255, 0.4);
}

.code-body {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-line {
  display: block;
  font-family: var(--mono);
  font-size: 12.5px;
  line-height: 1.9;
  color: var(--text-dim);
  white-space: pre;
}

.code-line.hl-violet {
  color: var(--violet);
}

.code-line.hl-cyan {
  color: var(--cyan);
}

.card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stack-chip {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
}

.card-links {
  display: flex;
  gap: 20px;
  padding-top: 6px;
  border-top: 1px solid var(--border);
}

.card-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dim);
  transition: color 0.25s ease, gap 0.25s ease;
}

.card-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.card-link:hover {
  color: var(--cyan);
  gap: 10px;
}

.card-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@keyframes spark-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: 1fr 1fr;
  }
  .project-card.featured {
    grid-column: span 2;
  }
}

@media (max-width: 720px) {
  .projects-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .project-card.featured {
    grid-column: span 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-spark {
    animation: none;
  }
}
</style>