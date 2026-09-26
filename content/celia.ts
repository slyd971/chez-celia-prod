// Tout le contenu du presskit est centralisé ici : textes, chiffres, chemins
// des photos / vidéos, liens et contact. Modifiez ce fichier pour mettre à
// jour le site sans toucher aux composants React (dossier components/).
//
// ⚠️ Les valeurs manquantes sont laissées vides (ou null) et signalées par un
// commentaire « À COMPLÉTER » : l'élément correspondant est alors masqué.
// Elles sont listées dans A_COMPLETER.md à la racine du projet.

export const brand = {
  name: "Chez Célia Prod",
  handle: "@celia.sans.filtre",
  tagline: "Créatrice UGC · Consultante en stratégie digitale",
  // Signature affichée dans le bloc contact
  signature: [
    "Consultante en stratégie digitale",
    "Créatrice d'expériences",
    "chezceliaprod",
  ],
};

export const seo = {
  // Portrait (JPEG) utilisé dans l'image de partage générée (app/og-image.jpg)
  shareImagePhoto: "/images/celia-og.jpg",
  // ≤ 60 caractères (affiché en entier dans Google)
  title: "Chez Célia Prod · Créatrice UGC & stratégie digitale",
  // ≤ 160 caractères (au-delà, Google tronque)
  description:
    "Presskit de Célia, créatrice UGC et consultante en stratégie digitale : vidéos authentiques, chiffres clés et contact pour vos collaborations de marque.",
  // Texte plus long pour les aperçus de partage (Open Graph / réseaux)
  shareDescription:
    "Célia (@celia.sans.filtre) crée des contenus UGC authentiques pour capter l'attention, engager votre audience et marquer les esprits. Presskit, vidéos et contact.",
  keywords: [
    "Chez Célia Prod",
    "chezceliaprod",
    "Célia",
    "celia.sans.filtre",
    "créatrice UGC",
    "UGC",
    "contenu UGC",
    "vidéo UGC",
    "créatrice de contenu",
    "stratégie digitale",
    "consultante stratégie digitale",
    "création d'expériences",
    "presskit",
    "collaboration de marque",
  ],
  // Personne réelle derrière la marque (données structurées schema.org)
  person: {
    givenName: "Célia",
    name: "Célia",
    jobTitle: "Créatrice UGC & consultante en stratégie digitale",
  },
};

export const contactInfo = {
  email: "contact@chezceliaprod.fr",
  phoneDisplay: "+33 6 52 91 04 27",
  phoneHref: "tel:+33652910427",
  // Lien WhatsApp (numéro au format international, sans + ni espaces).
  // `message` pré-remplit la conversation ; le texte est encodé automatiquement.
  whatsapp: {
    number: "33652910427",
    message: "Bonjour Célia, je vous contacte depuis votre presskit Chez Célia Prod au sujet d'une collaboration.",
    label: "WhatsApp",
    get url() {
      // encodeURIComponent ne code pas l'apostrophe : on la code aussi (%27)
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message).replace(/'/g, "%27")}`;
    },
  },
  instagram: {
    url: "https://www.instagram.com/celia.sans.filtre/",
    label: "@celia.sans.filtre",
  },
  tiktok: {
    url: "https://www.tiktok.com/@celia.sans.filtre",
    label: "@celia.sans.filtre",
  },
};

export const hero = {
  video: "/videos/celia-hero.mp4",
  poster: "/images/hero-poster.webp",
  eyebrow: "Créatrice UGC · Stratégie digitale",
  punchline: "Des contenus authentiques pour capter l'attention et marquer les esprits.",
  ctas: [
    { label: "Me contacter", href: "#contact", variant: "primary" },
    { label: "Voir mes vidéos", href: "#videos", variant: "ghost" },
  ],
};

// Compteurs animés. `value` est le nombre animé, `decimals` le nombre de
// décimales affichées, `suffix` le texte collé après le nombre.
// Pour un chiffre inconnu, utilisez `display` (texte affiché tel quel).
export type Stat =
  | { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }
  | { display: string; label: string };

// À COMPLÉTER PAR DAVID : KPI qui remplace « 1,15 M vues sur un seul Reel »
// (ex. nombre de collaborations ou de contenus livrés). Exemple :
//   { value: 40, suffix: "+", label: "Contenus\nlivrés" }
// Tant que la valeur est null, l'ancien KPI reste affiché.
const secondKpi: Stat | null = null;

export const stats: Stat[] = [
  // Source : captures « Quelques résultats » de chezceliaprod.fr/portfolio
  // (1 150 498 + 495 665 + 105 K + 64 K vues)
  { value: 1.8, decimals: 1, suffix: " M+", label: "Vues cumulées\nsur 4 Reels" },
  secondKpi ?? { value: 1.15, decimals: 2, suffix: " M", label: "Vues sur\nun seul Reel" },
  // 18 K + 7,1 K + 3,1 K + 1,2 K
  { value: 29, suffix: " K+", label: "J'aime cumulés\nsur ces 4 Reels" },
  // Communiqué par Célia (sept. 2026)
  { value: 11.5, decimals: 1, suffix: " K", label: "Abonnés\nInstagram" },
];

