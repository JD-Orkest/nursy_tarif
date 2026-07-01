<script setup lang="ts">
/**
 * UiServiceCard — Carte de service réutilisable.
 * 3 variantes de style : default (blanc), featured (gradient CTA), tonal (fond tonal).
 */
interface Props {
  variant?:  'default' | 'featured' | 'tonal'
  highlight?: string  // Valeur mise en avant (ex: "4,7%")
  title:     string
  description: string
  link?:     string
  linkText?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <article
    :class="[
      'relative rounded-card p-6 lg:p-8 transition-all duration-350 ease-clinical group',
      {
        // Variante par défaut : fond blanc, ombre ambiante
        'bg-surface-lowest shadow-card hover:shadow-level-3 hover:-translate-y-1':
          variant === 'default',
        // Variante mise en avant : gradient CTA
        'bg-cta-gradient text-white shadow-cta hover:shadow-cta-hover hover:-translate-y-1':
          variant === 'featured',
        // Variante tonale : fond surface-tonal
        'bg-surface-tonal hover:shadow-level-2 hover:-translate-y-0.5':
          variant === 'tonal',
      },
    ]"
  >
    <!-- Icône — slot nommé -->
    <div v-if="$slots.icon" class="mb-5">
      <slot name="icon" />
    </div>

    <!-- Valeur principale mise en avant (ex: "4,7%") -->
    <p
      v-if="highlight"
      :class="[
        'font-display font-extrabold leading-none mb-3',
        variant === 'featured' ? 'text-white text-5xl' : 'text-on-surface text-5xl',
      ]"
    >
      {{ highlight }}
    </p>

    <!-- Titre de la carte -->
    <h3
      :class="[
        'font-display font-bold text-headline-sm mb-2',
        variant === 'featured' ? 'text-white' : 'text-on-surface',
      ]"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <p
      :class="[
        'font-body text-body-md leading-relaxed',
        variant === 'featured' ? 'text-white/80' : 'text-on-surface-variant',
      ]"
    >
      {{ description }}
    </p>

    <!-- Lien optionnel -->
    <a
      v-if="link"
      :href="link"
      :class="[
        'inline-flex items-center gap-1.5 mt-5 font-body font-semibold text-sm',
        'transition-colors duration-150',
        variant === 'featured'
          ? 'text-white/90 hover:text-white'
          : 'text-primary hover:text-primary-alt',
      ]"
    >
      {{ linkText }}
      <!-- Flèche droite -->
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>

    <!-- Slot par défaut pour contenu additionnel (ex: graphique) -->
    <slot />
  </article>
</template>
