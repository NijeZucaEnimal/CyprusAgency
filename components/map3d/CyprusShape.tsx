"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { cyprusBoundary } from "@/data/cyprusBoundary";
import { projectXZ } from "./projection";

/**
 * Ekstrudovan 3D oblik Severnog Kipra iz projektovane granice.
 * Materijal: topla peščana boja sa blagim bevel-om na gornjoj ivici.
 */
export function CyprusShape() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    cyprusBoundary.forEach(([lng, lat], i) => {
      const [x, z] = projectXZ(lng, lat);
      // U THREE.Shape koristim shape.x/y, ali geometrija će biti
      // rotirana -PI/2 oko X tako da Shape Y postaje svetski Z.
      // Stoga prosleđujem (x, -z) da bi z bio očuvan posle rotacije.
      if (i === 0) shape.moveTo(x, -z);
      else shape.lineTo(x, -z);
    });

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      bevelSegments: 3,
      curveSegments: 4,
    });
    // Položi ravno: rotiraj oko X za -90° da bi se ekstruzija dizala duž Y.
    extrude.rotateX(-Math.PI / 2);
    extrude.computeVertexNormals();
    return extrude;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Gornja površina kopna (svetli peščana) */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#F4EAD5"
          roughness={0.85}
          metalness={0}
          envMapIntensity={0.4}
        />
      </mesh>
      {/* Donja obala — tanki tamniji obod ispod kopna za vizuelnu dubinu */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[buildShapeFromBoundary(), 1]} />
        <meshBasicMaterial color="#D9C9A8" />
      </mesh>
    </group>
  );
}

function buildShapeFromBoundary() {
  const shape = new THREE.Shape();
  cyprusBoundary.forEach(([lng, lat], i) => {
    const [x, z] = projectXZ(lng, lat);
    if (i === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  return shape;
}