export const bio = {
  eyebrow: "Qui suis-je ?",
  title: "Passionnée, engagée… et sans filtre",
  photo: {
    src: "/images/celia-bio.webp",
    alt: "Portrait de Célia, créatrice UGC — Chez Célia Prod",
    width: 720,
    height: 960,
  },
  paragraphs: [
    "Je suis Célia, consultante en stratégie digitale et créatrice UGC. Passionnée et engagée, j'accompagne les entreprises qui veulent transformer leur image et booster leur présence en ligne.",
    "Mon objectif : aider les marques à se démarquer, optimiser leur visibilité et créer une connexion authentique avec leur audience.",
    "En tant que créatrice UGC, je réalise des vidéos et des visuels authentiques qui mettent en valeur les produits et services de manière naturelle et impactante, pour capter l'attention et générer de l'engagement.",
  ],
  signature: "Célia",
};

export const universe = {
  eyebrow: "Univers",
  title: "Ma façon de travailler",
  intro:
    "L'UGC, c'est ce contenu qui semble façonné par vos clients, mais qui est en réalité conçu par une professionnelle. Un format parfait pour donner une âme authentique à votre marque et séduire votre audience.",
  pillars: [
    {
      title: "Authenticité",
      text: "Un contenu qui capture l'essence de la vie réelle et tisse une connexion naturelle avec vos clients.",
    },
    {
      title: "Engagement",
      text: "Votre audience se sent plus proche de votre marque et s'investit davantage.",
    },
    {
      title: "Crédibilité",
      text: "Un style spontané qui inspire confiance et attire toujours plus de clients.",
    },
  ],
  valuesTitle: "Mes valeurs",
  skillsTitle: "Domaines de compétences",
  skills: [
    {
      label: "Stratégie digitale",
      text: "Des stratégies sur mesure pour élever votre visibilité et optimiser votre présence en ligne.",
    },
    {
      label: "Vidéos UGC",
      text: "Des vidéos authentiques et engageantes qui mettent en valeur vos produits et services.",
    },
    {
      label: "Photos & mises en scène",
      text: "Des visuels soignés et des mises en scène de vos produits et services.",
    },
    {
      label: "Contenu optimisé réseaux",
      text: "Des formats pensés pour les réseaux sociaux, qui attirent, inspirent et convertissent.",
    },
    {
      label: "Création d'expériences",
      text: "Des concepts événementiels uniques pour capter l'attention et marquer les esprits.",
    },
    {
      label: "Image de marque",
      text: "Affiner votre identité digitale en mettant en lumière vos valeurs et votre expertise.",
    },
  ],
};

export const videos = {
  eyebrow: "Vidéos",
  title: "Exemples de contenus UGC",
  intro: "Format vertical, prêt pour les Reels. Cliquez sur une vidéo pour la lancer, le son s'active avec l'icône haut-parleur.",
  items: [
    {
      src: "/videos/celia-pour-afroboat.mp4",
      poster: "/images/poster-afroboat.webp",
      caption: "Célia pour Afroboat",
    },
    {
      src: "/videos/celia-pour-afrogroovers.mp4",
      poster: "/images/poster-afrogroovers.webp",
      caption: "Célia pour Afrogroovers",
    },
    {
      src: "/videos/celia-pour-la-mif.mp4",
      poster: "/images/poster-la-mif.webp",
      caption: "Célia pour La Mif'",
    },
  ],
  cta: {
    label: "Voir plus de vidéos sur Instagram",
    href: "https://www.instagram.com/celia.sans.filtre/",
  },
};

// La vidéo est en paysage (16:9) : elle est affichée dans son ratio d'origine,
// sans recadrage.
export const youtube = {
  eyebrow: "Projet YouTube",
  // Texte fourni par Célia (25/09/2026), sans mention de l'âge
  title: "Beauty Maxing",
  description:
    "Beauty Maxing est une série digitale dans laquelle Célia documente pendant six mois sa transformation. Bien au-delà d'un simple glow up, elle part à la découverte de ce qui lui correspond réellement : beauté, style, coiffure, sport, bien-être, confiance en soi et nouvelles expériences. Accompagnée de professionnels, d'experts et de marques, elle teste, apprend et partage son évolution sans filtre sur YouTube, TikTok et Instagram, jusqu'à son bilan final en mars 2027.",
  video: "/videos/video-projet-youtube.mp4",
  poster: "/images/poster-projet-youtube.webp",
  width: 848,
  height: 480,
  cta: {
    label: "Voir sur YouTube",
    // À COMPLÉTER PAR DAVID : URL de la série Beauty Maxing. Tant que la
    // valeur est vide, le bouton n'est pas affiché.
    href: "",
  },
};

export const contact = {
  eyebrow: "Collaborations & contact",
  title: "Travaillons ensemble !",
  description:
    "Je crée des stratégies et des concepts uniques pour donner à votre marque une présence impactante. J'ai hâte de discuter avec vous !",
  photo: {
    src: "/images/celia-contact.webp",
    alt: "Célia, souriante, prête pour votre prochaine collaboration",
    width: 720,
    height: 960,
  },
  cta: "M'écrire",
};

// Utilisé par le header (desktop + mobile) et le footer.
export const navLinks = [
  { label: "Bio", href: "#bio" },
  { label: "Univers", href: "#univers" },
  { label: "Vidéos", href: "#videos" },
  { label: "YouTube", href: "#youtube" },
  { label: "Contact", href: "#contact" },
];

export const footer = {
  credit: { label: "Presskit réalisé par presskit.fr", href: "https://presskit.fr" },
};
