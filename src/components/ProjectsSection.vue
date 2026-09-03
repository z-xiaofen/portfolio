<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface Project {
  tag: string
  title: string
  desc: string
  stack: string[]
  links: { label: string; href: string }[]
  code?: { file: string; lines: [string, string][] } // [text, highlight]
}

const projects: Project[] = [
  {
    tag: '数字孪生',
    title: '隧道数字孪生三维可视化监控系统',
    desc: '覆盖 13 条真实隧道的高速公路隧道群数字孪生系统：WebGL + CSS2D 双渲染管线，基于 WebSocket 的帧缓存与时间插值渲染，数据到画面延迟 ≤250ms；第一视角车辆追踪与视锥体裁剪的视频接力联动。',
    stack: ['Cesium', 'Three.js', 'WebSocket', 'Vue 3'],
    links: [],
  },
  {
    tag: 'AI 赋能',
    title: 'AI 模型服务管理平台',
    desc: '企业级 AI 模型全生命周期管理（发布/部署/监控），Vue 3 + TypeScript 构建；基于角色的动态权限路由、5 种可切换布局、Vue Flow 可视化流程编辑器；70%+ 代码由 AI 生成，开发效率提升 3 倍。',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Vue Flow', 'AI Coding'],
    links: [],
    code: {
      file: 'router/guard.ts',
      lines: [
        ['// 基于角色的动态权限路由', ''],
        [`const routes = genRoutes(role)`, ''],
        ['', ''],
        [`router.beforeEach((to, from, next) => {`, ''],
        ['  if (hasPermission(to, userStore.roles))', 'hl-violet'],
        ['    next()', ''],
        ['  else', ''],
        ['    next(`/403?from=${to.path}`)', ''],
        ['})', 'hl-cyan'],
      ],
    },
  },
  {
    tag: '低代码',
    title: '低代码流程编排平台',
    desc: '面向大数据平台的可视化编排系统：AntV X6 图编辑引擎，覆盖 70+ 算子/控制/服务节点，插件化中间件架构让新增节点零侵入；40+ 算子参数动态配置，支持流程在线调试与版本管理。',
    stack: ['Vue 2', 'AntV X6', 'CodeMirror', 'Axios'],
    links: [],
  },
  {
    tag: 'AI Code',
    title: '电脑硬件信息可视化',
    desc: '基于 Three.js 的电脑硬件信息可视化页面：CPU / GPU / 内存与 FPS 实时监控面板，配合可拖拽的 3D 像素地球联动展示。整个页面由 AI 编程完成，已部署至 GitHub Pages 线上访问。',
    stack: ['Three.js', 'Vue 3', 'Vite', 'TypeScript'],
    links: [
      { label: '在线访问', href: 'https://z-xiaofen.github.io/quantum-entanglement/' },
      { label: 'GitHub 源码', href: 'https://github.com/z-xiaofen/quantum-entanglement' },
    ],
  },
  {
    tag: '政务系统',
    title: '省外办申报审批系统',
    desc: '为省外办定制的在线申报与审批平台，覆盖出国审批、邀请函申报、文件审批等流程；基于用户角色动态渲染功能菜单与审批权限，Lazy Loading 优化使首屏加载缩短约 30%。',
    stack: ['Vue 2', 'Webpack', 'Vuex', 'ECharts'],
    links: [],
  },
  {
    tag: '能源',
    title: '华润电力项目管理系统',
    desc: '电力项目管理全流程平台：甘特图与任务拖拽、ECharts 进度可视化；权限切换响应从 500ms 降至 200ms，虚拟滚动使万行表格渲染从 3s 降至 500ms。',
    stack: ['Vue 3', 'Element Plus', 'ECharts', 'Vuex'],
    links: [],
  },
  {
    tag: '汽车',
    title: '上海汇众汽车流程管理平台',
    desc: '车辆生产、质检、供应链流程管理系统：动态表单渲染 + 流程可视化，ECharts 生产进度监控大屏支持实时更新，WebP + CDN 使图片加载性能提升 50%。',
    stack: ['Vue 2', 'Vuex', 'ECharts', 'Webpack'],
    links: [],
  },
  {
    tag: '新能源',
    title: '小鹏汽车流程管理平台',
    desc: '基于公司流程引擎为小鹏汽车定制的过程自动化管理系统，涵盖流程设计、审批、执行、监控与数据分析；ECharts 呈现流程处理效率、审批通过率等关键指标，支持跨部门协作。',
    stack: ['Vue 2', 'Vuex', 'ECharts', 'Webpack'],
    links: [],
  },
  {
    tag: '科研',
    title: '之江实验室仪器管理平台',
    desc: '实验室仪器全生命周期管理系统：预约、使用记录、维护与数据分析；模块化组件化开发缩短交付周期，打包体积减少 30%，大幅提升页面响应速度。',
    stack: ['Vue 2', 'Vuex', 'ECharts'],
    links: [],
  },
  {
    tag: '电网',
    title: '线损综合信息管理系统',
    desc: '国家电网 10kV-110kV 线损智能化管理：控制中心、数据中心、缺陷隐患中心等核心模块，电网 Canvas 绘图 + 理论线损计算，qiankun 微前端多子应用协同。',
    stack: ['Vue 2', 'ECharts', 'Canvas', 'qiankun'],
    links: [],
  },
  {
    tag: '电网',
    title: '技术降损可视化平台',
    desc: '为国家电网开发的降损数据可视化平台，数据化展示各地市主网技术降损成效：ECharts 多图表动态更新 + PNG/PDF 导出，Web Worker 处理大数据渲染、避免页面卡顿。',
    stack: ['Vue 2', 'ECharts', 'Web Worker'],
    links: [],
  },
  {
    tag: '工具',
    title: '线损报表自动生成工具',
    desc: '通过后台配置 JSON 自动生成数据报表的轻量工具：负责网络请求与高级查询模块开发联调，参与报表工具设计、流程优化与测试，图表数据支持追溯。',
    stack: ['Vue 2', 'Vuex', 'Axios'],
    links: [],
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
            从数字孪生大屏到低代码编排，从流程中台到政务系统 ——
            每个项目都是一次把复杂业务稳稳落地的认真尝试。
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
          data-reveal
          :ref="setCard"
          @pointermove="onTiltMove($event, ($event.currentTarget as HTMLElement))"
          @pointerleave="onTiltLeave(($event.currentTarget as HTMLElement))"
          :style="{ '--reveal-delay': (i * 120 + 200) + 'ms' }"
        >
          <div class="card-top">
            <span class="card-tag">{{ p.tag }}</span>
            <span class="card-spark" aria-hidden="true">
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

          <div v-if="p.links && p.links.length" class="card-links">
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
  /* 统一为霓虹紫边 + 顶部光晕，所有卡片同一套高亮 UI */
  border: 1px solid rgba(124, 77, 255, 0.4);
  background:
    radial-gradient(120% 90% at 50% 0%, var(--featured-tint) 0%, transparent 55%),
    var(--surface);
  box-shadow: var(--glow-featured-base);
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
    rgba(0, 229, 255, 0.14),
    rgba(124, 77, 255, 0.1),
    transparent 62%
  );
  transition: opacity 0.3s ease;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover {
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
  color: var(--tag-violet-text);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(124, 77, 255, 0.55);
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
}

@media (max-width: 720px) {
  .projects-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-spark {
    animation: none;
  }
}
</style>