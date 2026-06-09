"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { City } from "@/lib/types";
import { projectXZ } from "./projection";

const DEFAULT_POSITION = new THREE.Vector3(0, 22, 30);
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
      desiredPos = tempPosition.current.set(cx + 5, 10, cz + 9);
    } else if (rotate) {
      // Vrlo blaga rotacija oko Y ose — jedva primetna, daje "živost"
      const t = state.clock.getElapsedTime() * 0.04;
      const radius = Math.sqrt(
        DEFAULT_POSITION.x ** 2 + DEFAULT_POSITION.z ** 2,
      );
      const baseAngle = Math.atan2(DEFAULT_POSITION.z, DEFAULT_POSITION.x);
      const angle = baseAngle + Math.sin(t) * 0.15;
      desiredPos = tempPosition.current.set(
        Math.cos(angle) * radius,
        DEFAULT_POSITION.y,
        Math.sin(angle) * radius,
      );
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
