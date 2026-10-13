<template>
  <!-- ═══ FOOTER AVEC PILLULES EN VERRE ═══ -->
  <footer class="border-t border-gray-200/50 dark:border-gray-700/50">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-6 sm:flex-row">
      <!-- NOM DU PROJET & LICENCE -->
      <div class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-5 py-2 text-sm text-gray-600 dark:text-gray-400">
        {{ $t('footer.project') }}
      </div>
      <!-- LIENS (API GitHub + @YaogoGerard + Contribuer) -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <!-- LIEN VERS L'API GitHub -->
        <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
          {{ $t('footer.data_via') }}
          <a
            href="https://docs.github.com/en/graphql"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-gray-800 underline underline-offset-2 transition hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
          >{{ $t('footer.api') }}</a>
        </span>
        <!-- LIEN GitHub DU CRÉATEUR -->
        <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
          <a
            href="https://github.com/YaogoGerard"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <img class="h-5 w-5 rounded-full bg-gray-200 dark:bg-white" src="~/assets/images/github.png" alt="">
            @{{ $t('footer.handle') }}
          </a>
        </span>
        <!-- BOUTON CONTACTER (mailto) -->
        <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 px-4 py-2">
          <a
            href="mailto:gerardwyaogo@gmail.com"
            class="flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            {{ $t('footer.contact') }}
          </a>
        </span>
        <!-- BOUTON CONTRIBUER (plein, pas en verre) -->
        <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700">
          <a
            href="https://github.com/YaogoGerard/Make/tree/main?tab=contributing-ov-file"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {{ $t('footer.contribute') }}
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>
