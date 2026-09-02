import { onMounted, onBeforeUnmount } from 'vue'

/**
 * 视差滚动：给带 [data-parallax] 的元素按滚动位置做匀速位移，
 * 元素离视口中心越远，偏移越大（速度快于/慢于页面滚动）。
 * 仅使用 transform，配合 rAF 节流；reduced-motion 时禁用。
 */
export function useParallax() {
  let raf = 0
  let ticking = false
  let els: HTMLElement[] = []

  const update = () => {
    ticking = false
    const vh = window.innerHeight
    for (const el of els) {
      const speed = parseFloat(el.dataset.parallax || '0.2')
      const rect = el.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed
      // 元素自身已有 transform（如 reveal/动画）时跳过，避免互相覆盖
      if (el.dataset.reveal) continue
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
  }

  const schedule = () => {
    if (!ticking) {
      ticking = true
      raf = requestAnimationFrame(update)
    }
  }

  onMounted(() => {
    els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!els.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { update }
}