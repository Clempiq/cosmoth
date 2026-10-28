# Cosmoth

> Le site vitrine de mon studio de jeux indépendant, qui présente et relie ses jeux : Songe, Veille Noire et Royaume de Poche.

**Site :** [cosmoth.vercel.app](https://cosmoth.vercel.app) (anglais : `/en/`, espagnol : `/es/`)

## Le problème

Mes jeux étaient chacun sur leur propre adresse, sans lien entre eux ni identité commune. Un joueur qui découvrait l'un ne trouvait pas les autres, et il manquait une page présentable à partager.

**Pour qui :** les joueurs qui découvrent un des jeux, et toute personne (partenaire, recruteur) qui veut voir l'ensemble en un coup d'œil.

## Fonctionnalités clés

- **Présentation du studio et de ses trois jeux**, avec liens directs pour jouer.
- **Trois langues** (français, anglais, espagnol), chacune avec sa propre URL.
- **Pages générées** à partir d'un gabarit unique et d'un fichier de textes : un seul endroit à modifier.
- **SEO de base** : `sitemap.xml` et `robots.txt` générés automatiquement.
- **Polices auto-hébergées** et images optimisées (WebP).

## Stack

| Catégorie | Technologie |
|---|---|
| Site | HTML et CSS, généré par un script Node.js |
| Textes | `src/i18n.json` (`fr`, `en`, `es`) |
| Déploiement | Vercel (site statique, sans build côté Vercel) |

## Modifier le site

Les pages ne s'éditent pas directement : elles sont générées.

- `src/page.html` : le gabarit commun (mise en page, styles, animation)
- `src/i18n.json` : tous les textes, en `fr`, `en` et `es`
- `scripts/build-pages.mjs` : génère `index.html`, `en/index.html`, `es/index.html`, `sitemap.xml` et `robots.txt`

Après une modification : `node scripts/build-pages.mjs`, puis commit et push. Vercel redéploie à chaque push sur `main`.

Pour tester en local : `npx serve .` puis ouvrir l'adresse affichée.

### Le jour du nom de domaine

Remplacer `https://cosmoth.vercel.app` par le nouveau domaine dans `scripts/build-pages.mjs` (constante `SITE`), relancer le script, puis ajouter le domaine dans Vercel.

## Statut

✅ **En ligne.** Prochaine étape : un nom de domaine dédié au studio.

## Ce que j'ai appris

- **Construire une identité commune** à plusieurs produits plutôt que de les présenter isolément.
- **Séparer contenu et mise en page** pour traduire et faire évoluer le site sans dupliquer le code.
- **Choisir l'outil le plus simple qui suffit** : un petit script de génération plutôt qu'un framework complet.
