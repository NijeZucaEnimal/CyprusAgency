"use client";

import { CyprusShape } from "./CyprusShape";
import { Sea } from "./Sea";
import { CityMarker } from "./CityMarker";
import { CameraRig } from "./CameraRig";
import { cities } from "@/data/cities";
import type { City } from "@/lib/types";

type Props = {
  activeCity: City | null;
  onSelectCity: (city: City | null) => void;
};

/**
 * Glavni Three.js sadržaj scene — ide unutar Canvas-a.
 */
export function CyprusScene({ activeCity, onSelectCity }: Props) {
  return (
    <>
      <CameraRig activeCity={activeCity} />

      {/* Mekana ambijentalna svetlost */}
      <ambientLight intensity={0.55} color="#F0F6FF" />

      {/* Glavna direkciona (sunce) iz jugoistoka */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        color="#FFF1D6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Hemisferna za blago izjednačavanje senki */}
      <hemisphereLight args={["#BDE3F7", "#E5C9A0", 0.45]} />

      <Sea />
      <CyprusShape />

      {/* Pozadinski klik (zatvori karticu) */}
      <mesh
        position={[0, -0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => onSelectCity(null)}
      >
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {cities.map((city) => (
        <CityMarker
          key={city.slug}
          city={city}
          isActive={activeCity?.slug === city.slug}
          onSelect={onSelectCity}
        />
      ))}
    </>
  );
}
