<script setup lang="ts">
/**
 * NavBar — En-tête sticky avec effet de profondeur au défilement.
 * - Transparent au sommet → fond blanc + ombre au scroll
 * - Menu mobile avec animation slide-down
 * - Liens avec défilement doux vers les ancres de section
 */

// État du défilement (pour l'effet d'élévation)
const isScrolled = ref(false)
// État du menu mobile
const isMobileMenuOpen = ref(false)

// Liens de navigation (correspond aux id des sections)
const navLinks = [
  { label: 'Tarifs',          href: '#services'    },
  { label: 'Fonctionnalités', href: '#avantages'   },
  { label: 'SEO Offert',      href: '#visibilite'  },
  { label: 'Contact',         href: '#contact'     },
]

// Gestion du défilement pour l'élévation du header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Défilement doux vers une ancre de section
const scrollTo = (href: string) => {
  isMobileMenuOpen.value = false
  if (href.startsWith('#')) {
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Fermeture du menu mobile au clic extérieur
const closeMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <!-- Navigation principale — sticky, transition d'élévation au scroll -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50',
      'transition-all duration-350 ease-clinical',
      isScrolled
        ? 'bg-surface-lowest/95 shadow-level-2'
        : 'bg-surface-lowest',
    ]"
    style="backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);"
  >
    <nav
      class="container-content"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div class="flex items-center justify-between h-16 lg:h-18">

        <!-- ── Logo NursyTarif ── -->
        <a
          href="#accueil"
          class="flex items-center gap-2 group"
          @click.prevent="scrollTo('#accueil')"
          aria-label="NursyTarif — Retour à l'accueil"
        >
          <!-- Icône croix médicale stylisée -->
          <div
            class="w-8 h-8 rounded-lg bg-cta-gradient flex items-center justify-center shadow-level-1
                   group-hover:shadow-level-2 transition-shadow duration-250"
          >
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M11 3a1 1 0 10-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V3z" />
            </svg>
          </div>
          <span class="font-display font-bold text-lg text-on-surface tracking-tight">
            NursyTarif
          </span>
        </a>

        <!-- ── Liens de navigation — desktop uniquement ── -->
        <ul class="hidden lg:flex items-center gap-1" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="font-body text-body-sm text-on-surface-variant px-4 py-2 rounded-xl
                     hover:text-on-surface hover:bg-surface-low
                     transition-all duration-150 ease-clinical"
              @click.prevent="scrollTo(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>

        <!-- ── Actions CTA — desktop ── -->
        <div class="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            class="font-body font-semibold text-sm text-on-surface-variant
                   px-4 py-2 rounded-xl
                   hover:text-primary hover:bg-primary/5
                   transition-all duration-150"
            @click.prevent="scrollTo('#contact')"
          >
            Connexion
          </a>
          <UiButton href="#contact" size="sm" @click.prevent="scrollTo('#contact')">
            Démarrer
          </UiButton>
        </div>

        <!-- ── Bouton hamburger — mobile ── -->
        <button
          class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl
                 hover:bg-surface-low transition-colors duration-150 gap-1.5"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Ouvrir le menu de navigation"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span
            :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250',
                     isMobileMenuOpen && 'rotate-45 translate-y-2']"
          />
          <span
            :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250',
                     isMobileMenuOpen && 'opacity-0']"
          />
          <span
            :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250',
                     isMobileMenuOpen && '-rotate-45 -translate-y-2']"
          />
        </button>
      </div>

      <!-- ── Menu mobile déroulant ── -->
      <Transition
        enter-active-class="transition-all duration-300 ease-clinical"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-clinical"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          id="mobile-menu"
          class="lg:hidden pb-6 pt-2"
        >
          <ul class="flex flex-col gap-1" role="list">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="block font-body text-body-md text-on-surface-variant
                       px-4 py-3 rounded-xl
                       hover:text-on-surface hover:bg-surface-low
                       transition-all duration-150"
                @click.prevent="scrollTo(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
          <div class="mt-4 flex flex-col gap-3 px-0">
            <UiButton
              href="#contact"
              class="w-full justify-center"
              @click.prevent="scrollTo('#contact')"
            >
              Demander une démo gratuite
            </UiButton>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
