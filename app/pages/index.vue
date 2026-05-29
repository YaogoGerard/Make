<template>
    <!-- ══════════════════════════════════════════════
         SECTION 1 — BANDEAU HERO
         ══════════════════════════════════════════════ -->
    <section class="mt-16 px-8 pt-8 pb-24 bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm dark:bg-gray-800/20">

        <!-- ── BADGE LIVE + DATE ── -->
        <div class="ml-4 flex items-center gap-3">
            <!-- Goutte "Live" orange (clignote doucement) -->
            <span class="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-600 dark:text-orange-400 animate-glow-pulse">
                <span class="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
                Live
            </span>
            <!-- Date de mise à jour -->
            <span class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
                </svg>
                mise à jour le JJ/MM/AA
            </span>
        </div>

        <!-- ── TITRE PRINCIPAL ── -->
        <div class="max-w-3xl">
            <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Les meilleurs contributeurs GitHub du
                <!-- Lien Burkina Faso avec glow orange au hover -->
                <a
                    href="https://en.wikipedia.org/wiki/Burkina_Faso"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-orange-500 underline decoration-orange-500/30 underline-offset-4 transition-all duration-300 hover:decoration-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                >Burkina Faso</a>
            </h2>
            <!-- Sous-titre descriptif -->
            <p class="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Un classement open source des développeurs et étudiants qui
                construisent, commitent et contribuent le plus sur GitHub.
                Rejoins le mouvement.
            </p>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════
         SECTION 2 — FILTRES + RECHERCHE
         ══════════════════════════════════════════════ -->
    <section class="px-8 py-12">

        <!-- ── FILTRES (Tous / Étudiants) ── -->
        <div class="flex justify-center">
            <div class="relative inline-flex rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 dark:bg-gray-800/20 dark:border-gray-700 overflow-hidden">
                <span
                    class="absolute inset-y-0 z-0 w-1/2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-transform duration-700 ease-in-out"
                    :class="activeFilter === 'tous' ? 'translate-x-0' : 'translate-x-full'"
                >
                    <span class="absolute inset-x-3 top-1 h-1/3 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                </span>
                <button
                    class="relative z-10 flex-1 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300"
                    :class="[
                        activeFilter === 'tous' ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                    ]"
                    @click="activeFilter = 'tous'"
                >Tous</button>
                <button
                    class="relative z-10 flex-1 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300"
                    :class="[
                        activeFilter === 'etudiants' ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                    ]"
                    @click="activeFilter = 'etudiants'"
                >Étudiants</button>
            </div>
        </div>

        <!-- ── BARRE DE RECHERCHE ── -->
        <div class="relative mt-8 flex justify-center">
            <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <svg class="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                </svg>
            </span>
            <input type="search" placeholder="Rechercher un contributeur" class="w-full max-w-md rounded-full bg-gray-400/20 bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 py-3 pl-11 pr-6 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:bg-gray-800/20 dark:border-gray-700 dark:text-white dark:placeholder-gray-500">
        </div>
    </section>
</template>

<script setup lang="ts">
// ── ÉTAT DU FILTRE ACTIF (Tous / Étudiants) ──
const activeFilter = ref<'tous' | 'etudiants'>('tous')

</script>

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
