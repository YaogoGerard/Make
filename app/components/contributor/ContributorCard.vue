<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div class="flex items-center gap-4">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-600 dark:text-orange-400">
        {{ rank }}
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-gray-900 dark:text-white">{{ name }}</p>
        <p class="truncate text-xs text-gray-500 dark:text-gray-400">{{ commits }} commits</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rank: number
  name: string
  commits: number
}>()
</script>
