import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cities } from "@/data/cities";
import { formatFromEur } from "@/lib/format";

export function Regions() {
  return (
    <Section id="regioni" tone="default" size="lg">
      <SectionHeader
        eyebrow="Gde da kupite"
        title="5 regiona Severnog Kipra"
        description="Svaki region ima svoj karakter i tip ulaganja. Pomažemo vam da nađete onaj koji odgovara vašim ciljevima."
        align="center"
      />

      <div className="mt-14 grid auto-rows-[16rem] grid-cols-1 gap-4 md:auto-rows-[22rem] md:grid-cols-6">
        {cities.map((city, i) => {
          // Bento layout: Kirenija (najveća), İskele i Esentepe (srednje), Famagusta i Lefke (manje)
          const spans = [
            "md:col-span-3 md:row-span-2",  // Kirenija
            "md:col-span-3 md:row-span-1",  // İskele
            "md:col-span-2 md:row-span-1",  // Famagusta
            "md:col-span-2 md:row-span-1",  // Esentepe
            "md:col-span-2 md:row-span-1",  // Lefke
          ];

          return (
            <Reveal key={city.slug} delay={i * 0.06} className={spans[i] ?? ""}>
              <Link
                href={`/nekretnine?grad=${city.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-brand-500"
              >
                <Image
                  src={city.image}
                  alt={`${city.name} — ${city.description}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient za čitljivost */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink shadow-md transition-transform group-hover:scale-110 group-hover:bg-sun">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                    Region
                  </p>
                  <h3 className="mt-1 text-2xl font-bold leading-tight">
                    {city.name}
                    {city.localName && city.localName !== city.name && (
                      <span className="ml-1.5 text-base font-medium text-white/80">
                        ({city.localName})
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/85">
                    {city.description}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    Nekretnine {formatFromEur(city.fromPrice)}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
