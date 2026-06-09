"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Suptilni dekorativni elementi koji se blago pomeraju sa skrolom.
 * "Sunce" gore, "talasni" gradient na dnu, geometrijske mrlje za
 * dubinu. Pure SVG/CSS — bez slika.
 */
export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 600], [0, 80]);
  const waveY = useTransform(scrollY, [0, 600], [0, -40]);
  const blob1Y = useTransform(scrollY, [0, 600], [0, 120]);
  const blob2Y = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Sunce */}
      <motion.div
        style={{ y: sunY }}
        className="absolute -top-16 right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#FFE7A8] via-[#FFD370]/60 to-transparent blur-3xl"
      />
      {/* Plavi blob */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute left-[-10rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-brand-200/60 via-brand-300/40 to-transparent blur-3xl"
      />
      {/* Drugi peščani blob */}
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-[-4rem] left-1/3 h-[18rem] w-[18rem] rounded-full bg-gradient-to-br from-[#F5EFE6] via-[#F5EFE6]/40 to-transparent blur-3xl"
      />
      {/* Donji talas */}
      <motion.svg
        style={{ y: waveY }}
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,64 C240,96 480,32 720,48 C960,64 1200,112 1440,80 L1440,120 L0,120 Z"
          fill="url(#heroWave)"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="heroWave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A9D2FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#56B2E8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
