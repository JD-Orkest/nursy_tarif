// https://nuxt.com/docs/api/configuration/nuxt-config
import { cityRoutes } from './data/cities'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // ─── Modules Nuxt 3 ──────────────────────────────────────────────────────
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  // ─── Polices Google — préchargées pour un CLS à zéro ────────────────────
  googleFonts: {
    families: {
      Manrope: [600, 700, 800],
      'Plus Jakarta Sans': [400, 500, 600],
    },
    display: 'swap',
    preload: true,
    preconnect: true,
    prefetch: false,
  },

  // ─── En-tête HTML global ─────────────────────────────────────────────────
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr-BE',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#15919B' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph — les valeurs spécifiques sont définies dans pages/index.vue
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_BE' },
        { property: 'og:site_name', content: 'NursyTarif' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        // Favicon SVG — affiché dans l'onglet du navigateur
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://nursytarif.be' },
        // Déclaration du sitemap dans le <head> (découverte par les robots)
        { rel: 'sitemap', type: 'application/xml', href: 'https://nursytarif.be/sitemap.xml' },
        // hreflang pour le ciblage linguistique fr-BE
        { rel: 'alternate', hreflang: 'fr-BE', href: 'https://nursytarif.be/' },
      ],
    },
  },

  // ─── Génération statique (SSG) — Netlify / Vercel / Cloudflare Pages ─────
  nitro: {
    prerender: {
      // Prérendu de toutes les pages de ville + sitemap pour un déploiement 100% statique
      routes: ['/', '/sitemap.xml', ...cityRoutes],
      crawlLinks: true,
    },
  },

  // ─── Configuration Tailwind CSS ──────────────────────────────────────────
  tailwindcss: {
    configPath: '~/tailwind.config.js',
    cssPath: '~/assets/css/main.css',
    exposeConfig: false,
    viewer: false,
  },

  // ─── Optimisations Vite / Build ──────────────────────────────────────────
  vite: {
    build: {
      cssMinify: true,
    },
  },

  // Mode SSR activé (compatible avec nuxt generate)
  ssr: true,
})
