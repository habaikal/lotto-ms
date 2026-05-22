import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 개발(dev) 시에는 '/', 빌드(build) 시에는 '/lotto-ms/' 사용
  // 환경변수 VITE_BASE_URL로 오버라이드 가능
  base: process.env.VITE_BASE_URL ?? (process.env.NODE_ENV === 'production' ? '/lotto-ms/' : '/'),
  plugins: [react()],
  worker: {
    format: 'iife', // GitHub Pages는 모듈 Worker 미지원 → iife로 변경
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    // 빌드 결과물을 docs/ 폴더에 직접 저장 → GitHub Pages 즉시 배포 가능
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
