<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{ words: string[]; typeSpeed?: number; deleteSpeed?: number; hold?: number }>()

const text = ref('')
let timer = 0
let wordIndex = 0
let charIndex = 0
let deleting = false

function tick() {
  const word = props.words[wordIndex % props.words.length]
  const min = deleting ? 1 : 0 // 删除最多到 1 个字符，避免整行完全塌陷
  if (!deleting) {
    charIndex = Math.min(charIndex + 1, word.length)
    text.value = word.slice(0, charIndex)
    if (charIndex === word.length) {
      deleting = true
      timer = window.setTimeout(tick, props.hold ?? 1800)
      return
    }
    timer = window.setTimeout(tick, props.typeSpeed ?? 90)
  } else {
    charIndex = Math.max(charIndex - 1, min)
    text.value = word.slice(0, charIndex)
    if (charIndex === min) {
      deleting = false
      wordIndex++
      timer = window.setTimeout(tick, props.typeSpeed ?? 90)
      return
    }
    timer = window.setTimeout(tick, props.deleteSpeed ?? 45)
  }
}

onMounted(() => {
  // 关节能，静止显示第一个词
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.value = props.words[0]
    return
  }
  // 预填完整首词再进入打字循环，首屏即满宽、无空白期
  text.value = props.words[0]
  timer = window.setTimeout(() => {
    deleting = true
    tick()
  }, props.hold ?? 1800)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="typed" aria-label="职业标签：前端工程师，AI Coding 实践者，三维交互探索者">
    {{ text }}<span class="caret" aria-hidden="true"></span>
  </span>
</template>

<style scoped>
.typed {
  display: inline-flex;
  align-items: baseline;
  /* 固定行盒高度：文字被删除到最短时整行也不塌陷 */
  min-height: 1.15em;
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

.caret {
  display: inline-block;
  width: 3px;
  height: 0.95em;
  margin-left: 4px;
  border-radius: 2px;
  background: var(--cyan);
  box-shadow: 0 0 12px var(--cyan);
  transform: translateY(0.1em);
  animation: blink 0.9s steps(2, start) infinite;
}

/* 光标贴着文字底部，随文字基线走 */
.typed > .caret {
  align-self: flex-end;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (max-width: 720px) {
  .typed {
    white-space: normal;
  }
}
</style>