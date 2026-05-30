<template>
  <div class="flex w-full justify-center">
    <div class="w-full max-w-4xl">
      <button
        class="flex w-full items-center justify-between rounded-full bg-white/60 bg-clip-padding px-6 py-3 text-sm text-gray-600 backdrop-blur-sm backdrop-filter transition hover:bg-white/80 border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800/30"
        @click="open = !open"
      >
        <span>💡 {{ $t('info.title') }}</span>
        <span class="transition-transform duration-300" :class="open ? 'rotate-180' : ''">▾</span>
      </button>
      <div
        v-if="open"
        class="mt-2 space-y-3 rounded-2xl border border-gray-200/50 bg-white/80 bg-clip-padding p-5 text-sm text-gray-600 backdrop-blur-sm backdrop-filter dark:border-gray-700 dark:bg-gray-800/30 dark:text-gray-400"
      >
        <p>{{ $t('info.criteria') }}</p>
        <p>
          {{ $t('info.source') }}
          <a href="https://committers.top/burkina_faso" target="_blank" rel="noopener noreferrer" class="font-medium text-orange-500 underline underline-offset-2">committers.top</a>.
        </p>
        <p>{{ $t('info.student_howto') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
