<script setup lang="ts">
/**
 * UiTarifChip — Chip de statut / tag réutilisable.
 * Utilisé pour "TARIFICATION EXPERTE", "AVANTAGE EXCLUSIF", statuts de formulaire, etc.
 */
interface Props {
  variant?: 'primary' | 'accent' | 'muted' | 'success' | 'selector'
  active?:  boolean
  label:    string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  active:  false,
})

// Émission de l'événement de sélection (pour les chips de formulaire)
const emit = defineEmits<{ select: [label: string] }>()
</script>

<template>
  <button
    type="button"
    @click="emit('select', label)"
    :class="[
      'inline-flex items-center gap-2 font-body font-semibold text-label-sm uppercase tracking-widest',
      'px-4 py-2 rounded-xl transition-all duration-200 ease-clinical',
      'focus-visible:outline-none focus-visible:shadow-focus',
      // Variante primaire (teal)
      variant === 'primary' && !active &&
        'text-primary',
      variant === 'primary' && active &&
        'bg-cta-gradient text-white shadow-level-1',
      // Variante accent (tertiaire chaud)
      variant === 'accent' &&
        'text-tertiary',
      // Variante atténuée
      variant === 'muted' &&
        'text-accent-muted',
      // Variante succès (vert)
      variant === 'success' &&
        'text-green-600',
      // Variante sélecteur de formulaire
      variant === 'selector' && !active &&
        'bg-surface-tonal text-on-surface-variant hover:bg-surface-high',
      variant === 'selector' && active &&
        'bg-cta-gradient text-white shadow-level-1',
    ]"
    :style="
      variant === 'primary' && !active
        ? { backgroundColor: 'rgba(21, 145, 155, 0.10)' }
        : variant === 'accent'
        ? { backgroundColor: 'rgba(141, 74, 26, 0.10)' }
        : variant === 'muted'
        ? { backgroundColor: 'rgba(127, 165, 168, 0.12)' }
        : variant === 'success'
        ? { backgroundColor: 'rgba(34, 197, 94, 0.10)' }
        : {}
    "
  >
    <!-- Icône optionnelle via slot -->
    <slot name="icon" />

    {{ label }}
  </button>
</template>
