<template>
  <!-- ═══ CARTE D'UN CONTRIBUTEUR ═══ -->
  <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div class="flex items-start gap-4">
      <!-- AVATAR + BADGE DE RANG -->
      <div class="relative shrink-0">
        <!-- Photo de profil (si fournie) -->
        <img
          v-if="avatar"
          :src="avatar"
          :alt="name"
          class="h-14 w-14 rounded-full border-2 border-orange-500/30 object-cover"
        />
        <!-- Fallback : cercle dégradé avec le numéro de rang -->
        <span
          v-else
          class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-base font-bold text-white"
        >
          {{ rank }}
        </span>
        <!-- Badge du rang (superposé en bas à droite) -->
        <span class="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white dark:bg-white dark:text-gray-900">
          {{ rank }}
        </span>
      </div>
      <!-- NOM + PSEUDO + STATUT -->
      <div class="min-w-0 flex-1">
        <p class="text-base font-semibold text-gray-900 dark:text-white">{{ name }}</p>
        <p class="truncate text-sm text-gray-500 dark:text-gray-400">{{ pseudo }}</p>
        <!-- Étiquette de statut (étudiant en vert / contributeur en orange) -->
        <span
          class="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="status === 'étudiant'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'"
        >
          <span class="h-1.5 w-1.5 rounded-full" :class="status === 'étudiant' ? 'bg-emerald-500' : 'bg-orange-500'" />
          {{ status === 'étudiant' ? $t('card.student') : $t('card.contributor') }}
        </span>
      </div>
    </div>
    <!-- STATISTIQUES (commits / repos / étoiles) -->
    <div class="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
      <div class="text-center">
        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatNumber(contributions) }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('card.contributions') }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ repos }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('card.repos') }}</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ formatNumber(stars) }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('card.stars') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rank: number
  name: string
  pseudo: string
  status: 'contributeur' | 'étudiant'
  contributions: number
  repos: number
  stars: number
  avatar?: string
}>()

function formatNumber(n: number): string {
  return n.toLocaleString('fr-FR')
}
</script>
