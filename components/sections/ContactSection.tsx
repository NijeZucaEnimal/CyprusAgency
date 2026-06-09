import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export function ContactSection() {
  return (
    <Section id="kontakt" tone="sky" size="lg">
      <SectionHeader
        eyebrow="Kontakt"
        title="Hajde da pričamo o vašem prvom domu na suncu"
        description="Pošaljite poruku, javićemo se u toku 24h. Ili nas pozovite, pišite na WhatsAppu — kako vam odgovara."
        align="center"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        {/* Forma */}
        <Reveal className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </Reveal>

        {/* Bočni info panel */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="grid gap-4">
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              subtitle="Najbrži način — odgovor u nekoliko minuta"
              actionLabel="Otvori WhatsApp"
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              accent="emerald"
            />
            <ContactCard
              icon={<Send className="h-5 w-5" />}
              title="Telegram"
              subtitle="Za one koji preferiraju Telegram"
              actionLabel="Otvori Telegram"
              href={`https://t.me/${site.telegram}`}
              accent="brand"
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Telefon"
              subtitle={site.phone}
              actionLabel="Pozovi"
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              accent="ink"
            />
            <ContactCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              subtitle={site.email}
              actionLabel="Pošalji email"
              href={`mailto:${site.email}`}
              accent="ink"
            />

            <div className="mt-2 flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <div>
                <p className="font-bold text-ink">Naša kancelarija</p>
                <p className="mt-0.5 text-ink-muted">
                  {site.office.address}
                  <br />
                  {site.office.city}, {site.office.country}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
  actionLabel,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  actionLabel: string;
  href: string;
  accent: "emerald" | "brand" | "ink";
}) {
  const accentMap = {
    emerald: "bg-emerald-50 text-emerald-700",
    brand: "bg-brand-50 text-brand-700",
    ink: "bg-surface text-ink",
  };
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm"
    >
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accentMap[accent]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-ink">{title}</p>
        <p className="text-sm text-ink-muted">{subtitle}</p>
      </div>
      <span className="text-sm font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        {actionLabel} →
      </span>
    </a>
  );
}
