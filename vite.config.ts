import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：适配 GitHub Pages 子路径部署（https://z-xiaofen.github.io/<repo>/）
  base: './',
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: true, // 端口被占用时直接报错，绝不切换到其他端口
    host: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
