import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Kismet Real Estate — konsultacije, obilasci nekretnina, pravna podrška i tura Severnog Kipra. Sve na srpskom.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-sky pb-4 pt-28 md:pt-32">
        <Container>
          <p className="text-eyebrow uppercase text-brand-600">Kontakt</p>
          <h1 className="mt-3 text-display-lg text-balance">
            Sve počinje sa razgovorom
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-muted">
            Bilo da ste tek u fazi razmišljanja ili tačno znate šta tražite —
            javite nam se. Konsultacije su uvek besplatne.
          </p>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
