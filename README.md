# Maké

> Classement des meilleurs contributeurs GitHub du Burkina Faso.

Maké est un site statique généré avec **Nuxt 4** qui affiche un classement des développeurs et étudiants burkinabè les plus actifs sur GitHub, basé sur leurs contributions publiques (commits, pull requests, code reviews) de l'année en cours.

## Stack

- **Framework** — Nuxt 4 (SSG)
- **UI** — Tailwind CSS, Nuxt Color Mode (dark/light), glassmorphism (verre dépoli)
- **i18n** — Français / Anglais
- **Données** — GitHub GraphQL API + [committers.top](https://committers.top/burkina_faso)
- **Cache** — 24h via Nitro storage
- **Déploiement** — GitHub Pages (via GitHub Actions)

## Fonctionnement

1. Récupération de la liste des utilisateurs GitHub burkinabè depuis committers.top
2. Enrichissement par batch (10 utilisateurs) via l'API GraphQL GitHub
3. Tri par nombre total de contributions de l'année
4. Génération statique du site (prerender)
5. Déploiement automatique sur GitHub Pages

Le site est régénéré automatiquement **toutes les 24h** (via cron GitHub Actions) et à chaque push sur `main`.

## Utilisation

```bash
# Installer les dépendances
npm ci

# Lancer en développement
npm run dev

# Générer le site statique
npm run generate

# Prévisualiser le site généré
npm run preview
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `NUXT_GITHUB_TOKEN` | Token GitHub (classic) avec scope `read:user` pour l'API GraphQL |

## Configuration

- `nuxt.config.ts` — Base URL `/Make/`, favicon, modules, i18n
- `server/utils/github.ts` — Logique de fetch GitHub (GraphQL, rate-limit retry, pagination)
- `server/api/contributors.get.ts` — Endpoint API avec cache 24h
- `.github/workflows/deploy.yml` — Déploiement automatique
- `i18n/locales/` — Fichiers de traduction (fr/en)
- `app/pages/index.vue` — Page principale (classement, filtres, recherche)

## Contribuer

Les contributions sont les bienvenues ! Voir [`CONTRIBUTING.md`](CONTRIBUTING.md) pour les détails.

## Licence

MIT
