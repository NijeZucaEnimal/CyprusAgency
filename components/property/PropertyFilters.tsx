"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Filter, X } from "lucide-react";
import { cities } from "@/data/cities";
import type { PropertyType } from "@/lib/types";
import { cn } from "@/lib/cn";

const TYPES: { value: PropertyType; label: string }[] = [
  { value: "studio", label: "Studio" },
  { value: "1+1", label: "1+1" },
  { value: "2+1", label: "2+1" },
  { value: "3+1", label: "3+1" },
  { value: "vila", label: "Vila" },
  { value: "penthouse", label: "Penthouse" },
];

const PRICE_RANGES: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "0-80000", label: "do 80.000 €", max: 80000 },
  { value: "80000-150000", label: "80–150k €", min: 80000, max: 150000 },
  { value: "150000-250000", label: "150–250k €", min: 150000, max: 250000 },
  { value: "250000-9999999", label: "250k+ €", min: 250000 },
];

const SORTS: { value: string; label: string }[] = [
  { value: "featured", label: "Istaknuto" },
  { value: "price-asc", label: "Cena: niža → viša" },
  { value: "price-desc", label: "Cena: viša → niža" },
  { value: "area-desc", label: "Najveće" },
];

export function PropertyFilters({ resultsCount }: { resultsCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const grad = searchParams.get("grad") ?? "";
  const tip = searchParams.get("tip") ?? "";
  const cena = searchParams.get("cena") ?? "";
  const sobe = searchParams.get("sobe") ?? "";
  const sort = searchParams.get("sort") ?? "featured";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/nekretnine?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAll = () => router.push("/nekretnine", { scroll: false });
  const hasFilters = grad || tip || cena || sobe;

  return (
    <div className="sticky top-20 z-30 -mx-4 border-b border-line bg-white/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
            <Filter className="h-3.5 w-3.5" />
            {resultsCount} nekretnin{resultsCount === 1 ? "a" : resultsCount < 5 ? "e" : "a"}
          </div>

          <Select
            label="Grad"
            value={grad}
            onChange={(v) => updateParam("grad", v)}
            options={[
              { value: "", label: "Svi gradovi" },
              ...cities.map((c) => ({ value: c.slug, label: c.name })),
            ]}
          />

          <Select
            label="Tip"
            value={tip}
            onChange={(v) => updateParam("tip", v)}
            options={[{ value: "", label: "Svi tipovi" }, ...TYPES]}
          />

          <Select
            label="Cena"
            value={cena}
            onChange={(v) => updateParam("cena", v)}
            options={[
              { value: "", label: "Svaka cena" },
              ...PRICE_RANGES.map((r) => ({ value: r.value, label: r.label })),
            ]}
          />

          <Select
            label="Sobe"
            value={sobe}
            onChange={(v) => updateParam("sobe", v)}
            options={[
              { value: "", label: "Bilo koliko" },
              { value: "0", label: "Studio" },
              { value: "1", label: "1 soba" },
              { value: "2", label: "2 sobe" },
              { value: "3", label: "3+ sobe" },
            ]}
          />

          <div className="ml-auto flex items-center gap-2">
            {hasFilters && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-brand-300 hover:text-ink"
              >
                <X className="h-3.5 w-3.5" /> Resetuj
              </button>
            )}
            <Select
              label="Sortiraj"
              value={sort}
              onChange={(v) => updateParam("sort", v === "featured" ? "" : v)}
              options={SORTS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const active = value !== "";
  return (
    <label className="inline-flex flex-col">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-full border bg-white px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-300",
          active
            ? "border-brand-300 bg-brand-50 text-brand-700"
            : "border-line text-ink hover:border-brand-200",
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export const propertyFilterPriceRanges = PRICE_RANGES;
