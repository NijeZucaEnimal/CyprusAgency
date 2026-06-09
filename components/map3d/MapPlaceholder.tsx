/**
 * Lep SSR-friendly placeholder dok se ne učita 3D klijent koda.
 * Skeleton sa pulsiranjem — bez fetch-a, bez JS-a.
 */
export function MapPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-sky">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full bg-brand-200/60" />
          <div className="absolute inset-2 rounded-full bg-gradient-brand" />
        </div>
        <p className="text-sm font-medium text-brand-700">Učitavam mapu Kipra…</p>
      </div>
    </div>
  );
}
