"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

/**
 * Slojeviti prikaz mora u luksuznoj paleti — duboko teget umesto bright blue.
 *  - Donja velika ravan: duboko teget (nokturno more)
 *  - Gornji sjajni sloj: blago animiran "shimmer"
 */
export function Sea() {
  const shimmerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (shimmerRef.current) {
      const t = clock.getElapsedTime();
      shimmerRef.current.position.y = -0.04 + Math.sin(t * 0.5) * 0.004;
      const mat = shimmerRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.25 + Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group>
      {/* Dublji sloj — duboko teget (nokturno more) */}
      <mesh
        position={[0, -0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[160, 160, 1, 1]} />
        <meshStandardMaterial
          color="#143759"
          roughness={0.5}
          metalness={0.25}
        />
      </mesh>

      {/* Gornji shimmer sloj — srednji teget za blagi sjaj */}
      <mesh
        ref={shimmerRef}
        position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[160, 160, 1, 1]} />
        <meshStandardMaterial
          color="#2D5575"
          roughness={0.3}
          metalness={0.45}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
