<script setup lang="ts">
import imgFilm from '../assets/hobbies/film.jpg'
import imgGame from '../assets/hobbies/game.jpg'
import imgModel from '../assets/hobbies/model.jpg'

const hobbies = [
  {
    name: '电影',
    title: '科幻 × 悬疑控',
    desc: '《星际穿越》《盗梦空间》反复刷也不腻，喜欢拆解镜头语言、脚本结构与配乐如何共同造梦。',
    tags: ['诺兰', '硬科幻', '奥斯卡片单'],
    accent: 'cyan',
    img: imgFilm,
    icon: '<path d="M3.5 6.5c0-1.1.9-2 2-2h13c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2h-13c-1.1 0-2-.9-2-2v-11z"/><path d="M10 9.5v5l4.5-2.5-4.5-2.5z"/>',
  },
  {
    name: '游戏',
    title: '3A × 独立双修',
    desc: '在《塞尔达：旷野之息》里闲逛一整天，也沉迷于像素独立游戏的奇异脑洞；手柄是第二双手。',
    tags: ['任天堂', '开放世界', '独立游戏'],
    accent: 'violet',
    img: imgGame,
    icon: '<path d="M6 8h12a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4z"/><path d="M6.8 10.8h.01M6.8 17.5h.01M16.5 12.5h.01M20 12.5h.01M6 12.5a2.8 2.8 0 1 0 5.6 0 2.8 2.8 0 0 0-5.6 0z"/>',
  },
  {
    name: '模型',
    title: '拼装的专注',
    desc: '高达拼装、积木与手办收藏，享受零件一点一点变成完整作品的耐心与秩序感。',
    tags: ['高达', '乐高', '手办'],
    accent: 'magenta',
    img: imgModel,
    icon: '<path d="M12 2l2.5 2.5-8 8L4 10 12 2zM4 10l3 3-1.5 1.5L2.5 11.5 4 10zM11 9l7.5-4-2 7.5L12 16.5 11 9zM9.5 20.5L8 12l5.5 1.5-4 7z"/>',
  },
]
</script>

<template>
  <section id="hobbies" class="section hobbies">
    <div class="hobby-deco" data-parallax="0.3" aria-hidden="true"></div>

    <div class="container">
      <div class="hobbies-head">
        <span class="section-eyebrow" data-reveal>06 / 爱好</span>
        <h2 class="section-title" data-reveal style="--reveal-delay: 80ms">
          工作之外，我还喜欢
        </h2>
        <p class="section-sub" data-reveal style="--reveal-delay: 160ms">
          代码之外的世界同样重要 —— 好的叙事、好的玩法、好的手艺，都在悄悄影响我怎么做产品。
        </p>
      </div>

      <div class="hobbies-grid">
        <article
          v-for="(h, i) in hobbies"
          :key="h.name"
          class="hobby-card"
          :class="'accent-' + h.accent"
          data-reveal
          :style="{ '--reveal-delay': (i * 120 + 200) + 'ms' }"
        >
          <!-- 背景层：hover 时从上滑下，模糊 → 清晰 -->
          <div class="hobby-bg" aria-hidden="true">
            <img :src="h.img" :alt="h.name" loading="lazy" />
            <span class="hobby-bg-shade"></span>
          </div>

          <div class="hobby-body">
            <div class="hobby-icon" v-html="`<svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'>${h.icon}</svg>`"></div>
            <span class="hobby-name">{{ h.name }}</span>
            <h3 class="hobby-title">{{ h.title }}</h3>
            <p class="hobby-desc">{{ h.desc }}</p>
            <div class="hobby-tags">
              <span v-for="tag in h.tags" :key="tag" class="hobby-tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hobbies {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 45%, var(--bg) 100%);
  overflow: hidden;
}

.hobby-deco {
  position: absolute;
  right: -160px;
  top: 12%;
  width: 420px;
  height: 420px;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(124, 77, 255, 0.12) 0%,
    rgba(0, 229, 255, 0.05) 40%,
    transparent 70%
  );
  filter: blur(12px);
  border-radius: 50%;
}

.hobbies-head {
  margin-bottom: 48px;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.hobby-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 340px;
  padding: 30px 28px 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.hobby-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-strong);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.6);
}

/* ---- 背景层：hover 时从上滑下，blur(16px) → blur(0) ---- */
.hobby-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-101%);
  filter: blur(16px);
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease,
    filter 0.55s ease;
  pointer-events: none;
}

.hobby-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hobby-bg-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.12) 55%, rgba(0, 0, 0, 0.3) 100%);
}

/* ---- 文字层：hover 时上移淡出并模糊（由清晰 → 模糊） ---- */
.hobby-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.4s ease,
    filter 0.45s ease;
}

.hobby-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  color: var(--acc);
  background: color-mix(in srgb, var(--acc) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--acc) 35%, transparent);
  box-shadow: 0 0 22px color-mix(in srgb, var(--acc) 22%, transparent);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.hobby-name {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--acc);
}

.hobby-title {
  font-size: 19px;
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: -0.01em;
}

.hobby-desc {
  margin-top: 10px;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-dim);
}

.hobby-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}

.hobby-tag {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

/* 悬停桌面：图片从顶部降下变清晰，文字上移变模糊 */
@media (hover: hover) and (pointer: fine) {
  .hobby-card:hover .hobby-bg {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  .hobby-card:hover .hobby-body {
    transform: translateY(-26px);
    opacity: 0.28;
    filter: blur(7px);
  }
}

/* —— 三种喜好各自的光色 —— */
.accent-cyan {
  --acc: var(--cyan);
}

.accent-violet {
  --acc: var(--violet);
}

.accent-magenta {
  --acc: var(--magenta);
}

@media (max-width: 900px) {
  .hobbies-grid {
    grid-template-columns: 1fr;
  }
  .hobby-card {
    min-height: 300px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hobby-bg,
  .hobby-body {
    transition: none;
  }
}
</style>