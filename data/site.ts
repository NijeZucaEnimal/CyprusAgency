export const site = {
  name: "Stay Property",
  tagline: "Nekretnine na Severnom Kipru",
  description:
    "Premium agencija za kupovinu, prodaju i izdavanje nekretnina na Severnom Kipru. Konsultacije, pravna podrška i obilasci na srpskom jeziku.",
  url: "https://stayproperty.rs",
  locale: "sr-RS",
  email: "info@stayproperty.rs",
  phone: "+357 533 000 000",
  whatsapp: "+381641234567",
  telegram: "stayproperty",
  instagram: "stayproperty",
  office: {
    city: "Kirenija (Girne)",
    country: "Severni Kipar",
    address: "Sahil Yolu 12, Girne",
  },
} as const;

export type SiteConfig = typeof site;
