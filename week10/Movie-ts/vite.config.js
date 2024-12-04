import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org', // TMDB API 서버 URL
        changeOrigin: true,  // 원본 출처를 변경
        secure: false,  // HTTPS 설정이 제대로 되어 있지 않은 경우
        rewrite: (path) => path.replace(/^\/api/, '') // /api 경로를 실제 경로로 변경
      },
    },
  },
})
