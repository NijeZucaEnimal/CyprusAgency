import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { benefits } from "@/data/benefits";

export function WhyNorthernCyprus() {
  return (
    <Section id="zasto-severni-kipar" tone="default" size="lg">
      <SectionHeader
        eyebrow="Zašto baš Severni Kipar"
        title="Tržište koje je profitabilno već u prvoj godini"
        description="Spoj niskih cena, brzog rasta i pravnog okruženja koje štiti vlasnika. Evo zašto srpski kupci sve češće biraju upravo ovaj deo Mediterana."
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => (
          <Reveal key={benefit.id} delay={i * 0.05}>
            <article className="group h-full rounded-2xl border border-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-brand transition-transform group-hover:scale-105">
                <Icon name={benefit.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{benefit.title}</h3>
              <p className="mt-2.5 text-pretty text-sm text-ink-muted">
                {benefit.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
