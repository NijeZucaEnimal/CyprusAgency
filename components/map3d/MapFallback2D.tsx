"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cities } from "@/data/cities";
import type { City } from "@/lib/types";
import { CityCard } from "./CityCard";
import { cyprusBoundary } from "@/data/cyprusBoundary";
import { projectXZ } from "./projection";

/**
 * SVG 2D mapa za mobilne uređaje — luksuzna nokturno paleta.
 */
export function MapFallback2D() {
  const [activeCity, setActiveCity] = useState<City | null>(null);

  const projected = cyprusBoundary.map(([lng, lat]) => projectXZ(lng, lat));
  const xs = projected.map(([x]) => x);
  const zs = projected.map(([, z]) => z);
  const minX = Math.min(...xs) - 1;
  const maxX = Math.max(...xs) + 1;
  const minZ = Math.min(...zs) - 1;
  const maxZ = Math.max(...zs) + 1;
  const width = maxX - minX;
  const height = maxZ - minZ;

  const polygonPoints = projected
    .map(([x, z]) => `${x - minX},${z - minZ}`)
    .join(" ");

  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-brand-800 to-brand-700 p-6">
      <div className="relative w-full max-w-xl">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full drop-shadow-md"
          aria-label="Mapa Severnog Kipra"
        >
          <defs>
            <linearGradient id="landGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EFE3C8" />
              <stop offset="100%" stopColor="#B8956A" />
            </linearGradient>
            <radialGradient id="markerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D9BE92" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#D9BE92" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Kopno */}
          <motion.polygon
            points={polygonPoints}
            fill="url(#landGradient)"
            stroke="#9D7C57"
            strokeWidth={0.08}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Markeri */}
          {cities.map((city, i) => {
            const [x, z] = projectXZ(city.coords.lng, city.coords.lat);
            const cx = x - minX;
            const cy = z - minZ;
            const isActive = activeCity?.slug === city.slug;
            return (
              <g
                key={city.slug}
                onClick={() => setActiveCity(city)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={cx} cy={cy} r={1.6} fill="url(#markerGlow)">
                  <animate
                    attributeName="r"
                    values="1.2;2.0;1.2"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                </circle>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? 0.55 : 0.4}
                  fill={isActive ? "#F5E9CC" : "#D9BE92"}
                  stroke="#fff"
                  strokeWidth={0.1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                />
                <text
                  x={cx}
                  y={cy - 1}
                  fontSize={0.9}
                  fontWeight={700}
                  textAnchor="middle"
                  fill="#FAF7F1"
                  style={{ pointerEvents: "none" }}
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {!activeCity && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-xs font-medium uppercase tracking-wider text-gold-200"
            >
              Tapnite na grad za detalje
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <CityCard city={activeCity} onClose={() => setActiveCity(null)} />
    </div>
  );
}
