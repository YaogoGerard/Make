# API — /api/contributors

> Endpoint unique, disponible pendant la génération SSG uniquement.

```
GET /api/contributors
```

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
  }
]
```

## Schéma

| Champ | Type | Description |
|---|---|---|
| `rank` | `number` | Position (1-indexé) |
| `name` | `string` | Nom affiché |
| `pseudo` | `string` | `@login` GitHub |
| `status` | `string` | `"contributeur"` ou `"étudiant"` |
| `contributions` | `number` | Total contributions année en cours |
| `repos` | `number` | Nombre total de repos |
| `stars` | `number` | Somme stars des 10 meilleurs repos |
| `avatar` | `string` | URL avatar GitHub |

## Cache

- **Durée :** 24h (Nitro filesystem storage, clé `github-contributors`)
- **Invalidation :** Prochaine exécution de `nuxt generate`

## Erreurs

| Situation | Comportement |
|---|---|
| committers.top down | Build échouée |
| Rate limit (403/429) | Retry 3x (10s → 20s → 30s) |
| Token invalide | Build échouée |
| Cache valide existant | Pas d'appel API |
