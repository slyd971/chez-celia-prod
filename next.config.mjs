/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique (dossier out/) pour l'hébergement presskit.fr.
  output: "export",
  trailingSlash: true,
  images: {
    // L'export statique n'a pas de serveur d'optimisation d'images : les
    // photos de public/images sont déjà redimensionnées et compressées.
    unoptimized: true,
  },
};

export default nextConfig;
