# Contribuer à Maké

Merci de vouloir contribuer ! Voici comment participer.

## Signaler un bug ou suggérer une idée

Ouvre une [issue](https://github.com/YaogoGerard/Make/issues) avec :
- Une description claire du problème ou de la suggestion
- Les étapes pour reproduire un bug
- Des captures d'écran si pertinent

## Proposer du code

1. **Fork** le repo
2. **Crée une branche** : `git checkout -b ma-modification`
3. **Fais tes changements** en respectant le style du code (pas de commentaires superflus, pas d'emojis)
4. **Teste** : `npm run generate` doit passer sans erreur
5. **Commit** avec un message clair (ex: `fix: rate limit retry on 429`)
6. **Push** et **ouvre une Pull Request** vers `main`

## Conventions

- Le code suit le style existant (ESM, TypeScript, composition API)
- Les commits sont en anglais, préfixés par type (`feat:`, `fix:`, `docs:`, etc.)
- Pas de commentaires dans le code sauf si nécessaire
- Les traductions vont dans `i18n/locales/`

## Déploiement

Le site est auto-déployé sur GitHub Pages via GitHub Actions. Toute PR mergée sur `main` déclenche une nouvelle génération et un déploiement.
