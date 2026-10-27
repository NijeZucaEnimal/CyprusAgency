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

export function CyprusScene({ activeCity, onSelectCity }: Props) {
  return (
    <>
      <CameraRig activeCity={activeCity} />

      {/* Ambijentalna — topli šampanj ton da daje "zlatni sat" osećaj */}
      <ambientLight intensity={0.5} color="#F5E9CC" />

      {/* Glavno "sunce" — toplo zlato sa SE pravca */}
      <directionalLight
        position={[10, 18, 8]}
        intensity={1.3}
        color="#FFE7A8"
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

      {/* Hemisferna — nebo teget gore, peščano dole */}
      <hemisphereLight args={["#4A6B8C", "#E8C99A", 0.5]} />

      {/* Fill light sa zapada — duboki teget za senke planina */}
      <directionalLight
        position={[-12, 8, -4]}
        intensity={0.4}
        color="#B8C9DD"
      />

      <Sea />
      <CyprusShape />

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
