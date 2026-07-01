<script setup lang="ts">
/**
 * pages/tarification/[ville].vue
 *
 * Page SSG dynamique par ville — la stratégie SEO locale la plus puissante.
 * Chaque ville génère une URL unique : /tarification/mons, /tarification/la-louviere…
 *
 * Ciblage des requêtes clés :
 *   "boîte de tarification infirmière [ville]"
 *   "tarification soins infirmiers [ville]"
 *   "bureau de tarification INAMI [ville]"
 *   "facturation infirmière indépendante [province]"
 */
import { findCityBySlug } from '~/data/cities'

const route  = useRoute()
const slug   = computed(() => route.params.ville as string)
const city   = computed(() => findCityBySlug(slug.value))

// ── 404 si la ville n'existe pas dans notre référentiel ──────────────────
if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'Ville non trouvée' })
}

const cityName     = city.value.name
const provinceName = city.value.province
const regionName   = city.value.region
const postalCode   = city.value.postalCodes?.[0] ?? ''

// ── SEO hyper-local ───────────────────────────────────────────────────────
useSeoMeta({
  title:       `Boîte de Tarification Infirmière à ${cityName} | NursyTarif`,
  description: `NursyTarif, votre boîte de tarification pour infirmières indépendantes à ${cityName} (${provinceName}). 4,7% du CA, application Nursy 100% gratuite, site web offert. Conformité INAMI/RIZIV garantie.`,
  ogTitle:     `Tarification Infirmière à ${cityName} — NursyTarif`,
  ogDescription: `Service de tarification et facturation pour infirmières à ${cityName}. 4,7% du chiffre d'affaires, zéro frais cachés.`,
  ogUrl:       `https://nursytarif.be/tarification/${slug.value}`,
  // Mots-clés sémantiques pour l'indexation locale
  keywords:    `tarification infirmière ${cityName}, boîte tarification ${cityName}, bureau tarification INAMI ${cityName}, facturation soins infirmiers ${cityName}, tarification infirmière ${provinceName}, tarification infirmière ${regionName}`,
})

