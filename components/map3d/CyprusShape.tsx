"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  cyprusBoundary,
  kyreniaMountains,
  troodosMountains,
} from "@/data/cyprusBoundary";
import { projectXZ } from "./projection";

/**
 * Helper: pravi THREE.Shape od polygon-a (lng, lat).
 * Koordinate se projektuju, pa se -z koristi za Y u Shape (jer mesh
 * rotiramo za -90° oko X — Y u Shape postaje svetski Z posle rotacije).
 */
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
 * Slojevi 3D kopna — premium topografski stil:
 *   1. Glavna ravan kopna (ekstrudovana, peščana — tlo)
 *   2. Tamniji obod ispod (vizuelna dubina obale)
 *   3. Kireniski planinski venac (povišen sloj, hladniji ton)
 *   4. Trodos planinski venac (povišen sloj, topliji rocky ton)
 */
export function CyprusShape() {
  // Glavna kopnena geometrija (ekstrudovana sa blagim bevel-om)
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

  // Tanki obod ispod (samo gornja površina) — daje dubinu obali
  const shorelineGeometry = useMemo(() => {
    const shape = buildShape(cyprusBoundary);
    const geo = new THREE.ShapeGeometry(shape);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  // Kireniske planine — uži, povišen sloj
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

  // Trodos planine — širi, niži dome
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
      {/* Sloj 1: tamniji obod ispod (vidiš ga sa boka kao "ploču obale") */}
      <mesh position={[0, -0.04, 0]}>
        <primitive object={shorelineGeometry} attach="geometry" />
        <meshStandardMaterial color="#C9B289" roughness={0.95} metalness={0} />
      </mesh>

      {/* Sloj 2: glavna ravan kopna — peščana */}
      <mesh geometry={landGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F2E6CC"
          roughness={0.92}
          metalness={0}
          envMapIntensity={0.35}
        />
      </mesh>

      {/* Sloj 3: Kireniski planinski venac — hladniji, prati severnu obalu */}
      <mesh
        geometry={kyreniaGeometry}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#C9B89A"
          roughness={0.88}
          metalness={0}
        />
      </mesh>

      {/* Sloj 4: Trodos venac — topliji, centralno-jugozapadno */}
      <mesh
        geometry={troodosGeometry}
        position={[0, 0.45, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#D9B886"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
