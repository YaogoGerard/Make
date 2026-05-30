# Composants — Maké

> Composants Vue du projet.

**[← API](api-contributors.md)** • **[→ Configuration](configuration.md)**

## Layout

| Composant | Éléments |
|---|---|
| `Header.vue` | Logo, FR/EN switcher, GitHub link, dark/light toggle, menu hamburger mobile |
| `Footer.vue` | Projet + licence, data via API GitHub, créateur, bouton Contribuer |

## Pages

### `index.vue` — Page unique du classement

| État | Défaut | Rôle |
|---|---|---|
| `activeFilter` | `'tous'` | Filtre étudiant |
| `searchQuery` | `''` | Recherche |
| `visibleCount` | `10` | Pagination |

Logique : `filteredList` (filtre + recherche) → `displayedList` (slice) → grille ContributorCard.

## Contributeurs

### `ContributorCard.vue`

Props : `rank`, `name`, `pseudo`, `status`, `contributions`, `repos`, `stars`, `avatar?`

Lien cliquable vers GitHub. Avatar avec fallback gradient. Badge étudiant (vert) / contributeur (orange).

## UI génériques

| Composant | Props | Rôle |
|---|---|---|
| `RankBadge.vue` | — | Badge "Live" avec point orange pulsé |
| `SearchBar.vue` | `modelValue` | Champ recherche + loupe |
| `TabFilter.vue` | `modelValue` | Toggle coulissant Tous/Étudiants |
| `InfoBanner.vue` | — | Bannière info déroulante (critères, source, badge étudiant) |
