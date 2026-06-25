import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'async-css',
        transformIndexHtml(html, ctx) {
          if (ctx.server) return html;
          return html.replace(
            /<link rel="stylesheet" crossorigin href="([^"]*\.css)">/g,
            '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'">'
          ).replace(
            /<script type="module" crossorigin src="([^"]*index[^"]*\.js)">/g,
            '<script type="module" crossorigin fetchpriority="high" src="$1">'
          );
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            icons: ['lucide-react'],
            embla: ['embla-carousel-react'],
            lenis: ['lenis'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