// ── Schema.org LocalBusiness ultra-ciblé ─────────────────────────────────
useHead({
  link: [
    { rel: 'canonical', href: `https://nursytarif.be/tarification/${slug.value}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type':    ['ProfessionalService', 'AccountingService'],
            '@id':      `https://nursytarif.be/tarification/${slug.value}/#service`,
            name:       `NursyTarif — Tarification Infirmière à ${cityName}`,
            description: `Boîte de tarification et facturation pour infirmières indépendantes à ${cityName}, ${provinceName}. Gestion complète du tiers payant INAMI/RIZIV.`,
            url:        `https://nursytarif.be/tarification/${slug.value}`,
            priceRange: '4.7%',
            areaServed: [
              {
                '@type':     'City',
                name:        cityName,
                containedIn: { '@type': 'AdministrativeArea', name: provinceName },
              },
              {
                '@type': 'AdministrativeArea',
                name:    provinceName,
                containedIn: { '@type': 'Country', name: 'Belgique' },
              },
            ],
            serviceType: [
              `Tarification infirmière ${cityName}`,
              `Boîte de tarification ${cityName}`,
              `Bureau de tarification INAMI ${provinceName}`,
              'Facturation soins infirmiers Belgique',
              'Gestion tiers payant mutuelle',
            ],
            knowsAbout: ['INAMI', 'RIZIV', 'Tiers payant', cityName, provinceName],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name:    `Services NursyTarif à ${cityName}`,
              itemListElement: [
                {
                  '@type':      'Offer',
                  itemOffered:  { '@type': 'Service', name: `Tarification infirmière à ${cityName}`, description: `Gestion complète de la facturation INAMI/RIZIV pour infirmières à ${cityName}.` },
                  price:        '4.7', priceCurrency: '%',
                },
                {
                  '@type':     'Offer',
                  itemOffered: { '@type': 'SoftwareApplication', name: 'Application Nursy', applicationCategory: 'HealthcareApplication' },
                  price: '0', priceCurrency: 'EUR',
                },
              ],
            },
          },
          // BreadcrumbList pour les rich snippets
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'NursyTarif',    item: 'https://nursytarif.be/'                                       },
              { '@type': 'ListItem', position: 2, name: 'Zones',         item: 'https://nursytarif.be/#zones'                                 },
              { '@type': 'ListItem', position: 3, name: `${cityName}`,   item: `https://nursytarif.be/tarification/${slug.value}`             },
            ],
          },
          // FAQ locale enrichie par la ville
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name:    `Existe-t-il une boîte de tarification infirmière à ${cityName} ?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:    `Oui. NursyTarif accompagne les infirmières indépendantes à ${cityName} et dans tout le ${provinceName}. Notre service de tarification couvre la gestion complète de la facturation INAMI/RIZIV, du tiers payant et des mutuelles pour un coût de 4,7% de votre chiffre d'affaires.`,
                },
              },
              {
                '@type': 'Question',
                name:    `Quel est le tarif de NursyTarif pour une infirmière à ${cityName} ?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:    `NursyTarif facture 4,7% de votre chiffre d'affaires encaissé, sans frais cachés ni abonnement. L'application Nursy et la licence homologuée sont incluses gratuitement pour les infirmières de ${cityName} et de la région.`,
                },
              },
            ],
          },
        ],
      }),
    },
  ],
})

// Défilement vers le formulaire de contact
const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

// Liste des avantages locaux (computed pour éviter les guillemets dans les templates)
const localAdvantages = computed(() => [
  `Boîte de tarification 100% dédiée aux infirmières de ${provinceName}`,
  'Application Nursy gratuite (tournée, patients, facturation en temps réel)',
  'Gestion intégrale tiers payant : mutuelles, INAMI, attestations eID',
  'Correction active des rejets — zéro perte de revenus garantie',
  'Site web professionnel créé et hébergé gratuitement',
  `Référencement Google local pour «Infirmière ${cityName}»`,
  'Support WhatsApp dédié 6j/7',
  'Conformité automatique aux dernières réglementations INAMI/RIZIV',
])
</script>

<template>
  <div>
    <!-- Navigation réutilisée -->
    <SectionsNavBar />

    <main>
      <!-- ════════════════════════════════════════════════════════════════════
           Hero local — Contenu hyper-ciblé sur la ville
      ════════════════════════════════════════════════════════════════════ -->
      <section
        class="relative min-h-[85vh] flex items-center bg-surface-lowest overflow-hidden pt-16"
        :aria-labelledby="`hero-${slug}-heading`"
      >
        <!-- Décoration fond -->
        <div
          class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style="background: radial-gradient(circle, rgba(173,216,220,0.18) 0%, transparent 70%); transform: translate(30%,-30%);"
          aria-hidden="true"
        />

        <div class="container-content relative z-10 py-16 lg:py-24">
          <div class="max-w-[760px]">

            <!-- Fil d'Ariane visible (+ SEO) -->
            <nav aria-label="Fil d'Ariane" class="mb-6">
              <ol class="flex items-center gap-2 font-body text-body-sm text-on-surface-variant" role="list">
                <li><a href="/" class="hover:text-primary transition-colors">NursyTarif</a></li>
                <li aria-hidden="true" class="text-outline-variant">›</li>
                <li><a href="/#zones" class="hover:text-primary transition-colors">Zones</a></li>
                <li aria-hidden="true" class="text-outline-variant">›</li>
                <li class="text-on-surface font-medium" aria-current="page">{{ cityName }}</li>
              </ol>
            </nav>

            <!-- Tag province -->
            <div class="mb-5">
              <UiTarifChip :label="provinceName" variant="primary" />
            </div>

            <!-- H1 — ciblage exact "boîte de tarification [ville]" -->
            <h1
              :id="`hero-${slug}-heading`"
              class="font-display font-extrabold text-on-surface mb-5"
              style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1.1; letter-spacing: -0.02em;"
            >
              Boîte de Tarification<br>
              Infirmière à <span class="text-gradient">{{ cityName }}</span>
            </h1>

            <!-- Intro optimisée SEO — mentionne la ville et la province naturellement -->
            <p class="font-body text-body-lg text-on-surface-variant mb-4 max-w-[620px] leading-relaxed">
              Vous exercez comme infirmière indépendante à <strong class="font-semibold text-on-surface">{{ cityName }}</strong>
              et cherchez une boîte de tarification fiable en {{ provinceName }}&nbsp;?
              NursyTarif prend en charge votre facturation INAMI/RIZIV de A à Z,
              pour seulement <strong class="font-semibold text-on-surface">4,7% de votre chiffre d'affaires</strong>.
            </p>
            <p class="font-body text-body-lg text-on-surface-variant mb-8 max-w-[620px] leading-relaxed">
              Application Nursy <strong class="font-semibold text-on-surface">100% gratuite</strong> incluse,
              site web professionnel offert avec référencement Google pour les infirmières de {{ cityName }}.
            </p>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-4 mb-8">
              <UiButton href="#contact" size="lg" @click.prevent="scrollToContact">
                Demander une démo à {{ cityName }}
              </UiButton>
              <UiButton href="/" variant="secondary" size="lg">
                Voir tous nos services
              </UiButton>
            </div>

            <!-- Indicateurs de confiance rapides -->
            <div class="flex flex-wrap gap-6">
              <div v-for="point in [
                `Service actif à ${cityName}`,
                'Application gratuite incluse',
                'Conformité INAMI/RIZIV',
              ]" :key="point" class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-body text-body-sm text-on-surface-variant">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════════════════════════════════
           Section "Pourquoi NursyTarif à [ville] ?"
           Contenu riche en mots-clés locaux — essentiel pour Google
      ════════════════════════════════════════════════════════════════════ -->
      <section class="section-tonal section-padding" aria-label="Nos services de tarification locaux">
        <div class="container-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <!-- Colonne gauche — Contenu riche -->
            <div>
              <h2
                class="font-display font-bold text-on-surface mb-5"
                style="font-size: clamp(1.5rem, 3vw, 1.875rem); line-height: 1.2; letter-spacing: -0.01em;"
              >
                Votre partenaire de facturation<br>
                à {{ cityName }} et en {{ provinceName }}
              </h2>
              <div class="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
                <p>
                  En tant qu'infirmière indépendante à <strong class="text-on-surface">{{ cityName }}</strong>,
                  la gestion administrative de votre facturation INAMI/RIZIV représente
                  plusieurs heures perdues chaque semaine. NursyTarif, votre boîte de tarification
                  de proximité en <strong class="text-on-surface">{{ provinceName }}</strong>,
                  prend en charge cette complexité à votre place.
                </p>
                <p>
                  Notre service couvre la lecture des cartes eID, la transmission des
                  attestations aux mutuelles, le suivi des tiers payants et la correction
                  immédiate des rejets — garantissant <strong class="text-on-surface">100% de vos encaissements</strong>
                  sans aucune intervention de votre part.
                </p>
                <p>
                  Avec <strong class="text-on-surface">4,7% de votre chiffre d'affaires</strong>
                  et zéro frais caché, NursyTarif est la solution la plus compétitive pour
                  les infirmières libérales de {{ cityName }} et des communes voisines.
                </p>
              </div>
            </div>

            <!-- Colonne droite — Avantages locaux listés -->
            <div class="space-y-4">
              <h3 class="font-display font-semibold text-headline-sm text-on-surface mb-2">
                Ce que vous obtenez à {{ cityName }}
              </h3>
              <ul class="space-y-3" role="list">
                <li v-for="avantage in localAdvantages" :key="avantage" class="flex items-start gap-3">
                  <div
                    class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style="background-color: rgba(21,145,155,0.10);"
                  >
                    <svg class="w-3.5 h-3.5" style="color:#15919B;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="font-body text-body-md text-on-surface">{{ avantage }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Réutilisation du formulaire de contact standard -->
      <SectionsContact />
    </main>

    <!-- Pied de page réutilisé -->
    <SectionsFooter />
  </div>
</template>
