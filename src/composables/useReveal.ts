import { onMounted, onBeforeUnmount } from 'vue'

/**
 * 滚动显现：给 [data-reveal] 元素添加 IntersectionObserver，
 * 进入视口时加上 .is-visible 触发 CSS 过渡。
 * 支持 --reveal-delay 做交错入场。
 */
export function useReveal() {
  let observer: IntersectionObserver | null = null

  const init = () => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer?.observe(el))
  }

  const destroy = () => {
    observer?.disconnect()
    observer = null
  }

  onMounted(() => {
    // 等待 DOM 与字体稳定后再初始化
    requestAnimationFrame(init)
  })
  onBeforeUnmount(destroy)

  return { init, destroy }
}