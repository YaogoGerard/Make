<template>
  <!-- ═══ FILTRE À GLISSIÈRE (Tous / Étudiants) ═══ -->
  <div class="flex justify-center">
    <div class="relative inline-flex rounded-full bg-white/60 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50 dark:bg-gray-800/20 dark:border-gray-700 overflow-hidden">
      <!-- INDICATEUR COULISSANT (dégradé orange) -->
      <span
        class="absolute inset-y-0 z-0 w-1/2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-transform duration-700 ease-in-out"
        :class="modelValue === 'tous' ? 'translate-x-0' : 'translate-x-full'"
      >
        <span class="absolute inset-x-3 top-1 h-1/3 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
      </span>
      <!-- BOUTON "TOUS" -->
      <button
        class="relative z-10 flex-1 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300"
        :class="modelValue === 'tous' ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        @click="$emit('update:modelValue', 'tous')"
      >{{ $t('filter.all') }}</button>
      <!-- BOUTON "ÉTUDIANTS" -->
      <button
        class="relative z-10 flex-1 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300"
        :class="modelValue === 'etudiants' ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        @click="$emit('update:modelValue', 'etudiants')"
      >{{ $t('filter.students') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
