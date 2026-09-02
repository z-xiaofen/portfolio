<script setup lang="ts">
import ParticleCanvas from './ParticleCanvas.vue'
import TypedText from './TypedText.vue'

const roles = ['前端工程师', 'AI Coding 实践者', '三维交互探索者', 'Vue / TS / Three.js']

const tags = ['Vue 3', 'Vite', 'TypeScript', 'Three.js', 'AI 提效']

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="hero">
    <ParticleCanvas />

    <div class="hero-fade" aria-hidden="true"></div>
    <div class="hero-beam" aria-hidden="true"></div>

    <div class="container hero-inner">
      <div class="hero-text" data-parallax="0.22">
        <span class="hero-kicker">01 / 嗨，你好</span>

        <h1 class="hero-title">
          <span class="hero-line">我是王浩</span>
          <TypedText class="hero-typed" :words="roles" />
        </h1>

        <p class="hero-sub">
          热衷于用代码构建干净、流畅的 Web 体验。
          相信 AI Coding 正在重塑前端生产方式 —— 我把它用在了每一天的
          设计、编码与交付里。
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollTo('projects')">
            查看作品
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          <button class="btn btn-ghost" @click="scrollTo('ai')">
            <span class="dot" aria-hidden="true"></span>
            我的 AI 工作流
          </button>
        </div>

        <div class="hero-tags">
          <span v-for="tag in tags" :key="tag" class="hero-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <button class="scroll-indicator" @click="scrollTo('about')" aria-label="向下滚动">
      <span class="scroll-ring" aria-hidden="true"><span class="scroll-ring-inner"></span></span>
      <span class="scroll-dot" aria-hidden="true"></span>
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(
      1200px 700px at 78% 30%,
      rgba(124, 77, 255, 0.07) 0%,
      transparent 60%
    ),
    radial-gradient(900px 600px at 20% 90%, rgba(0, 229, 255, 0.05) 0%, transparent 55%),
    var(--bg);
}

.hero-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
      120deg,
      var(--hero-shade-strong) 0%,
      var(--hero-shade) 42%,
      transparent 70%
    ),
    linear-gradient(0deg, var(--bg) 0%, transparent 26%);
}

/* 旋转聚光扫描：缓慢掠过的锥形光，营造光影层次 */
.hero-beam {
  position: absolute;
  top: -40%;
  left: -20%;
  width: 70%;
  height: 200%;
  pointer-events: none;
  z-index: 1;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(0, 229, 255, 0.06) 18deg,
    transparent 42deg,
    transparent 130deg,
    rgba(124, 77, 255, 0.08) 150deg,
    transparent 175deg,
    transparent 360deg
  );
  mix-blend-mode: screen;
  filter: blur(10px);
  animation: beam-sweep 34s linear infinite;
  transform-origin: 60% 50%;
}

@keyframes beam-sweep {
  to {
    transform: rotate(360deg);
  }
}

.hero-inner {
  position: relative;
  z-index: 2;
  padding-top: 40px;
}

.hero-text {
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 13.5px;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
}

.hero-kicker::before {
  content: '';
  width: 36px;
  height: 2px;
  border-radius: 2px;
  background: var(--grad-ai);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.35);
}

.hero-kicker::after {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 10px var(--cyan);
  animation: kicker-pulse 2.4s ease-in-out infinite;
}

@keyframes kicker-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.hero-title {
  font-size: clamp(40px, 6.4vw, 72px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.03em;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

.hero-typed {
  font-size: clamp(30px, 4.6vw, 52px);
}

.hero-sub {
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.75;
  color: var(--text-dim);
  max-width: 46ch;
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 10px rgba(74, 247, 196, 0.9);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
}

.hero-tag {
  font-family: var(--mono);
  font-size: 12.5px;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
  transition:
    border-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.hero-tag:hover {
  color: var(--cyan);
  border-color: rgba(0, 229, 255, 0.4);
  box-shadow: 0 0 16px rgba(0, 229, 255, 0.15);
}

.scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: 34px;
  transform: translateX(-50%);
  z-index: 2;
  width: 44px;
  height: 44px;
  padding: 0;
  animation: fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both;
}

.scroll-ring {
  position: absolute;
  inset: 0;
  border: 1px solid var(--border-strong);
  border-radius: 50%;
  animation: scroll-pulse 2.4s ease-out infinite;
}

.scroll-ring-inner {
  position: absolute;
  inset: 5px;
  border-radius: 50%;
}

.scroll-dot {
  position: absolute;
  top: 10px;
  left: 50%;
  width: 3px;
  height: 3px;
  margin-left: -1.5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  animation: scroll-drop 2.4s ease-out infinite;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-dot {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(74, 247, 196, 0.8);
  }
  50% {
    box-shadow: 0 0 16px rgba(74, 247, 196, 1);
  }
}

@keyframes scroll-pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  70% {
    transform: scale(1.15);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes scroll-drop {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(16px);
    opacity: 0;
  }
  100% {
    transform: translateY(16px);
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .hero-text {
    max-width: 100%;
  }
  .hero-fade {
    background: linear-gradient(
        0deg,
        var(--hero-shade-strong) 0%,
        var(--hero-shade) 40%,
        var(--hero-shade-mid) 100%
      );
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-beam {
    animation: none;
    opacity: 0.4;
  }
}
</style>