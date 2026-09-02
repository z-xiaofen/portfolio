<script setup lang="ts">
const experiences = [
  {
    time: '2023 — 至今',
    role: '前端工程师',
    company: '某互联网公司',
    points: [
      '主导核心产品 Vue 3 大规模重构，引入 Vite 构建与 TypeScript 全量类型覆盖',
      '从 0 搭建设计系统与组件库，支撑 6+ 业务线复用，暗色模式与无障碍全覆盖',
      '推动 AI Coding 工作流在团队落地，需求→原型→测试的全链路交付效率提升 3~5 倍',
    ],
    tags: ['Vue 3', 'TypeScript', '设计系统', 'AI Coding'],
  },
  {
    time: '2020 — 2023',
    role: '前端开发工程师',
    company: '某科技公司',
    points: [
      '负责营销活动页与数据大屏开发，基于 Three.js / ECharts 实现实时可视化',
      '主导性能优化专项，首屏 LCP 从 4.2s 降至 1.5s，核心页面通过 Core Web Vitals 全绿',
      '沉淀公共工具链与 CI 流水线，实现自动化构建、预览与一键回滚',
    ],
    tags: ['Three.js', 'ECharts', '性能优化', 'CI/CD'],
  },
  {
    time: '2018 — 2020',
    role: 'Web 开发工程师',
    company: '初创团队',
    points: [
      '从 0 到 1 构建官网、营销页与小程序，独立负责前后端联调与部署上线',
      '维护高并发活动页，峰值日活突破 50 万，QPS 压测通过率稳定',
    ],
    tags: ['JavaScript', '小程序', '部署'],
  },
]
</script>

<template>
  <section id="experience" class="section experience">
    <div class="exp-glow" aria-hidden="true"></div>

    <div class="container">
      <span class="section-eyebrow" data-reveal>05 / 经历</span>
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
        <span class="mono">// 完整履历</span>可联系我索取 PDF 或在线版本
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
  margin-top: 40px;
  text-align: center;
  font-size: 13px;
  color: var(--text-faint);
}

.exp-note .mono {
  font-family: var(--mono);
  color: var(--text-dim);
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