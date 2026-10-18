import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/paylocity': {
        target: 'https://recruiting.paylocity.com',
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/paylocity/, ''),
      },
    },
  },
})
