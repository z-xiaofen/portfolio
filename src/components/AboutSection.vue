<script setup lang="ts">
const skills = [
  { name: 'Vue 3 / Nuxt', level: '主力框架', pct: 92 },
  { name: 'TypeScript', level: '日常标配', pct: 88 },
  { name: 'Three.js / WebGL', level: '三维与动效', pct: 80 },
  { name: 'AI Coding', level: 'Cursor / 各类助手', pct: 85 },
]

const tools = [
  'Vite',
  'Pinia',
  'Vue Router',
  'Three.js',
  'GSAP',
  'Tailwind CSS',
  'Cursor',
  'GitHub Copilot',
  'Claude',
  'Figma',
]

const highlights = [
  { t: '5+', d: '年前端开发经验' },
  { t: '3+', d: '年 AI Coding 深度实践' },
  { t: '20+', d: '上线项目与产品迭代' },
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
        <span class="section-eyebrow" data-reveal>02 / 关于我</span>
        <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
          你好，我是王浩
          <span class="title-accent">一名前端工程师</span>
        </h2>

        <p class="about-text" data-reveal style="--reveal-delay: 160ms">
          我有 5 年的前端开发经验，长期使用 Vue 技术栈构建复杂的中后台与营销型产品。
          我擅长把「炫酷的三维视觉」与「可用的产品逻辑」结合在一起 ——
          用 <em>Three.js</em> 做交互式可视化，用 <em>GSAP</em> 打磨动效细节。
        </p>
        <p class="about-text" data-reveal style="--reveal-delay: 240ms">
          2022 年起，我把 <em>AI Coding</em> 正式接入工作流：需求拆解、原型生成、单元测试、
          代码评审 …… 借助 Cursor、Copilot 与各类大模型，我交付迭代的速度大约提升了
          3~5 倍，同时把更多时间留给架构与体验。我坚信：<strong>AI 不是替代者，而是
          工程师最锋利的杠杆。</strong>
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