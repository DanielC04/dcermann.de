import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://danielc04.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
});
