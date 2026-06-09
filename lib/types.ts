export type CitySlug =
  | "kirenija"
  | "iskele"
  | "famagusta"
  | "esentepe"
  | "lefke";

export type PropertyType =
  | "studio"
  | "1+1"
  | "2+1"
  | "3+1"
  | "vila"
  | "penthouse";

export type PropertyStatus = "u-prodaji" | "rezervisano" | "prodato";

export type City = {
  slug: CitySlug;
  name: string;
  /** Lokalno/tursko ime grada */
  localName?: string;
  /** Geo koordinate (lng, lat) — koriste se u 3D mapi */
  coords: { lng: number; lat: number };
  /** Pozicija kartice na 3D mapi pri hoveru (relativna ofset) */
  cardOffset?: { x: number; y: number };
  /** Kratak SEO opis grada */
  description: string;
  /** Duži opis za regions stranicu / detalj */
  longDescription?: string;
  /** Početna cena nekretnine u € */
  fromPrice: number;
  /** Glavna slika regiona */
  image: string;
  /** Šta krasi region (ikone) */
  highlights: string[];
};

export type Property = {
  slug: string;
  title: string;
  city: CitySlug;
  type: PropertyType;
  status: PropertyStatus;
  /** Cena u € */
  price: number;
  /** Površina u m² */
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  /** Udaljenost od mora u metrima */
  distanceToSea: number;
  /** Godina završetka (npr. 2026) */
  completionYear?: number;
  /** Da li je istaknuta na početnoj */
  featured?: boolean;
  /** Da li ima rate bez kamate */
  interestFreePlan?: boolean;
  /** Kratak opis za kartice */
  shortDescription: string;
  /** Pun opis */
  description: string;
  /** Glavna slika */
  image: string;
  /** Dodatne slike za galeriju */
  gallery: string[];
  /** Karakteristike (bazen, pogled, klima, itd.) */
  features: string[];
  /** Plan plaćanja */
  paymentPlan?: {
    downPayment: number;
    installments: number;
    note: string;
  };
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  /** Grad gde živi klijent */
  fromCity: string;
  /** Tip kupljene nekretnine */
  bought: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** URL avatara (opciono) */
  avatar?: string;
};

export type Service = {
  id: string;
  /** Naziv ikone iz lucide-react */
  icon: string;
  title: string;
  description: string;
};

export type Stat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
};

export type Benefit = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown-like sadržaj (paragrafi razdvojeni praznim linijama) */
  content: string;
  /** ISO datum */
  publishedAt: string;
  author: string;
  category: "Vodič" | "Vesti" | "Poređenje" | "Investicije";
  image: string;
  readingMinutes: number;
};
