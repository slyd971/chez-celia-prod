# Chez Célia Prod — Presskit

Presskit Next.js de Chez Célia Prod — Célia (@celia.sans.filtre), créatrice UGC et
consultante en stratégie digitale (chezceliaprod). Base : presskit Julia (même
stack, même DA sombre), avec des accents roses et des paillettes en fond.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Modifier le contenu

**Tout est dans [`content/celia.ts`](content/celia.ts)** : textes, KPIs,
compétences, vidéos, projet YouTube, marques, contact, navigation. Aucun besoin
de toucher aux composants.

- **KPIs** : `{ value, decimals, suffix, label }` pour un compteur animé, ou
  `{ display, label }` pour un texte fixe. `\n` dans `label` = retour à la ligne.
- **Vidéos** : ajouter ou retirer des items dans `videos.items`. La grille
  s'adapte (3 ou 4 colonnes).
- **Marques** : remplir `brands.items`. Tant que la liste est vide, des
  emplacements placeholder sont affichés.
- **YouTube** : tant que `youtube.cta.href` commence par `[À COMPLÉTER`, le
  bouton est affiché désactivé.

Ce qui reste à fournir est listé dans [`A_COMPLETER.md`](A_COMPLETER.md).

### Ajouter / remplacer un média

Les fichiers bruts sont dans `source-media/` (non publiés). Les versions web sont
dans `public/videos/` et `public/images/`. Commandes utilisées (ffmpeg) :

```bash
# Vidéo verticale (lecture au clic)
ffmpeg -i source.mp4 -vf scale=540:-2 -c:v libx264 -preset slow -crf 29 \
  -maxrate 850k -bufsize 1700k -pix_fmt yuv420p -c:a aac -b:a 96k \
  -movflags +faststart public/videos/nom.mp4
# Poster (image affichée avant lecture)
ffmpeg -ss 2 -i source.mp4 -frames:v 1 -vf scale=400:-2 -c:v libwebp -quality 74 public/images/poster-nom.webp
# Photo
ffmpeg -i photo.jpg -vf scale=720:-2 -c:v libwebp -quality 78 public/images/nom.webp
```

## Structure

```
app/
  layout.tsx            métadonnées SEO, polices, lang="fr"
  page.tsx              ordre des sections
  globals.css           tout le style (couleurs en variables dans :root)
  og-image.png/         image de partage 1200×630 générée au build
  favicon.png/, apple-touch-icon.png/   icônes générées au build
  robots.ts, sitemap.ts
components/
  Header (nav sticky + burger), Hero (vidéo plein écran), Stats (compteurs),
  Bio, Universe (concept + compétences), Videos (3-4 vidéos 9:16),
  Brands (logos / placeholders), YoutubeProject (vidéo 16:9), Contact, Footer,
  Glitter (paillettes canvas), RevealOnScroll (apparitions), icons
content/celia.ts        ← contenu éditable
lib/site-url.ts         domaine de production
public/images, public/videos   médias web
source-media/           médias bruts fournis (non publiés)
```

## Build & mise en ligne (export statique)

```bash
npm run build     # génère le dossier out/
```

Le dossier **`out/`** est un site 100 % statique : il suffit de l'envoyer sur
l'hébergement presskit.fr. Si le domaine final n'est pas
`https://chezceliaprod.presskit.fr`, définir `NEXT_PUBLIC_SITE_URL` (voir
`.env.local.example`) avant le build.

## Détails techniques

- **Sections claires / sombres** : ajouter `theme-light bg-cream` (beige) ou
  `theme-light bg-ivory` (ivoire) sur la `<section>` d'un composant pour la
  passer en clair. Actuellement : Bio, Vidéos, YouTube. Les couleurs s'adaptent
  toutes seules (variables redéfinies dans `.theme-light`, `globals.css`).
- **SEO** : title ≤ 60 car., description ≤ 160 car. et mots-clés dans
  `seo` (`content/celia.ts`) ; Open Graph `profile` + Twitter Card avec image
  JPEG 1200×630 (`/og-image.jpg`, ~55 Ko) ; données structurées schema.org
  (WebSite, ProfilePage, Person « Célia », Organization « Chez Célia Prod ») ;
  sitemap avec images, `robots.txt`, `manifest.webmanifest`.

- **Paillettes** : `<canvas>` fixe, `pointer-events: none`. Démarrage après le
  chargement de la page, pause quand l'onglet est caché, densité réduite sur
  mobile, plus dense sur le hero et le contact (`data-glitter="high"`),
  désactivé avec `prefers-reduced-motion`.
- **Hero** : la vidéo ne se charge qu'après l'événement `load` (le poster est
  affiché avant), pour ne pas pénaliser le premier affichage.
- **Accessibilité** : lien d'évitement, focus visibles, vidéos muettes par
  défaut, alternatives textuelles, contrastes AA sur fond `#171310`.
