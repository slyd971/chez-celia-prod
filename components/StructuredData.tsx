import { bio, brand, contact, contactInfo, seo, universe, youtube } from "@/content/celia";
import { siteUrl } from "@/lib/site-url";

// Données structurées schema.org : Célia (Person), qui travaille pour
// Chez Célia Prod (Organization), présentées par une ProfilePage.
export function StructuredData() {
  const url = `${siteUrl}/`;
  const ids = {
    website: `${url}#website`,
    page: `${url}#profile`,
    person: `${url}#celia`,
    org: `${url}#organization`,
  };
  const telephone = contactInfo.phoneHref.replace("tel:", "");
  // Profils officiels ; YouTube seulement une fois le lien renseigné
  const sameAs = [contactInfo.instagram.url, contactInfo.tiktok.url, youtube.cta.href].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url,
        name: brand.name,
        description: seo.description,
        inLanguage: "fr-FR",
        publisher: { "@id": ids.org },
      },
      {
        "@type": "ProfilePage",
        "@id": ids.page,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: "fr-FR",
        isPartOf: { "@id": ids.website },
        mainEntity: { "@id": ids.person },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: seo.person.name,
        givenName: seo.person.givenName,
        alternateName: brand.handle,
        url,
        jobTitle: seo.person.jobTitle,
        description: bio.paragraphs[0],
        image: [`${siteUrl}${bio.photo.src}`, `${siteUrl}${contact.photo.src}`],
        email: contactInfo.email,
        telephone,
        knowsAbout: universe.skills.map((skill) => skill.label),
        knowsLanguage: "fr",
        worksFor: { "@type": "Organization", "@id": ids.org, name: brand.name },
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": ids.org,
        name: brand.name,
        alternateName: "chezceliaprod",
        url,
        logo: `${siteUrl}/apple-touch-icon.png`,
        email: contactInfo.email,
        telephone,
        founder: { "@id": ids.person },
        sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Collaborations et presse",
          email: contactInfo.email,
          telephone,
          availableLanguage: "French",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
