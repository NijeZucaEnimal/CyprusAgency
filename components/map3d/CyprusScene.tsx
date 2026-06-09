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

      {/* Mekana ambijentalna svetlost — daje boju koja podseća na nebo */}
      <ambientLight intensity={0.55} color="#EDF4FF" />

      {/* Glavna direkciona "sunce" — postavljeno SE da baci senke ka NW */}
      <directionalLight
        position={[10, 18, 8]}
        intensity={1.4}
        color="#FFF1D6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-bias={-0.0005}
      />

      {/* Hemisferna — nebo plavo gore, peščano dole — daje fotorealistično izjednačavanje */}
      <hemisphereLight args={["#B8DCF5", "#E8C99A", 0.55]} />

      {/* Suptilan fill light sa zapada da osvetli senovitu stranu planina */}
      <directionalLight position={[-12, 8, -4]} intensity={0.35} color="#D8E8FF" />

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
