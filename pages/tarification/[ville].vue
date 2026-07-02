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
import { findCityBySlug, cities, type City } from '~/data/cities'

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

// ── Prépositions correctes selon la province ─────────────────────────────
// "en Liège" / "en Hainaut" sont incorrects en français belge.
// On dit : "dans le Hainaut", "dans la province de Liège", etc.
const provLocMap: Record<string, string> = {
  'Hainaut':            'dans le Hainaut',
  'Brabant Wallon':     'dans le Brabant Wallon',
  'Namur':              'dans la province de Namur',
  'Liège':              'dans la province de Liège',
  'Luxembourg':         'dans la province du Luxembourg',
  'Bruxelles-Capitale': 'en Région de Bruxelles-Capitale',
}
const provGenMap: Record<string, string> = {
  'Hainaut':            'du Hainaut',
  'Brabant Wallon':     'du Brabant Wallon',
  'Namur':              'de Namur',
  'Liège':              'de Liège',
  'Luxembourg':         'du Luxembourg',
  'Bruxelles-Capitale': 'de la Région bruxelloise',
}
const provCoverageMap: Record<string, string> = {
  'Hainaut':            'dans tout le Hainaut',
  'Brabant Wallon':     'dans tout le Brabant Wallon',
  'Namur':              'dans toute la province de Namur',
  'Liège':              'dans toute la province de Liège',
  'Luxembourg':         'dans toute la province du Luxembourg',
  'Bruxelles-Capitale': 'dans toute la Région de Bruxelles-Capitale',
}
const provLoc      = provLocMap[provinceName]      ?? `dans la province de ${provinceName}`
const provGen      = provGenMap[provinceName]      ?? `de ${provinceName}`
const provCoverage = provCoverageMap[provinceName] ?? `dans la province de ${provinceName}`

