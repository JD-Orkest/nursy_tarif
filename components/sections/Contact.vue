<script setup lang="ts">
/**
 * Contact — Formulaire "Quiet Entry" (sans bordures, fond tonal).
 * Champs : Nom & Prénom, Email, Téléphone, Région, Statut actuel.
 * Validation côté client avec retour visuel doux.
 *
 * INTÉGRATION BACKEND : Remplacez la fonction handleSubmit par un appel
 * à votre API (ex: Netlify Forms, Formspree, ou votre propre endpoint).
 */

// ── État du formulaire ─────────────────────────────────────────────────────
const form = reactive({
  nom:    '',
  email:  '',
  tel:    '',
  region: '',
  statut: 'Indépendant(e)',
})

// Statuts disponibles (sélecteur de chips)
const statuts = ['Indépendant(e)', 'En association', 'En création']

// Régions belges disponibles
const regions = [
  'Bruxelles-Capitale',
  'Brabant Wallon',
  'Hainaut',
  'Liège',
  'Luxembourg',
  'Namur',
  'Brabant Flamand',
  'Anvers',
  'Flandre Orientale',
  'Flandre Occidentale',
  'Gand',
  'Limbourg',
]

// ── État de soumission ─────────────────────────────────────────────────────
const isSubmitting = ref(false)
const isSubmitted  = ref(false)
const hasError     = ref(false)

// ── Validation basique ─────────────────────────────────────────────────────
const isFormValid = computed(() =>
  form.nom.trim().length >= 2 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
  form.region !== '',
)

// ── Soumission du formulaire ───────────────────────────────────────────────
const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true
  hasError.value     = false

  try {
    /*
     * 📡 REMPLACER PAR VOTRE LOGIQUE DE SOUMISSION :
     *
     * Option 1 — Netlify Forms (déploiement Netlify) :
     *   const data = new FormData()
     *   Object.entries(form).forEach(([k, v]) => data.append(k, v))
     *   await fetch('/', { method: 'POST', body: data })
     *
     * Option 2 — API NuxtHub / Nitro :
     *   await $fetch('/api/contact', { method: 'POST', body: form })
     *
     * Option 3 — Formspree :
     *   await $fetch('https://formspree.io/f/VOTRE_ID', {
     *     method: 'POST', body: form
     *   })
     */
    await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulation
    isSubmitted.value = true
  } catch {
    hasError.value = true
  } finally {
    isSubmitting.value = false
  }
}

const { el, isVisible } = useScrollReveal({ threshold: 0.06 })
</script>

<template>
  <section
    id="contact"
    class="bg-surface-lowest section-padding"
    aria-labelledby="contact-heading"
  >
    <div class="container-content">
      <div class="max-w-form mx-auto">

        <!-- ── En-tête ── -->
        <div
          ref="el"
          :class="['text-center mb-10 transition-all duration-700 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
        >
          <h2
            id="contact-heading"
            class="font-display font-bold text-on-surface mb-3"
            style="font-size: clamp(1.75rem, 3.5vw, 2rem); line-height: 1.2; letter-spacing: -0.01em;"
          >
            Prêt à libérer votre temps médical&nbsp;?
          </h2>
          <p class="font-body text-body-lg text-on-surface-variant">
            Laissez-nous vos coordonnées, un expert vous contactera sous 2h.
          </p>
        </div>

        <!-- ════════════════════════════════════════════════════════════════
             Formulaire "Quiet Entry" — fond tonal, zéro bordure
        ════════════════════════════════════════════════════════════════ -->

        <!-- État de succès après envoi -->
        <Transition
          enter-active-class="transition-all duration-500 ease-clinical"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div
            v-if="isSubmitted"
            class="bg-surface-tonal rounded-card p-10 text-center shadow-card"
            role="alert"
            aria-live="polite"
          >
            <div
              class="w-16 h-16 rounded-card mx-auto mb-4 flex items-center justify-center"
              style="background-color: rgba(34, 197, 94, 0.12);"
            >
              <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-display font-bold text-headline-md text-on-surface mb-2">
              Demande envoyée avec succès !
            </h3>
            <p class="font-body text-body-md text-on-surface-variant">
              Notre équipe vous contactera dans les 2 heures suivantes.
            </p>
          </div>
        </Transition>

        <!-- Formulaire (masqué après soumission) -->
        <form
          v-if="!isSubmitted"
          novalidate
          @submit.prevent="handleSubmit"
          :class="['transition-all duration-700 delay-100 ease-clinical',
                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
        >
          <!-- Grille 2 colonnes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

            <!-- Nom & Prénom -->
            <div>
              <label for="nom" class="input-label">Nom &amp; Prénom</label>
              <input
                id="nom"
                v-model="form.nom"
                type="text"
                name="nom"
                autocomplete="name"
                placeholder="Jeanne Dupont"
                class="input-quiet"
                required
                minlength="2"
                aria-required="true"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="input-label">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="vous@exemple.be"
                class="input-quiet"
                required
                aria-required="true"
              />
            </div>

            <!-- Téléphone -->
            <div>
              <label for="tel" class="input-label">Téléphone</label>
              <input
                id="tel"
                v-model="form.tel"
                type="tel"
                name="tel"
                autocomplete="tel"
                placeholder="+32 470 00 00 00"
                class="input-quiet"
              />
            </div>

            <!-- Région -->
            <div>
              <label for="region" class="input-label">Région</label>
              <div class="relative">
                <select
                  id="region"
                  v-model="form.region"
                  name="region"
                  class="input-quiet w-full pr-10 cursor-pointer"
                  required
                  aria-required="true"
                >
                  <option value="" disabled>Sélectionnez votre région</option>
                  <option
                    v-for="r in regions"
                    :key="r"
                    :value="r"
                  >
                    {{ r }}
                  </option>
                </select>
                <!-- Chevron personnalisé -->
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-4 h-4 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Sélecteur de statut (chips radio) -->
          <div class="mb-8">
            <p class="input-label mb-3">Statut actuel</p>
            <div class="flex flex-wrap gap-3" role="group" aria-label="Statut actuel">
              <UiTarifChip
                v-for="s in statuts"
                :key="s"
                :label="s"
                variant="selector"
                :active="form.statut === s"
                @select="form.statut = s"
                role="radio"
                :aria-checked="form.statut === s"
              />
            </div>
          </div>

          <!-- Message d'erreur -->
          <div
            v-if="hasError"
            class="mb-4 p-4 rounded-xl text-sm font-body text-red-700"
            style="background-color: rgba(186, 26, 26, 0.06);"
            role="alert"
          >
            Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
          </div>

          <!-- Bouton CTA principal -->
          <UiButton
            type="submit"
            size="lg"
            class="w-full justify-center"
            :loading="isSubmitting"
            :disabled="!isFormValid"
          >
            <template v-if="!isSubmitting">
              Libérer mon temps médical
            </template>
            <template v-else>
              Envoi en cours…
            </template>
          </UiButton>

          <!-- Mention RGPD -->
          <p class="font-body text-label-sm text-on-surface-variant text-center mt-4 tracking-normal uppercase-none" style="letter-spacing: normal; text-transform: none; font-size: 0.75rem;">
            <svg class="w-3.5 h-3.5 inline-block mr-1 mb-0.5 text-outline" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Vos données sont sécurisées et strictement confidentielles.
          </p>
        </form>

      </div>
    </div>
  </section>
</template>
