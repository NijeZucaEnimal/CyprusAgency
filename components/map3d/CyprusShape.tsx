"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  cyprusBoundary,
  kyreniaMountains,
  troodosMountains,
} from "@/data/cyprusBoundary";
import { projectXZ } from "./projection";

function buildShape(points: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  points.forEach(([lng, lat], i) => {
    const [x, z] = projectXZ(lng, lat);
    if (i === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  return shape;
}

/**
 * Slojevi 3D kopna — luksuzni topografski stil:
 *   1. Tamniji obod ispod (toplo bronza za dubinu obale)
 *   2. Glavna ravan kopna (topli ivori, kao sun-bleached limestone)
 *   3. Kireniski planinski venac (tamniji bronza ton)
 *   4. Trodos planinski venac (širi, topliji rocky ton)
 */
export function CyprusShape() {
  const landGeometry = useMemo(() => {
    const shape = buildShape(cyprusBoundary);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      bevelSegments: 3,
      curveSegments: 6,
    });
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const shorelineGeometry = useMemo(() => {
    const shape = buildShape(cyprusBoundary);
    const geo = new THREE.ShapeGeometry(shape);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const kyreniaGeometry = useMemo(() => {
    const shape = buildShape(kyreniaMountains);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSize: 0.08,
      bevelThickness: 0.12,
      bevelSegments: 4,
      curveSegments: 6,
    });
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  const troodosGeometry = useMemo(() => {
    const shape = buildShape(troodosMountains);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelSize: 0.18,
      bevelThickness: 0.18,
      bevelSegments: 5,
      curveSegments: 8,
    });
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* Sloj 1: tamniji obod (bronza dubina) */}
      <mesh position={[0, -0.04, 0]}>
        <primitive object={shorelineGeometry} attach="geometry" />
        <meshStandardMaterial color="#9D7C57" roughness={0.95} metalness={0} />
      </mesh>

      {/* Sloj 2: glavna ravan kopna — topli ivori/limestone */}
      <mesh geometry={landGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#EFE3C8"
          roughness={0.9}
          metalness={0}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Sloj 3: Kireniski planinski venac — bronza, prati severnu obalu */}
      <mesh
        geometry={kyreniaGeometry}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#B8956A"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Sloj 4: Trodos venac — topliji rocky šampanj */}
      <mesh
        geometry={troodosGeometry}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#C9A875"
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}
