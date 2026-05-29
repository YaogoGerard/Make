<template>
  <section class="mt-16 px-8 pt-8 pb-24 bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-gray-800/20">
    <div class="ml-4 flex items-center gap-3">
      <RankBadge />
      <span class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
        </svg>
        mise à jour le JJ/MM/AA
      </span>
    </div>

    <div class="max-w-3xl">
      <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
        Les meilleurs contributeurs GitHub du
        <a
          href="https://en.wikipedia.org/wiki/Burkina_Faso"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-500 underline decoration-orange-500/30 underline-offset-4 transition-all duration-300 hover:decoration-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
        >Burkina Faso</a>
      </h2>
      <p class="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        Un classement open source des développeurs et étudiants qui
        construisent, commitent et contribuent le plus sur GitHub.
        Rejoins le mouvement.
      </p>
    </div>
  </section>

  <section class="px-8 py-12">
    <TabFilter v-model="activeFilter" />
    <div class="mt-8 flex justify-center">
      <SearchBar v-model="searchQuery" />
    </div>
    <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <span class="font-medium text-orange-500">{{ filteredList.length }}</span> contributeurs •
      <span class="font-medium text-orange-500">{{ totalCommits }}</span> commits ce mois
    </p>
    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ContributorCard v-for="c in filteredList" :key="c.rank" :rank="c.rank" :name="c.name" :commits="c.commits" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const activeFilter = ref('tous')
const searchQuery = ref('')

const allContributors = [
  { rank: 1, name: 'Yao Gérard', commits: 1_342 },
  { rank: 2, name: 'Aminata Ouattara', commits: 987 },
  { rank: 3, name: 'Issa Traoré', commits: 756 },
  { rank: 4, name: 'Fatoumata Diallo', commits: 543 },
  { rank: 5, name: 'Mamadou Koné', commits: 421 },
  { rank: 6, name: 'Awa Sanou', commits: 312 },
  { rank: 7, name: 'Adama Bamba', commits: 234 },
  { rank: 8, name: 'Rokia Sawadogo', commits: 189 },
  { rank: 9, name: 'Boureima Zongo', commits: 145 },
  { rank: 10, name: 'Kadiatou Ouédraogo', commits: 98 },
]

const filteredList = computed(() =>
  activeFilter.value === 'tous'
    ? allContributors
    : allContributors.slice(0, 5)
)

const totalCommits = computed(() =>
  filteredList.value.reduce((sum, c) => sum + c.commits, 0)
)
</script>
