import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';
import auth from 'auth-astro';

import db from '@astrojs/db';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { VitePWA } from 'vite-plugin-pwa';

import { manifest, seoConfig } from "@/utils/seoConfig"

// https://astro.build/config
export default defineConfig({
  site: seoConfig.baseURL,
  integrations: [tailwind(), auth(), db(), sitemap(), compress()],
  output: 'server',
  adapter: vercel(),
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  },
  experimental: {
    serverIslands: true
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest,
        workbox: {
          globDirectory: 'dist',
          globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
          // Don't fallback on document based (e.g. `/some-page`) requests
          // This removes an errant console.log message from showing up.
          navigateFallback: null
        }
      })
    ]
  }
});