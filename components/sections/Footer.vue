<script setup lang="ts">
/**
 * Footer — Pied de page élégant et minimaliste.
 * Respecte la règle No-Line : séparation par fond tonal, jamais par bordure.
 */

const currentYear = new Date().getFullYear()

// URL du logo préfixée avec le baseURL (nécessaire pour GitHub Pages)
const logoUrl = usePublicUrl('logo.svg')

const footerLinks = [
  { label: 'Contact',                       href: '#contact'  },
]

// Défilement doux vers le contact
const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer
    class="bg-surface-tonal"
    role="contentinfo"
    aria-label="Pied de page NursyTarif"
  >
    <!-- Séparateur de section (gradient tonal, pas de ligne) -->
    <div class="h-1 bg-gradient-to-r from-transparent via-secondary/40 to-transparent" aria-hidden="true" />

    <div class="container-content py-10 lg:py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">

        <!-- ── Logo et signature ── -->
        <div class="flex items-center gap-2">
          <img
            :src="logoUrl"
            alt="NursyTarif logo"
            class="w-7 h-7 rounded-lg"
            width="28"
            height="28"
            loading="lazy"
          />
          <span class="font-display font-bold text-base text-on-surface tracking-tight">NursyTarif</span>
        </div>

        <!-- ── Liens légaux ── -->
        <!-- <nav aria-label="Liens légaux et de navigation du pied de page">
          <ul class="flex flex-wrap justify-center items-center gap-1" role="list">
            <li
              v-for="(link, index) in footerLinks"
              :key="link.href"
              class="flex items-center"
            >
              <a
                :href="link.href"
                class="font-body text-body-sm text-on-surface-variant
                       hover:text-on-surface
                       px-2 py-1 rounded-lg
                       hover:bg-surface-container
                       transition-all duration-150"
                @click.prevent="link.href === '#contact' ? scrollToContact() : undefined"
              >
                {{ link.label }}
              </a> -->
              <!-- Séparateur visuel (point, pas de ligne) -->
              <!-- <span
                v-if="index < footerLinks.length - 1"
                class="ml-1 text-outline-variant text-xs"
                aria-hidden="true"
              >·</span>
            </li>
          </ul>
        </nav> -->

        <!-- ── Copyright ── -->
        <p class="font-body text-body-sm text-on-surface-variant text-center md:text-right">
          &copy; {{ currentYear }} NursyTarif Medical Billing.<br class="sm:hidden">
          Tous droits réservés.
        </p>

      </div>

      <!-- ── Mention de conformité ── -->
      <div class="mt-6 pt-6 text-center" style="border-top: 1px solid rgba(189, 201, 202, 0.40);">
        <p class="font-body text-label-sm text-outline" style="letter-spacing: normal; text-transform: none; font-size: 0.7rem;">
          Service agréé de tarification pour infirmiers(ères) indépendants en Belgique.
          Conformité INAMI. Données protégées conformément au RGPD (UE) 2016/679.
        </p>
      </div>
    </div>
  </footer>
</template>
