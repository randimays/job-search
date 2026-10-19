import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

const workdayProxy = (): Plugin => ({
  name: 'workday-proxy',
  configureServer(server) {
    server.middlewares.use('/api/workday', async (req, res) => {
      const target = new URL(req.url!, 'http://localhost').searchParams.get('url');

      if (!target || !/^https:\/\/[\w-]+\.wd\d+\.myworkdayjobs\.com\//.test(target)) {
        res.statusCode = 400;
        return res.end('Invalid target');
      }

      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);

      const upstream = await fetch(target, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: Buffer.concat(chunks),
      });

      res.statusCode = upstream.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(await upstream.text());
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), workdayProxy()],
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
