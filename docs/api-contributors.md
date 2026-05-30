# API — /api/contributors

> Endpoint unique de l'API Maké.

---

## Endpoint

```
GET /api/contributors
```
Disponible uniquement pendant la génération statique (prerender). Non exposé en production.

---

## Réponse

```json
[
  {
    "rank": 1,
    "name": "Tiga Tatiana",
    "pseudo": "@tigatatiana",
    "status": "contributeur",
    "contributions": 1234,
    "repos": 45,
    "stars": 890,
    "avatar": "https://avatars.githubusercontent.com/u/..."
  },
  {
    "rank": 2,
    "name": "Karim Ouédraogo",
    "pseudo": "@karimo",
    "status": "étudiant",
    "contributions": 987,
    "repos": 23,
    "stars": 156,
    "avatar": "https://avatars.githubusercontent.com/u/..."
  }
]
```

---

## Schéma

| Champ | Type | Description |
|---|---|---|
| `rank` | `number` | Position dans le classement (1-indexé) |
| `name` | `string` | Nom affiché (ou login si nom absent) |
| `pseudo` | `string` | Pseudo GitHub avec `@` |
| `status` | `"contributeur" \| "étudiant"` | Badge étudiant si bio/company contient un mot-clé |
| `contributions` | `number` | Total contributions GitHub de l'année en cours |
| `repos` | `number` | Nombre total de repositories |
| `stars` | `number` | Somme des étoiles des 10 repos les plus populaires |
| `avatar` | `string` | URL de l'avatar GitHub |

---

## Cache

- **Durée :** 24h
- **Stockage :** Nitro filesystem storage (`.data/`)
- **Clé :** `github-contributors`
- **Invalidation :** Prochaine exécution de `nuxt generate`

```typescript
const cached = await storage.getItem<CacheEntry>('github-contributors')
if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
  return cached.data
}
```

---

## Erreurs possibles

| Situation | Comportement |
|---|---|
| committers.top injoignable | Erreur build : `Impossible de contacter committers.top` |
| Rate limit GitHub (403/429) | Retry 3 fois avec attente progressive (10s, 20s, 30s) |
| Token invalide | Erreur build : `Bad credentials` |
| Cache valide existant | Retourne le cache, pas d'appel GitHub |
| Aucun cache + échec API | Build échouée |

---

## Utilisation dans le code

```typescript
// app/pages/index.vue
const { data: apiData } = await useFetch('/api/contributors')
const allContributors = computed(() => apiData.value ?? [])

// Trié, filtré, paginé côté client
const filteredList = computed(() => {
  let list = activeFilter.value === 'tous'
    ? allContributors.value
    : allContributors.value.filter(c => c.status === 'étudiant')
  // + recherche par nom/pseudo
})
```
