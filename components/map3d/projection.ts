import { cyprusCenter } from "@/data/cyprusBoundary";

/**
 * Equirectangular projekcija sa cos(lat) korekcijom — vraća [x, z]
 * u Three.js prostornom sistemu (Y je gore, kopno leži na XZ ravni).
 *
 * Pomeram Z u suprotnom smeru tako da sever bude -Z (kamera koja
 * gleda iz +Z vidi sever ka napred/gore u kadar).
 */
export const MAP_SCALE = 16;

export function projectXZ(lng: number, lat: number): [number, number] {
  const cosLat = Math.cos((cyprusCenter.lat * Math.PI) / 180);
  const x = (lng - cyprusCenter.lng) * cosLat * MAP_SCALE;
  const z = -(lat - cyprusCenter.lat) * MAP_SCALE;
  return [x, z];
}

/**
 * Helper koji vraća { x, y, z } za marker iznad terena.
 * heightAboveLand je u relativnim 3D jedinicama (default 0.55 — iznad
 * vrha ekstruzije kopna).
 */
export function projectMarker(
  lng: number,
  lat: number,
  heightAboveLand = 0.65,
): { x: number; y: number; z: number } {
  const [x, z] = projectXZ(lng, lat);
  return { x, y: heightAboveLand, z };
}
