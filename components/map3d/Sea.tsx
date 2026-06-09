"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Slojeviti prikaz mora:
 *  - Donja velika ravan: dublje plava (osnovna boja)
 *  - Gornji sjajni sloj: blago animiran, daje "shimmer" osećaj
 * Bez teksturа — premium, čisto, brzo.
 */
export function Sea() {
  const shimmerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (shimmerRef.current) {
      const t = clock.getElapsedTime();
      shimmerRef.current.position.y = -0.04 + Math.sin(t * 0.5) * 0.004;
      const mat = shimmerRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.35 + Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group>
      {/* Dublji sloj — osnova */}
      <mesh
        position={[0, -0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[160, 160, 1, 1]} />
        <meshStandardMaterial
          color="#3A95C8"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Gornji shimmer sloj — svetlija plava, blago providan */}
      <mesh
        ref={shimmerRef}
        position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[160, 160, 1, 1]} />
        <meshStandardMaterial
          color="#7CC4E8"
          roughness={0.2}
          metalness={0.35}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
