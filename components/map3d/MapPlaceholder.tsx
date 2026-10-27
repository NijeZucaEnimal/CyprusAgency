/**
 * SSR-friendly placeholder dok se ne učita 3D klijent kod.
 * Luksuzni "nokturno" feel — deep teget pozadina sa zlatnim pulsem.
 */
export function MapPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-brand-800 to-brand-700">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-gold-300/40" />
          <div className="absolute inset-3 rounded-full bg-gradient-gold" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
          Učitavam mapu Kipra
        </p>
      </div>
    </div>
  );
}
