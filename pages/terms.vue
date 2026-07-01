<script setup lang="ts">
useSeoMeta({
  title:       "Conditions d'Utilisation | NursyTarif",
  description: "Conditions générales d'utilisation du service NursyTarif de tarification pour infirmières indépendantes en Belgique.",
})
</script>

<template>
  <div>
    <SectionsNavBar />
    <main class="min-h-screen pt-24 pb-20 bg-surface-lowest">
      <div class="container-content max-w-narrow">
        <div class="mb-8">
          <a href="/" class="chip-primary inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l'accueil
          </a>
          <h1 class="font-display font-bold text-headline-lg text-on-surface mb-2">
            Conditions d'utilisation
          </h1>
          <p class="font-body text-body-sm text-on-surface-variant">Dernière mise à jour : juillet 2026</p>
        </div>

        <div class="font-body text-body-md text-on-surface space-y-5 leading-relaxed">
          <p>
            En utilisant les services NursyTarif, vous acceptez les présentes conditions
            générales d'utilisation. Ces conditions régissent l'accès et l'utilisation
            du service de tarification et de l'application Nursy.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Description du service</h2>
          <p>
            NursyTarif propose un service de tarification et de facturation pour
            infirmières indépendantes en Belgique. La rémunération est basée sur
            4,7% du chiffre d'affaires réellement encaissé.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Obligations du client</h2>
          <p>
            Le client s'engage à fournir des informations exactes et complètes nécessaires
            à la réalisation des prestations de tarification.
          </p>
          <h2 class="font-display font-bold text-headline-sm text-on-surface mt-8 mb-3">Droit applicable</h2>
          <p>
            Les présentes conditions sont soumises au droit belge.
            Tout litige relève de la compétence exclusive des tribunaux belges.
          </p>
        </div>
      </div>
    </main>
    <SectionsFooter />
  </div>
</template>
