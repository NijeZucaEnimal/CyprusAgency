import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { ArrowRight, Heart, MessageSquare, Languages } from "lucide-react";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Stay Property je agencija specijalizovana za srpske kupce nekretnina na Severnom Kipru — sa preko 20 godina iskustva i timom koji govori vaš jezik.",
  alternates: { canonical: "/o-nama" },
};

const values = [
  {
    icon: "ShieldCheck",
    title: "Bez skrivenih troškova",
    body: "Pre potpisa znate svaki cent — agencijsku proviziju, porez, notarske troškove, sve.",
  },
  {
    icon: "Languages",
    title: "Sve na srpskom",
    body: "Konsultacije, ugovori, prevodi i poslepradajna podrška — bez prevodilaca.",
  },
  {
    icon: "Heart",
    title: "Briga i posle prodaje",
    body: "Pomoć oko struje, vode, interneta, dozvole boravka — uđemo u svaki detalj.",
  },
  {
    icon: "MessageSquare",
    title: "Odgovor u toku 24h",
    body: "WhatsApp, Telegram, email — najčešće odgovaramo u par minuta, ne sutradan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-sky pb-12 pt-28 md:pt-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-eyebrow uppercase text-brand-600">O nama</p>
              <h1 className="mt-3 text-display-lg text-balance">
                Mediteran u srcu Evrope — sa partnerom koji razume i vas i Kipar
              </h1>
              <p className="mt-6 text-pretty text-lg text-ink-muted">
                Stay Property je agencija specijalizovana za srpske kupce nekretnina
                na Severnom Kipru. Više od 20 godina pomažemo porodicama, investitorima
                i penzionerima da nađu svoj prostor — bez stresa, bez prevoda, bez
                iznenađenja.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/kontakt" size="lg">
                  Zakažite konsultacije <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/nekretnine" size="lg" variant="secondary">
                  Pogledajte nekretnine
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=900&q=80"
                  alt="Kancelarija Stay Property u Kireniji"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Naša priča */}
      <Section tone="default" size="lg">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-brand-600">Naša priča</p>
            <h2 className="mt-3 text-display-md">Od putnika do agencije</h2>
          </div>
          <div className="space-y-5 text-lg text-pretty text-ink-muted lg:col-span-7">
            <p>
              Stay Property je počeo skromno, kao porodični biznis 2004. Naš tim je
              mešavina pravnika, arhitekata i agenata koji su godinama živeli i u
              Srbiji i na Kipru.
            </p>
            <p>
              Svaki klijent koji nam dođe iz Srbije, Bosne ili Crne Gore prepoznaje
              istu stvar — pošten razgovor, brzina odgovora i fokus na to <em>šta vama
              treba</em>, ne šta nam je najprofitabilnije da prodamo.
            </p>
            <p>
              Danas radimo sa najvećim developerima na Severnom Kipru, ali nikada
              ne preporučujemo projekat koji ne bismo i sami kupili. To je naše
              pravilo broj 1.
            </p>
          </div>
        </div>
      </Section>

      <Stats />

      {/* Naše vrednosti */}
      <Section tone="surface" size="lg">
        <SectionHeader
          eyebrow="Naše vrednosti"
          title="4 stvari po kojima nas klijenti pamte"
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <article className="h-full rounded-2xl border border-line bg-white p-7">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-brand">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-pretty text-ink-muted">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Testimonials />
    </>
  );
}
