<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import IntroModal from './IntroModal.vue'
import avatarSrc from '../assets/avatar.jpg'

const scrolled = ref(false)
const active = ref('home')
const open = ref(false)
const showIntro = ref(false)
const indicatorRef = ref<HTMLElement | null>(null)

const links = [
  { id: 'home', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'ai', label: 'AI Coding' },
  { id: 'experience', label: '经历' },
  { id: 'hobbies', label: '爱好' },
  { id: 'contact', label: '联系' },
]

function onScroll() {
  scrolled.value = window.scrollY > 24
  const y = window.scrollY + window.innerHeight * 0.35
  let cur = 'home'
  for (const link of links) {
    const el = document.getElementById(link.id)
    if (el && el.offsetTop <= y) cur = link.id
  }
  if (active.value !== cur) {
    active.value = cur
    moveIndicator()
  }
}

// 水滴指示器滑到当前激活项
function moveIndicator() {
  const nav = indicatorRef.value?.parentElement
  const btn = indicatorRef.value?.parentElement?.querySelector<HTMLElement>(
    `.nav-link[data-id="${active.value}"]`,
  )
  if (!indicatorRef.value || !btn || !nav) return
  indicatorRef.value.style.left = `${btn.offsetLeft}px`
  indicatorRef.value.style.top = `${btn.offsetTop}px`
  indicatorRef.value.style.width = `${btn.offsetWidth}px`
  indicatorRef.value.style.height = `${btn.offsetHeight}px`
}

function jump(id: string) {
  open.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', moveIndicator, { passive: true })
  nextTick(moveIndicator)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', moveIndicator)
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="container nav-inner">
      <button class="brand" @click="showIntro = true" aria-label="查看个人简介" :title="'个人简介'">
        <span class="brand-avatar">
          <img :src="avatarSrc" alt="头像" />
          <span class="brand-dot" aria-hidden="true"></span>
        </span>
        <span class="brand-text">wh</span>
      </button>

      <nav class="nav-links" :class="{ 'is-open': open }" aria-label="主导航">
        <span ref="indicatorRef" class="nav-indicator" aria-hidden="true"></span>
        <button
          v-for="link in links"
          :key="link.id"
          class="nav-link"
          :data-id="link.id"
          :class="{ active: active === link.id }"
          @click="jump(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>

      <div class="nav-right">
        <div class="theme-wrap">
          <ThemeToggle />
        </div>
        <button
          class="burger"
          :class="{ 'is-open': open }"
          @click="open = !open"
          aria-label="菜单"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>

    <IntroModal :open="showIntro" @close="showIntro = false" />
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    border-color 0.4s ease;
  border-bottom: 1px solid transparent;
}

.nav.is-scrolled {
  background: var(--nav-glass);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border-bottom-color: var(--border);
}

.nav-inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  padding: 0;
}

/* 导航头像（后期替换 src/assets/avatar.jpg 为本人照片） */
.brand-avatar {
  position: relative;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.brand-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--border-strong);
  transition:
    box-shadow 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.brand:hover .brand-avatar img {
  box-shadow: 0 0 16px var(--violet-soft);
  transform: scale(1.05);
}

.brand-dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--lime);
  border: 2px solid var(--bg);
  box-shadow: 0 0 8px rgba(74, 247, 196, 0.9);
}

.nav-links {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 水滴融合指示器：在导航项之间平滑流动的胶囊 */
.nav-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-radius: 999px;
  background: linear-gradient(
    100deg,
    rgba(0, 229, 255, 0.16) 0%,
    rgba(124, 77, 255, 0.28) 55%,
    rgba(245, 0, 87, 0.16) 110%
  );
  border: 1px solid rgba(124, 77, 255, 0.32);
  box-shadow:
    0 0 20px rgba(124, 77, 255, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition:
    left 0.5s cubic-bezier(0.34, 1.3, 0.64, 1),
    top 0.5s cubic-bezier(0.34, 1.3, 0.64, 1),
    width 0.5s cubic-bezier(0.34, 1.3, 0.64, 1),
    height 0.5s cubic-bezier(0.34, 1.3, 0.64, 1);
  pointer-events: none;
  z-index: 0;
}

.nav-link {
  position: relative;
  z-index: 1;
  padding: 8px 15px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text-dim);
  transition: color 0.25s ease;
}

.nav-link:hover {
  color: var(--text);
}

.nav-link.active {
  color: #fff;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.burger span {
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  transition: transform 0.3s ease;
}

.burger.is-open span:first-child {
  transform: translateY(3.5px) rotate(45deg);
}
.burger.is-open span:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}

@media (max-width: 900px) {
  .burger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 12px 24px 20px;
    background: var(--nav-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    padding: 14px 16px;
    font-size: 16px;
    border-radius: 12px;
    text-align: left;
  }
}
</style>