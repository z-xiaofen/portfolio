<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

interface TermLine {
  kind: 'user' | 'ai'
  text: string
  typed?: boolean
}

const exchanges: TermLine[][] = [
  [
    { kind: 'user', text: '用 Vue 2 帮我写一个可复用的 v-debounce 指令' },
    { kind: 'ai', text: '好的，绑定阶段注册监听、卸载时清理，是这样：', typed: true },
    { kind: 'ai', text: "Vue.directive('debounce', { ... }) 已生成，含说明与示例", typed: true },
    { kind: 'ai', text: '已补上单元测试与边界场景处理，可直接粘贴使用。', typed: true },
  ],
  [
    { kind: 'user', text: '帮我把 Node.js 上传 Excel 的解析做成接口' },
    { kind: 'ai', text: '已定位关键点：大文件流式读取 + 字段校验。', typed: true },
    { kind: 'ai', text: '生成路由、解析器与错误返回，内存占用降低 60%。', typed: true },
  ],
  [
    { kind: 'user', text: '中后台表格要做大数据量虚拟滚动，给个方案' },
    { kind: 'ai', text: '思路：固定行高 + 可视区裁剪 + 缓冲行。', typed: true },
    { kind: 'ai', text: '已输出可运行的虚拟滚动组件与性能对比数据。', typed: true },
  ],
]

const shown = ref<TermLine[]>([])
const exchangeIndex = ref(0)
let timer = 0
let typingTimer = 0
let disposed = false

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, ms)
  })
}

async function play() {
  if (disposed) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = exchanges.map((e) => e.map((l) => ({ ...l, typed: false }))).flat()
    return
  }

  const exchange = exchanges[exchangeIndex.value]
  shown.value = []
  for (let i = 0; i < exchange.length; i++) {
    const line = exchange[i]
    await wait(i === 0 ? 500 : 320)
    if (disposed) return
    if (line.typed) {
      typedLine(line)
    } else {
      shown.value = [...shown.value, line]
    }
  }
  exchangeIndex.value = (exchangeIndex.value + 1) % exchanges.length
  await wait(3600)
  if (!disposed) play()
}

function typedLine(line: TermLine) {
  shown.value = [...shown.value, { ...line, text: '' }]
  let i = 0
  const step = () => {
    if (disposed) return
    i += 2
    const next = [...shown.value]
    next[next.length - 1] = { ...line, text: line.text.slice(0, i) }
    shown.value = next
    if (i < line.text.length) {
      typingTimer = window.setTimeout(step, 26)
    }
  }
  typingTimer = window.setTimeout(step, 120)
}

onMounted(() => {
  play()
})
onBeforeUnmount(() => {
  disposed = true
  clearTimeout(timer)
  clearTimeout(typingTimer)
})

const pillars = [
  { icon: '⚡', title: '更快交付迭代', desc: 'AI 生成初版与脚手架，把重复劳动交给模型，把时间留给架构。' },
  { icon: '◎', title: '全流程接入', desc: '从需求拆解、原型到测试与评审，AI 贯穿我的完整开发链路。' },
  { icon: '◆', title: '提示词工程', desc: '沉淀私有提示词库与规范，让每一次生成都稳定可信。' },
]
</script>

<template>
  <section id="ai" class="section ai">
    <div class="ai-glow" aria-hidden="true"></div>
    <div class="container ai-grid">
      <!-- 左：内容 -->
      <div class="ai-content">
        <span class="section-eyebrow" data-reveal><em>04</em> / AI Coding</span>
        <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
          AI 正在改变我
          <span class="ai-grad">写代码的方式</span>
        </h2>
        <p class="section-sub" data-reveal style="--reveal-delay: 160ms">
          这不是一个「趋势词」—— 它是我连续两年每天都在用的工作方式。
          左边是真实对话片段，右边是我的实践心得。
        </p>

        <div class="ai-pillars" data-reveal style="--reveal-delay: 240ms">
          <div v-for="(p, i) in pillars" :key="p.title" class="pillar">
            <span class="pillar-icon" :style="{ '--i': i }">{{ p.icon }}</span>
            <div>
              <h3 class="pillar-title">{{ p.title }}</h3>
              <p class="pillar-desc">{{ p.desc }}</p>
            </div>
          </div>
        </div>

        <div class="ai-cta" data-reveal style="--reveal-delay: 320ms">
          <a class="btn btn-primary" href="#projects">
            试试我的作品
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <span class="ai-hint">附：本页每个区块的代码都有 AI 协写的影子</span>
        </div>
      </div>

      <!-- 右：终端 -->
      <div class="ai-terminal-wrap" data-reveal style="--reveal-delay: 200ms">
        <div class="terminal">
          <div class="terminal-head">
            <span class="t-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="t-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              ai-assistant · 会话
            </span>
            <span class="t-status">
              <span class="t-dot-live"></span>
              工作中
            </span>
          </div>

          <div class="terminal-body">
            <div v-for="(line, i) in shown" :key="i" class="t-line" :class="line.kind">
              <span class="t-marker">{{ line.kind === 'user' ? '你' : 'AI' }}</span>
              <span class="t-text">
                {{ line.text }}<span v-if="line.typed && i === shown.length - 1" class="t-caret"></span>
              </span>
            </div>
            <div v-if="!shown.length" class="t-line t-line-empty">
              <span class="t-caret2"></span>
            </div>
          </div>
        </div>
        <div class="terminal-shadow" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai {
  overflow: hidden;
}

