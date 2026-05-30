# Configuration — Maké

> Référence des fichiers de configuration du projet.

---

## 1. `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {
    baseURL: '/Make/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Make/favicon.ico' }
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],
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
```

### Sections clés

| Section | Rôle |
|---|---|
| `app.baseURL` | `/Make/` pour le déploiement GitHub Pages en sous-répertoire |
| `app.head.link` | Favicon, chemin absolu préfixé par `baseURL` |
| `colorMode` | Mode `class` (toggle via `dark` sur `<html>`), stocké sous `maké-theme` |
| `components` | `pathPrefix: false` → les composants sont auto-importés sans préfixe |
| `runtimeConfig.githubToken` | Token GitHub injecté dans `useRuntimeConfig().githubToken` |
| `i18n` | FR par défaut, EN avec préfixe `/en/`, fichiers dans `i18n/locales/` |

---

## 2. `tailwind.config.js`

```javascript
export default {
  darkMode: 'class',
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
}
```

| Option | Valeur |
|---|---|
| `darkMode` | `'class'` — activé via `@nuxtjs/color-mode` |
| `content` | Scan des dossiers `components/`, `layouts/`, `pages/`, et `app.vue` |

---

## 3. Variables d'environnement

| Variable | Source | Obligatoire | Description |
|---|---|---|---|
| `NUXT_GITHUB_TOKEN` | `.env` / GitHub Secrets | **Oui** | Token GitHub classic (scope `read:user`) |

Le fichier `.env` à la racine est ignoré par git (dans `.gitignore`). En production, la variable est injectée via GitHub Actions secrets.

---

## 4. `package.json`

```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  }
}
```

| Script | Usage |
|---|---|
| `dev` | Développement local avec HMR |
| `build` | Build pour déploiement SSR (non utilisé) |
| `generate` | **Build SSG** — produit `.output/public/` |
| `preview` | Prévisualisation locale du site généré |
| `prepare` | Génère les types TypeScript (auto après `npm install`) |

---

## 5. `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": ".nuxt/tsconfig.app.json" },
    { "path": ".nuxt/tsconfig.server.json" },
    { "path": ".nuxt/tsconfig.shared.json" },
    { "path": ".nuxt/tsconfig.node.json" }
  ]
}
```

Généré automatiquement par Nuxt. Ne pas modifier manuellement.

---

## 6. i18n — Locales

Fichiers dans `i18n/locales/` :

- `fr.json` — Français (par défaut)
- `en.json` — Anglais

**Structure partagée :**

```json
{
  "hero": {
    "badge": "Live",
    "updated": "mise à jour le",
    "title": "Les meilleurs contributeurs GitHub du",
    "country": "Burkina Faso",
    "subtitle": "..."
  },
  "filter": { "all": "Tous", "students": "Étudiants" },
  "search": { "placeholder": "Rechercher un contributeur" },
  "stats": { "contributors": "...", "contributions_year": "..." },
  "card": { "student": "...", "contributor": "...", "contributions": "...", "repos": "...", "stars": "..." },
  "pagination": { "see_more": "...", "see_less": "..." },
  "header": { "github": "GitHub" },
  "info": { "title": "...", "criteria": "...", "source": "...", "source_updated": "...", "student_howto": "..." },
  "footer": { "project": "...", "data_via": "...", "api": "...", "handle": "...", "contribute": "..." }
}
```
