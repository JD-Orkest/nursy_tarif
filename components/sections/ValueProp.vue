<script setup lang="ts">
/**
 * ValueProp — Section "La performance au service de votre indépendance."
 * Présente les 3 piliers de valeur :
 *   1. Tarification ultra-compétitive à 4,7%
 *   2. Application Nursy 100% gratuite
 *   3. Dashboard financier en temps réel
 */
const { el, isVisible } = useScrollReveal({ threshold: 0.08 })
</script>

<template>
  <section
    id="services"
    class="section-tonal section-padding"
    aria-labelledby="valueprop-heading"
  >
    <div class="container-content">

      <!-- ── En-tête de section ── -->
      <div
        ref="el"
        :class="['text-center mb-14 lg:mb-16 transition-all duration-700 ease-clinical',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <h2
          id="valueprop-heading"
          class="font-display font-bold text-on-surface mb-4"
          style="font-size: clamp(1.75rem, 3.5vw, 2rem); line-height: 1.2; letter-spacing: -0.01em;"
        >
          La performance au service<br class="hidden sm:block"> de votre indépendance.
        </h2>
        <p class="font-body text-body-lg text-on-surface-variant max-w-[520px] mx-auto">
          Un modèle transparent conçu pour maximiser vos revenus sans contraintes techniques.
        </p>
      </div>

      <!-- ── Grille des 3 cartes de valeur ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

        <!-- ── Carte 1 : Tarification 4,7% ── -->
        <div
          :class="['h-full transition-all duration-700 delay-100 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <UiServiceCard
            title="Tarification transparente"
            description="Seulement 4,7% de votre chiffre d'affaires + la licence du logiciel de tarification agréé (distinct de l'application Nursy). Aucun frais caché, aucun abonnement surprise. Vous payez uniquement sur les encaissements réels."
            variant="default"
            class="h-full"
          >
            <!-- Icône % dans un badge tonal -->
            <template #icon>
              <div class="flex items-center justify-between mb-1">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center"
                  style="background-color: rgba(21, 145, 155, 0.10);"
                >
                  <svg class="w-5 h-5" style="color: #15919B;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </template>

            <!-- Valeur principale mise en avant -->
            <p
              class="font-display font-extrabold text-on-surface leading-none mt-4 mb-2"
              style="font-size: 3rem;"
            >
              4,7<span class="text-2xl">%</span>
            </p>
            <p class="font-body text-body-sm text-on-surface-variant mt-1">
              Facturation au résultat. Zéro risque.
            </p>
          </UiServiceCard>
        </div>

        <!-- ── Carte 2 : Application 100% Gratuite (carte mise en avant) ── -->
        <div
          :class="['h-full transition-all duration-700 delay-200 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <article class="relative rounded-card shadow-cta overflow-hidden h-full bg-cta-gradient p-6 lg:p-8
                          hover:shadow-cta-hover hover:-translate-y-1 transition-all duration-350 ease-clinical">
            <!-- Décoration de fond -->
            <div
              class="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style="background: radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%); transform: translate(30%, -30%);"
              aria-hidden="true"
            />

            <!-- Icône application mobile -->
            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-5">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Titre -->
            <h3 class="font-display font-bold text-white text-headline-sm mb-2">
              Application 100% Gratuite
            </h3>

            <!-- Description -->
            <p class="font-body text-body-md text-white/80 leading-relaxed mb-5">
              Accès illimité à l'application Nursy et licence logicielle homologuée incluse.
              Suivez vos tournées et patients en temps réel.
            </p>

            <!-- Lien discret -->
            <a
              href="https://nursy.be"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-white/90
                     hover:text-white transition-colors duration-150"
            >
              Découvrir l'app
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </article>
        </div>

        <!-- ── Carte 3 : Communication & Support ── -->
        <div
          :class="['h-full transition-all duration-700 delay-300 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <UiServiceCard
            title="Une équipe accessible, toujours"
            description="Une question sur votre dossier ? Contactez-nous directement via le chat de l’application Nursy ou par téléphone. Une bonne collaboration se construit sur une communication claire et rapide."
            variant="default"
            class="h-full"
          >
            <template #icon>
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center"
                style="background-color: rgba(21, 145, 155, 0.10);"
              >
                <svg class="w-5 h-5" style="color: #15919B;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </template>

            <!-- Canaux de contact visuels -->
            <div class="mt-5 space-y-2.5">
              <!-- Chat app -->
              <div class="flex items-center gap-3 bg-surface-tonal rounded-xl px-3 py-2.5">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(21,145,155,0.12);">
                  <svg class="w-3.5 h-3.5" style="color:#15919B;" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-semibold text-xs text-on-surface">Chat interne Nursy</p>
                  <p class="font-body text-xs text-on-surface-variant">Réponse rapide dans l’app</p>
                </div>
              </div>
              <!-- Téléphone -->
              <div class="flex items-center gap-3 bg-surface-tonal rounded-xl px-3 py-2.5">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(21,145,155,0.12);">
                  <svg class="w-3.5 h-3.5" style="color:#15919B;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-semibold text-xs text-on-surface">Par téléphone</p>
                  <p class="font-body text-xs text-on-surface-variant">Un interlocuteur dédié, pas un robot</p>
                </div>
              </div>
            </div>
          </UiServiceCard>
        </div>

      </div>
    </div>
  </section>
</template>
