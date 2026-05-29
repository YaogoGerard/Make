export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    "@nuxtjs/tailwindcss",
    '@nuxtjs/i18n',
  ],
  css:['~/assets/css/main.css'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
    storageKey: 'maké-theme',
  },
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  runtimeConfig: {
    githubToken: '',
  },
  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', files: [{ path: 'fr.json', cache: false }] },
      { code: 'en', language: 'en-US', name: 'English', files: [{ path: 'en.json', cache: false }] },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: 'locales',
  },
})
