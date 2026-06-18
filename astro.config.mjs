import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://alex81459.github.io',
  base: '/Alex/',
  compressHTML: true,
});
