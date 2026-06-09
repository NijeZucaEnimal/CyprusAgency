"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { City } from "@/lib/types";
import { projectXZ } from "./projection";

const DEFAULT_POSITION = new THREE.Vector3(0, 14, 16);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);

type Props = {
  activeCity: City | null;
  /** Da li je idle rotacija uključena (default true kada nema aktivnog grada) */
  rotate?: boolean;
};

/**
 * Animira poziciju kamere i look-at metu:
 *   - bez aktivnog grada: lagana rotacija oko Y ose, gledajući centar
 *   - sa aktivnim gradom: kamera lerpa do tačke iznad grada
 */
export function CameraRig({ activeCity, rotate = true }: Props) {
  const { camera } = useThree();
  const tempTarget = useRef(new THREE.Vector3());
  const tempPosition = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    let desiredPos: THREE.Vector3;
    let desiredTarget: THREE.Vector3;

    if (activeCity) {
      const [cx, cz] = projectXZ(activeCity.coords.lng, activeCity.coords.lat);
      desiredTarget = tempTarget.current.set(cx, 0, cz);
      // Postavi kameru iznad i blago iza grada (gledajući severo-istok)
      desiredPos = tempPosition.current.set(cx + 3.5, 6.5, cz + 5.5);
    } else if (rotate) {
      const t = state.clock.getElapsedTime() * 0.05;
      const radius = DEFAULT_POSITION.length();
      const x = Math.sin(t) * radius * 0.4;
      const z = Math.cos(t) * radius * 0.95;
      desiredPos = tempPosition.current.set(x, DEFAULT_POSITION.y, z);
      desiredTarget = tempTarget.current.copy(DEFAULT_TARGET);
    } else {
      desiredPos = tempPosition.current.copy(DEFAULT_POSITION);
      desiredTarget = tempTarget.current.copy(DEFAULT_TARGET);
    }

    // Smooth lerp na ciljanu poziciju i metu
    const lerpFactor = Math.min(1, delta * 2.5);
    camera.position.lerp(desiredPos, lerpFactor);
    currentLookAt.current.lerp(desiredTarget, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
