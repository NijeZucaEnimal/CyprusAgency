import type { City } from "@/lib/types";

export const cities: City[] = [
  {
    slug: "kirenija",
    name: "Kirenija",
    localName: "Girne",
    coords: { lng: 33.3192, lat: 35.3413 },
    description:
      "Najpoznatija destinacija severnog Kipra — istorijska luka, planine iza leđa i more pred očima.",
    longDescription:
      "Kirenija (Girne) je srce severnog Kipra: stara venecijanska luka, srednjovekovna tvrđava, restorani uz more i šetalište koje vodi kroz najlepše delove obale. Iza grada se uzdiže planinski venac Beşparmak, što čini Kireniju jedinstvenom — između mora i planina. Većina projekata sa visokim povratom investicije nalazi se baš ovde.",
    fromPrice: 95000,
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Stara luka i venecijanska tvrđava",
      "Planinski venac Beşparmak",
      "Najveći izbor restorana i kafića",
      "Najlikvidnije tržište nekretnina",
    ],
  },
  {
    slug: "iskele",
    name: "İskele",
    localName: "İskele / Trikomo",
    coords: { lng: 33.8951, lat: 35.2848 },
    description:
      "Najbrže rastući region — Long Beach plaža od 30 km, novi luksuzni kompleksi i najviši povrat ulaganja.",
    longDescription:
      "İskele je regija sa najbržim rastom cena nekretnina poslednjih 5 godina. Long Beach plaža od preko 30 km, pesak boje zlata i bistra voda privukli su velike developere koji ovde grade nove kompleksne sa bazenima, akva parkovima i privatnim šetalištem. Idealno za rentiranje kratkog boravka i kapitalnu apresijaciju.",
    fromPrice: 75000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Long Beach — peščana plaža 30+ km",
      "Najviši rast cena (15–20% godišnje)",
      "Novi turistički kompleksi i resorti",
      "Idealno za kratkoročno rentiranje",
    ],
  },
  {
    slug: "famagusta",
    name: "Famagusta",
    localName: "Gazimağusa",
    coords: { lng: 33.9389, lat: 35.1264 },
    description:
      "Univerzitetski grad sa istorijskim starim jezgrom i pristupačnim cenama — odlično za rentiranje studentima.",
    longDescription:
      "Famagusta (Gazimağusa) kombinuje srednjovekovni gradski zid, ostatke crkava i palata sa modernim univerzitetom EMU. Veliki broj inostranih studenata znači stabilnu tražnju za rentiranjem tokom cele godine. Cene su pristupačnije nego u Kireniji, a planovi razvoja Varosha-e (preuzimanje napuštenih obalnih zona) najavljuju snažan rast.",
    fromPrice: 65000,
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "EMU univerzitet — 20.000+ studenata",
      "Najpristupačnije cene m²",
      "Plan razvoja Varosha-e",
      "Stabilan prihod od izdavanja",
    ],
  },
  {
    slug: "esentepe",
    name: "Esentepe",
    localName: "Esentepe",
    coords: { lng: 33.575, lat: 35.3478 },
    description:
      "Mirno priobalje između Kirenije i İskele — golf, vile sa pogledom na more i mediteranska tišina.",
    longDescription:
      "Esentepe je oaza mira između Kirenije i İskele. Region je poznat po Korineum Golf klubu, ekskluzivnim vilama sa privatnim bazenima i panoramskim pogledom na more i planine. Idealno za penzionere, porodice i sve koji traže privatnost bez izolacije.",
    fromPrice: 110000,
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Korineum Golf klub",
      "Vile sa privatnim bazenima",
      "Panoramski pogled na more",
      "Najmirniji obalni region",
    ],
  },
  {
    slug: "lefke",
    name: "Lefke",
    localName: "Lefke",
    coords: { lng: 32.8466, lat: 35.1131 },
    description:
      "Skriveni dragulj severozapadnog Kipra — citrusovi gajevi, prazne plaže i najpristupačnije cene.",
    longDescription:
      "Lefke je još uvek neoktrivena destinacija severozapadnog Kipra — region poznat po citrusovim gajevima, zelenilu i autentičnoj kiparskoj atmosferi. Najpristupačnije cene na ostrvu, ali sa velikim potencijalom kako se razvojni planovi šire prema zapadu. Idealno za one koji žele autentičan život i bekstvo od turističkih masa.",
    fromPrice: 55000,
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Najniže cene na ostrvu",
      "Autentični kiparski život",
      "Citrusovi gajevi i zelenilo",
      "Prazne, prirodne plaže",
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
