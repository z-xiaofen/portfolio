import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 主题引导：在首次渲染前恢复主题，避免首帧闪烁 / 失配
function applyInitialTheme() {
  let theme: 'dark' | 'light' = 'dark'
  try {
    const saved = localStorage.getItem('whh-theme') as 'dark' | 'light' | null
    if (saved === 'light' || saved === 'dark') {
      theme = saved
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light'
    }
  } catch {
    /* 隐私模式等场景降级为暗色 */
  }
  document.documentElement.dataset.theme = theme
}
applyInitialTheme()

createApp(App).mount('#app')
