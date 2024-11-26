import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import KumaUI from '@kuma-ui/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    KumaUI(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,gif,svg,woff,woff2}'],
        runtimeCaching:[
          {
            urlPattern: /^https:\/\/i.ytimg.com\/.*.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'YouTube thumbnails',
            }
          }
        ]
      },
      manifest: {
        theme_color: '#262626',
        background_color: '#262626',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        name: 'Enhanced YouTube embed',
        short_name: 'Enhanced YTE',
        description: 'Enhanced YouTube embed player.',

        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
