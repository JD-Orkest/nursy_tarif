<script setup lang="ts">
useSeoMeta({
  title:       'Conformité INAMI | NursyTarif',
  description: 'NursyTarif garantit une conformité totale aux réglementations INAMI pour la facturation des soins infirmiers en Belgique.',
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
            Conformité INAMI
          </h1>
          <p class="font-body text-body-sm text-on-surface-variant">Dernière mise à jour : juillet 2026</p>
        </div>

        <div class="font-body text-body-md text-on-surface space-y-5 leading-relaxed">
          <p>
            NursyTarif garantit une facturation 100% conforme aux dernières
            nomenclatures et réglementations de l'INAMI pour les soins infirmiers
            à domicile en Belgique.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Agrément et licences</h2>
          <p>
            Notre programme de tarification est homologué et mis à jour en temps réel
            lors de chaque modification de la nomenclature INAMI.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Tiers payant et mutuelles</h2>
          <p>
            Nous gérons la relation avec l'ensemble des mutuelles belges (Solidaris,
            Mutualité Chrétienne, CAAMI, etc.) et garantissons le traitement conforme
            des attestations eID et des envois électroniques via MyCareNet.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Mise à jour réglementaire</h2>
          <p>
            Chaque modification législative (arrêtés royaux, circulaires INAMI) est
            intégrée automatiquement dans notre système sans intervention requise de
            votre part.
          </p>
        </div>
      </div>
    </main>
    <SectionsFooter />
  </div>
</template>
