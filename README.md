# Stay Property

Premium veb-sajt agencije za nekretnine na Severnom Kipru. Ciljana publika: srpski kupci.

## Tehnologija

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** + CSS varijable za brend (boje/radius/shadow)
- **Framer Motion** — fade-in, parallax, reveal animacije
- **React Three Fiber + drei + d3-geo** — interaktivna 3D mapa Kipra
- **React Hook Form + Zod** — kontakt forma
- **lucide-react** — ikone

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Sajt se podiže na [http://localhost:3000](http://localhost:3000).

## Skripte

| Komanda            | Šta radi                       |
| ------------------ | ------------------------------ |
| `npm run dev`      | Dev server sa hot reload       |
| `npm run build`    | Produkcijski build             |
| `npm run start`    | Pokreće build lokalno          |
| `npm run lint`     | ESLint provera                 |
| `npm run typecheck`| TypeScript provera (bez build) |

## Struktura

```
app/             Next.js App Router stranice
components/      UI, sekcije, 3D mapa
data/            Sav sadržaj (nekretnine, gradovi, blog, testimonials)
lib/             Tipovi, helperi, format
public/          Statika (slike, GeoJSON)
```

## Brend tokeni

Sve boje, radius i shadow vrednosti su CSS varijable u `app/globals.css` i izložene Tailwind klasama kroz `tailwind.config.ts`. Da promeniš brend, menjaj samo `:root` varijable.

| Token              | Vrednost                                  |
| ------------------ | ----------------------------------------- |
| `--color-ink`      | `#0B1F3A` — tamno teget tekst             |
| `--color-brand-500`| `#2A7EE6` — primarna brand plava          |
| `--color-sea`      | `#56B2E8` — svetlije plavo (3D more)      |
| `--color-sand`     | `#F5EFE6` — topla podloga za sekcije      |
| `--color-sun`      | `#F2A93B` — topli akcent                  |
| `--gradient-brand` | `sea → brand-500 → brand-700`             |

Tipografija: **Plus Jakarta Sans** (preko `next/font/google`).
