import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";

export const metadata: Metadata = {
  title: "Nekretnine na Severnom Kipru",
  description:
    "Pretraga apartmana, vila i investicionih nekretnina na Severnom Kipru — filtriranje po gradu, tipu, ceni i broju soba.",
  alternates: {
    canonical: "/nekretnine",
  },
};

export default function PropertiesPage() {
  return (
    <>
      <section className="bg-gradient-sky pb-2 pt-28 md:pt-32">
        <Container>
          <p className="text-eyebrow uppercase text-brand-600">Nekretnine</p>
          <h1 className="mt-3 text-display-lg text-balance">
            Premium izbor za svaki budžet
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-muted">
            Od pristupačnih studija u Famagusti do luksuznih vila u Esentepeu —
            svi projekti dolaze sa pravnom proverom i ratama bez kamate.
          </p>
        </Container>
      </section>

      <Suspense fallback={<GridSkeleton />}>
        <PropertyGrid />
      </Suspense>
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="container py-10 md:py-14">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[26rem] animate-pulse rounded-2xl bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
