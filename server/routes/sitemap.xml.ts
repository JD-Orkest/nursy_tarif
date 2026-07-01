/**
 * server/routes/sitemap.xml.ts
 *
 * Route serveur Nitro générant le sitemap XML dynamiquement.
 * Aucune dépendance externe requise.
 *
 * Accessible à : https://nursytarif.be/sitemap.xml
 * À soumettre dans Google Search Console pour un indexation rapide.
 */
import { defineEventHandler, setHeader } from 'h3'
import { cities }                         from '~/data/cities'

export default defineEventHandler((event) => {
  // En-tête XML obligatoire
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  // Cache 24h côté CDN
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  const BASE_URL = 'https://nursytarif.be'
  const TODAY    = new Date().toISOString().split('T')[0]

  // ── URLs statiques principales ──────────────────────────────────────────
  const staticUrls = `
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`

  // ── URLs dynamiques par ville (une page par localité) ───────────────────
  const cityUrls = cities
    .map(
      city => `
  <url>
    <loc>${BASE_URL}/tarification/${city.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticUrls}
${cityUrls}
</urlset>`
})
