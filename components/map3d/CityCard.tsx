"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { City } from "@/lib/types";
import { formatFromEur } from "@/lib/format";

type Props = {
  city: City | null;
  onClose: () => void;
};

export function CityCard({ city, onClose }: Props) {
  return (
    <AnimatePresence>
      {city && (
        <motion.div
          key={city.slug}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-gold-300/60 bg-bg/95 p-5 shadow-lg backdrop-blur-md md:left-5 md:translate-x-0"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-eyebrow uppercase text-gold-500">Region</p>
              <h3 className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-ink">
                {city.name}
                {city.localName && city.localName !== city.name && (
                  <span className="ml-2 font-sans text-sm font-medium text-ink-muted">
                    ({city.localName})
                  </span>
                )}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori karticu"
              className="-mr-1 -mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-gold-50 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Zlatna linija — premium ornament */}
          <div className="mt-3 h-px w-12 bg-gradient-gold" />

          <p className="mt-4 text-sm text-pretty text-ink-muted">
            {city.description}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Nekretnine
              </p>
              <p className="font-serif text-lg font-semibold text-ink">
                {formatFromEur(city.fromPrice)}
              </p>
            </div>
            <Link
              href={`/nekretnine?grad=${city.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-brand-900 shadow-gold transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Pogledaj nekretnine
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
