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
  <span class="typed" aria-label="职业标签：数据可视化与 AI Coding，Vue 与 ECharts 深度实践">
    {{ text }}<span class="caret" aria-hidden="true"></span>
  </span>
</template>

<style scoped>
.typed {
  display: inline-flex;
  align-items: center;
  /* 固定行盒高度与行高，保证删除到最短时整行不塌陷 */
  min-height: 1.25em;
  line-height: 1.25;
  background: var(--grad-ai);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

.caret {
  display: block;
  flex: none;
  width: 3px;
  /* 与文字一字等高，垂直居中于行盒，避免与文字行高不一致 */
  height: 1em;
  margin-left: 5px;
  border-radius: 2px;
  background: var(--cyan);
  box-shadow: 0 0 12px var(--cyan);
  animation: blink 0.9s steps(2, start) infinite;
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