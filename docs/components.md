# Catalogue de Composants — Maké

> Inventaire des composants Vue du projet, leur rôle et leur interface.

---

## Layout

### Header (`app/components/layout/Header.vue`)

Barre de navigation fixe (z-50) avec verre dépoli.

| Slot/Prop | Type | Description |
|---|---|---|
| — | — | Pas de props. Lit `useI18n()` et `useColorMode()` |

**Éléments :**
- Logo Maké (lien vers l'accueil)
- Sélecteur de langue FR/EN (indicateur orange souligné)
- Lien GitHub (icône)
- Toggle dark/light mode
- Menu hamburger mobile avec dropdown

---

### Footer (`app/components/layout/Footer.vue`)

Pied de page avec pastilles en verre dépoli.

| Slot/Prop | Type | Description |
|---|---|---|
| — | — | Pas de props. Tout le texte via `$t()` |

**Éléments :**
- Nom du projet + licence MIT
- Lien "Données via API GitHub"
- Lien créateur `@YaogoGerard`
- Bouton Contribuer

---

## Pages

### Index (`app/pages/index.vue`)

Page principale unique (classement).

| État interne | Type | Défaut |
|---|---|---|
| `activeFilter` | `string` | `'tous'` |
| `searchQuery` | `string` | `''` |
| `visibleCount` | `number` | `10` |

**Logique :**
- `filteredList` : applique le filtre étudiant + la recherche
- `displayedList` : slice de `filteredList` limité à `visibleCount`
- `totalContribs` : somme des contributions filtrées
- Réinitialisation de `visibleCount` au changement de filtre

---

## Contributeurs

### ContributorCard (`app/components/contributor/ContributorCard.vue`)

Carte individuelle d'un contributeur.

| Prop | Type | Requis |
|---|---|---|
| `rank` | `number` | Oui |
| `name` | `string` | Oui |
| `pseudo` | `string` | Oui |
| `status` | `string` | Oui |
| `contributions` | `number` | Oui |
| `repos` | `number` | Oui |
| `stars` | `number` | Oui |
| `avatar` | `string` (optionnel) | Non |

**Comportement :** Lien cliquable vers le profil GitHub. Avatar avec fallback (cercle gradient + rank). Badge de statut (vert étudiant / orange contributeur).

---

## UI (composants génériques)

### RankBadge (`app/components/ui/RankBadge.vue`)

Badge "Live" avec point orange pulsé.

| Prop | Type | Description |
|---|---|---|
| — | — | Aucune. Composé d'un texte et d'une animation CSS `animate-glow-pulse` |

---

### SearchBar (`app/components/ui/SearchBar.vue`)

Champ de recherche avec icône loupe.

| Prop | Type | Description |
|---|---|---|
| `modelValue` | `string` | Valeur liée (v-model) |
| Emit `update:modelValue` | `string` | Mis à jour à chaque saisie |

---

### TabFilter (`app/components/ui/TabFilter.vue`)

Filtre à bascule coulissant (Tous / Étudiants).

| Prop | Type | Description |
|---|---|---|
| `modelValue` | `string` | Valeur liée (v-model) |
| Emit `update:modelValue` | `string` | Mis à jour au clic |

**Animation :** Indicateur orange gradient qui glisse avec `translate-x-full`, transition 700ms.

---

### InfoBanner (`app/components/ui/InfoBanner.vue`)

Bannière d'information déroulante.

| Prop | Type | Description |
|---|---|---|
| — | — | État interne `open` (toggle) |

**Contenu :**
- Critères de classement
- Source des données
- Comment obtenir le badge étudiant
