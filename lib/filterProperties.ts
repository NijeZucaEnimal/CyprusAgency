import type { Property } from "@/lib/types";

const PRICE_RANGE_MAP: Record<string, { min?: number; max?: number }> = {
  "0-80000": { max: 80000 },
  "80000-150000": { min: 80000, max: 150000 },
  "150000-250000": { min: 150000, max: 250000 },
  "250000-9999999": { min: 250000 },
};

export type FilterValues = {
  grad?: string;
  tip?: string;
  cena?: string;
  sobe?: string;
  sort?: string;
};

export function filterAndSort(
  properties: Property[],
  filters: FilterValues,
): Property[] {
  let result = [...properties];

  if (filters.grad) {
    result = result.filter((p) => p.city === filters.grad);
  }
  if (filters.tip) {
    result = result.filter((p) => p.type === filters.tip);
  }
  if (filters.cena && PRICE_RANGE_MAP[filters.cena]) {
    const { min, max } = PRICE_RANGE_MAP[filters.cena];
    if (min !== undefined) result = result.filter((p) => p.price >= min);
    if (max !== undefined) result = result.filter((p) => p.price <= max);
  }
  if (filters.sobe !== undefined && filters.sobe !== "") {
    const sobe = parseInt(filters.sobe, 10);
    if (sobe === 3) result = result.filter((p) => p.bedrooms >= 3);
    else result = result.filter((p) => p.bedrooms === sobe);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "area-desc":
      result.sort((a, b) => b.sqm - a.sqm);
      break;
    default:
      result.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }

  return result;
}
