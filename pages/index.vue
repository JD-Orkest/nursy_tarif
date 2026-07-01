<script setup lang="ts">
/**
 * pages/index.vue — Page principale de NursyTarif.
 *
 * Ce fichier est l'orchestrateur : il configure le SEO et injecte les données
 * structurées Schema.org, puis délègue l'affichage aux composants de section.
 *
 * Les composants sont auto-importés par Nuxt 3 depuis components/sections/ et
 * components/ui/ — aucun import manuel n'est nécessaire.
 */

// Données géographiques pour le Schema.org enrichi
import { cities } from '~/data/cities'

// ── SEO — Métadonnées de la page principale ──────────────────────────────
useSeoMeta({
  title:            'NursyTarif | Tarification et Facturation pour Infirmières Indépendantes',
  description:      'Confiez votre tarification infirmière à NursyTarif pour 4,7% de votre CA. Application Nursy 100% gratuite, site web offert et référencement local inclus. Gagnez en sérénité.',
  ogTitle:          'NursyTarif | Tarification Infirmière Belgique',
  ogDescription:    'Tarification et facturation pour infirmières indépendantes en Belgique. 4,7% du CA, application Nursy offerte, site web inclus.',
  ogUrl:            'https://nursytarif.be',
  ogImage:          'https://nursytarif.be/og-image.jpg',  // Remplacez par votre image OG (1200×630px)
  ogImageAlt:       'NursyTarif — Tarification infirmière en Belgique',
  twitterCard:      'summary_large_image',
  twitterTitle:     'NursyTarif | Tarification Infirmière',
  twitterDescription: 'Tarification et facturation pour infirmières indépendantes. 4,7% du CA, application Nursy offerte.',
})

// ── Données structurées Schema.org JSON-LD — SEO local Belgique ──────────
useHead({
  script: [
    {
      type: 'application/ld+json',
      // Données structurées pour le référencement local des infirmières belges
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            // Entité principale : service professionnel de facturation
            '@type':       ['ProfessionalService', 'AccountingService'],
            '@id':         'https://nursytarif.be/#organization',
            name:          'NursyTarif',
            url:           'https://nursytarif.be',
            description:   'Service de tarification et facturation pour infirmières indépendantes en Belgique. Application Nursy gratuite incluse.',
            priceRange:    '4.7%',
            currenciesAccepted: 'EUR',
            paymentAccepted:    'Pourcentage sur encaissements',
            // Zones géographiques desservies
            areaServed: [
              { '@type': 'AdministrativeArea', name: 'Wallonie',   containedIn: { '@type': 'Country', name: 'Belgique' } },
              { '@type': 'City',               name: 'Bruxelles', containedIn: { '@type': 'Country', name: 'Belgique' } },
              { '@type': 'City',               name: 'Liège',     containedIn: { '@type': 'Country', name: 'Belgique' } },
              { '@type': 'City',               name: 'Namur',     containedIn: { '@type': 'Country', name: 'Belgique' } },
              { '@type': 'City',               name: 'Charleroi', containedIn: { '@type': 'Country', name: 'Belgique' } },
              // Toutes les villes de notre référentiel géographique
              ...cities.map(c => ({
                '@type': 'City',
                name:    c.name,
                containedIn: { '@type': 'AdministrativeArea', name: c.province },
              })),
            ],
            // Types de services proposés (mots-clés pour le SEO)
            serviceType: [
              'Tarification infirmière',
              'Facturation soins infirmiers',
              'Gestion tiers payant Belgique',
              'Bureau de tarification INAMI',
              'Application de tournée infirmière',
              'Bureau de tarification RIZIV',
            ],
            knowsAbout: [
              'INAMI', 'RIZIV', 'Tiers payant', 'Facturation médicale',
              'Soins infirmiers', 'MyCareNet', 'eID Belgique',
            ],
            // Catalogue d'offres (pour les rich snippets)
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name:    'Services NursyTarif',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name:        'Tarification & Facturation Infirmière',
                    description: 'Gestion complète de la facturation infirmière, tiers payant et suivi des rejets mutuelles.',
                  },
                  price:          '4.7',
                  priceCurrency:  '%',
                  priceSpecification: {
                    '@type':        'UnitPriceSpecification',
                    price:          '4.7',
                    priceCurrency:  '%',
                    description:    'Pourcentage sur chiffre d\'affaires encaissé',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type':       'SoftwareApplication',
                    name:          'Application Nursy',
                    description:   'Application mobile de gestion de tournée et de patients en temps réel.',
                    applicationCategory: 'HealthcareApplication',
                    operatingSystem: 'iOS, Android',
                  },
                  price:         '0',
                  priceCurrency: 'EUR',
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type':      'Service',
                    name:         'Site Web Professionnel & SEO Local',
                    description:  'Création, hébergement et optimisation SEO locale du site web de l\'infirmière.',
                  },
                  price:         '0',
                  priceCurrency: 'EUR',
                },
              ],
            },
          },
          // Page web
          {
            '@type': 'WebPage',
            '@id':   'https://nursytarif.be/',
            url:     'https://nursytarif.be/',
            name:    'NursyTarif | Tarification Infirmière Belgique',
            isPartOf:   { '@id': 'https://nursytarif.be/#organization' },
            inLanguage: 'fr-BE',
            dateModified: '2026-07-01',
          },
          // FAQ Schema (améliore les rich snippets Google)
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type':          'Question',
                name:             'Quel est le prix du service NursyTarif ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:    'NursyTarif facture 4,7% de votre chiffre d\'affaires encaissé. Aucun frais caché, aucun abonnement. Vous payez uniquement sur les paiements effectivement reçus.',
                },
              },
              {
                '@type':          'Question',
                name:             'L\'application Nursy est-elle vraiment gratuite ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:    'Oui. L\'accès à l\'application Nursy et la licence logicielle homologuée sont entièrement inclus dans votre abonnement NursyTarif, sans surcoût.',
                },
              },
              {
                '@type':          'Question',
                name:             'NursyTarif crée-t-il un site web gratuit pour les infirmières ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:    'Oui. NursyTarif crée, héberge et maintient gratuitement votre site web professionnel avec optimisation SEO locale pour apparaître dans les recherches Google de votre région.',
                },
              },
            ],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <!--
    Orchestrateur de la page d'accueil NursyTarif.
    Les composants sont auto-importés par Nuxt 3 depuis components/sections/.
  -->
  <div>
    <!-- Navigation principale (sticky) -->
    <SectionsNavBar />

    <!-- Page principale — sections dans l'ordre de la page -->
    <main id="main-content">
      <!-- Section 1 : Hero — L'accroche principale -->
      <SectionsHero />

      <!-- Section 2 : Proposition de valeur — Les 3 piliers (4.7%, App, Dashboard) -->
      <SectionsValueProp />

      <!-- Section 3 : Avantage SEO — Site web et visibilité offerts -->
      <SectionsVisibility />

      <!-- Section 4 : Bénéfices — Les avantages opérationnels -->
      <SectionsBenefits />

      <!-- Section 5 : Zones desservies — Toutes les villes (SEO local) -->
      <SectionsZones />

      <!-- Section 6 : Formulaire de contact — "Quiet Entry" -->
      <SectionsContact />
    </main>

    <!-- Pied de page -->
    <SectionsFooter />
  </div>
</template>
