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
    <!-- STATISTIQUES (nombre de contributeurs + commits) -->
    <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <span class="font-medium text-orange-500">{{ filteredList.length }}</span> {{ $t('stats.contributors') }} •
      <span class="font-medium text-orange-500">{{ totalCommits }}</span> {{ $t('stats.commits_month') }}
    </p>
    <!-- GRILLE DES CARTES CONTRIBUTEURS -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ContributorCard v-for="c in displayedList" :key="c.rank"
        :rank="c.rank" :name="c.name" :pseudo="c.pseudo" :status="c.status"
        :commits="c.commits" :repos="c.repos" :stars="c.stars" :avatar="c.avatar"
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

// ─── DONNÉES MOCK (20 CONTRIBUTEURS) ───
const allContributors = [
  { rank: 1, name: 'Yao Gérard', pseudo: '@yaogérard', status: 'contributeur' as const, commits: 1_342, repos: 45, stars: 2_891, avatar: 'https://ui-avatars.com/api/?name=Yao+G%C3%A9rard&background=random' },
  { rank: 2, name: 'Aminata Ouattara', pseudo: '@aminatao', status: 'étudiant' as const, commits: 987, repos: 23, stars: 1_456, avatar: 'https://ui-avatars.com/api/?name=Aminata+Ouattara&background=random' },
  { rank: 3, name: 'Issa Traoré', pseudo: '@issatr', status: 'contributeur' as const, commits: 756, repos: 31, stars: 978, avatar: 'https://ui-avatars.com/api/?name=Issa+Traor%C3%A9&background=random' },
  { rank: 4, name: 'Fatoumata Diallo', pseudo: '@fdiallo', status: 'étudiant' as const, commits: 543, repos: 18, stars: 654, avatar: 'https://ui-avatars.com/api/?name=Fatoumata+Diallo&background=random' },
  { rank: 5, name: 'Mamadou Koné', pseudo: '@mkoné', status: 'contributeur' as const, commits: 421, repos: 27, stars: 523, avatar: 'https://ui-avatars.com/api/?name=Mamadou+Kon%C3%A9&background=random' },
  { rank: 6, name: 'Awa Sanou', pseudo: '@awasanou', status: 'étudiant' as const, commits: 312, repos: 12, stars: 378, avatar: 'https://ui-avatars.com/api/?name=Awa+Sanou&background=random' },
  { rank: 7, name: 'Adama Bamba', pseudo: '@adambamba', status: 'contributeur' as const, commits: 234, repos: 19, stars: 289, avatar: 'https://ui-avatars.com/api/?name=Adama+Bamba&background=random' },
  { rank: 8, name: 'Rokia Sawadogo', pseudo: '@rokias', status: 'étudiant' as const, commits: 189, repos: 9, stars: 234, avatar: 'https://ui-avatars.com/api/?name=Rokia+Sawadogo&background=random' },
  { rank: 9, name: 'Boureima Zongo', pseudo: '@bzongo', status: 'contributeur' as const, commits: 145, repos: 14, stars: 178, avatar: 'https://ui-avatars.com/api/?name=Boureima+Zongo&background=random' },
  { rank: 10, name: 'Kadiatou Ouédraogo', pseudo: '@kadioued', status: 'étudiant' as const, commits: 98, repos: 7, stars: 123, avatar: 'https://ui-avatars.com/api/?name=Kadiatou+Ou%C3%A9draogo&background=random' },
  { rank: 11, name: 'Souleymane Kaboré', pseudo: '@skabore', status: 'contributeur' as const, commits: 876, repos: 34, stars: 2_134, avatar: 'https://ui-avatars.com/api/?name=Souleymane+Kabor%C3%A9&background=random' },
  { rank: 12, name: 'Mariam Tapsoba', pseudo: '@mtapsoba', status: 'étudiant' as const, commits: 654, repos: 21, stars: 1_567, avatar: 'https://ui-avatars.com/api/?name=Mariam+Tapsoba&background=random' },
  { rank: 13, name: 'Drissa Ouédraogo', pseudo: '@drisoued', status: 'contributeur' as const, commits: 567, repos: 28, stars: 1_234, avatar: 'https://ui-avatars.com/api/?name=Drissa+Ou%C3%A9draogo&background=random' },
  { rank: 14, name: 'Habibata Barro', pseudo: '@hbarro', status: 'étudiant' as const, commits: 432, repos: 15, stars: 876, avatar: 'https://ui-avatars.com/api/?name=Habibata+Barro&background=random' },
  { rank: 15, name: 'Moustapha Nikiéma', pseudo: '@mnikiem', status: 'contributeur' as const, commits: 378, repos: 22, stars: 745, avatar: 'https://ui-avatars.com/api/?name=Moustapha+Niki%C3%A9ma&background=random' },
  { rank: 16, name: 'Rahamata Sawadogo', pseudo: '@rahamata', status: 'étudiant' as const, commits: 289, repos: 11, stars: 567, avatar: 'https://ui-avatars.com/api/?name=Rahamata+Sawadogo&background=random' },
  { rank: 17, name: 'Idrissa Compaoré', pseudo: '@icompaore', status: 'contributeur' as const, commits: 234, repos: 16, stars: 456, avatar: 'https://ui-avatars.com/api/?name=Idrissa+Compaor%C3%A9&background=random' },
  { rank: 18, name: 'Salimata Drabo', pseudo: '@sdrabo', status: 'étudiant' as const, commits: 187, repos: 8, stars: 345, avatar: 'https://ui-avatars.com/api/?name=Salimata+Drabo&background=random' },
  { rank: 19, name: 'Ousmane Zoromé', pseudo: '@ozorome', status: 'contributeur' as const, commits: 156, repos: 13, stars: 234, avatar: 'https://ui-avatars.com/api/?name=Ousmane+Zorom%C3%A9&background=random' },
  { rank: 20, name: 'Bintou Diallo', pseudo: '@bdiallo', status: 'étudiant' as const, commits: 112, repos: 6, stars: 189, avatar: 'https://ui-avatars.com/api/?name=Bintou+Diallo&background=random' },
]

// ─── LOGIQUE DE FILTRAGE ───
const filteredList = computed(() => {
  const list = activeFilter.value === 'tous'
    ? allContributors
    : allContributors.filter(c => c.status === 'étudiant')
  return list.sort((a, b) => b.commits - a.commits).map((c, i) => ({ ...c, rank: i + 1 }))
})

// ─── AFFICHAGE LIMITÉ À visibleCount ───
const displayedList = computed(() =>
  filteredList.value.slice(0, visibleCount.value)
)

// ─── TOTAL DES COMMITS (pour les stats) ───
const totalCommits = computed(() =>
  filteredList.value.reduce((sum, c) => sum + c.commits, 0)
)

// ─── RÉINITIALISATION DU NOMBRE VISIBLE AU CHANGEMENT DE FILTRE ───
watch(activeFilter, () => { visibleCount.value = 10 })
</script>
