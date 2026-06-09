import { Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section id="utisci" tone="surface" size="lg">
      <SectionHeader
        eyebrow="Utisci klijenata"
        title="Šta kažu naši srpski kupci"
        description="Stotine porodica je već našlo dom ili investiciju kroz nas. Evo nekoliko priča."
        align="center"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.08}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1" aria-label={`${t.rating} od 5 zvezdica`}>
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-sun text-sun" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty text-ink">
                „{t.text}"
              </blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">
                    {t.role} • {t.fromCity}
                  </p>
                </div>
                <Badge variant="outline" size="sm">
                  {t.bought}
                </Badge>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
