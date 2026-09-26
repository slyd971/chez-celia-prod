# À compléter — presskit Chez Célia Prod

Tout se modifie dans [`content/celia.ts`](content/celia.ts). Les valeurs
manquantes y sont laissées vides (ou `null`) et repérées par un commentaire
« À COMPLÉTER PAR DAVID ». Tant qu'une valeur manque, l'élément est **masqué**
sur le site : aucun texte provisoire n'est jamais affiché.

Garde-fou : `npm run build` lance ensuite `scripts/check-placeholders.mjs`, qui
fait échouer le build si « À COMPLÉTER », « TODO » ou « lorem » apparaît dans le
HTML généré (`out/`).

## 1. Contenus à fournir

| Où | Champ dans `content/celia.ts` | Ce qu'il faut | En attendant |
|---|---|---|---|
| Projet YouTube | `youtube.cta.href` | URL de la série Beauty Maxing | Bouton « Voir sur YouTube » masqué. L'URL est aussi ajoutée automatiquement au `sameAs` du JSON-LD. |
| KPIs | `secondKpi` (au-dessus de `stats`) | KPI qui remplace « 1,15 M vues sur un seul Reel » (ex. nombre de collaborations ou de contenus livrés) | L'ancien KPI 1,15 M reste affiché. |

## 2. À valider

- **KPIs** : calculés à partir des 4 captures « Quelques résultats » du portfolio
  chezceliaprod.fr : 1 150 498 + 495 665 + 105 K + 64 K vues ≈ **1,8 M+**, meilleur
  Reel **1,15 M**, j'aime 18 K + 7,1 K + 3,1 K + 1,2 K ≈ **29 K+**. À confirmer.
- **Légendes des vidéos** : « Célia pour Afroboat / Afrogroovers / La Mif' »
  (déduites des noms de fichiers).

## 3. Médias (optionnel)

- **Vidéo hero en paysage** : la vidéo actuelle est en portrait (720×1280), donc
  recadrée et agrandie sur desktop. Une version 16:9 (1920×1080) rendrait mieux.

## 4. Décisions actées

- Nom et H1 : « Chez Célia Prod » ; handle @celia.sans.filtre (Instagram, TikTok).
- Domaine : `https://chezceliaprod.presskit.fr` (`lib/site-url.ts`) ; e-mail
  `contact@chezceliaprod.fr`.
- 3 vidéos, pas de 4ᵉ.
- Pas de section logos de marques.
- Pas de mention de l'âge (texte Beauty Maxing : « sa transformation »).
- Vidéo du projet YouTube affichée en 16:9, sans recadrage.
- **Community management** : exclu de toutes les sections, textes et meta.
- **Tarifs** : pas de bloc tarifs pour le moment.
- **Témoignages** : deux vrais avis existent dans la source (David de La Mif',
  Félin'Beauty). Non affichés ; à ajouter si Célia le souhaite.
