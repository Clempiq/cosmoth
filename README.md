# Cosmoth

Page d'accueil du studio Cosmoth : présentation du studio et liens vers ses jeux, Songe et Veille Noire.

En ligne : https://cosmoth.vercel.app

Site statique, sans build : `index.html` et le dossier `assets/` (images, polices, image de partage `og.jpg`). Vercel redéploie à chaque push sur `main`.

Pour tester en local : `npx serve .` puis ouvrir l'adresse affichée.

Pour ajouter un jeu : dupliquer une section `<section class="jeu">` dans `index.html`, ajouter ses images dans `assets/` et un lien dans le sommaire de l'accueil.
