<script setup lang="ts">
/**
 * Visibility — Section "Votre visibilité patientèle offerte."
 * Présente l'avantage SEO exclusif :
 *   - Création de site web professionnel gratuit
 *   - Nom de domaine pris en charge
 *   - Optimisation SEO locale ultra-performante
 */
const { el, isVisible } = useScrollReveal({ threshold: 0.08 })

// Points forts SEO avec icône checkmark
const seoPoints = [
  'Création de site vitrine sur-mesure',
  'Hébergement & maintenance inclus',
  'Optimisation SEO locale ciblée',
  'Nom de domaine pris en charge',
]
</script>

<template>
  <section
    id="visibilite"
    class="bg-surface-lowest section-padding overflow-hidden"
    aria-labelledby="visibility-heading"
  >
    <div class="container-content">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

        <!-- ════════════════════════════════════════════════════════════════
             Colonne gauche — Contenu texte
        ════════════════════════════════════════════════════════════════ -->
        <div
          ref="el"
          :class="['transition-all duration-700 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <!-- Tag accent -->
          <div class="mb-6">
            <UiTarifChip label="Avantage Exclusif" variant="accent" />
          </div>

          <!-- Titre -->
          <h2
            id="visibility-heading"
            class="font-display font-bold text-on-surface mb-5"
            style="font-size: clamp(1.75rem, 3.5vw, 2.25rem); line-height: 1.2; letter-spacing: -0.01em;"
          >
            Votre visibilité<br>patientèle offerte.
          </h2>

          <!-- Description -->
          <p class="font-body text-body-lg text-on-surface-variant mb-6 leading-relaxed max-w-[440px]">
            Nous créons, hébergeons et gérons gratuitement votre site web professionnel,
            optimisé pour le référencement local. L'objectif&nbsp;? Vous positionner
            <strong class="font-semibold text-on-surface">n°1 sur Google</strong> pour
            les recherches <em>"Infirmière + [Votre Région]"</em>.
          </p>

          <!-- Points forts avec checkmarks -->
          <ul class="space-y-3 mb-8" role="list">
            <li
              v-for="point in seoPoints"
              :key="point"
              class="flex items-center gap-3"
            >
              <!-- Icône checkmark primaire -->
              <div
                class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style="background-color: rgba(21, 145, 155, 0.12);"
              >
                <svg class="w-3.5 h-3.5" style="color: #15919B;" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="font-body text-body-md text-on-surface">{{ point }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <UiButton href="#contact" size="md">
            Obtenir mon site gratuit
          </UiButton>
        </div>

        <!-- ════════════════════════════════════════════════════════════════
             Colonne droite — Maquette navigateur / SEO local
        ════════════════════════════════════════════════════════════════ -->
        <div
          :class="['transition-all duration-700 delay-200 ease-clinical',
                   isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8']"
        >
          <!-- Conteneur de la maquette navigateur -->
          <div class="rounded-card shadow-level-3 overflow-hidden bg-surface-lowest">

            <!-- Barre de navigateur (chrome-style) -->
            <div class="bg-surface-high px-4 py-3 flex items-center gap-3">
              <!-- Boutons de fenêtre macOS -->
              <div class="flex gap-1.5" aria-hidden="true">
                <div class="w-3 h-3 rounded-full" style="background-color: rgba(239, 68, 68, 0.50);"></div>
                <div class="w-3 h-3 rounded-full" style="background-color: rgba(234, 179, 8, 0.50);"></div>
                <div class="w-3 h-3 rounded-full" style="background-color: rgba(34, 197, 94, 0.50);"></div>
              </div>
              <!-- Barre d'URL -->
              <div class="flex-1 bg-surface-lowest rounded-lg px-3 py-1.5 flex items-center gap-2">
                <svg class="w-3 h-3 text-outline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span class="font-body text-xs text-outline truncate">nursytarif.be/infirmiere-bruxelles</span>
              </div>
            </div>

            <!-- Contenu de la page web simulée -->
            <div class="p-5 bg-surface-lowest">

              <!-- Header de la page simulée -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-lg bg-cta-gradient flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M11 3a1 1 0 10-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V3z" />
                    </svg>
                  </div>
                  <span class="font-display font-bold text-sm" style="color: #15919B;">NursyTarif</span>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    class="font-body text-label-sm uppercase tracking-widest px-2 py-1 rounded-lg"
                    style="background-color: rgba(21, 145, 155, 0.10); color: #15919B;"
                  >
                    Recherche Locale
                  </span>
                </div>
              </div>

              <!-- Zone carte / SEO local -->
              <div
                class="relative rounded-xl overflow-hidden mb-4"
                style="height: 180px; background: linear-gradient(145deg, #e8f5f6 0%, #c5e8ec 60%, #9acfd5 100%);"
              >
                <!-- Titre de la page locale simulé -->
                <div class="absolute top-4 left-4 right-4">
                  <h3 class="font-display font-bold text-sm text-on-surface leading-tight">
                    Infirmière Bruxelles : Optimisez<br>
                    Votre Facturation Médicale en Toute Simplicité
                  </h3>
                </div>

                <!-- Pins de localisation décoratifs -->
                <div
                  class="absolute bottom-8 right-8 w-9 h-9 rounded-full bg-cta-gradient
                         flex items-center justify-center shadow-level-2"
                  aria-hidden="true"
                >
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div
                  class="absolute bottom-12 left-12 w-6 h-6 rounded-full shadow-level-1 flex items-center justify-center"
                  style="background-color: rgba(21, 145, 155, 0.70);"
                  aria-hidden="true"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>

                <!-- Silhouette Belgique décorative (SVG simplifié) -->
                <div class="absolute bottom-3 left-4 opacity-10">
                  <svg viewBox="0 0 80 60" class="w-20 h-16 fill-current text-primary" aria-hidden="true">
                    <path d="M5 20 L15 10 L30 8 L45 12 L60 10 L75 15 L78 30 L70 45 L55 52 L40 55 L25 50 L10 42 L2 30 Z" />
                  </svg>
                </div>
              </div>

              <!-- Indicateurs de performance SEO -->
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-surface-tonal rounded-xl p-3">
                  <p class="font-body text-label-sm uppercase tracking-widest text-outline mb-1">Suivi en Temps Réel</p>
                  <div class="flex items-center gap-1.5">
                    <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p class="font-display font-bold text-sm text-on-surface">Position #1</p>
                  </div>
                </div>
                <div class="bg-surface-tonal rounded-xl p-3">
                  <p class="font-body text-label-sm uppercase tracking-widest text-outline mb-1">Économies Assistées</p>
                  <p class="font-display font-bold text-sm" style="color: #15919B;">12h / semaine</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Badge flottant "Support Dédié" -->
          <div
            class="mt-4 ml-8 glass rounded-card shadow-glass px-4 py-3 inline-flex items-center gap-3"
            aria-hidden="true"
          >
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style="background-color: rgba(21, 145, 155, 0.12);"
            >
              <svg class="w-4 h-4" style="color: #15919B;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div>
              <p class="font-display font-bold text-xs text-on-surface">Support Dédié</p>
              <p class="font-body text-xs text-on-surface-variant mt-0.5">WhatsApp & Téléphone</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
