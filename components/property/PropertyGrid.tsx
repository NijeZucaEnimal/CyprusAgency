"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { properties } from "@/data/properties";
import { filterAndSort } from "@/lib/filterProperties";

export function PropertyGrid() {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    return filterAndSort(properties, {
      grad: searchParams.get("grad") ?? undefined,
      tip: searchParams.get("tip") ?? undefined,
      cena: searchParams.get("cena") ?? undefined,
      sobe: searchParams.get("sobe") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
    });
  }, [searchParams]);

  return (
    <>
      <PropertyFilters resultsCount={filtered.length} />

      <div className="container py-10 md:py-14">
        {filtered.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-line bg-white py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-bold">Nema rezultata</h3>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Probajte da promenite filtere ili nas direktno kontaktirajte —
              imamo i nekretnine van sajta.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((property, i) => (
                <motion.div
                  key={property.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, delay: (i % 6) * 0.04 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
