import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages 배포: 항상 /lotto-ms/ base 사용
  // 로컬 개발 서버는 proxy 통해 작동하므로 base 달라도 무관
  base: process.env.VITE_BASE_URL ?? '/lotto-ms/',
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
