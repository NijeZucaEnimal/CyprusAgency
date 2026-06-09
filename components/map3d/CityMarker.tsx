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
      // Lagano lebdenje
      groupRef.current.position.y = y + Math.sin(t * 1.8 + city.coords.lng) * 0.04;
    }
    if (ringRef.current) {
      const baseScale = isActive || hovered ? 1.6 : 1;
      const pulse = 1 + Math.sin(t * 2.2) * 0.18;
      ringRef.current.scale.setScalar(baseScale * pulse);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 + Math.cos(t * 2.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Spoljni puls (ring) */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.32, 32]} />
        <meshBasicMaterial color="#F2A93B" transparent opacity={0.4} />
      </mesh>

      {/* Glavna kapljica markera (gradient izgled preko emissive) */}
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
          color={isActive ? "#FFD370" : "#F2A93B"}
          emissive={isActive ? "#F2A93B" : "#C57A1A"}
          emissiveIntensity={isActive || hovered ? 1.4 : 0.8}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* HTML labela iznad markera */}
      <Html
        position={[0, 0.45, 0]}
        center
        distanceFactor={9}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-md backdrop-blur transition-all duration-200 ${
            isActive || hovered ? "scale-110 opacity-100" : "opacity-90"
          }`}
        >
          {city.name}
        </div>
      </Html>
    </group>
  );
}
