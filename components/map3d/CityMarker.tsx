"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import type { City } from "@/lib/types";
import { projectMarker } from "./projection";

type Props = {
  city: City;
  isActive: boolean;
  onSelect: (city: City) => void;
};

export function CityMarker({ city, isActive, onSelect }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { x, y, z } = projectMarker(city.coords.lng, city.coords.lat);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y =
        y + Math.sin(t * 1.6 + city.coords.lng) * 0.03;
    }
    if (ringRef.current) {
      const baseScale = isActive || hovered ? 1.6 : 1;
      const pulse = 1 + Math.sin(t * 2.0) * 0.15;
      ringRef.current.scale.setScalar(baseScale * pulse);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.cos(t * 2.0) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Spoljni puls — šampanj zlato */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.32, 32]} />
        <meshBasicMaterial color="#D9BE92" transparent opacity={0.4} />
      </mesh>

      {/* Glavna kapljica markera — gold gradient feel preko emissive */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(city);
        }}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={isActive ? "#F5E9CC" : "#D9BE92"}
          emissive={isActive ? "#C9A875" : "#9D7C57"}
          emissiveIntensity={isActive || hovered ? 1.4 : 0.9}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      {/* HTML labela iznad markera — luksuzni stil */}
      <Html
        position={[0, 0.45, 0]}
        center
        distanceFactor={9}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-sm border border-gold-300/60 bg-bg/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink shadow-md backdrop-blur transition-all duration-200 ${
            isActive || hovered ? "scale-110 opacity-100" : "opacity-90"
          }`}
        >
          {city.name}
        </div>
      </Html>
    </group>
  );
}
