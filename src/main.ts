import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 主题引导：在首次渲染前恢复主题，避免首帧闪烁 / 失配
// 默认恒为暗色，仅当用户手动切换过（localStorage 有记录）才使用其选择
function applyInitialTheme() {
  let theme: 'dark' | 'light' = 'dark'
  try {
    const saved = localStorage.getItem('whh-theme') as 'dark' | 'light' | null
    if (saved === 'light' || saved === 'dark') {
      theme = saved
    }
  } catch {
    /* 隐私模式等场景降级为暗色 */
  }
  document.documentElement.dataset.theme = theme
}
applyInitialTheme()

createApp(App).mount('#app')
