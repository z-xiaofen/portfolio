<script setup lang="ts">
const experiences = [
  {
    time: '2025.9 — 至今',
    city: '杭州',
    role: '前端开发工程师',
    company: '东驰科技',
    points: [
      '负责公司核心 B 端产品的迭代与维护，以 Vue 2/3 为主力框架，支撑多条中后台业务线',
      '参与隧道数字孪生三维可视化（Cesium + WebSocket 帧缓存时间插值），数据到画面延迟控制在 250ms 内，保障 7×24 大屏稳定展示',
      '常态化 AI 辅助编码：快速生成组件与工具函数、定位异常、重构重复逻辑，缩短可视化模块迭代周期',
      '参与 H5 移动端业务，完成任务巡查移动端开发；遵循工程化规范，Git 分支管理与代码评审',
    ],
    tags: ['Vue 2/3', 'ECharts', '数字孪生', 'AI Coding'],
  },
  {
    time: '2022.3 — 2025.6',
    city: '杭州',
    role: '前端开发工程师',
    company: '微宏科技',
    points: [
      '负责公司核心产品前端开发与维护，使用 Vue.js / React 构建高性能、可复用组件与页面，与 UI/UX、后端紧密协作',
      'Webpack/Vite 构建与打包优化，页面加载性能提升 30%；引入 TypeScript 增强可维护性，运行时错误减少 20%',
      '主导前端代码重构，落地 ESLint + Prettier 统一代码风格，提升团队协作效率',
      'ECharts 数据可视化模块开发，支撑多个 B 端业务数据的直观呈现',
    ],
    tags: ['Vue 2', 'React', 'TypeScript', 'Webpack/Vite'],
  },
  {
    time: '2020.10 — 2022.3',
    city: '郑州',
    role: '前端开发工程师',
    company: '郑州大方软件',
    points: [
      '负责国家电网线损综合信息管理系统控制中心、数据中心、缺陷隐患中心等模块的设计与开发联调',
      '独立完成缺陷隐患中心可视化数据报表，抽离封装图表数据追溯组件，支撑业务数据链路',
      '参与技术降损可视化平台、智能立项综合应用平台等多个电网业务项目，从设计稿到联调上线全流程跟进',
    ],
    tags: ['Vue 2', 'ECharts', 'Canvas'],
  },
]
</script>

<template>
  <section id="experience" class="section experience">
    <div class="exp-glow" aria-hidden="true"></div>

    <div class="container">
      <span class="section-eyebrow" data-reveal><em>05</em> / 经历</span>
      <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
        走过来的一步步
      </h2>
      <p class="section-sub" data-reveal style="--reveal-delay: 160ms">
        从个人开发者到团队主力，每一段经历都在打磨「如何把产品做得更好」这件事。
      </p>

      <div class="tl">
        <article
          v-for="(e, i) in experiences"
          :key="e.time"
          class="tl-item"
          data-reveal
          :style="{ '--reveal-delay': (i * 140 + 200) + 'ms' }"
        >
          <span class="tl-dot" aria-hidden="true"></span>
          <div class="tl-card">
            <span class="tl-time">{{ e.time }}</span>
            <span class="tl-city">{{ e.city }}</span>
            <h3 class="tl-role">{{ e.role }}</h3>
            <p class="tl-company">{{ e.company }}</p>
            <ul class="tl-points">
              <li v-for="p in e.points" :key="p">{{ p }}</li>
            </ul>
            <div class="tl-tags">
              <span v-for="t in e.tags" :key="t" class="tl-tag">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>

      <p class="exp-note" data-reveal style="--reveal-delay: 480ms">
        <span class="mono">// 完整履历</span>
        <a class="btn btn-primary exp-pdf" href="./王浩简历.pdf" download="王浩简历.pdf">
          下载 PDF 简历
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.experience {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 50%, var(--bg) 100%);
  overflow: hidden;
}

.exp-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      720px 460px at 16% 30%,
      rgba(0, 229, 255, 0.07) 0%,
      transparent 60%
    ),
    radial-gradient(720px 460px at 84% 72%, rgba(124, 77, 255, 0.09) 0%, transparent 60%);
}

/* ---- 中央时间轴 ---- */
.tl {
  position: relative;
  margin-top: 56px;
}

.tl::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 6px;
  bottom: 6px;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(0, 229, 255, 0.55) 0%,
    rgba(124, 77, 255, 0.45) 55%,
    rgba(245, 0, 87, 0.25) 100%
  );
  box-shadow: 0 0 14px rgba(124, 77, 255, 0.28);
}

.tl-item {
  position: relative;
  width: calc(50% - 46px);
  padding-bottom: 42px;
}

.tl-item:nth-child(even) {
  margin-left: calc(50% + 46px);
}

.tl-item:last-child {
  padding-bottom: 0;
}

.tl-dot {
  position: absolute;
  top: 30px;
  right: -55px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--grad-ai);
  box-shadow:
    0 0 0 5px rgba(124, 77, 255, 0.14),
    0 0 20px rgba(124, 77, 255, 0.8);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
}

.tl-item:nth-child(even) .tl-dot {
  right: auto;
  left: -55px;
}

.tl-item:hover .tl-dot {
  transform: scale(1.35);
  box-shadow:
    0 0 0 8px rgba(124, 77, 255, 0.18),
    0 0 30px rgba(0, 229, 255, 0.9);
}

.tl-card {
  padding: 26px 26px 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  transition:
    border-color 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease;
}

.tl-item:hover .tl-card {
  transform: translateY(-4px);
  border-color: rgba(124, 77, 255, 0.45);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.55), 0 0 30px rgba(124, 77, 255, 0.12);
}

.tl-time {
  font-family: var(--mono);
  font-size: 12.5px;
  letter-spacing: 0.06em;
  color: var(--cyan);
}

.tl-city {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin-left: 10px;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--violet-soft);
  background: var(--violet-soft);
}

.tl-role {
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  letter-spacing: -0.01em;
}

.tl-company {
  margin-top: 4px;
  font-size: 14px;
  color: var(--text-dim);
}

.tl-points {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tl-points li {
  position: relative;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
}

.tl-points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--grad-ai);
}

.tl-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tl-tag {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
}

.exp-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 40px;
  font-size: 13px;
  color: var(--text-faint);
}

.exp-note .mono {
  font-family: var(--mono);
  color: var(--text-dim);
}

.exp-pdf {
  padding: 10px 20px;
  font-size: 13.5px;
}

/* ---- 移动端：线靠左、卡全宽 ---- */
@media (max-width: 760px) {
  .tl::before {
    left: 26px;
    transform: none;
  }

  .tl-item,
  .tl-item:nth-child(even) {
    width: 100%;
    margin-left: 0;
    padding-left: 62px;
  }

  .tl-dot,
  .tl-item:nth-child(even) .tl-dot {
    left: 18px;
    right: auto;
    top: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tl-dot,
  .tl-card {
    transition: none;
  }
}
</style>