// https://nuxt.com/docs/api/configuration/nuxt-config
import { cityRoutes } from './data/cities'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // ─── Modules Nuxt 3 ──────────────────────────────────────────────────────
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  // ─── Polices Google — optimisées pour PageSpeed ───────────────────────────────
  // - subset 'latin' uniquement (site belge francophone, pas besoin du cyrillique)
  // - display 'optional' : polices hors chemin critique (pas de blocage du rendu)
  // - weights réduits au strict nécessaire
  googleFonts: {
    families: {
      Manrope:            [700, 800],
      'Plus Jakarta Sans': [400, 600],
    },
    subsets:    ['latin'],
    display:    'optional',
    preload:    true,
    preconnect: true,
    prefetch:   false,
  },

  // ─── Application ─────────────────────────────────────────────────────────
  // baseURL : '/' en développement, '/nursy_tarif/' sur GitHub Pages
  // La variable NUXT_APP_BASE_URL est injectée par le workflow CI/CD.
  app: {
    baseURL: (process.env.NUXT_APP_BASE_URL ?? '/') as string,

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
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'fr_BE' },
        { property: 'og:site_name', content: 'NursyTarif' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://nursytarif.be' },
        { rel: 'sitemap', type: 'application/xml', href: 'https://nursytarif.be/sitemap.xml' },
        { rel: 'alternate', hreflang: 'fr-BE', href: 'https://nursytarif.be/' },
      ],
    },
  },

  // ─── Génération statique (SSG) ───────────────────────────────────────────
  nitro: {
    prerender: {
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

  ssr: true,
})
