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
let starsGroup: THREE.Points

const mouse = { x: 0, y: 0, px: 0, py: 0 }
let reduced = false
let disposed = false
let visible = true
let observer: IntersectionObserver | null = null
let themeObserver: MutationObserver | null = null

const DPR = Math.min(window.devicePixelRatio, 2)
const isCoarse = window.matchMedia('(pointer: coarse)').matches
const scale = isCoarse ? 0.5 : 1

/* ---------- 向星系核心聚拢的星尘粒子 ---------- */
const INFLOW_COUNT = Math.round(950 * scale)
let inflowPoints: THREE.Points
let inflowPos: THREE.BufferAttribute
let inflowSpeed: Float32Array

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

/* ---------- 主题感知配色 ----------
   暗色：白→青→紫霓虹，叠加混合（黑底增亮）；
   亮色：换深青/深紫，正常混合，保证在浅灰底上依然清晰不至于隐形 */
function themeIsLight(): boolean {
  return document.documentElement.dataset.theme === 'light'
}

function galaxyPalette(light: boolean) {
  return {
    blend: light ? THREE.NormalBlending : THREE.AdditiveBlending,
    white: light ? new THREE.Color('#2c7a97') : new THREE.Color('#ffffff'),
    cyan: light ? new THREE.Color('#0e8ba8') : new THREE.Color('#00e5ff'),
    violet: light ? new THREE.Color('#5a2fd6') : new THREE.Color('#7c4dff'),
    pink: light ? new THREE.Color('#b81f56') : new THREE.Color('#f50057'),
    star: light ? new THREE.Color('#5a6d80') : new THREE.Color('#ffffff'),
    coreOpacity: light ? 0.92 : 0.95,
    nebOpacity: light ? 0.55 : 0.34,
    nebDim: light ? 0.55 : 0.35,
    glowOpacity: light ? 0.42 : 0.55,
  }
}

/* 亮度内插：t ∈ [0,1] → 白→青→紫；外层星云：紫→粉 */
const lerp3 = (a: THREE.Color, b: THREE.Color, c: THREE.Color, t: number) => {
  if (t < 0.5) return a.clone().lerp(b, t * 2)
  return b.clone().lerp(c, (t - 0.5) * 2)
}

/* ---------- 星系：螺旋臂星云 + 亮核 ---------- */

function buildGalaxy() {
  galaxyGroup = new THREE.Group()
  const pal = galaxyPalette(themeIsLight())

  const glowTex = makeGlowTexture()
  const cWhite = pal.white
  const cCyan = pal.cyan
  const cViolet = pal.violet
  const cPink = pal.pink

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
      opacity: pal.coreOpacity,
      depthWrite: false,
      blending: pal.blend,
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
    const dim = pal.nebDim + Math.random() * 0.35
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
      opacity: pal.nebOpacity,
      depthWrite: false,
      blending: pal.blend,
      sizeAttenuation: true,
    }),
  )

  // ---- 中心亮核光晕 ----
  centerGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeHaloTexture(),
      transparent: true,
      opacity: pal.glowOpacity,
      depthWrite: false,
      blending: pal.blend,
    }),
  )
  centerGlow.scale.set(8.5, 8.5, 1)
  centerGlow.position.z = -1

  galaxyGroup.add(centerGlow, corePoints, nebulaPoints)
  galaxyGroup.position.z = -3
}

/* ---------- 星尘聚拢：外圈粒子向亮核 (0,0,-1) 缓慢汇聚 ---------- */

function spawnInflow(i: number, arr: Float32Array) {
  const r = 8 + Math.random() * 24
  const th = Math.acos(2 * Math.random() - 1)
  const ph = Math.random() * Math.PI * 2
  const x = r * Math.sin(th) * Math.cos(ph)
  const y = r * Math.cos(th) * 0.6 // 略压扁成盘状
  const z = r * Math.sin(th) * Math.sin(ph)
  arr.set([x, y, z], i * 3)
  inflowSpeed[i] = 0.45 + Math.random() * 1.35
}

function buildInflow() {
  const pal = galaxyPalette(themeIsLight())
  const glowTex = makeGlowTexture()
  const pos = new Float32Array(INFLOW_COUNT * 3)
  const col = new Float32Array(INFLOW_COUNT * 3)
  inflowSpeed = new Float32Array(INFLOW_COUNT)
  for (let i = 0; i < INFLOW_COUNT; i++) {
    spawnInflow(i, pos)
    const r = Math.hypot(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
    const t = Math.min((r - 8) / 24, 1)
    // 靠近核心泛白青，外圈渐紫，与星系主体同色系
    const c = lerp3(pal.white, pal.cyan, pal.violet, t)
    const dim = 0.55 + Math.random() * 0.45
    col.set([c.r * dim, c.g * dim, c.b * dim], i * 3)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  inflowPos = geo.attributes.position as THREE.BufferAttribute
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  inflowPoints = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.24,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: pal.blend,
      sizeAttenuation: true,
    }),
  )
  galaxyGroup.add(inflowPoints)
}

/* ---------- 背景远星 ---------- */

function buildStars() {
  const pal = galaxyPalette(themeIsLight())
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
  starsGroup = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.1,
      map: makeGlowTexture(),
      color: pal.star,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: pal.blend,
    }),
  )
  scene.add(starsGroup)
}

/* ---------- 重建：主题切换时整体重配色 ---------- */

function disposeObject3D(obj: THREE.Object3D | undefined) {
  if (!obj) return
  obj.traverse((o) => {
    const p = o as THREE.Points
    if (p.geometry) p.geometry.dispose()
    const mat = p.material
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
    else if (mat) mat.dispose()
  })
}

function rebuild() {
  if (disposed || !scene) return
  scene.remove(galaxyGroup)
  scene.remove(starsGroup)
  disposeObject3D(galaxyGroup)
  disposeObject3D(starsGroup)
  buildGalaxy()
  buildInflow()
  buildStars()
  scene.add(galaxyGroup)
  if (reduced) renderer.render(scene, camera)
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

  // 星尘聚拢：向亮核 (0,0,-1) 方向移动，入核后回到外圈重新生成
  if (inflowPoints) {
    const posAttr = inflowPos
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < INFLOW_COUNT; i++) {
      const ix = i * 3
      const x = arr[ix]
      const y = arr[ix + 1]
      const z = arr[ix + 2] + 1
      const r = Math.hypot(x, y, z)
      if (r < 1.2) {
        spawnInflow(i, arr)
        continue
      }
      const k = (inflowSpeed[i] * dt) / r
      arr[ix] -= x * k
      arr[ix + 1] -= y * k
      arr[ix + 2] -= z * k
    }
    posAttr.needsUpdate = true
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

  // 主题切换：重建星系并重配色（亮色用深色调 + 正常混合）
  const syncTheme = () => {
    canvasEl.value?.classList.toggle('is-light', themeIsLight())
    rebuild()
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

/* 亮色主题：粒子已在重建时换为深色调，这里仅轻微收敛透明度防抢眼 */
.particle-canvas.is-light {
  opacity: 0.9;
}
</style>