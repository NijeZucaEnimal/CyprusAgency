export const site = {
  name: "Kismet Real Estate",
  tagline: "Nekretnine na Severnom Kipru",
  description:
    "Premium agencija za kupovinu, prodaju i izdavanje nekretnina na Severnom Kipru. Konsultacije, pravna podrška i obilasci na srpskom jeziku.",
  url: "https://kismetrealestate.rs",
  locale: "sr-RS",
  email: "info@kismetrealestate.rs",
  phone: "+357 533 000 000",
  whatsapp: "+381641234567",
  telegram: "kismetrealestate",
  instagram: "kismetrealestate",
  office: {
    city: "Kirenija (Girne)",
    country: "Severni Kipar",
    address: "Sahil Yolu 12, Girne",
  },
} as const;

export type SiteConfig = typeof site;
