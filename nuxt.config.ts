export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    "@nuxtjs/tailwindcss"
  ],
  css:['~/assets/css/main.css'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
    storageKey: 'maké-theme',
  },
})
