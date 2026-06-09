import { site } from "@/data/site";

/**
 * Organization + RealEstateAgent JSON-LD koji se ubacuje u root layout
 * — pomaže Google-u da prepozna agenciju u Knowledge Graph-u.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.office.address,
      addressLocality: site.office.city,
      addressCountry: "CY",
    },
    areaServed: [
      { "@type": "Place", name: "Kirenija (Girne)" },
      { "@type": "Place", name: "İskele" },
      { "@type": "Place", name: "Famagusta" },
      { "@type": "Place", name: "Esentepe" },
      { "@type": "Place", name: "Lefke" },
    ],
    sameAs: [
      `https://instagram.com/${site.instagram}`,
      `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
      `https://t.me/${site.telegram}`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
