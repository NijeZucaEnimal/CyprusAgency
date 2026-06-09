export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Početna", href: "/" },
  { label: "Nekretnine", href: "/nekretnine" },
  { label: "Regioni", href: "/#regioni" },
  { label: "Blog", href: "/blog" },
  { label: "O nama", href: "/o-nama" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Nekretnine",
    items: [
      { label: "Sve nekretnine", href: "/nekretnine" },
      { label: "Kirenija (Girne)", href: "/nekretnine?grad=kirenija" },
      { label: "İskele", href: "/nekretnine?grad=iskele" },
      { label: "Famagusta", href: "/nekretnine?grad=famagusta" },
      { label: "Esentepe", href: "/nekretnine?grad=esentepe" },
      { label: "Lefke", href: "/nekretnine?grad=lefke" },
    ],
  },
  {
    title: "Agencija",
    items: [
      { label: "O nama", href: "/o-nama" },
      { label: "Naše usluge", href: "/#usluge" },
      { label: "Blog i vesti", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];
