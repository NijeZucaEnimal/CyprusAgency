/**
 * Pojednostavljen oblik granice Severnog Kipra (TRNC), [lng, lat].
 * Ručno aproksimirana putanja sa ~30 tačaka — dovoljno detalja
 * da se prepoznaje Karpas poluostrvo i obala Kirenije, dovoljno
 * malo poligona za GPU efikasnost. Polazi od jugozapadne tačke
 * (Lefke), ide u smeru kazaljke na satu.
 */
export const cyprusBoundary: [number, number][] = [
  [32.78, 35.1],
  [32.85, 35.18],
  [32.98, 35.27],
  [33.1, 35.32],
  [33.25, 35.34],
  [33.4, 35.36],
  [33.55, 35.36],
  [33.7, 35.36],
  [33.88, 35.4],
  [34.05, 35.46],
  [34.22, 35.54],
  [34.38, 35.6],
  [34.5, 35.65],
  [34.58, 35.68],
  [34.55, 35.62],
  [34.42, 35.55],
  [34.25, 35.48],
  [34.1, 35.4],
  [33.97, 35.33],
  [33.95, 35.22],
  [33.94, 35.13],
  [33.88, 35.08],
  [33.75, 35.08],
  [33.6, 35.12],
  [33.45, 35.16],
  [33.3, 35.17],
  [33.15, 35.16],
  [33.0, 35.13],
  [32.88, 35.08],
  [32.78, 35.1],
];

/** Geografski centar približan oblasti (za centriranje kamere). */
export const cyprusCenter: { lng: number; lat: number } = {
  lng: 33.6,
  lat: 35.32,
};
