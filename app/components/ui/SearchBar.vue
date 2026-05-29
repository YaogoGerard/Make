<template>
  <div class="flex w-full justify-center">
    <div class="relative w-full max-w-4xl">
      <span class="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-gray-400 dark:text-gray-500">
        <span class="text-lg leading-none">🔍</span>
      </span>
      <input
        type="search"
        placeholder="Rechercher un contributeur"
        class="w-full rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 py-3 pl-11 pr-6 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:bg-gray-800/20 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
