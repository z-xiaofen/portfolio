<script setup lang="ts">
const skills = [
  { name: 'Vue 2 / Vue 3', level: '主力框架 · Vue Router/Pinia', pct: 90 },
  { name: '数据可视化', level: 'ECharts · AntV X6 大屏', pct: 88 },
  { name: 'AI Coding', level: 'Agentic Workflow · Trae/Copilot/Codex', pct: 90 },
  { name: '前端工程化', level: 'Webpack/Vite · qiankun 微前端', pct: 84 },
]

const tools = [
  'Vue 2',
  'Vue 3',
  'Vuex',
  'Pinia',
  'TypeScript',
  'ECharts',
  'AntV X6',
  'Webpack',
  'Vite',
  'qiankun',
  '小程序',
  'Trae',
  'Copilot',
  'Codex',
]

const highlights = [
  { t: '5', d: '年工作经验 · 另 1 年实习' },
  { t: '2', d: '年 AI Coding 实践' },
  { t: '10+', d: '上线项目与产品迭代' },
]
</script>

<template>
  <section id="about" class="section about">
    <div class="container about-grid">
      <!-- 左：头像 -->
      <div class="about-visual" data-reveal>
        <div class="avatar-wrap">
          <div class="avatar-glow" aria-hidden="true"></div>
          <div class="avatar">
            <span class="avatar-mono">wh</span>
          </div>
          <span class="orbit orbit-1" aria-hidden="true"></span>
          <span class="orbit orbit-2" aria-hidden="true"></span>
          <div class="avatar-badge" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span>AI 驱动开发</span>
          </div>
        </div>
      </div>

      <!-- 右：简介 -->
      <div class="about-content">
        <span class="section-eyebrow" data-reveal><em>02</em> / 关于我</span>
        <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
          你好，我是王浩
          <span class="title-accent">一名擅用 AI 的前端工程师</span>
        </h2>

        <p class="about-text" data-reveal style="--reveal-delay: 160ms">
          我有 5 年工作经验（另有 1 年实习），主要参与 <em>B 端中后台</em>产品的研发：
          以 <em>Vue 2/3</em> 为主力框架，深耕 <em>ECharts / AntV</em> 数据可视化大屏
          与低代码流程编排，也独立交付过多个微信小程序。比起炫技，
          我更在意把复杂的业务规则拆成稳定、好维护、对用户好用的页面。
        </p>
        <p class="about-text" data-reveal style="--reveal-delay: 240ms">
          我以 <em>AI-Native</em> 的方式做开发：精通 <em>Agentic Workflow</em>，熟练使用
          Trae、GitHub Copilot、Codex 等 AI 编码工具辅助全栈开发、代码重构与故障排查；
          掌握 Prompt Engineering 与 Context Engineering，构建需求分析 → 代码生成 →
          测试部署的全流程自动化工作流。我坚信：
          <strong>AI 不是替代者，而是工程师最锋利的杠杆。</strong>
        </p>

        <div class="about-stats" data-reveal style="--reveal-delay: 320ms">
          <div v-for="h in highlights" :key="h.t" class="stat">
            <span class="stat-num">{{ h.t }}</span>
            <span class="stat-label">{{ h.d }}</span>
          </div>
        </div>

        <div class="skills" data-reveal style="--reveal-delay: 400ms">
          <div v-for="s in skills" :key="s.name" class="skill">
            <div class="skill-head">
              <span class="skill-name">{{ s.name }}</span>
              <span class="skill-level">{{ s.level }}</span>
            </div>
            <div class="skill-track">
              <span class="skill-fill" :style="{ width: s.pct + '%' }"></span>
            </div>
          </div>
        </div>

        <div class="tools" data-reveal style="--reveal-delay: 480ms">
          <span v-for="t in tools" :key="t" class="tool-chip">{{ t }}</span>
        </div>

        <!-- 求职信息：教育背景 + 求职意向 -->
        <div class="credential" data-reveal style="--reveal-delay: 560ms">
          <div class="cred-card">
            <span class="cred-label">教育背景</span>
            <p class="cred-value">郑州工商学院 · 网络工程 · 本科</p>
            <span class="cred-note">2017 — 2021</span>
          </div>
          <div class="cred-card">
            <span class="cred-label">求职意向</span>
            <p class="cred-value">前端工程师 · B 端 / AI Coding 方向</p>
            <p class="cred-value">杭州 · 已离职，可随时到岗</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 50%, var(--bg) 100%);
}

