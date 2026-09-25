// Domaine de production du site, utilisé pour l'URL canonique, le sitemap,
// robots.txt et l'image de partage Open Graph. Surchargeable via la variable
// d'environnement NEXT_PUBLIC_SITE_URL (voir .env.local.example).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chez-celia-prod.presskit.fr";
