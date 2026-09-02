import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 视差滚动：用 GSAP ScrollTrigger + scrub 驱动 [data-parallax] 元素位移。
 * 元素从视口底部进入（top bottom）到滚出顶部（bottom top），
 * y 线性从 -maxOffset 过渡到 +maxOffset，斜率即 data-parallax 速度，
 * 与原手写 rAF 的数学语义一致；reduced-motion 时禁用。
 */
export function useParallax() {
  let triggers: ScrollTrigger[] = []

  const init = () => {
    const els = document.querySelectorAll<HTMLElement>('[data-parallax]')
    if (!els.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const vh = window.innerHeight
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.2')
      // 元素自身已有 transform（如 reveal/动画）时跳过，避免互相覆盖
      if (el.dataset.reveal) return
      const h = el.offsetHeight
      const maxOffset = ((vh + h) / 2) * speed
      gsap.fromTo(
        el,
        { y: -maxOffset },
        {
          y: maxOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    triggers = ScrollTrigger.getAll()
  }

  const destroy = () => {
    triggers.forEach((t) => t.kill())
    triggers = []
  }

  const update = () => ScrollTrigger.refresh()

  onMounted(() => requestAnimationFrame(init))
  onBeforeUnmount(destroy)

  return { update }
}