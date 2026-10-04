import type { APIContext as ContextoApi } from 'astro';

export function GET({ site: sitio }: ContextoApi) {
  const rutaBase = new URL(import.meta.env.BASE_URL, sitio);
  const urlMapaDelSitio = new URL('sitemap-index.xml', rutaBase);
  const contenido = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /*.json$',
    'Disallow: /node_modules/',
    '',
    `Sitemap: ${urlMapaDelSitio.href}`,
    '',
    '# Delay for aggressive crawlers',
    'User-agent: AhrefsBot',
    'User-agent: SemrushBot',
    'Crawl-delay: 10',
  ].join('\n');

  return new Response(contenido, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
