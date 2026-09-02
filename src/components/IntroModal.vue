<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import avatarSrc from '../assets/avatar.jpg'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const GITHUB = 'https://github.com/z-xiaofen'
const EMAIL = 'wanghaohao1129@163.com'
const WECHAT = '18503760936'

const copied = ref(false)
let copyTimer = 0

// 是否渲染在 DOM 中（含退场动画期间）
const show = ref(false)
// 退场动画进行中
const leaving = ref(false)
let closeTimer = 0

// 滚动条宽度（锁定时用 padding-right 补偿，避免关闭后滚动条复现导致页面抖动）
function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth
}

function lockScroll() {
  const pad = getScrollbarWidth()
  document.body.style.overflow = 'hidden'
  if (pad > 0) document.body.style.paddingRight = `${pad}px`
}

function unlockScroll() {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// 打开：立即渲染并锁定页面滚动；关闭：先播退出动画再卸载、解锁滚动
watch(
  () => props.open,
  (open) => {
    clearTimeout(closeTimer)
    if (open) {
      leaving.value = false
      show.value = true
      lockScroll()
    } else if (show.value) {
      leaving.value = true
      closeTimer = window.setTimeout(() => {
        show.value = false
        leaving.value = false
        unlockScroll()
      }, 400)
    }
  },
)

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
      /* ignore */
    }
    ta.remove()
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(WECHAT).then(done).catch(fallback)
  } else {
    fallback()
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearTimeout(closeTimer)
  clearTimeout(copyTimer)
  // 组件被整体卸载时确保不残留滚动锁
  unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="intro-backdrop"
      :class="{ leaving }"
      @click.self="emit('close')"
    >
      <div class="intro-modal" role="dialog" aria-modal="true" aria-label="个人简介">
        <button class="intro-close" aria-label="关闭" @click="emit('close')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="intro-avatar">
          <span class="intro-ring" aria-hidden="true"></span>
          <img :src="avatarSrc" alt="王浩头像" />
        </div>

        <h3 class="intro-name">王浩</h3>
        <p class="intro-role">前端工程师 · AI Coding 实践者</p>

        <p class="intro-bio">
          5 年工作经验（另有 1 年实习），长期参与 B 端中后台产品研发，以 Vue 技术栈为主，
          配合 Node.js 与小程序完成完整业务闭环。2025 年起深度实践 AI Coding，
          把 Codex、Claude 等大模型接入需求拆解、编码与测试的完整链路，
          坚信 AI 是工程师最锋利的杠杆。
        </p>

        <div class="intro-tags">
          <span>Vue 2</span><span>Node.js</span><span>小程序</span><span>AI Coding</span>
        </div>

        <div class="intro-links">
          <a class="intro-link" :href="GITHUB" target="_blank" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>GitHub</span>
          </a>
          <button class="intro-link" @click="copyWechat">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8.66 1C4.32 1 1 3.98 1 7.56c0 1.97 1.04 3.73 2.67 4.88l-.68 2.07 2.44-1.27c.72.2 1.48.31 2.23.31h.44a5.9 5.9 0 0 1-.28-1.8c0-3.36 3.19-6.08 7.12-6.08l.43.01C14.86 3.94 11.98 1 8.66 1zm-1.53-2.9h-.02zm11.1 5.9c-3.72 0-6.72 2.57-6.72 5.72s3 5.72 6.72 5.72c.62 0 1.22-.07 1.79-.2l2.08 1.1-.56-1.73c1.34-.97 2.21-2.48 2.21-4.16 0-3.15-3-5.72-6.72-5.72zm-1.53 4.06a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46zm4.5 0a.73.73 0 1 1 0 1.46.73.73 0 0 1 0-1.46z" transform="translate(1 1) scale(0.92)"/></svg>
            <span>{{ copied ? '微信已复制' : '微信' }}</span>
          </button>
          <a class="intro-link" :href="`mailto:${EMAIL}`">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7l8-5H4l8 5zm0 2l-8-5v10h16V8l-8 5z"/></svg>
            <span>邮箱</span>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.intro-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: backdrop-fade 0.3s ease both;
}

.intro-modal {
  position: relative;
  width: min(440px, 100%);
  padding: 44px 36px 34px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  text-align: center;
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55), 0 0 60px rgba(124, 77, 255, 0.12);
  animation: modal-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.intro-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-faint);
  border: 1px solid var(--border);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease;
}

.intro-close:hover {
  color: var(--text);
  border-color: var(--border-strong);
  transform: rotate(90deg);
}

.intro-avatar {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 18px;
}

.intro-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-strong);
}

.intro-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px dashed rgba(124, 77, 255, 0.45);
  animation: ring-spin 16s linear infinite;
}

.intro-name {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.intro-role {
  margin-top: 6px;
  font-size: 14px;
  color: var(--violet);
  font-weight: 600;
}

.intro-bio {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-dim);
  text-align: left;
}

.intro-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.intro-tags span {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--text-dim);
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-raised);
}

.intro-links {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.intro-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-dim);
  border: 1px solid var(--border);
  background: var(--surface-raised);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.intro-link:hover {
  color: var(--cyan);
  border-color: rgba(0, 162, 196, 0.5);
  transform: translateY(-2px);
}

/* 退场动画：遮罩淡出、弹框向下缩小 */
.intro-backdrop.leaving {
  animation: backdrop-out 0.3s ease both;
  pointer-events: none;
}

.intro-backdrop.leaving .intro-modal {
  animation: modal-out 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes backdrop-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes backdrop-out {
  to {
    opacity: 0;
  }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes modal-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(14px) scale(0.95);
  }
}

@keyframes ring-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-backdrop,
  .intro-modal,
  .intro-ring {
    animation: none;
  }
}
</style>