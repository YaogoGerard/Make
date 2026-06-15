<template>
  <!-- ═══ HEADER FIXE AVEC PILLULES EN VERRE ═══ -->
  <header class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-8 pointer-events-none">
    <!-- LOGO -->
    <NuxtLink :to="localePath('/')" class="shrink-0 pointer-events-auto rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 p-2">
      <img class="h-8 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-none" src="~/assets/images/logo1.png" alt="Maké logo">
    </NuxtLink>

    <!-- NAVIGATION DESKTOP (FR / EN / GitHub / Thème) -->
    <nav class="pointer-events-auto hidden items-center gap-3 md:flex">
      <!-- BOUTON FR -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <NuxtLink :to="switchLocalePath('fr')" class="relative text-sm transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" :class="locale === 'fr' ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600'">
          FR
          <span v-if="locale === 'fr'" class="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500" />
        </NuxtLink>
      </span>
      <!-- BOUTON EN -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <NuxtLink :to="switchLocalePath('en')" class="relative text-sm transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" :class="locale === 'en' ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600'">
          EN
          <span v-if="locale === 'en'" class="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500" />
        </NuxtLink>
      </span>
      <!-- LIEN GitHub -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <a
          href="https://github.com/YaogoGerard/Make"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
        >
          <img class="h-5 w-5 rounded-full bg-gray-200 dark:bg-white" src="~/assets/images/github.png" alt="">
          {{ $t('header.github') }}
        </a>
      </span>
      <!-- BASCULE THÈME (Desktop) -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <button
          class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
        </button>
      </span>
    </nav>

    <!-- ZONE MOBILE : Thème + Hamburger (visibles que sur mobile) -->
    <div class="pointer-events-auto flex items-center gap-2 md:hidden">
      <!-- BASCULE THÈME (Mobile, en dehors du menu hamburger) -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-3 py-2">
        <button
          class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
        </button>
      </span>
      <!-- MENU HAMBURGER -->
      <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 p-3">
        <button
          class="flex flex-col gap-1.5"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
        >
          <span class="block h-0.5 w-6 bg-gray-900 transition dark:bg-white" :class="{ 'rotate-45 translate-y-2': menuOpen }" />
          <span class="block h-0.5 w-6 bg-gray-900 transition dark:bg-white" :class="{ 'opacity-0': menuOpen }" />
          <span class="block h-0.5 w-6 bg-gray-900 transition dark:bg-white" :class="{ '-rotate-45 -translate-y-2': menuOpen }" />
        </button>
      </span>
    </div>

    <!-- MENU MOBILE DÉROULANT (FR / EN / GitHub) -->
    <div
      v-if="menuOpen"
      class="pointer-events-auto absolute inset-x-0 top-full mt-3"
    >
      <ul class="flex flex-col items-center gap-3">
        <li class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <NuxtLink :to="switchLocalePath('fr')" class="relative text-lg transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" :class="locale === 'fr' ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600'" @click="menuOpen = false">
            FR
            <span v-if="locale === 'fr'" class="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500" />
          </NuxtLink>
        </li>
        <li class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <NuxtLink :to="switchLocalePath('en')" class="relative text-lg transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" :class="locale === 'en' ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600'" @click="menuOpen = false">
            EN
            <span v-if="locale === 'en'" class="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-orange-500" />
          </NuxtLink>
        </li>
        <li class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <a
            href="https://github.com/YaogoGerard"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-lg text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            @click="menuOpen = false"
          >
            <img class="h-5 w-5 rounded-full bg-gray-200 dark:bg-white" src="~/assets/images/github.png" alt="">
            {{ $t('header.github') }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const menuOpen = ref(false)
const { locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
</script>
