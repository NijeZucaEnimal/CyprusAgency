"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Velika ravan koja predstavlja more. Lagana animacija — fina pulsacija
 * "shimmer" efekta kroz materijal — bez pravih talasa, čisto i premium.
 */
export function Sea() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      // Vrlo blagi vertikalni pomak — kao da more "diše"
      ref.current.position.y = -0.05 + Math.sin(t * 0.6) * 0.005;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[0, -0.05, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[120, 120, 1, 1]} />
      <meshStandardMaterial
        color="#5EB7E8"
        roughness={0.25}
        metalness={0.15}
      />
    </mesh>
  );
}
