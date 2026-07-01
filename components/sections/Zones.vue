<script setup lang="ts">
/**
 * Zones — Section "Zones desservies" de la page d'accueil.
 *
 * UX : cartes de province cliquables → modal avec liste alphabétique + barre de recherche.
 * SEO : les noms de communes restent dans le DOM (liste masquée visuellement mais indexable).
 */
import { citiesByProvince, provinceOrder, type City } from '~/data/cities'

const { el, isVisible } = useScrollReveal({ threshold: 0.05 })

// ── Icônes par province ────────────────────────────────────────────────────
const provinceIcons: Record<string, string> = {
  'Hainaut':            '⛏️',
  'Brabant Wallon':     '🌿',
  'Namur':              '🏰',
  'Liège':              '🔥',
  'Luxembourg':         '🌲',
  'Bruxelles-Capitale': '🏛️',
}

// ── État du modal ──────────────────────────────────────────────────────────
const activeProvince   = ref<string | null>(null)
const searchQuery      = ref('')
const searchInputRef   = ref<HTMLInputElement | null>(null)

// Communes de la province active, filtrées par la recherche
const filteredCities = computed<City[]>(() => {
  if (!activeProvince.value) return []
  const all = citiesByProvince[activeProvince.value] ?? []
  const q   = searchQuery.value.trim().toLowerCase()
  if (!q) return all
  return all.filter(c => c.name.toLowerCase().includes(q))
})

// Ouverture du modal
const openModal = (province: string) => {
  activeProvince.value = province
  searchQuery.value    = ''
  // Focus sur la barre de recherche après le prochain tick
  nextTick(() => searchInputRef.value?.focus())
}

// Fermeture du modal
const closeModal = () => {
  activeProvince.value = null
  searchQuery.value    = ''
}

