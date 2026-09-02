import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 滚动显现：用 GSAP ScrollTrigger 替代 IntersectionObserver，
 * 元素进入视口 88% 时添加 .is-visible 触发 CSS 过渡。
 * 保持 [data-reveal] / --reveal-delay 原有契约，CSS 无需改动。
 */
export function useReveal() {
  let triggers: ScrollTrigger[] = []

  const init = () => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    els.forEach((el) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => el.classList.add('is-visible'),
      })
      triggers.push(st)
    })
  }

  const destroy = () => {
    triggers.forEach((t) => t.kill())
    triggers = []
  }

  onMounted(() => {
    // 等待 DOM 与字体稳定后再初始化
    requestAnimationFrame(init)
  })
  onBeforeUnmount(destroy)

  return { init, destroy }
}