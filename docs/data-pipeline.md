# Pipeline de Données — Maké

> De l'API GitHub à l'affichage navigateur, en 5 étapes.

**[← Architecture](architecture.md)** • **[→ API](api-contributors.md)**

```mermaid
flowchart LR
  A[committers.top] -->|Logins| B[GraphQL batch 10]
  B -->|Profils| C[Tri par contributions]
  C -->|Données| D[Cache 24h]
  D -->|useFetch| E[Prerender HTML]
  E -->|.output/public| F[GitHub Pages]
```

## 1. Récupération des logins

`fetchRankedLogins()` → `https://committers.top/rank_only/burkina_faso.json` → ~250-350 logins GitHub.

## 2. Enrichissement GraphQL

Traitement par **batchs de 10**, avec **1s de délai** entre chaque. Requête par user : login, name, avatar, bio, company, repos (top 10 stars), contributions annuelles.

**Rate limit :** 3 tentatives avec attente progressive (10s → 20s → 30s) sur 403/429.

## 3. Agrégation et tri

Tri par `totalContributions` descendant, puis mapping vers `Contributor[]` :

| Champ | Source |
|---|---|
| `rank` | Index après tri |
| `name` | `user.name` sinon `user.login` |
| `pseudo` | `@user.login` |
| `status` | `"étudiant"` si bio/company contient un mot-clé |
| `contributions` | `contributionCalendar.totalContributions` |
| `repos` / `stars` | `repositories.totalCount` / somme stargazerCount |

## 4. Cache 24h

Le cache Nitro évite les appels GitHub pendant la navigation. Invalidé à chaque `nuxt generate`.

## 5. Génération statique

`useFetch('/api/contributors')` est exécuté pendant le prerender. Les données sont injectées dans le HTML final. Zéro JS nécessaire pour l'affichage initial.

## Volumes typiques

| Mètre | Valeur |
|---|---|
| Logins reçus | 250-350 |
| Requêtes GraphQL | 25-35 |
| Durée fetch | 30-60s |
| JSON final | 50-100 Ko |
| Génération SSG | < 30s |
