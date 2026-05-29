<template>
  <!-- ═══ BADGE "LIVE" AVEC PULSATION (glow uniquement, pas d'opacité) ═══ -->
  <span class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-600 dark:text-orange-400 animate-glow-pulse">
    <span class="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
    {{ $t('hero.badge') }}
  </span>
</template>

<style>
.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 6px rgba(249, 115, 22, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(249, 115, 22, 0.9), 0 0 50px rgba(249, 115, 22, 0.2);
  }
}
</style>
