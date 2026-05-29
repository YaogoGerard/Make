<template>
  <!-- ═══ LAYOUT PRINCIPAL (CONTENEUR GÉNÉRAL) ═══ -->
  <div class="relative min-h-screen">
    <!-- IMAGE DE FOND (bg.jpg) -->
    <div class="fixed inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${bgImage})` }" />
    <!-- HEADER (entre l'image et l'overlay pour que le verre montre bg.jpg) -->
    <Header class="fixed inset-x-0 top-0 z-50" />
    <!-- OVERLAY DE LISIBILITÉ (blanc en clair, gris foncé en sombre) -->
    <div class="fixed inset-0 bg-white/80 dark:bg-gray-950/90" />
    <!-- CONTENU PRINCIPAL (au-dessus de l'overlay) -->
    <div class="relative z-10 pt-16">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import bgImage from '~/assets/images/bg.jpg'
</script>
