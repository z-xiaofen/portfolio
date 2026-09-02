<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const canvasEl = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let timer = new THREE.Timer()
let rafId = 0

let galaxyGroup: THREE.Group
let corePoints: THREE.Points
let nebulaPoints: THREE.Points
let centerGlow: THREE.Sprite

interface Meteor {
  parts: THREE.Sprite[] // 0 = 头部亮星，1..n = 拖尾光粒（渐小渐淡）
  pos: THREE.Vector3
  vel: THREE.Vector3
  life: number
  maxLife: number
}
const meteors: Meteor[] = []

const mouse = { x: 0, y: 0, px: 0, py: 0 }
let reduced = false
let disposed = false
let visible = true
let observer: IntersectionObserver | null = null
let themeObserver: MutationObserver | null = null

const DPR = Math.min(window.devicePixelRatio, 2)
const isCoarse = window.matchMedia('(pointer: coarse)').matches
const scale = isCoarse ? 0.5 : 1

/* ---------- 工具 ---------- */

function makeGlowTexture(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.75)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

function makeHaloTexture(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(124, 77, 255, 0.55)')
  g.addColorStop(0.32, 'rgba(0, 229, 255, 0.24)')
  g.addColorStop(0.7, 'rgba(245, 0, 87, 0.06)')
  g.addColorStop(1, 'rgba(124, 77, 255, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

function randGauss(): number {
  return (Math.random() + Math.random() + Math.random()) / 3 - 0.5
}

/* ---------- 星系：螺旋臂星云 + 亮核 ---------- */

function buildGalaxy() {
  galaxyGroup = new THREE.Group()

  const glowTex = makeGlowTexture()
  const cWhite = new THREE.Color('#ffffff')
  const cCyan = new THREE.Color('#00e5ff')
  const cViolet = new THREE.Color('#7c4dff')
  const cPink = new THREE.Color('#f50057')

  // 亮度内插：t ∈ [0,1] → 白→青→紫；外层星云：紫→粉
  const lerp3 = (a: THREE.Color, b: THREE.Color, c: THREE.Color, t: number) => {
    if (t < 0.5) return a.clone().lerp(b, t * 2)
    return b.clone().lerp(c, (t - 0.5) * 2)
  }

  // ---- 核心亮核（贴近中心的密集粒子） ----
  const coreCount = Math.round(420 * scale)
  const cPos = new Float32Array(coreCount * 3)
  const cCol = new Float32Array(coreCount * 3)
  const arms = 3
  const radiusMax = 6.5
  let n = 0
  while (n < coreCount) {
    const arm = n % arms
    const radius = (0.2 + Math.pow(Math.random(), 1.6) * 0.8) * radiusMax
    const spread = (1 - radius / radiusMax) * 1.1 + 0.12
    const angle = (arm / arms) * Math.PI * 2 + radius * 0.55 + randGauss() * spread * 1.8
    const thin = randGauss() * (0.25 + (1 - radius / radiusMax) * 0.55)
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius * 0.86
    const y = thin
    cPos.set([x, y, z], n * 3)
    const t = Math.min(radius / radiusMax, 1)
    const c = lerp3(cWhite, cCyan, cViolet, t)
    cCol.set([c.r, c.g, c.b], n * 3)
    n++
  }
  const coreGeo = new THREE.BufferGeometry()
  coreGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3))
  coreGeo.setAttribute('color', new THREE.BufferAttribute(cCol, 3))
  corePoints = new THREE.Points(
    coreGeo,
    new THREE.PointsMaterial({
      size: 0.16,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  )

  // ---- 星云雾层（更稀疏、更大、紫粉渐变） ----
  const nebCount = Math.round(1500 * scale)
  const nPos = new Float32Array(nebCount * 3)
  const nCol = new Float32Array(nebCount * 3)
  const nebRadiusMax = 15
  for (let i = 0; i < nebCount; i++) {
    const arm = i % arms
    const radius = (0.25 + Math.pow(Math.random(), 1.35) * 0.75) * nebRadiusMax
    const spread = (1 - radius / nebRadiusMax) * 1.4 + 0.25
    const angle = (arm / arms) * Math.PI * 2 + radius * 0.5 + randGauss() * spread * 2
    const thin = randGauss() * (0.5 + (1 - radius / nebRadiusMax) * 1.1)
    nPos.set(
      [
        Math.cos(angle) * radius,
        thin,
        Math.sin(angle) * radius * 0.86,
      ],
      i * 3,
    )
    const t = Math.min(radius / nebRadiusMax, 1)
    const c = lerp3(cViolet, cViolet.clone().lerp(cPink, 0.4), cPink, t)
    const dim = 0.35 + Math.random() * 0.35
    nCol.set([c.r * dim, c.g * dim, c.b * dim], i * 3)
  }
  const nebGeo = new THREE.BufferGeometry()
  nebGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3))
  nebGeo.setAttribute('color', new THREE.BufferAttribute(nCol, 3))
  nebulaPoints = new THREE.Points(
    nebGeo,
    new THREE.PointsMaterial({
      size: 0.55,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  )

  // ---- 中心亮核光晕 ----
  centerGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeHaloTexture(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  centerGlow.scale.set(8.5, 8.5, 1)
  centerGlow.position.z = -1

  galaxyGroup.add(centerGlow, corePoints, nebulaPoints)
  galaxyGroup.position.z = -3
}

/* ---------- 流星：头部亮星 + 粒子光尾（替代细线条） ---------- */

const METEOR_SEG = 9 // 每颗流星含头部共 9 个光粒

function buildMeteors() {
  const count = 4
  const glowTex = makeGlowTexture()
  const cHead = new THREE.Color('#ffffff')
  const cTail = new THREE.Color('#7c4dff')

  for (let m = 0; m < count; m++) {
    const parts: THREE.Sprite[] = []
    for (let i = 0; i < METEOR_SEG; i++) {
      // 头部亮暖白，越到尾越偏紫且越小
      const t = i / (METEOR_SEG - 1)
      const color = cHead.clone().lerp(cTail, t * t * 0.85)
      const sph = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          opacity: i === 0 ? 1 : Math.max(0.72 - i * 0.09, 0.16),
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      const size = 0.4 - i * 0.032
      sph.scale.set(size, size, 1)
      scene.add(sph)
      parts.push(sph)
    }
    meteors.push({
      parts,
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      life: Math.random() * 6,
      maxLife: 5 + Math.random() * 4,
    })
    spawnMeteor(meteors[meteors.length - 1])
  }
}

function spawnMeteor(m: Meteor) {
  const dir = new THREE.Vector3(
    (Math.random() - 0.65) * 0.9,
    0.4 + Math.random() * 0.6,
    (Math.random() - 0.7) * 0.8,
  ).normalize()
  m.vel.copy(dir).multiplyScalar(1.1 + Math.random() * 0.6)
  m.pos.set((Math.random() - 0.5) * 34, 10 + Math.random() * 10, -26 - Math.random() * 8)
  m.life = 0
  m.maxLife = 5 + Math.random() * 4
  updateMeteor(m)
}

// 光粒按轨迹前后错开；头部在最前，尾部渐消失
function updateMeteor(m: Meteor) {
  for (let i = 0; i < m.parts.length; i++) {
    const gap = i * i * 0.42 + i * 0.08
    m.parts[i].position.set(
      m.pos.x - m.vel.x * gap,
      m.pos.y - m.vel.y * gap,
      m.pos.z - m.vel.z * gap,
    )
  }
}

/* ---------- 背景远星 ---------- */

function buildStars() {
  const count = Math.round(600 * scale)
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().setFromSphericalCoords(
      28 + Math.random() * 36,
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
    )
    pos.set([v.x, v.y, v.z], i * 3)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const stars = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.1,
      map: makeGlowTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
  scene.add(stars)
}

/* ---------- 主流程 ---------- */

function onPointerMove(e: PointerEvent) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = (e.clientY / window.innerHeight) * 2 - 1
}

function onResize() {
  if (!canvasEl.value || !renderer) return
  const w = canvasEl.value.clientWidth
  const h = canvasEl.value.clientHeight
  if (!w || !h) return
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

function animate() {
  if (disposed) return
  rafId = requestAnimationFrame(animate)
  if (!visible) return

  timer.update()
  const dt = Math.min(timer.getDelta(), 0.05)
  const t = timer.getElapsed()

  // 鼠标视差（平滑跟随）
  mouse.px += (mouse.x - mouse.px) * 0.05
  mouse.py += (mouse.y - mouse.py) * 0.05

  // 星系：缓慢自转 + 倾角随鼠标
  galaxyGroup.rotation.y += dt * 0.05 + mouse.px * 0.0016
  galaxyGroup.rotation.x += (-mouse.py * 0.1 - galaxyGroup.rotation.x) * 0.04
  galaxyGroup.rotation.z += (mouse.px * 0.05 - galaxyGroup.rotation.z) * 0.04
  nebulaPoints.rotation.y -= dt * 0.01

  // 核心光晕呼吸
  ;(centerGlow.material as THREE.SpriteMaterial).opacity = 0.48 + Math.sin(t * 1.1) * 0.1

  // 流星推进（粒子光尾）
  for (const m of meteors) {
    m.life += dt
    if (m.life > m.maxLife || m.pos.z > 2) {
      spawnMeteor(m)
      continue
    }
    m.pos.addScaledVector(m.vel, dt)
    updateMeteor(m)
  }

  camera.position.x += (mouse.px * 0.7 - camera.position.x) * 0.05
  camera.position.y += (-mouse.py * 0.45 - camera.position.y) * 0.05
  camera.lookAt(0, 0, -3)

  renderer.render(scene, camera)
}

function init() {
  if (disposed || !canvasEl.value) return

  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl.value,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
  } catch (err) {
    // 浏览器软重载 / WebGL 不可用时优雅降级为 CSS 星空背景
    console.warn('[hero] WebGL 初始化失败，已降级为静态背景：', err)
    canvasEl.value.dataset.fallback = 'true'
    return
  }
  renderer.setPixelRatio(DPR)
  renderer.setSize(canvasEl.value.clientWidth, canvasEl.value.clientHeight, false)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    60,
    canvasEl.value.clientWidth / canvasEl.value.clientHeight,
    0.1,
    100,
  )
  camera.position.set(0, 0, 11)

  buildGalaxy()
  buildStars()
  buildMeteors()

  scene.add(galaxyGroup)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('resize', onResize)

  // 离开视口时暂停渲染
  observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
    },
    { threshold: 0 },
  )
  observer.observe(canvasEl.value)

  // 亮色主题下调低粒子亮度
  const syncTheme = () => {
    canvasEl.value?.classList.toggle('is-light', document.documentElement.dataset.theme === 'light')
  }
  themeObserver = new MutationObserver(syncTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  syncTheme()

  if (!reduced) {
    timer = new THREE.Timer()
    animate()
  } else {
    renderer.render(scene, camera)
  }
}

