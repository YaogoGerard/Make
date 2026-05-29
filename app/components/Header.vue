<template>
  <!-- ─── BARRE HEADER (conteneur invisible, chaque element est une goutte) ─── -->
  <header class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-8">
    <!-- ═══ GOUTTE LOGO ═══ -->
    <NuxtLink to="/" class="shrink-0 rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 p-2">
      <img class="h-8 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-none" src="~/assets/images/logo1.png" alt="Maké logo">
    </NuxtLink>

    <!-- ═══ GOUTTES NAV DESKTOP ═══ -->
    <nav class="hidden items-center gap-3 md:flex">
      <span class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <button class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white">FR</button>
      </span>
      <span class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <button class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white">EN</button>
      </span>
      <span class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <a
          href="https://github.com/YaogoGerard"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
        >
          <img class="h-5 w-5 rounded-full bg-gray-200 dark:bg-white" src="~/assets/images/github.png" alt="">
          GitHub
        </a>
      </span>
      <span class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
        <button
          class="text-sm text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
        </button>
      </span>
    </nav>

    <!-- ═══ GOUTTE HAMBURGER MOBILE ═══ -->
    <span class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 p-3 md:hidden">
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

    <!-- ═══ MENU MOBILE ═══ -->
    <div
      v-if="menuOpen"
      class="absolute inset-x-0 top-full mt-3"
    >
      <ul class="flex flex-col items-center gap-3">
        <li class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <button class="text-lg text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" @click="menuOpen = false">FR</button>
        </li>
        <li class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <button class="text-lg text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white" @click="menuOpen = false">EN</button>
        </li>
        <li class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <a
            href="https://github.com/YaogoGerard"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-lg text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            @click="menuOpen = false"
          >
            <img class="h-5 w-5 rounded-full bg-gray-200 dark:bg-white" src="~/assets/images/github.png" alt="">
            GitHub
          </a>
        </li>
        <li class="rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 px-6 py-3">
          <button
            class="text-lg text-gray-600 transition hover:text-gray-900 dark:text-white/70 dark:hover:text-white"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'; menuOpen = false"
          >
            {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const menuOpen = ref(false)
</script>
