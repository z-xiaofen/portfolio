<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const STORAGE = 'whh-theme'

const isDark = ref(true)
const switching = ref(false)
let timer = 0

function apply(theme: 'dark' | 'light') {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE, theme)
  } catch {
    /* 隐私模式等场景仅内存生效 */
  }
  isDark.value = theme === 'dark'
}

function init() {
  // 默认恒为暗色；仅当用户手动切换过（localStorage 有记录）才使用其选择
  let theme: 'dark' | 'light' = 'dark'
  try {
    const saved = localStorage.getItem(STORAGE) as 'dark' | 'light' | null
    if (saved === 'light' || saved === 'dark') theme = saved
  } catch {
    theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  }
  apply(theme)
}

function toggle() {
  // 全屏色彩过渡（短暂启用后移除，避免影响组件自身动效）
  const root = document.documentElement
  root.classList.add('theme-anim')
  window.setTimeout(() => root.classList.remove('theme-anim'), 650)

  // 图标弹出动画
  switching.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (switching.value = false), 500)

  const next = isDark.value ? 'light' : 'dark'
  apply(next)
  // 通知 Three.js 画布按主题微调亮度
  window.dispatchEvent(new CustomEvent('theme-change', { detail: next }))
}

onMounted(init)
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'is-dark': isDark, 'is-switching': switching }"
    :aria-label="isDark ? '切换到亮色主题' : '切换到暗色主题'"
    :title="isDark ? '切换亮色' : '切换暗色'"
    @click="toggle"
  >
    <!-- 月亮（暗色） -->
    <svg class="ico ico-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <!-- 太阳（亮色） -->
    <svg class="ico ico-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v2.5M12 20v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M1.5 12H4M20 12h2.5M4.2 19.8l1.8-1.8M18 6l1.8-1.8" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  border: 1px solid var(--border-strong);
  background: var(--surface-raised);
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.theme-toggle:hover {
  color: var(--cyan);
  border-color: rgba(0, 162, 196, 0.5);
  box-shadow: 0 0 18px var(--cyan-soft);
}

.theme-toggle:active {
  transform: scale(0.92);
}

.ico {
  position: absolute;
  transition:
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.38s ease;
}

.ico-sun {
  opacity: 0;
  transform: scale(0.35) rotate(-120deg);
}

.ico-moon {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.is-dark .ico-moon {
  opacity: 1;
  transform: scale(1);
}

.is-dark .ico-sun {
  opacity: 0;
  transform: scale(0.35) rotate(-120deg);
}

.theme-toggle:not(.is-dark) .ico-sun {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.theme-toggle:not(.is-dark) .ico-moon {
  opacity: 0;
  transform: scale(0.35) rotate(120deg);
}

/* 点击时图标光晕弹跳 */
.is-switching {
  box-shadow: 0 0 0 6px var(--color-ring, rgba(124, 77, 255, 0.14));
  animation: toggle-pulse 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes toggle-pulse {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1);
  }
}
</style>