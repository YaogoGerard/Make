<template>
  <div class="min-h-screen">
    <!-- ═══ HERO ═══ -->
    <section class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
        Maké
      </h1>
      <p class="mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
        Développeur web passionné, créateur d'expériences numériques minimales et performantes.
      </p>
      <div class="mt-8 flex gap-4">
        <a href="#projects" class="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
          Voir mes projets
        </a>
        <a href="https://github.com/YaogoGerard" target="_blank" rel="noopener noreferrer" class="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          GitHub
        </a>
      </div>
    </section>

    <!-- ═══ PROJETS ═══ -->
    <section id="projects" class="mx-auto max-w-6xl px-4 py-24">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Projets</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Quelques réalisations récentes.</p>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Projet 1</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Description du projet à venir.</p>
          <div class="mt-4 flex gap-3">
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">Nuxt</span>
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">Tailwind</span>
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Projet 2</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Description du projet à venir.</p>
          <div class="mt-4 flex gap-3">
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">Vue</span>
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">Node</span>
          </div>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Projet 3</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Description du projet à venir.</p>
          <div class="mt-4 flex gap-3">
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">TypeScript</span>
            <span class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">Nuxt</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ COMPÉTENCES ═══ -->
    <section class="mx-auto max-w-6xl px-4 py-24">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Compétences</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Technologies avec lesquelles je travaille.</p>
      <div class="mt-10 flex flex-wrap gap-3">
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">JavaScript</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">TypeScript</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">Vue.js</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">Nuxt</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">React</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">Node.js</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">Tailwind CSS</span>
        <span class="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">Git</span>
      </div>
    </section>

    <!-- ═══ CONTACT ═══ -->
    <section class="mx-auto max-w-6xl px-4 py-24 text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Contact</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Retrouvez-moi sur GitHub ou envoyez-moi un message.</p>
      <div class="mt-8 flex justify-center gap-4">
        <a href="https://github.com/YaogoGerard" target="_blank" rel="noopener noreferrer" class="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
          GitHub
        </a>
        <a href="mailto:contact@example.com" class="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          Email
        </a>
      </div>
    </section>
  </div>
</template>
