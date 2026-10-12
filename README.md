# Cosmoth

Site du studio Cosmoth : présentation du studio et liens vers ses jeux, Songe, Veille Noire et Royaume de Poche. En français, anglais et espagnol.

En ligne : https://cosmoth.vercel.app (anglais : /en/, espagnol : /es/)

## Modifier le site

Les pages ne s'éditent pas directement : elles sont générées.

- `src/page.html` : le gabarit commun (mise en page, styles, animation)
- `src/i18n.json` : tous les textes, en `fr`, `en` et `es`
- `scripts/build-pages.mjs` : génère `index.html`, `en/index.html`, `es/index.html`, `sitemap.xml` et `robots.txt`

Après une modification : `node scripts/build-pages.mjs`, puis commit et push. Vercel redéploie à chaque push sur `main` (site statique, sans build côté Vercel).

Pour tester en local : `npx serve .` puis ouvrir l'adresse affichée.

## Le jour du nom de domaine

Remplacer `https://cosmoth.vercel.app` par le nouveau domaine dans `scripts/build-pages.mjs` (constante `SITE`), relancer le script, puis ajouter le domaine dans Vercel.
