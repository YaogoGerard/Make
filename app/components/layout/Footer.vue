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
        <!-- BOUTON CONTRIBUER (plein, pas en verre) -->
        <span class="rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700">
          <a
            href="#"
            class="inline-block rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {{ $t('footer.contribute') }}
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>
