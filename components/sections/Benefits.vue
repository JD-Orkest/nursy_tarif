<script setup lang="ts">
/**
 * Benefits — Section "Conçu pour votre tranquillité d'esprit."
 * Grille 2×2 des avantages opérationnels de NursyTarif.
 */
const { el, isVisible } = useScrollReveal({ threshold: 0.08 })

// Données des bénéfices — DRY, facilitent la maintenance
const benefits = [
  {
    id: 'admin',
    title: 'Zéro Charge Administrative',
    description:
      'Gestion totale de la lecture des cartes eID jusqu\'à l\'envoi des factures aux mutuelles. Gagnez des heures précieuses chaque semaine.',
    delay: 'delay-100',
    iconBg: 'rgba(21, 145, 155, 0.10)',
    iconColor: '#15919B',
    icon: 'clipboard',
  },
  {
    id: 'rejets',
    title: 'Correction des Rejets',
    description:
      'Analyse minutieuse et rectification immédiate des erreurs pour vous garantir des paiements à 100%, sans aucune perte de revenus.',
    delay: 'delay-200',
    iconBg: 'rgba(34, 197, 94, 0.10)',
    iconColor: '#16a34a',
    icon: 'shield',
  },
  {
    id: 'inami',
    title: 'Conformité INAMI/RIZIV',
    description:
      'Une facturation toujours à jour avec les dernières réglementations légales belges pour une pratique sereine et sécurisée.',
    delay: 'delay-300',
    iconBg: 'rgba(21, 145, 155, 0.10)',
    iconColor: '#15919B',
    icon: 'document',
  },
  {
    id: 'support',
    title: 'Support WhatsApp Dédié',
    description:
      'Une question&nbsp;? Un expert vous répond rapidement sur un canal direct. Un accompagnement humain et personnalisé à chaque étape.',
    delay: 'delay-400',
    iconBg: 'rgba(141, 74, 26, 0.10)',
    iconColor: '#8d4a1a',
    icon: 'chat',
  },
]
</script>

<template>
  <section
    id="avantages"
    class="section-tonal section-padding"
    aria-labelledby="benefits-heading"
  >
    <div class="container-content">

      <!-- ── En-tête centré ── -->
      <div
        ref="el"
        :class="['text-center mb-14 lg:mb-16 transition-all duration-700 ease-clinical',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <h2
          id="benefits-heading"
          class="font-display font-bold text-on-surface mb-4"
          style="font-size: clamp(1.75rem, 3.5vw, 2rem); line-height: 1.2; letter-spacing: -0.01em;"
        >
          Conçu pour votre tranquillité d'esprit.
        </h2>
        <p class="font-body text-body-lg text-on-surface-variant max-w-[480px] mx-auto">
          Laissez-nous gérer la complexité administrative.
          Vous soignez, nous facturons.
        </p>
      </div>

      <!-- ── Grille 2×2 des bénéfices ── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="benefit in benefits"
          :key="benefit.id"
          :class="['transition-all duration-700 ease-clinical', benefit.delay,
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <article
            class="bg-surface-lowest rounded-card p-6 lg:p-8 shadow-card
                   hover:shadow-level-3 hover:-translate-y-1
                   transition-all duration-350 ease-clinical
                   flex items-start gap-5"
          >
            <!-- Icône -->
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              :style="{ backgroundColor: benefit.iconBg }"
            >
              <!-- Icône clipboard (admin) -->
              <svg
                v-if="benefit.icon === 'clipboard'"
                class="w-6 h-6"
                :style="{ color: benefit.iconColor }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>

              <!-- Icône shield check (rejets) -->
              <svg
                v-else-if="benefit.icon === 'shield'"
                class="w-6 h-6"
                :style="{ color: benefit.iconColor }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>

              <!-- Icône document check (INAMI) -->
              <svg
                v-else-if="benefit.icon === 'document'"
                class="w-6 h-6"
                :style="{ color: benefit.iconColor }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>

              <!-- Icône chat (WhatsApp) -->
              <svg
                v-else-if="benefit.icon === 'chat'"
                class="w-6 h-6"
                :style="{ color: benefit.iconColor }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <!-- Contenu textuel -->
            <div>
              <h3 class="font-display font-bold text-headline-sm text-on-surface mb-2">
                {{ benefit.title }}
              </h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="font-body text-body-md text-on-surface-variant leading-relaxed" v-html="benefit.description" />
            </div>
          </article>
        </div>
      </div>

      <!-- ── Bannière bonus — "Accompagnements supplémentaires" ── -->
      <div
        :class="['mt-12 transition-all duration-700 delay-500 ease-clinical',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <div class="bg-cta-gradient rounded-card p-6 lg:p-8 shadow-cta">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <!-- Bonus 1 -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h4 class="font-display font-bold text-sm text-white mb-1">Accompagnement INAMI Clé en main</h4>
                <p class="font-body text-xs text-white/75 leading-relaxed">
                  Prise en charge des démarches MyCareNet pour les nouveaux dossiers ou transitions.
                </p>
              </div>
            </div>
            <!-- Bonus 2 -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div>
                <h4 class="font-display font-bold text-sm text-white mb-1">Sauvegarde Légale RGPD</h4>
                <p class="font-body text-xs text-white/75 leading-relaxed">
                  Archivage sécurisé et conforme RGPD de vos données de facturation pendant la durée légale.
                </p>
              </div>
            </div>
            <!-- Bonus 3 -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-display font-bold text-sm text-white mb-1">Dashboard Financier Temps Réel</h4>
                <p class="font-body text-xs text-white/75 leading-relaxed">
                  Visualisation claire de vos encaissements depuis l'app. Zéro calcul manuel requis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