.ai-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      800px 500px at 82% 40%,
      rgba(124, 77, 255, 0.13) 0%,
      transparent 60%
    ),
    radial-gradient(600px 400px at 60% 88%, rgba(0, 229, 255, 0.07) 0%, transparent 55%);
}

.ai-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(48px, 7vw, 96px);
  align-items: center;
}

.ai-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-grad {
  display: block;
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.ai-pillars {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 22px;
}

.pillar {
  display: flex;
  gap: 16px;
}

.pillar-icon {
  flex: none;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 14px;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--cyan);
  box-shadow: 0 0 18px rgba(0, 229, 255, 0.12);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.pillar:hover .pillar-icon {
  transform: translateY(-3px) rotate(6deg);
  box-shadow: 0 0 26px rgba(124, 77, 255, 0.35);
}

.pillar-title {
  font-size: 16.5px;
  font-weight: 600;
  margin-bottom: 5px;
}

.pillar-desc {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--text-dim);
}

.ai-cta {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 26px;
}

.ai-hint {
  font-size: 13px;
  color: var(--text-faint);
}

/* ---- 终端 ---- */
.ai-terminal-wrap {
  position: relative;
}

.terminal {
  position: relative;
  z-index: 1;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(124, 77, 255, 0.38);
  background: rgba(10, 10, 16, 0.92);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 var(--glow-strong),
    0 0 60px rgba(124, 77, 255, 0.12);
}

.terminal-shadow {
  position: absolute;
  inset: -60px -40px -80px;
  background: radial-gradient(
    ellipse at 50% 30%,
    rgba(124, 77, 255, 0.22) 0%,
    rgba(0, 229, 255, 0.1) 45%,
    transparent 70%
  );
  filter: blur(30px);
}

.terminal-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-raised);
}

.t-dots {
  display: inline-flex;
  gap: 6px;
}

.t-dots i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.t-dots i:first-child {
  background: rgba(245, 0, 87, 0.85);
}
.t-dots i:nth-child(2) {
  background: rgba(220, 180, 70, 0.85);
}
.t-dots i:nth-child(3) {
  background: rgba(74, 247, 196, 0.85);
}

.t-title {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--mono);
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.62);
}

.t-status {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--mono);
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.4);
}

.t-dot-live {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--lime);
  animation: live-pulse 1.6s ease-in-out infinite;
}

.terminal-body {
  min-height: 320px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.65;
}

.t-line {
  display: flex;
  gap: 12px;
}

.t-marker {
  flex: none;
  width: 30px;
  text-align: center;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 6px;
  padding-top: 2px;
  height: fit-content;
}

.t-line.user .t-marker {
  color: var(--cyan);
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.25);
}

.t-line.ai .t-marker {
  color: #dcc6ff;
  background: rgba(124, 77, 255, 0.14);
  border: 1px solid rgba(124, 77, 255, 0.35);
}

.t-text {
  color: rgba(255, 255, 255, 0.82);
  white-space: pre-wrap;
  word-break: break-word;
}

.t-line.ai .t-text {
  color: rgba(255, 255, 255, 0.88);
}

.t-caret,
.t-caret2 {
  display: inline-block;
  width: 7px;
  height: 15px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--violet);
  box-shadow: 0 0 10px var(--violet);
  animation: caret-blink 0.85s steps(2, start) infinite;
}

.t-line-empty {
  min-height: 20px;
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}

@keyframes live-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(74, 247, 196, 0.5);
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 12px rgba(74, 247, 196, 1);
    opacity: 0.7;
  }
}

@media (max-width: 960px) {
  .ai-grid {
    grid-template-columns: 1fr;
  }
  .ai-terminal-wrap {
    order: 2;
  }
  .terminal-body {
    min-height: 260px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .t-dot-live,
  .t-caret,
  .t-caret2 {
    animation: none;
  }
}
</style>