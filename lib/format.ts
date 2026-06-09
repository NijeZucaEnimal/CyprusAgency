const LOCALE = "sr-Latn-RS";

export function formatEur(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatFromEur(value: number): string {
  return `od ${formatEur(value)}`;
}

export function formatArea(sqm: number): string {
  return `${new Intl.NumberFormat(LOCALE).format(sqm)} m²`;
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    const km = meters / 1000;
    return `${km.toLocaleString(LOCALE, { maximumFractionDigits: 1 })} km`;
  }
  return `${meters} m`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(value);
}
