import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), db(), AstroPWA()],
  output: "server",
  adapter: vercel()
});