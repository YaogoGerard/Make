<template>
  <!-- ═══ SECTION HÉRO (BANNIÈRE AVEC VERRE) ═══ -->
  <section class="mt-16 px-8 pt-8 pb-24 bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-gray-800/20">
    <div class="ml-4 flex items-center gap-3">
      <RankBadge />
      <span class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
        </svg>
        {{ $t('hero.updated') }}
      </span>
    </div>

    <div class="max-w-3xl">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
        {{ $t('hero.title') }}
        <a
          href="https://en.wikipedia.org/wiki/Burkina_Faso"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-500 underline decoration-orange-500/30 underline-offset-4 transition-all duration-300 hover:decoration-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
        >{{ $t('hero.country') }}</a>
      </h2>
      <p class="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        {{ $t('hero.subtitle') }}
      </p>
    </div>
  </section>

  <!-- ═══ SECTION CLASSEMENT (FILTRES + RECHERCHE + GRILLE) ═══ -->
  <section class="px-8 py-12">
    <!-- FILTRE TOUS / ÉTUDIANTS -->
    <TabFilter v-model="activeFilter" />
    <!-- BARRE DE RECHERCHE -->
    <div class="mt-8 flex justify-center">
      <SearchBar v-model="searchQuery" />
    </div>
    <!-- BANNIÈRE D'INFO DÉROULANTE -->
    <div class="mt-4 flex justify-center">
      <InfoBanner />
    </div>
    <!-- STATISTIQUES (nombre de contributeurs + commits) -->
    <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <span class="font-medium text-orange-500">{{ filteredList.length }}</span> {{ $t('stats.contributors') }} •
      <span class="font-medium text-orange-500">{{ totalContribs }}</span> {{ $t('stats.contributions_year') }}
    </p>
    <!-- GRILLE DES CARTES CONTRIBUTEURS -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ContributorCard v-for="c in displayedList" :key="c.pseudo"
        :rank="c.rank" :name="c.name" :pseudo="c.pseudo" :status="c.status"
        :contributions="c.contributions" :repos="c.repos" :stars="c.stars" :avatar="c.avatar"
      />
    </div>
    <!-- BOUTONS VOIR PLUS / VOIR MOINS -->
    <div class="mt-8 flex items-center justify-center gap-4">
      <button v-if="filteredList.length > visibleCount"
        class="rounded-full border border-gray-200/50 bg-white/60 bg-clip-padding px-8 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm backdrop-filter transition hover:bg-white/80 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:border-gray-700 dark:bg-gray-800/20 dark:text-gray-300 dark:hover:bg-gray-800/30"
        @click="visibleCount += 10"
      >
        {{ $t('pagination.see_more') }}
      </button>
      <button v-if="visibleCount > 10"
        class="rounded-full border border-gray-200/50 bg-white/60 bg-clip-padding px-8 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm backdrop-filter transition hover:bg-white/80 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:border-gray-700 dark:bg-gray-800/20 dark:text-gray-300 dark:hover:bg-gray-800/30"
        @click="visibleCount = 10"
      >
        {{ $t('pagination.see_less') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ─── FILTRES ET RECHERCHE ───
const activeFilter = ref('tous')
const searchQuery = ref('')
const visibleCount = ref(10)

// ─── DONNÉES API GITHUB ───
const { data: apiData } = await useFetch('/api/contributors')
const allContributors = computed(() => apiData.value ?? [])


// ─── LOGIQUE DE FILTRAGE ───
const filteredList = computed(() => {
  const list = activeFilter.value === 'tous'
    ? allContributors.value
    : allContributors.value.filter(c => c.status === 'étudiant')

  const query = searchQuery.value.toLowerCase().trim()
  const filtered = query
    ? list.filter(c => c.name.toLowerCase().includes(query) || c.pseudo.toLowerCase().includes(query))
    : list

  return [...filtered]
})

// ─── AFFICHAGE LIMITÉ À visibleCount ───
const displayedList = computed(() =>
  filteredList.value.slice(0, visibleCount.value)
)

// ─── TOTAL DES CONTRIBUTIONS (pour les stats) ───
const totalContribs = computed(() =>
  filteredList.value.reduce((sum, c) => sum + c.contributions, 0)
)

// ─── RÉINITIALISATION DU NOMBRE VISIBLE AU CHANGEMENT DE FILTRE ───
watch(activeFilter, () => { visibleCount.value = 10 })
</script>
