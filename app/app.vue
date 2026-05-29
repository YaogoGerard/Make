<template>
  <div class="relative min-h-screen">
    <div class="fixed inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${bgImage})` }" />
    <Header class="fixed inset-x-0 top-0 z-50" />
    <div class="fixed inset-0 bg-white/80 dark:bg-gray-950/90" />
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