// ── SEO hyper-local ───────────────────────────────────────────────────────
useSeoMeta({
  title:       `Boîte de Tarification Infirmière à ${cityName} | NursyTarif`,
  description: `NursyTarif, votre boîte de tarification pour infirmières indépendantes à ${cityName} (${provinceName}). 4,7% du CA, application Nursy 100% gratuite, site web offert. Conformité INAMI garantie.`,
  ogTitle:     `Tarification Infirmière à ${cityName} — NursyTarif`,
  ogDescription: `Service de tarification et facturation pour infirmières à ${cityName}. 4,7% du chiffre d'affaires, zéro frais cachés.`,
  ogUrl:       `https://nursytarif.be/tarification/${slug.value}`,
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
            description: `Boîte de tarification et facturation pour infirmières indépendantes à ${cityName}, ${provinceName}. Gestion complète du tiers payant INAMI.`,
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
            knowsAbout: ['INAMI', 'Tiers payant', cityName, provinceName],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name:    `Services NursyTarif à ${cityName}`,
              itemListElement: [
                {
                  '@type':      'Offer',
                  itemOffered:  { '@type': 'Service', name: `Tarification infirmière à ${cityName}`, description: `Gestion complète de la facturation INAMI pour infirmières à ${cityName}.` },
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
                  text:    `Oui. NursyTarif accompagne les infirmières indépendantes à ${cityName} et ${provCoverage}. Notre service de tarification couvre la gestion complète de la facturation INAMI, du tiers payant et des mutuelles pour un coût de 4,7% de votre chiffre d'affaires.`,
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

// ── Défilement contact ────────────────────────────────────────────────────
const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}

// ══════════════════════════════════════════════════════════════════════════
// CONTENT SPINNING — Variation textuelle déterministe
// La variante est choisie via le code INS modulo 4 → résultat stable
// par page, jamais aléatoire (pas de re-render au reload).
// ══════════════════════════════════════════════════════════════════════════
const spinIndex = (city.value.ins ?? 0) % 4

// Synonymes du service (varient selon la commune)
const serviceLabels = [
  'boîte de tarification',
  'bureau de facturation agréé',
  'secrétariat de tarification',
  'partenaire de tarification INAMI',
]
const serviceLabel = serviceLabels[spinIndex]

// Accroche H1 alternative
const h1Variants = [
  `${serviceLabel.charAt(0).toUpperCase() + serviceLabel.slice(1)}<br>Infirmière à `,
  `Tarification Infirmière<br>à `,
  `Bureau de Facturation<br>pour Infirmières à `,
  `Secrétariat de Tarification<br>INAMI à `,
]
const h1Line1 = h1Variants[spinIndex]

// Paragraphe d'intro — 4 variantes sémantiques différentes
const introVariants: Record<number, { p1: string; p2: string }> = {
  0: {
    p1: `Vous exercez comme infirmière indépendante à <strong class="font-semibold text-on-surface">${cityName}</strong>
         et cherchez une ${serviceLabel} fiable ${provLoc} ?
         NursyTarif prend en charge votre facturation INAMI de A à Z,
         pour seulement <strong class="font-semibold text-on-surface">4,7% de votre chiffre d'affaires</strong>.`,
    p2: `Application Nursy <strong class="font-semibold text-on-surface">100% gratuite</strong> incluse,
         site web professionnel offert avec référencement Google pour les infirmières de ${cityName}.`,
  },
  1: {
    p1: `Exercer en libéral à <strong class="font-semibold text-on-surface">${cityName}</strong> implique
         une charge administrative considérable. Notre ${serviceLabel} prend le relais :
         facturation INAMI, tiers payant, rejets mutuelles — tout est géré pour
         <strong class="font-semibold text-on-surface">4,7% de vos encaissements réels</strong>, sans abonnement.`,
    p2: `Profitez en prime de l'<strong class="font-semibold text-on-surface">application Nursy gratuite</strong>
         pour piloter vos tournées et patients en temps réel depuis votre smartphone.`,
  },
  2: {
    p1: `Infirmière indépendante à <strong class="font-semibold text-on-surface">${cityName}</strong>,
         vous méritez un ${serviceLabel} qui vous libère du temps pour soigner.
         NursyTarif automatise votre facturation INAMI et garantit
         <strong class="font-semibold text-on-surface">100% de vos paiements</strong> pour 4,7% du CA.`,
    p2: `<strong class="font-semibold text-on-surface">Site web professionnel offert</strong> et référencement local
         inclus pour apparaître en premier sur Google quand un patient cherche une infirmière à ${cityName}.`,
  },
  3: {
    p1: `Vous installez ou développez votre activité infirmière à
         <strong class="font-semibold text-on-surface">${cityName}</strong> ?
         Confiez votre facturation à notre ${serviceLabel} spécialisé ${provLoc} :
         conformité INAMI garantie, zéro frais cachés,
         <strong class="font-semibold text-on-surface">4,7% du chiffre d'affaires</strong> uniquement sur encaissements.`,
    p2: `L'<strong class="font-semibold text-on-surface">application Nursy</strong> est incluse gratuitement
         pour organiser vos tournées et suivre chaque patient. Votre site web local est créé et hébergé à nos frais.`,
  },
}
const intro = introVariants[spinIndex]

// Paragraphe de corps — variation contextuelle selon la province
const provinceContexts: Record<string, string> = {
  'Hainaut':
    `Dans le Hainaut, bassin densément peuplé où la demande en soins à domicile est forte,
     notre ${serviceLabel} vous permet de vous concentrer sur vos patients sans jamais perdre
     de revenus sur la complexité administrative des mutuelles locales.`,
  'Liège':
    `Dans la province de Liège, entre l'agglomération liégeoise et ses communes rurales,
     la diversité des profils patients rend la facturation INAMI particulièrement complexe.
     Notre ${serviceLabel} maîtrise chaque spécificité de la région.`,
  'Brabant Wallon':
    `Dans le Brabant Wallon, province résidentielle en pleine croissance, les infirmières libérales
     font face à des tournées étendues et des patients souvent bi-assurés.
     Notre ${serviceLabel} gère chaque cas avec précision pour maximiser vos remboursements.`,
  'Luxembourg':
    `Dans la province du Luxembourg, les tournées rurales couvrent des distances importantes
     et les délais de traitement des mutuelles peuvent être longs.
     Notre ${serviceLabel} à distance prend tout en charge : vous n'avez rien à faire.`,
  'Namur':
    `Dans la province de Namur, entre zone urbaine et rural profond,
     notre ${serviceLabel} s'adapte à votre territoire pour optimiser
     chaque attestation de soins transmise aux organismes assureurs.`,
  'Bruxelles-Capitale':
    `À ${cityName}, au cœur de la Région de Bruxelles-Capitale,
     la facturation infirmière cumule les complexités administratives.
     Notre ${serviceLabel} maîtrise chaque spécificité bruxelloise.`,
}
const provinceContext = provinceContexts[provinceName]
  ?? `${provLoc}, notre ${serviceLabel} vous accompagne avec la même rigueur
      et la même disponibilité, quelle que soit la taille de votre patientèle.`

// Avantages locaux
const localAdvantages = computed(() => [
  `${serviceLabel.charAt(0).toUpperCase() + serviceLabel.slice(1)} dédié aux infirmières ${provGen}`,
  'Application Nursy gratuite (remplacements, tournée, patients)',
  'Gestion intégrale tiers payant : mutuelles, INAMI, attestations eID',
  'Correction active des rejets — zéro perte de revenus garantie',
  'Site web professionnel créé et hébergé gratuitement',
  `Référencement Google local pour «Infirmière ${cityName}»`,
  'Support WhatsApp dédié 6j/7',
  'Conformité automatique aux dernières réglementations INAMI',
])

// ══════════════════════════════════════════════════════════════════════════
// MAILLAGE HORIZONTAL — 4 communes voisines de la même province
// Exclut la commune courante, prend les 4 suivantes dans l'ordre du fichier
// (ordre stable = pas de re-render)
// ══════════════════════════════════════════════════════════════════════════
const neighborCities = computed<City[]>(() => {
  const sameProv = cities.filter(
    c => c.province === provinceName && c.slug !== slug.value,
  )
  // Décalage déterministe basé sur l'INS pour varier les voisins affichés
  const offset = (city.value!.ins ?? 0) % Math.max(sameProv.length - 4, 1)
  const rotated = [...sameProv.slice(offset), ...sameProv.slice(0, offset)]
  return rotated.slice(0, 4)
})
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

            <!-- H1 — variante déterministe selon le code INS -->
            <h1
              :id="`hero-${slug}-heading`"
              class="font-display font-extrabold text-on-surface mb-5"
              style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1.1; letter-spacing: -0.02em;"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="h1Line1" />
              <span class="text-gradient"> {{ cityName }}</span>
            </h1>

            <!-- Intro spécifique à la commune (content spinning) -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="font-body text-body-lg text-on-surface-variant mb-4 max-w-[620px] leading-relaxed" v-html="intro.p1" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="font-body text-body-lg text-on-surface-variant mb-8 max-w-[620px] leading-relaxed" v-html="intro.p2" />

            <!-- CTAs -->
            <div class="flex flex-wrap gap-4 mb-8">
              <UiButton href="#contact" size="lg" @click.prevent="scrollToContact">
                Contactez-nous
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
                'Conformité INAMI',
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
                à {{ cityName }}, {{ provLoc }}
              </h2>
              <div class="font-body text-body-md text-on-surface-variant space-y-4 leading-relaxed">
                <p>
                  En tant qu'infirmière indépendante à <strong class="text-on-surface">{{ cityName }}</strong>,
                  la gestion administrative de votre facturation INAMI représente
                  plusieurs heures perdues chaque semaine. NursyTarif, votre {{ serviceLabel }}
                {{ provLoc }},
                  prend en charge cette complexité à votre place.
                </p>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-html="provinceContext" />
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

      <!-- ═══════════════════════════════════════════════════════════════════
           MAILLAGE HORIZONTAL — communes voisines de la même province
           Fait circuler le jus SEO de page en page en toile d'araignée.
      ═══════════════════════════════════════════════════════════════════ -->
      <section
        v-if="neighborCities.length > 0"
        class="bg-surface-tonal section-padding"
        aria-labelledby="neighbors-heading"
      >
        <div class="container-content">

          <div class="mb-8">
            <h2
              id="neighbors-heading"
              class="font-display font-bold text-on-surface mb-2"
              style="font-size: clamp(1.25rem, 2.5vw, 1.5rem); line-height: 1.3; letter-spacing: -0.01em;"
            >
              Notre couverture de tarification<br class="hidden sm:block">
              à proximité de {{ cityName }}
            </h2>
            <p class="font-body text-body-md text-on-surface-variant">
              Nous accompagnons les infirmières indépendantes {{ provCoverage }}.
            </p>
          </div>

          <!-- Grille des communes voisines -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <a
              v-for="neighbor in neighborCities"
              :key="neighbor.slug"
              :href="`/tarification/${neighbor.slug}`"
              class="group flex flex-col gap-1.5
                     bg-surface-lowest rounded-card p-4
                     shadow-level-1
                     hover:shadow-level-2 hover:-translate-y-0.5
                     transition-all duration-250 ease-clinical"
              :aria-label="`Tarification infirmière à ${neighbor.name}`"
            >
              <!-- Indicateur province -->
              <span
                class="font-body text-label-sm uppercase tracking-widest"
                style="color: #15919B;"
              >
                {{ neighbor.province }}
              </span>

              <!-- Nom de la commune -->
              <span class="font-display font-bold text-on-surface text-sm leading-tight
                           group-hover:text-primary transition-colors duration-150">
                {{ neighbor.name }}
              </span>

              <!-- Code postal -->
              <span class="font-body text-label-sm text-outline">
                {{ neighbor.postalCodes?.[0] }}
              </span>

              <!-- Flèche -->
              <div class="mt-1 flex items-center gap-1
                          text-outline group-hover:text-primary
                          transition-colors duration-150">
                <span class="font-body text-xs">Voir la page</span>
                <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>

        </div>
      </section>

      <SectionsContact />
    </main>

    <!-- Pied de page réutilisé -->
    <SectionsFooter />
  </div>
</template>
