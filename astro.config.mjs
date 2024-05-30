import { defineConfig } from 'astro/config';
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth()],
  output: "server",
  adapter: vercel()
});