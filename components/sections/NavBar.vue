<script setup lang="ts">
/**
 * NavBar contextuelle :
 *   - Homepage /          : ancres #section + scroll doux
 *   - Pages ville /tarification/* : liens /#section (navigation pleine page)
 *                                   logo = lien retour /
 *                                   fil d’ariane en centre
 */
const route = useRoute()

// Vrai sur toute URL commençant par /tarification/
const isCityPage = computed(() => route.path.startsWith('/tarification/'))

const isScrolled       = ref(false)
const isMobileMenuOpen = ref(false)
// URL du logo préfixée avec le baseURL (nécessaire pour GitHub Pages)
const logoUrl = usePublicUrl('logo.svg')
// Liens adaptés au contexte
const homeLinks = [
  { label: 'Tarifs',          href: '#services'   },
  { label: 'Fonctionnalités', href: '#avantages'  },
  { label: 'SEO Offert',      href: '#visibilite' },
  { label: 'Zones',           href: '#zones'      },
  { label: 'Contact',         href: '#contact'    },
]
const cityLinks = [
  { label: 'Tarifs',          href: '/#services'   },
  { label: 'Fonctionnalités', href: '/#avantages'  },
  { label: 'SEO Offert',      href: '/#visibilite' },
  { label: 'Zones',          href: '/#zones'       },
  { label: 'Contact',         href: '/#contact'    },
]
const navLinks = computed(() => isCityPage.value ? cityLinks : homeLinks)

// Nom de la ville depuis le slug (pour le fil d’ariane)
const cityLabel = computed(() =>
  (route.params.ville as string ?? '').replace(/-/g, ' '),
)

// requestAnimationFrame : évite le forced layout reflow en synchronisant la
// lecture de window.scrollY avec le cycle de rendu du navigateur
let rafPending = false
const handleScroll = () => {
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 24
    rafPending = false
  })
}
onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Scroll doux uniquement sur la homepage
const scrollTo = (href: string) => {
  isMobileMenuOpen.value = false
  if (href.startsWith('#')) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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

        <!-- ── Logo — NuxtLink vers / (pages ville) | ancre #accueil (homepage) ── -->
        <!-- Ville : NuxtLink to="/" respecte le baseURL GitHub Pages -->
        <!-- Homepage : <a> + scroll doux via @click.prevent -->
        <NuxtLink
          v-if="isCityPage"
          to="/"
          class="flex items-center gap-2 group"
          aria-label="NursyTarif — Retour à l'accueil"
        >
          <img
            :src="logoUrl"
            alt="NursyTarif logo"
            class="w-8 h-8 rounded-lg shadow-level-1 group-hover:shadow-level-2 transition-shadow duration-250"
            width="32" height="32" loading="eager"
          />
          <span class="font-display font-bold text-lg text-on-surface tracking-tight">NursyTarif</span>
        </NuxtLink>
        <a
          v-else
          href="#accueil"
          class="flex items-center gap-2 group"
          aria-label="NursyTarif — Haut de page"
          @click.prevent="scrollTo('#accueil')"
        >
          <img
            :src="logoUrl"
            alt="NursyTarif logo"
            class="w-8 h-8 rounded-lg shadow-level-1 group-hover:shadow-level-2 transition-shadow duration-250"
            width="32" height="32" loading="eager"
          />
          <span class="font-display font-bold text-lg text-on-surface tracking-tight">NursyTarif</span>
        </a>

        <!-- ── Fil d’ariane — visible uniquement sur les pages ville (desktop) ── -->
        <nav
          v-if="isCityPage"
          aria-label="Fil d’ariane"
          class="hidden md:flex items-center gap-1.5 font-body text-body-sm text-on-surface-variant"
        >
          <NuxtLink to="/" class="hover:text-primary transition-colors duration-150">Accueil</NuxtLink>
          <svg class="w-3 h-3 text-outline-variant flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <NuxtLink to="/#zones" class="hover:text-primary transition-colors duration-150">Zones</NuxtLink>
          <svg class="w-3 h-3 text-outline-variant flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-on-surface font-medium capitalize">{{ cityLabel }}</span>
        </nav>

        <!-- ── Liens nav desktop ── -->
        <!-- Homepage : @click.prevent + scroll doux | Pages ville : lien href natif vers /#section -->
        <ul v-if="!isCityPage" class="hidden lg:flex items-center gap-1" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="font-body text-body-sm text-on-surface-variant px-4 py-2 rounded-xl
                     hover:text-on-surface hover:bg-surface-low transition-all duration-150"
              @click.prevent="scrollTo(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <ul v-else class="hidden lg:flex items-center gap-1" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <NuxtLink
              :to="link.href"
              class="font-body text-body-sm text-on-surface-variant px-4 py-2 rounded-xl
                     hover:text-on-surface hover:bg-surface-low transition-all duration-150"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- ── CTA desktop ── -->
        <div class="hidden lg:flex items-center gap-3">
          <UiButton
            v-if="isCityPage"
            href="#contact"
            size="sm"
          >
            Démarrer
          </UiButton>
          <UiButton
            v-else
            href="#contact"
            size="sm"
            @click.prevent="scrollTo('#contact')"
          >
            Démarrer
          </UiButton>
        </div>

        <!-- ── Hamburger mobile ── -->
        <button
          class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl
                 hover:bg-surface-low transition-colors duration-150 gap-1.5"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Ouvrir le menu de navigation"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250', isMobileMenuOpen && 'rotate-45 translate-y-2']" />
          <span :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250', isMobileMenuOpen && 'opacity-0']" />
          <span :class="['block w-5 h-0.5 bg-on-surface rounded-full transition-all duration-250', isMobileMenuOpen && '-rotate-45 -translate-y-2']" />
        </button>
      </div>

      <!-- ── Menu mobile ── -->
      <Transition
        enter-active-class="transition-all duration-300 ease-clinical"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-clinical"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" id="mobile-menu" class="lg:hidden pb-6 pt-2">

          <!-- Fil d’ariane mobile -->
          <div
            v-if="isCityPage"
            class="flex items-center gap-1.5 px-4 py-2 mb-1 font-body text-body-sm text-on-surface-variant"
          >
            <NuxtLink to="/" class="hover:text-primary transition-colors">Accueil</NuxtLink>
            <svg class="w-3 h-3 text-outline-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span class="text-on-surface font-medium capitalize">{{ cityLabel }}</span>
          </div>

          <ul class="flex flex-col gap-1" role="list">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="block font-body text-body-md text-on-surface-variant px-4 py-3 rounded-xl
                       hover:text-on-surface hover:bg-surface-low transition-all duration-150"
                @click="!isCityPage ? ($event.preventDefault(), scrollTo(link.href)) : (isMobileMenuOpen = false)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <div class="mt-4">
            <UiButton
              href="#contact"
              class="w-full justify-center"
              @click="isMobileMenuOpen = false; !isCityPage && ($event.preventDefault(), scrollTo('#contact'))"
            >
              Demander une démo gratuite
            </UiButton>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
