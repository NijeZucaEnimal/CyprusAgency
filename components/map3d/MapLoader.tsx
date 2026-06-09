"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/useMediaQuery";
import { MapPlaceholder } from "./MapPlaceholder";

/**
 * Dinamički učita 3D mapu (samo na klijentu, lazy).
 * Na mobilnim uređajima učitava lakšu SVG fallback verziju.
 *
 * Razlog dynamic + ssr:false: Three.js i WebGL ne mogu da rade tokom
 * SSR-a, a uvoz preko 50 KB bi blokirao initial bundle.
 */
const CyprusMap3D = dynamic(() => import("./CyprusMap3D").then((m) => m.CyprusMap3D), {
  ssr: false,
  loading: () => <MapPlaceholder />,
});

const MapFallback2D = dynamic(
  () => import("./MapFallback2D").then((m) => m.MapFallback2D),
  {
    ssr: false,
    loading: () => <MapPlaceholder />,
  },
);

export function MapLoader() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <MapPlaceholder />;
  return isMobile ? <MapFallback2D /> : <CyprusMap3D />;
}