.about-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}

/* ---- 左：头像 ---- */
.about-visual {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 120px;
}

.avatar-wrap {
  position: relative;
  width: 300px;
  height: 300px;
}

.avatar-glow {
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    rgba(0, 229, 255, 0.22) 0%,
    rgba(124, 77, 255, 0.18) 45%,
    transparent 70%
  );
  filter: blur(6px);
  animation: glow-breathe 5s ease-in-out infinite;
}

.avatar {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-strong);
  background:
    radial-gradient(circle at 32% 26%, rgba(0, 229, 255, 0.14), transparent 55%),
    radial-gradient(circle at 72% 74%, rgba(124, 77, 255, 0.18), transparent 60%),
    var(--surface);
  overflow: hidden;
}

.avatar-mono {
  font-weight: 800;
  font-size: 96px;
  letter-spacing: -0.04em;
  background: linear-gradient(140deg, #fff 20%, var(--cyan) 55%, var(--violet) 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.orbit {
  position: absolute;
  inset: -14px;
  border: 1px dashed var(--border-strong);
  border-radius: 50%;
  animation: orbit-spin 22s linear infinite;
}

.orbit-2 {
  inset: -30px;
  border-color: rgba(124, 77, 255, 0.25);
  animation-direction: reverse;
  animation-duration: 34s;
}

.avatar-badge {
  position: absolute;
  right: 6px;
  bottom: 34px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: rgba(10, 10, 15, 0.85);
  border: 1px solid rgba(0, 229, 255, 0.4);
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.2);
  backdrop-filter: blur(8px);
}

.avatar-badge svg {
  color: var(--cyan);
}

/* ---- 右：内容 ---- */
.about-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.title-accent {
  display: block;
  margin-top: 10px;
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-text {
  font-size: 16.5px;
  line-height: 1.85;
  color: var(--text-dim);
}

.about-text em {
  font-style: normal;
  color: var(--cyan);
}

.about-text strong {
  color: #fff;
  font-weight: 600;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 18px 0 6px;
}

.stat {
  padding: 20px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition:
    border-color 0.3s ease,
    transform 0.3s ease;
}

.stat:hover {
  border-color: rgba(124, 77, 255, 0.45);
  transform: translateY(-3px);
}

.stat-num {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 13.5px;
  color: var(--text-dim);
}

.skills {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 22px;
}

.skill-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.skill-name {
  font-size: 14.5px;
  font-weight: 600;
}

.skill-level {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-faint);
}

.skill-track {
  height: 5px;
  border-radius: 99px;
  background: var(--border);
  overflow: hidden;
}

.skill-fill {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: var(--grad-ai);
  box-shadow: 0 0 12px rgba(124, 77, 255, 0.5);
  transform-origin: left;
  animation: grow 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.tool-chip {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--text-dim);
  padding: 7px 13px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.tool-chip:hover {
  color: var(--violet);
  border-color: rgba(124, 77, 255, 0.5);
}

/* 求职信息卡组：教育背景 + 求职意向 */
.credential {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 30px;
}

.cred-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  border-radius: var(--radius-sm);
  border: 1px dashed var(--border-strong);
  background: var(--surface-raised);
}

.cred-label {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.cred-value {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text);
}

.cred-note {
  font-size: 12px;
  color: var(--text-faint);
}

@media (max-width: 560px) {
  .credential {
    grid-template-columns: 1fr;
  }
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.85;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .about-visual {
    position: static;
  }
  .avatar-wrap {
    width: 220px;
    height: 220px;
  }
  .avatar-mono {
    font-size: 72px;
  }
  .about-stats {
    grid-template-columns: 1fr 1fr;
  }
  .about-stats .stat:last-child {
    grid-column: span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit,
  .avatar-glow {
    animation: none;
  }
  .skill-fill {
    animation: none;
    transform: none;
  }
}
</style>