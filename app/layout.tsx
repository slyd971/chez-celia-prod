import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { brand, contactInfo, seo } from "@/content/celia";
import { siteUrl } from "@/lib/site-url";
import { StructuredData } from "@/components/StructuredData";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// Image de partage générée au build (app/og-image.jpg/route.tsx)
const shareImage = {
  url: "/og-image.jpg",
  secureUrl: `${siteUrl}/og-image.jpg`,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: `${brand.name} — ${brand.tagline}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: brand.name,
  keywords: seo.keywords,
  authors: [{ name: seo.person.name, url: contactInfo.instagram.url }],
  creator: seo.person.name,
  publisher: brand.name,
  category: "Création de contenu UGC",
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Autorise les grands aperçus d'image / vidéo dans les résultats Google
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  // Numéros, e-mails et adresses : on garde nos propres liens (tel:, mailto:)
  formatDetection: { telephone: false, email: false, address: false },
  // Icônes générées au build (app/*.png/route.tsx) à partir de content/celia.ts
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    firstName: seo.person.givenName,
    username: contactInfo.instagram.label.replace("@", ""),
    locale: "fr_FR",
    url: siteUrl,
    siteName: brand.name,
    title: seo.title,
    description: seo.shareDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.shareDescription,
    images: [{ url: shareImage.url, alt: shareImage.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#171310",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bodoniModa.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition seulement si JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Passer au contenu
        </a>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