onMounted(() => {
  // 等待布局稳定
  requestAnimationFrame(init)
})

onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(rafId)
  observer?.disconnect()
  themeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('resize', onResize)
  scene?.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.geometry) mesh.geometry.dispose()
    const mat = mesh.material as THREE.Material | THREE.Material[]
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
    else if (mat) mat.dispose()
  })
  try {
    renderer.forceContextLoss()
  } catch {
    /* noop */
  }
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvasEl" class="particle-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* WebGL 不可用时的静态星空回退 */
.particle-canvas[data-fallback='true'] {
  background:
    radial-gradient(1.5px 1.5px at 12% 22%, rgba(255, 255, 255, 0.55), transparent 60%),
    radial-gradient(2px 2px at 28% 64%, rgba(255, 255, 255, 0.4), transparent 60%),
    radial-gradient(1.5px 1.5px at 44% 14%, rgba(255, 255, 255, 0.5), transparent 60%),
    radial-gradient(2px 2px at 58% 48%, rgba(255, 255, 255, 0.42), transparent 60%),
    radial-gradient(1.5px 1.5px at 72% 26%, rgba(0, 229, 255, 0.6), transparent 60%),
    radial-gradient(2.5px 2.5px at 83% 62%, rgba(124, 77, 255, 0.65), transparent 60%),
    radial-gradient(2px 2px at 90% 24%, rgba(255, 255, 255, 0.5), transparent 60%),
    radial-gradient(1.5px 1.5px at 66% 84%, rgba(124, 77, 255, 0.5), transparent 60%),
    radial-gradient(2px 2px at 18% 86%, rgba(255, 255, 255, 0.35), transparent 60%),
    radial-gradient(700px 500px at 75% 35%, rgba(124, 77, 255, 0.12), transparent 65%),
    radial-gradient(500px 400px at 30% 80%, rgba(0, 229, 255, 0.08), transparent 60%),
    var(--bg, #000);
}

@media (max-width: 900px) {
  .particle-canvas {
    opacity: 0.82;
  }
}

/* 亮色主题下降低粒子在浅底上的抢眼程度 */
.particle-canvas.is-light {
  opacity: 0.55;
}
</style>