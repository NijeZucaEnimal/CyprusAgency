"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { City } from "@/lib/types";
import { CyprusScene } from "./CyprusScene";
import { CityCard } from "./CityCard";
import { useIsMobile } from "@/lib/useMediaQuery";

export function CyprusMap3D() {
  const [activeCity, setActiveCity] = useState<City | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 22, 30], fov: 38, near: 0.1, far: 200 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CyprusScene activeCity={activeCity} onSelectCity={setActiveCity} />
        </Suspense>
      </Canvas>
      <CityCard city={activeCity} onClose={() => setActiveCity(null)} />

      {/* Suptilan upit za interakciju, prikazuje se dok nije izabran grad */}
      {!activeCity && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-ink-muted shadow-sm backdrop-blur">
          Kliknite na grad za detalje
        </div>
      )}
    </div>
  );
}
