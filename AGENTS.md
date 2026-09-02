# AGENTS — Agent 协作规范

本项目的代码可能由多个 Agent（主 Agent + 子 Agent）协作完成，以下约定保证输出一致性。

## 1. 角色分工

| 角色 | 职责 | 工具偏好 |
|---|---|---|
| 设计 Agent | 概念图生成、设计系统提炼 | GenerateImage、Read（图片描述） |
| 实现 Agent | 组件开发、样式、交互 | Write / Edit，禁止自由发挥概念图未出现的元素 |
| 验证 Agent（browser_use） | 浏览器渲染、控制台、视口检查 | browser_* 工具，差异回写为 fidelity ledger |

## 2. 代码规范

- 框架：Vue 3 `<script setup lang="ts">` + `<template>` 在上、`<style scoped>` 在下
- 组件化：每区块一个组件（Hero/About/Projects/Ai/Footer），App.vue 只做组装
- 样式 token 一律引用 `src/style.css` 的 CSS 变量，**禁止硬编码散落颜色**
- 中文文案；代码注释跟随用户语言（中文）
- Three.js：组件封装在 `ParticleCanvas.vue`；必须处理 `prefers-reduced-motion`、离开视口暂停（IntersectionObserver）、卸载时 `dispose() + forceContextLoss()`
- 新增依赖前先评估是否有必要（YAGNI）

## 3. 输出格式约定

- 文件引用必须用可点击链接 `[文件名](file:///绝对路径#L行号)`
- 提交前必须通过 `npm run build`（vue-tsc 严格检查）
- 浏览器验证结论需说明：控制台错误数、视口宽度、截图路径

## 4. 验证流程

1. 子 Agent 打开 `http://localhost:5173/`，检查控制台 0 错误
2. 滚动检查每个区块 + 交互（导航跳转、hover）
3. 移动端视口受环境限制时，至少做源码级断点审查
4. 概念图 vs 实现截图对比 ≥5 个比对点（文案/布局/配色/间距/动效）