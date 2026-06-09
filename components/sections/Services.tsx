import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="usluge" tone="sand" size="lg">
      <SectionHeader
        eyebrow="Naše usluge"
        title="Sve na jednom mestu — od konsultacija do ključeva"
        description="Pratimo vas u svakom koraku, na srpskom jeziku, sa transparentnim cenama i bez skrivenih troškova."
        align="center"
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.05}>
            <article className="group h-full rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">{service.title}</h3>
                  <p className="mt-2 text-pretty text-sm text-ink-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
