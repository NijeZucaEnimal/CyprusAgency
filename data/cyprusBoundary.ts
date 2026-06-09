/**
 * Granica celog ostrva Kipar (ne samo severni deo).
 * ~80 pažljivo raspoređenih tačaka koje hvataju distinktivne crte:
 *  - Karpas poluostrvo (istočni "kraj tiganja")
 *  - Akamas poluostrvo (zapadni špic)
 *  - Akrotiri poluostrvo (južna izbočina kod Limassola)
 *  - Famagusta zaliv (istočna uvala)
 *  - Morphou zaliv (severozapadna uvala)
 *
 * Ide u smeru kazaljke na satu počevši od severozapadnog Cape Kormakitis-a.
 * Tačke su [lng, lat] u stepenima.
 */
export const cyprusBoundary: [number, number][] = [
  // Severozapadna obala — od Cape Kormakitis na istok do Karpasa
  [32.62, 35.18], [32.72, 35.2], [32.85, 35.23], [33.0, 35.28],
  [33.12, 35.32], [33.22, 35.34], [33.32, 35.34], // Kirenija
  [33.42, 35.34], [33.55, 35.34], // Esentepe
  [33.68, 35.32], [33.8, 35.33], [33.92, 35.36],
  // Karpas poluostrvo — severna obala ka istoku
  [34.05, 35.42], [34.18, 35.48], [34.32, 35.55],
  [34.45, 35.62], [34.55, 35.66],
  [34.58, 35.68], // Cape Apostolos Andreas (vrh Karpasa)
  // Karpas — južna obala nazad ka zapadu
  [34.55, 35.62], [34.45, 35.55], [34.3, 35.48],
  [34.18, 35.42], [34.05, 35.34], [33.97, 35.25], [33.95, 35.18],
  // Istočna obala — Famagusta i zaliv
  [33.94, 35.13], // Famagusta
  [33.93, 35.05], [33.93, 34.97], [33.93, 34.92],
  [33.95, 34.87], [34.0, 34.85], [34.05, 34.85],
  [34.1, 34.93], [34.13, 34.97], // Cape Greco area
  [34.1, 34.99], [34.05, 34.98], [33.97, 34.98], // Ayia Napa
  [33.88, 34.97], [33.78, 34.95], [33.68, 34.93],
  [33.55, 34.92], // Larnaca
  [33.42, 34.9], [33.3, 34.85], [33.2, 34.75],
  // Akrotiri poluostrvo — južna izbočina
  [33.1, 34.68], [33.05, 34.65], [33.02, 34.62],
  [32.99, 34.58], // Cape Gata (vrh Akrotirija)
  [32.95, 34.6], [32.93, 34.63], [32.93, 34.66],
  // Limassol zaliv i Episkopi zaliv
  [32.92, 34.7], [32.85, 34.71], [32.78, 34.7], [32.7, 34.71],
  [32.62, 34.72], [32.55, 34.72], // Pissouri area
  [32.48, 34.75], [32.43, 34.78],
  // Zapadna obala — Paphos do Akamasa
  [32.4, 34.83], [32.4, 34.88], [32.4, 34.93], // Paphos
  [32.38, 34.97], [32.35, 35.02], [32.32, 35.07], [32.3, 35.12],
  // Akamas poluostrvo — zapadni špic
  [32.27, 35.15], [32.25, 35.18],
  [32.27, 35.2], // vrh Akamasa
  [32.32, 35.22], [32.4, 35.22], [32.48, 35.2],
  // Morphou zaliv — uvija ka unutra
  [32.55, 35.18], [32.6, 35.18], [32.62, 35.2], [32.62, 35.18],
];

/** Geografski centar Kipra — koristi se za centriranje projekcije i kamere. */
export const cyprusCenter: { lng: number; lat: number } = {
  lng: 33.4,
  lat: 35.13,
};

/**
 * Kireniski planinski venac — uska traka duž severne obale.
 * Renderuje se kao suptilno povišen sloj iznad glavne ravni kopna.
 */
export const kyreniaMountains: [number, number][] = [
  [32.8, 35.32], [33.0, 35.33], [33.2, 35.33], [33.4, 35.32],
  [33.6, 35.32], [33.8, 35.31], [34.0, 35.34], [34.1, 35.36],
  [34.05, 35.32], [33.9, 35.28], [33.7, 35.27],
  [33.5, 35.28], [33.3, 35.28], [33.1, 35.28], [32.9, 35.28],
  [32.8, 35.3],
];

/**
 * Trodos planinski venac — centralno-južni deo Kipra.
 * Renderuje se kao šira, niža kupola.
 */
export const troodosMountains: [number, number][] = [
  [33.15, 34.92], [33.12, 35.0], [33.05, 35.07], [32.95, 35.1],
  [32.85, 35.07], [32.78, 35.0], [32.75, 34.92],
  [32.78, 34.84], [32.85, 34.78], [32.95, 34.75],
  [33.05, 34.78], [33.12, 34.84],
];
