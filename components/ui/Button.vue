<script setup lang="ts">
/**
 * UiButton — Bouton réutilisable avec 3 variantes : primary, secondary, ghost.
 * Peut être rendu comme un <button> ou un <a> selon la prop `href`.
 */
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?:    'sm' | 'md' | 'lg'
  href?:    string
  target?:  string
  loading?: boolean
  type?:    'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size:    'md',
  loading: false,
  type:    'button',
})

// Classes calculées selon la variante et la taille
const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center gap-2 ' +
    'font-display font-semibold tracking-wide ' +
    'transition-all duration-250 ease-clinical ' +
    'focus-visible:outline-none focus-visible:shadow-focus ' +
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none'

  const variants: Record<string, string> = {
    primary:
      'bg-cta-gradient text-white shadow-cta ' +
      'hover:shadow-cta-hover hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'text-primary-alt ' +
      'hover:scale-[1.02] active:scale-[0.98]',
    ghost:
      'text-primary hover:bg-primary/5 active:bg-primary/10',
  }

  const sizes: Record<string, string> = {
    sm: 'text-xs px-4 py-2.5 rounded-xl',
    md: 'text-sm px-6 py-3.5 rounded-xl',
    lg: 'text-base px-8 py-4 rounded-xl',
  }

  return [base, variants[props.variant], sizes[props.size]].join(' ')
})

// Style inline pour le bouton secondaire (opacity sur la couleur secondaire)
const inlineStyle = computed(() =>
  props.variant === 'secondary'
    ? { backgroundColor: 'rgba(173, 216, 220, 0.28)' }
    : {},
)
</script>

<template>
  <!-- Rendu conditionnel : <a> si href fourni, sinon <button> -->
  <component
    :is="href ? 'a' : 'button'"
    v-bind="href ? { href, target } : { type }"
    :class="classes"
    :style="inlineStyle"
    :disabled="!href && loading"
  >
    <!-- Spinner de chargement -->
    <span
      v-if="loading"
      class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
      aria-hidden="true"
    />

    <!-- Contenu du bouton via slot -->
    <slot />
  </component>
</template>
