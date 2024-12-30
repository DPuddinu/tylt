import db from '@astrojs/db';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import auth from 'auth-astro';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest, seoConfig } from './src/utils/seoConfig.ts';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  integrations: [tailwind(), auth(), db(), sitemap(), compress(), icon()],
  output: 'server',
  adapter: netlify(),
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        base: '/',
        manifest,
        workbox: {
          globDirectory: 'dist',
          globPatterns: [
            '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico,html}'
          ],
          navigateFallback: null,
          runtimeCaching: [{
            urlPattern: /^\/$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'start-url',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60
              }
            }
          }]
        }
      })
    ]
  }
});
