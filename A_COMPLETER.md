# À compléter — presskit Chez Célia Prod

Tout se modifie dans [`content/celia.ts`](content/celia.ts). Les placeholders
visibles sur le site commencent par `[À COMPLÉTER`.

## 1. Contenus manquants

| Où | Champ dans `content/celia.ts` | Ce qu'il faut |
|---|---|---|
| Projet YouTube | `youtube.cta.href` | Lien de la chaîne ou de la vidéo YouTube. Tant qu'il manque, le bouton « Voir sur YouTube » est affiché désactivé. |
| Marques | `brands.items` | Logos des marques (6 emplacements vides affichés pour l'instant). Déposer les logos (PNG fond transparent) dans `public/images/marques/` puis ajouter `{ name: "Mixa", logo: "/images/marques/mixa.png" }`. |

## 2. Médias à fournir par Célia

- **4ᵉ vidéo verticale** (optionnel) : le bloc vidéos en affiche 3 pour l'instant.
  Ajouter un item dans `videos.items` (vidéo dans `public/videos/`, poster dans
  `public/images/`). La grille passe automatiquement à 4 colonnes.
- **Vidéo hero en paysage** (optionnel, recommandé) : la vidéo actuelle est en
  portrait (720×1280). En plein écran sur desktop, elle est fortement recadrée et
  agrandie, donc un peu floue. Une version 16:9 (1920×1080) rendrait mieux.
- **Logos des marques** (voir ci-dessus).

## 3. Chiffres et liens à valider

- **KPIs** : calculés à partir des 4 captures « Quelques résultats » du portfolio
  chezceliaprod.fr : 1 150 498 + 495 665 + 105 K + 64 K vues ≈ **1,8 M+**, meilleur
  Reel **1,15 M**, j'aime 18 K + 7,1 K + 3,1 K + 1,2 K ≈ **29 K+**. À confirmer, ou
  à remplacer par des chiffres plus récents.
- **Légendes des vidéos** : « Célia pour Afroboat / Afrogroovers / La Mif' »
  (déduites des noms de fichiers). À valider.
- ~~Domaine~~ : confirmé, `https://chez-celia-prod.presskit.fr` (`lib/site-url.ts`).
- ~~Email~~ : confirmé, `contact@chezceliaprod.fr`.
- ~~Nom~~ : confirmé, « Chez Célia Prod » (le lien Instagram reste `@celia.sans.filtre`).

## 4. Volontairement absent

- **Community management** : exclu de toutes les sections (demande de Célia),
  même si le portfolio source le mentionne.
- **Tarifs** (UGC dès 200 €, offre à 850 € dans la source) : pas de bloc tarifs pour
  le moment.
- **Témoignages** : deux vrais avis existent dans la source (David de La Mif',
  Félin'Beauty). Ils ne sont pas affichés ; à ajouter si Célia le souhaite.
