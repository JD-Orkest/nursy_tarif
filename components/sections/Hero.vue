<script setup lang="ts">
/**
 * Hero — Section d'accroche principale.
 * Layout asymétrique : texte éditorial à gauche, image + badge flottant à droite.
 * Inspiré du screenshot de référence (nursy.be).
 */
const { el: heroEl, isVisible: heroVisible } = useScrollReveal({ threshold: 0.05 })
const { el: imageEl, isVisible: imageVisible } = useScrollReveal({ threshold: 0.05 })

// Défilement doux vers la section contact
const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
const scrollToServices = () => {
  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="accueil"
    class="relative min-h-screen flex items-center bg-surface-lowest overflow-hidden pt-16"
    aria-labelledby="hero-heading"
  >
    <!-- Décoration de fond — gradient radial discret en haut à droite -->
    <div
      class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style="
        background: radial-gradient(circle at center, rgba(173, 216, 220, 0.18) 0%, transparent 70%);
        transform: translate(30%, -30%);
      "
      aria-hidden="true"
    />
    <!-- Décoration — cercle tonal en bas à gauche -->
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
      style="
        background: radial-gradient(circle at center, rgba(21, 145, 155, 0.06) 0%, transparent 70%);
        transform: translate(-30%, 30%);
      "
      aria-hidden="true"
    />

    <div class="container-content relative z-10 py-16 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

        <!-- ════════════════════════════════════════════════════════════════
             Colonne gauche — Contenu éditorial
        ════════════════════════════════════════════════════════════════ -->
        <div
          ref="heroEl"
          :class="['transition-all duration-700 ease-clinical', heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
        >
          <!-- Tag de section -->
          <div class="mb-6">
            <UiTarifChip label="Tarification Experte" variant="primary">
              <template #icon>
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </UiTarifChip>
          </div>

          <!-- Titre principal H1 — Manrope ExtraBold, 48px -->
          <h1
            id="hero-heading"
            class="font-display font-extrabold text-on-surface mb-6"
            style="font-size: clamp(2.25rem, 5vw, 3rem); line-height: 1.1; letter-spacing: -0.02em;"
          >
            Votre tarification<br>
            infirmière,<br>
            <span class="text-gradient">la sérénité en plus.</span>
          </h1>

          <!-- Sous-titre — Plus Jakarta Sans, 18px -->
          <p class="font-body text-body-lg text-on-surface-variant mb-8 max-w-[480px] leading-relaxed">
            Confiez votre facturation, profitez d'une application
            de pointe gratuite, et concentrez-vous sur ce qui compte vraiment :
            vos patients.
          </p>

          <!-- CTAs — bouton principal + secondaire côte à côte -->
          <div class="flex flex-wrap items-center gap-4">
            <UiButton
              href="#contact"
              size="md"
              @click.prevent="scrollToContact"
            >
              Contactez-nous
            </UiButton>
            
          </div>

          <!-- Indicateurs de confiance sous les CTAs -->
          <div class="flex flex-wrap items-center gap-6 mt-8">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-body text-body-sm text-on-surface-variant">Sans frais cachés</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-body text-body-sm text-on-surface-variant">Application 100% gratuite</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="font-body text-body-sm text-on-surface-variant">Facturation au résultat</span>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════════════════════════════
             Colonne droite — Image professionnelle + badge flottant
        ════════════════════════════════════════════════════════════════ -->
        <div
          ref="imageEl"
          :class="[
            'relative transition-all duration-700 delay-200 ease-clinical',
            imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <!-- Conteneur image — aspect ratio explicite pour CLS = 0 -->
          <div
            class="relative rounded-card overflow-hidden shadow-level-3"
            style="aspect-ratio: 4 / 5; max-height: 580px;"
          >
            <!--
              📷 REMPLACER CE BLOC par votre image professionnelle :
              <img
                src="/images/hero-nurse.jpg"
                alt="Infirmière utilisant l'application NursyTarif sur tablette"
                width="600"
                height="750"
                class="w-full h-full object-cover object-top"
                loading="eager"
                fetchpriority="high"
              />
              Chemin recommandé : /public/images/hero-nurse.jpg
              Format optimal : WebP, 600×750px, portrait, < 120 KB
            -->

            <!-- Fond placeholder — gradient teal médical (à remplacer) -->
            <div
              class="w-full h-full flex items-end justify-center"
              style="background: linear-gradient(160deg, #e0f5f6 0%, #b8e5e9 40%, #7fbfc6 100%);"
            >
              <!-- Silhouette infirmière SVG (placeholder visuel) -->
              <svg
                viewBox="0 0 300 420"
                class="w-4/5 opacity-30"
                fill="#15919B"
                aria-hidden="true"
              >
                <!-- Tête -->
                <ellipse cx="150" cy="80" rx="38" ry="42" />
                <!-- Corps -->
                <path d="M95 170 Q95 140 150 130 Q205 140 205 170 L215 320 H85 Z" />
                <!-- Bras gauche -->
                <path d="M95 175 Q65 210 70 260 Q72 275 82 270 Q88 240 95 210 Z" />
                <!-- Bras droit avec tablette -->
                <path d="M205 175 Q235 210 230 260 Q228 275 218 270 Q212 240 205 210 Z" />
                <!-- Tablette dans main droite -->
                <rect x="205" y="210" width="45" height="60" rx="6" fill="#0a7a82" opacity="0.7" />
                <rect x="209" y="214" width="37" height="48" rx="3" fill="#e0f5f6" opacity="0.8" />
                <!-- Croix médicale sur tablier -->
                <rect x="140" y="200" width="20" height="6" rx="2" fill="white" opacity="0.7" />
                <rect x="147" y="193" width="6" height="20" rx="2" fill="white" opacity="0.7" />
              </svg>
            </div>
          </div>

          <!-- Badge flottant "FACTURATION INAMI" — glassmorphisme -->
          <div
            class="absolute -bottom-4 lg:bottom-6 -left-2 lg:-left-6
                   glass rounded-card shadow-glass
                   px-4 py-3 flex items-center gap-3
                   min-w-[200px] animate-float"
            role="status"
            aria-label="Facturation INAMI 100% acceptée"
          >
            <!-- Icône checkmark vert -->
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style="background-color: rgba(34, 197, 94, 0.12);">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <!-- Texte du badge -->
            <div>
              <p class="font-display font-bold text-sm text-on-surface uppercase tracking-wide">
                FACTURATION INAMI
              </p>
              <p class="font-body text-xs font-semibold mt-0.5" style="color: #15919B;">
                100% Acceptée
              </p>
            </div>
          </div>

          <!-- Décoration — cercle accent derrière l'image -->
          <div
            class="absolute -top-6 -right-6 w-48 h-48 rounded-full pointer-events-none -z-10"
            style="background: radial-gradient(circle, rgba(173, 216, 220, 0.35) 0%, transparent 70%);"
            aria-hidden="true"
          />
        </div>

      </div>
    </div>

    <!-- Indicateur de défilement vers le bas -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span class="font-body text-label-sm uppercase tracking-widest text-on-surface-variant">Découvrir</span>
      <svg
        class="w-4 h-4 text-on-surface-variant animate-bounce"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>
