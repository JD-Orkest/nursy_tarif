/**
 * useScrollReveal — Composable pour les animations d'apparition au défilement.
 *
 * Utilisation dans un composant Vue :
 *   const { el, isVisible } = useScrollReveal()
 *   <div ref="el" :class="isVisible ? 'reveal-visible' : 'reveal-hidden'">...</div>
 *
 * Le composable utilise l'API native IntersectionObserver (aucune dépendance tierce).
 * Sur les navigateurs sans support, isVisible bascule immédiatement à true.
 */
import { ref, onMounted, onUnmounted } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const isVisible = ref(false)
  const el = ref<HTMLElement | null>(null)

  const {
    threshold  = 0.12,
    rootMargin = '0px 0px -60px 0px',
    once       = true,
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // Dégradation gracieuse si IntersectionObserver n'est pas supporté
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      isVisible.value = true
      return
    }
    if (!el.value) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Une seule animation par élément (once = true par défaut)
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el, isVisible }
}
