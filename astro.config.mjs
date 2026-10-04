import { defineConfig } from 'astro/config';
import mapaDelSitio from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://alex81459.github.io',
  base: '/Alex/',
  compressHTML: true,
  integrations: [mapaDelSitio({ lastmod: new Date() })],
});
