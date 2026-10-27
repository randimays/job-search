import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

const bamboohrProxy = (): Plugin => ({
  name: 'bamboohr-proxy',
  configureServer(server) {
    // Usage: /bamboohr/<subdomain>/careers/list  or  /bamboohr/<subdomain>/careers/<id>/detail
    server.middlewares.use('/bamboohr', async (req, res) => {
      // Connect strips the mount path, so req.url starts with /<subdomain>/...
      const match = req.url?.match(/^\/([\w-]+)(\/careers\/(?:list|\d+\/detail))(\?.*)?$/);

      if (!match) {
        res.statusCode = 400;
        return res.end('Invalid target');
      }

      const [, subdomain, path, query = ''] = match;

      try {
        const upstream = await fetch(`https://${subdomain}.bamboohr.com${path}${query}`, {
          headers: { Accept: 'application/json' },
          redirect: 'manual', // a bad subdomain 302s to the marketing site
        });

        if (upstream.status >= 300 && upstream.status < 400) {
          res.statusCode = 404;
          return res.end('No BambooHR careers site for that subdomain');
        }

        res.statusCode = upstream.status;
        res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json');
        res.end(await upstream.text());
      } catch {
        res.statusCode = 502;
        res.end('Upstream request failed');
      }
    });
  },
});

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

export default defineConfig({
  plugins: [react(), tailwindcss(), bamboohrProxy(), workdayProxy()],
  server: {
    proxy: {
      '/dayforce': {
        target: 'https://www.dayforcehcm.com',
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(/^\/dayforce/, '/api'),
      },
      '/jobvite': {
        target: 'https://app.jobvite.com',
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(/^\/jobvite/, '')
      },
      '/kula': {
        target: 'https://careers.kula.ai',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kula/, ''),
      },
      '/paylocity': {
        target: 'https://recruiting.paylocity.com',
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(/^\/paylocity/, ''),
      },
    },
  },
})
