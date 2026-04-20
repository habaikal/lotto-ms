import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages 배포 시 저장소 이름을 base로 설정
  // 로컬 개발: VITE_BASE_URL 미설정 → '/'
  // GitHub Pages: VITE_BASE_URL=/lotto-ms/ → '/lotto-ms/'
  base: process.env.VITE_BASE_URL || '/',
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
    outDir: 'dist',
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
