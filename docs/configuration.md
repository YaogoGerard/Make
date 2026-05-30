# Configuration — Maké

> Fichiers de configuration du projet.

## `nuxt.config.ts`

| Section | Rôle |
|---|---|
| `app.baseURL: '/Make/'` | GitHub Pages en sous-répertoire |
| `app.head.link` | Favicon à `/Make/favicon.ico` |
| `colorMode` | Mode `class`, stocké sous `maké-theme` |
| `components.pathPrefix: false` | Auto-import sans préfixe |
| `runtimeConfig.githubToken` | Token GitHub (via `NUXT_GITHUB_TOKEN`) |
| `i18n` | FR par défaut, EN avec préfixe `/en/` |

**Modules :** `@nuxtjs/color-mode`, `@nuxtjs/tailwindcss`, `@nuxtjs/i18n`

## `tailwind.config.js`

- `darkMode: 'class'`
- Content : `components/`, `layouts/`, `pages/`, `app.vue`

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `NUXT_GITHUB_TOKEN` | Oui | Token GitHub classic (scope `read:user`) |

`.env` ignoré par git (`.gitignore`). En prod, injecté via GitHub Actions secrets.

## Scripts (`package.json`)

| Script | Usage |
|---|---|
| `dev` | Développement local |
| `generate` | Build SSG → `.output/public/` |
| `preview` | Prévisualisation du site généré |

## i18n

Fichiers dans `i18n/locales/` : `fr.json` (FR) et `en.json` (EN).

Sections : `hero`, `filter`, `search`, `stats`, `card`, `pagination`, `header`, `info`, `footer`.