// Fermeture sur Échap
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section
    id="zones"
    class="bg-surface-lowest section-padding"
    aria-labelledby="zones-heading"
  >
    <div class="container-content">

      <!-- ── En-tête ── -->
      <div
        ref="el"
        :class="['text-center mb-12 transition-all duration-700 ease-clinical',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      >
        <div class="mb-4 flex justify-center">
          <UiTarifChip label="Couverture Nationale" variant="primary">
            <template #icon>
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </template>
          </UiTarifChip>
        </div>
        <h2
          id="zones-heading"
          class="font-display font-bold text-on-surface mb-3"
          style="font-size: clamp(1.75rem, 3.5vw, 2rem); line-height: 1.2; letter-spacing: -0.01em;"
        >
          Votre boîte de tarification partout<br class="hidden sm:block">
          en Wallonie et à Bruxelles.
        </h2>
        <p class="font-body text-body-lg text-on-surface-variant max-w-[500px] mx-auto">
          Cliquez sur une province pour retrouver votre commune.
        </p>
      </div>

      <!-- ── Grille des cartes province — cliquables ── -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          v-for="(province, index) in provinceOrder"
          :key="province"
          type="button"
          :aria-label="`Voir les ${citiesByProvince[province]?.length} communes de ${province}`"
          @click="openModal(province)"
          :class="[
            'group flex flex-col items-center justify-center gap-2 text-center',
            'bg-surface-tonal rounded-card p-5 cursor-pointer',
            'hover:shadow-level-2 hover:-translate-y-1 hover:bg-primary/5',
            'active:scale-95',
            'transition-all duration-250 ease-clinical',
            'focus-visible:outline-none focus-visible:shadow-focus',
            'transition-all duration-700 ease-clinical',
            `animation-delay-${(index + 1) * 100}`,
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <!-- Icône province -->
          <span class="text-2xl leading-none" aria-hidden="true">{{ provinceIcons[province] }}</span>

          <!-- Nom province -->
          <span class="font-display font-bold text-xs text-on-surface uppercase tracking-wide leading-tight">
            {{ province }}
          </span>

          <!-- Compteur de communes -->
          <span
            class="font-body font-semibold text-label-sm px-2.5 py-1 rounded-xl
                   group-hover:bg-primary/10 group-hover:text-primary
                   transition-colors duration-150"
            style="background-color: rgba(21,145,155,0.08); color: #15919B;"
          >
            {{ citiesByProvince[province]?.length }} communes
          </span>
        </button>
      </div>

      <!--
        SEO — Liste cachée visuellement mais indexée par Google.
        Contient tous les noms de communes avec leurs liens internes.
      -->
      <div class="sr-only" aria-hidden="true">
        <template v-for="province in provinceOrder" :key="province">
          <h3>{{ province }}</h3>
          <ul>
            <li v-for="city in citiesByProvince[province]" :key="city.slug">
              <a :href="`/tarification/${city.slug}`">{{ city.name }}</a>
            </li>
          </ul>
        </template>
      </div>

      <!-- ── CTA de bas de section ── -->
      <div
        :class="['mt-10 text-center transition-all duration-700 delay-700 ease-clinical',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
      >
        <p class="font-body text-body-md text-on-surface-variant mb-4">
          Votre commune n'est pas dans la liste&nbsp;?
          Contactez-nous, nous desservons <strong class="text-on-surface">toute la Belgique.</strong>
        </p>
        <UiButton href="#contact" variant="secondary" size="md">
          Vérifier ma zone de couverture
        </UiButton>
      </div>

    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════════════
       MODAL — Liste des communes de la province sélectionnée
  ════════════════════════════════════════════════════════════════════════ -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-clinical"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-clinical"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="activeProvince"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        :aria-label="`Communes de ${activeProvince}`"
        aria-modal="true"
        @click.self="closeModal"
      >
        <!-- Fond semi-transparent -->
        <div
          class="absolute inset-0 bg-on-surface/30"
          style="backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);"
          aria-hidden="true"
          @click="closeModal"
        />

        <!-- Panneau du modal -->
        <Transition
          enter-active-class="transition-all duration-300 ease-clinical"
          enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all duration-200 ease-clinical"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="activeProvince"
            class="relative z-10 w-full sm:max-w-lg
                   bg-surface-lowest
                   rounded-t-[28px] sm:rounded-card
                   shadow-level-3
                   flex flex-col
                   max-h-[85vh] sm:max-h-[75vh]"
          >
            <!-- Poignée mobile -->
            <div class="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
              <div class="w-10 h-1 rounded-full bg-outline-variant" aria-hidden="true" />
            </div>

            <!-- En-tête du modal -->
            <div class="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
              <div class="flex items-center gap-2.5">
                <span class="text-2xl leading-none" aria-hidden="true">
                  {{ provinceIcons[activeProvince] }}
                </span>
                <div>
                  <h3 class="font-display font-bold text-headline-sm text-on-surface">
                    {{ activeProvince }}
                  </h3>
                  <p class="font-body text-body-sm text-on-surface-variant">
                    {{ filteredCities.length }}
                    {{ filteredCities.length === citiesByProvince[activeProvince]?.length
                      ? 'communes desservies'
                      : `résultat${filteredCities.length > 1 ? 's' : ''}` }}
                  </p>
                </div>
              </div>

              <!-- Bouton fermer -->
              <button
                type="button"
                class="w-9 h-9 rounded-xl flex items-center justify-center
                       text-on-surface-variant hover:text-on-surface hover:bg-surface-low
                       transition-all duration-150 focus-visible:outline-none focus-visible:shadow-focus"
                aria-label="Fermer"
                @click="closeModal"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Barre de recherche -->
            <div class="px-5 pb-3 flex-shrink-0">
              <div class="relative">
                <!-- Icône loupe -->
                <svg
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <input
                  ref="searchInputRef"
                  v-model="searchQuery"
                  type="search"
                  :placeholder="`Rechercher dans ${activeProvince}…`"
                  class="input-quiet pl-10 pr-10"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                />

                <!-- Bouton effacer la recherche -->
                <button
                  v-if="searchQuery"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2
                         w-5 h-5 rounded-full flex items-center justify-center
                         text-outline hover:text-on-surface hover:bg-surface-high
                         transition-colors duration-150"
                  aria-label="Effacer la recherche"
                  @click="searchQuery = ''"
                >
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Séparateur tonal (pas de ligne) -->
            <div class="h-px bg-surface-high mx-5 flex-shrink-0" aria-hidden="true" />

            <!-- Liste scrollable des communes -->
            <div class="overflow-y-auto flex-1 px-2 py-2">

              <!-- Résultat vide -->
              <div v-if="filteredCities.length === 0" class="py-10 text-center">
                <p class="font-body text-body-md text-outline">
                  Aucune commune trouvée pour "<strong class="text-on-surface">{{ searchQuery }}</strong>"
                </p>
              </div>

              <!-- Liste des communes -->
              <ul v-else role="list" class="divide-y-0">
                <li
                  v-for="city in filteredCities"
                  :key="city.slug"
                  class="group"
                >
                  <a
                    :href="`/tarification/${city.slug}`"
                    class="flex items-center justify-between
                           px-3 py-2.5 rounded-xl
                           hover:bg-surface-tonal
                           transition-colors duration-100"
                    :aria-label="`Tarification infirmière à ${city.name}`"
                    @click="closeModal"
                  >
                    <div class="flex items-center gap-3">
                      <!-- Indicateur actif -->
                      <div
                        class="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0
                               group-hover:opacity-100 transition-opacity duration-150"
                        style="background-color: #15919B;"
                        aria-hidden="true"
                      />
                      <span class="font-body text-body-md text-on-surface font-medium">
                        <!-- Mise en évidence du terme recherché -->
                        <template v-if="searchQuery">
                          <span
                            v-for="(part, i) in city.name.split(new RegExp(`(${searchQuery})`, 'gi'))"
                            :key="i"
                            :class="part.toLowerCase() === searchQuery.toLowerCase()
                              ? 'text-primary font-semibold'
                              : ''"
                          >{{ part }}</span>
                        </template>
                        <template v-else>{{ city.name }}</template>
                      </span>
                    </div>

                    <!-- Code postal + flèche -->
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <span
                        v-if="city.postalCodes?.[0]"
                        class="font-body text-label-sm text-outline"
                      >
                        {{ city.postalCodes[0] }}
                      </span>
                      <svg
                        class="w-3.5 h-3.5 text-outline-variant group-hover:text-primary
                               group-hover:translate-x-0.5 transition-all duration-150"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
