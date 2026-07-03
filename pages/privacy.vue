<script setup lang="ts">
useSeoMeta({
  title:       'Politique de Confidentialité | NursyTarif',
  description: 'Politique de confidentialité et protection des données personnelles de NursyTarif. Conformité RGPD (UE) 2016/679.',
})
</script>

<template>
  <div>
    <SectionsNavBar />
    <main class="min-h-screen pt-24 pb-20 bg-surface-lowest">
      <div class="container-content max-w-narrow">
        <div class="mb-8">
          <NuxtLink to="/" class="chip-primary inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l'accueil
          </NuxtLink>
          <h1 class="font-display font-bold text-headline-lg text-on-surface mb-2">
            Politique de confidentialité
          </h1>
          <p class="font-body text-body-sm text-on-surface-variant">Dernière mise à jour : juillet 2026</p>
        </div>

        <div class="prose font-body text-body-md text-on-surface space-y-5 leading-relaxed">
          <p>
            NursyTarif s'engage à protéger la vie privée de ses utilisateurs et respecte
            scrupuleusement le Règlement Général sur la Protection des Données (RGPD — UE 2016/679).
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Données collectées</h2>
          <p>
            Dans le cadre de nos services de tarification, nous collectons les données
            strictement nécessaires : coordonnées professionnelles, données de facturation
            INAMI et informations de contact.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Utilisation des données</h2>
          <p>
            Vos données sont utilisées exclusivement pour la prestation du service de
            tarification et de facturation. Elles ne sont jamais vendues ni cédées à des tiers.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Conservation</h2>
          <p>
            Les données de facturation sont conservées pendant la durée légale requise
            en Belgique (7 ans), conformément aux obligations INAMI.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Contact</h2>
          <p>
            Pour toute question relative à vos données personnelles, contactez-nous via
            le formulaire sur notre page d'accueil.
          </p>
        </div>
      </div>
    </main>
    <SectionsFooter />
  </div>
</template>
