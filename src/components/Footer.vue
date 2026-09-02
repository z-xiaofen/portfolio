<script setup lang="ts">
import { ref } from 'vue'

const GITHUB = 'https://github.com/z-xiaofen'
const EMAIL = 'wanghaohao1129@163.com'
const WECHAT = '18503760936'

const copied = ref(false)
let copyTimer = 0

const socials = [
  {
    name: 'GitHub',
    type: 'link' as const,
    href: GITHUB,
    icon: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>',
  },
  {
    name: '微信',
    type: 'button' as const,
    icon: '<path d="M8.66 1C4.32 1 1 3.98 1 7.56c0 1.97 1.04 3.73 2.67 4.88l-.68 2.07 2.44-1.27c.72.2 1.48.31 2.23.31h.44a5.9 5.9 0 0 1-.28-1.8c0-3.36 3.19-6.08 7.12-6.08l.43.01C14.86 3.94 11.98 1 8.66 1zm-1.53-2.9h-.02zm11.1 5.9c-3.72 0-6.72 2.57-6.72 5.72s3 5.72 6.72 5.72c.62 0 1.22-.07 1.79-.2l2.08 1.1-.56-1.73c1.34-.97 2.21-2.48 2.21-4.16 0-3.15-3-5.72-6.72-5.72zm-1.53 4.06a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46zm4.5 0a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46z" transform="translate(1 1) scale(0.92)"/>',
  },
  {
    name: '邮箱',
    type: 'mail' as const,
    href: `mailto:${EMAIL}`,
    icon: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7l8-5H4l8 5zm0 2l-8-5v10h16V8l-8 5z"/>',
  },
]

function copyWechat() {
  const done = () => {
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = window.setTimeout(() => (copied.value = false), 2200)
  }
  const fallback = () => {
    const ta = document.createElement('textarea')
    ta.value = WECHAT
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
      done()
    } catch {
      /* 复制失败静默 */
    }
    ta.remove()
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(WECHAT).then(done).catch(fallback)
  } else {
    fallback()
  }
}

function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="contact" class="footer">
    <div class="container footer-inner">
      <div class="footer-glow" data-parallax="0.2" aria-hidden="true"></div>

      <div class="footer-cta" data-reveal>
        <h2 class="footer-title">
          一起做点
          <span class="footer-grad">酷的事情？</span>
        </h2>
        <p class="footer-sub">
          无论是前端项目、AI 产品还是三维可视化，都欢迎聊聊。
        </p>
        <a class="btn btn-primary footer-mail" :href="`mailto:${EMAIL}`">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          {{ EMAIL }}
        </a>
      </div>

      <div class="footer-bar" data-reveal style="--reveal-delay: 120ms">
        <div class="footer-social">
          <a
            v-for="s in socials.filter((s) => s.type !== 'button')"
            :key="s.name"
            class="social-btn"
            :href="s.type === 'mail' ? `mailto:${EMAIL}` : s.href"
            :target="s.type === 'mail' ? undefined : '_blank'"
            :rel="s.type === 'mail' ? undefined : 'noopener'"
            :aria-label="s.name"
            :title="s.name"
            v-html="`<svg width='17' height='17' viewBox='0 0 24 24' fill='currentColor'>${s.icon}</svg>`"
          ></a>

          <button
            class="social-btn"
            aria-label="微信"
            title="微信：18503760936"
            style="color: inherit"
            @click="copyWechat"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8.66 1C4.32 1 1 3.98 1 7.56c0 1.97 1.04 3.73 2.67 4.88l-.68 2.07 2.44-1.27c.72.2 1.48.31 2.23.31h.44a5.9 5.9 0 0 1-.28-1.8c0-3.36 3.19-6.08 7.12-6.08l.43.01C14.86 3.94 11.98 1 8.66 1zm-1.53-2.9h-.02zm11.1 5.9c-3.72 0-6.72 2.57-6.72 5.72s3 5.72 6.72 5.72c.62 0 1.22-.07 1.79-.2l2.08 1.1-.56-1.73c1.34-.97 2.21-2.48 2.21-4.16 0-3.15-3-5.72-6.72-5.72zm-1.53 4.06a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46zm4.5 0a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46z" transform="translate(1 1) scale(0.92)"/></svg>
          </button>

          <transition name="copypop">
            <span v-if="copied" class="copy-tip" role="status">微信号 {{ WECHAT }} 已复制</span>
          </transition>
        </div>

        <button class="back-top" @click="goTop">
          回到顶部
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
      </div>

      <p class="footer-copy" data-reveal style="--reveal-delay: 160ms">
        © 2026 王浩 · 本页面由
        <span class="mono">AI 编程完成</span>
        （Vue&nbsp;3 + Vite + TypeScript + Three.js）· GitHub：
        <a class="mono github-link" :href="GITHUB" target="_blank" rel="noopener">z-xiaofen</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 110px 0 40px;
  border-top: 1px solid var(--border);
  background: radial-gradient(900px 420px at 50% 110%, rgba(124, 77, 255, 0.1) 0%, transparent 65%);
}

.footer-glow {
  position: absolute;
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 640px;
  height: 280px;
  background: radial-gradient(ellipse, rgba(0, 229, 255, 0.08) 0%, transparent 65%);
  pointer-events: none;
}

.footer-inner {
  position: relative;
  display: flex;
  flex-direction: column;
}

.footer-cta {
  text-align: center;
  padding-bottom: 64px;
}

.footer-title {
  font-size: clamp(30px, 4.8vw, 52px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.footer-grad {
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-sub {
  margin-top: 16px;
  color: var(--text-dim);
  font-size: 16px;
}

.footer-mail {
  margin-top: 30px;
}

.footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 26px 0;
  border-top: 1px solid var(--border);
}

.footer-social {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-btn {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-dim);
  padding: 0;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.social-btn:hover {
  color: var(--cyan);
  border-color: rgba(0, 229, 255, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}

.social-btn:active {
  transform: translateY(-1px) scale(0.96);
}

.social-btn :deep(svg) {
  color: inherit;
}

.copy-tip {
  position: absolute;
  left: 52px;
  top: 50%;
  transform: translateY(-50%);
  padding: 7px 13px;
  border-radius: 10px;
  font-size: 12.5px;
  white-space: nowrap;
  color: var(--violet);
  background: var(--surface-2);
  border: 1px solid var(--violet-soft);
  box-shadow: 0 0 18px var(--violet-soft);
}

.copypop-enter-active,
.copypop-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.copypop-enter-from,
.copypop-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(-6px);
}

.back-top {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dim);
  transition: color 0.25s ease, gap 0.25s ease;
  padding: 8px;
}

.back-top:hover {
  color: var(--cyan);
  gap: 11px;
}

.footer-copy {
  text-align: center;
  font-size: 13px;
  color: var(--text-faint);
  padding-top: 26px;
  border-top: 1px solid var(--border);
}

.mono {
  font-family: var(--mono);
  color: var(--text-dim);
}

.github-link {
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.25);
  text-underline-offset: 3px;
  transition: color 0.25s ease;
}

.github-link:hover {
  color: var(--cyan);
}

@media (max-width: 720px) {
  .footer-bar {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>