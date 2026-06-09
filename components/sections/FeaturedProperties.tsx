import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getFeaturedProperties } from "@/data/properties";

export function FeaturedProperties() {
  const featured = getFeaturedProperties();

  return (
    <Section id="istaknute-nekretnine" tone="surface" size="lg">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Istaknuto"
          title="Pažljivo odabrane nekretnine"
          description="Naš tim svake nedelje selektuje projekte sa najboljim odnosom cene i potencijala rasta. Svi imaju rate bez kamate."
        />
        <Button href="/nekretnine" variant="secondary" size="md" className="shrink-0">
          Sve nekretnine <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((property, i) => (
          <Reveal key={property.slug} delay={(i % 3) * 0.08}>
            <PropertyCard property={property} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
