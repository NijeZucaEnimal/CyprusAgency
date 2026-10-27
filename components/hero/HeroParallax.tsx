"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Suptilni dekorativni elementi koji se blago pomeraju sa skrolom.
 * Šampanj "sunce" gore, peščane mrlje, suptilna zlatna talasna kriva — sve
 * u luksuznoj paleti, bez crayola gradijenata.
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
      {/* Šampanj "sunce" — gornji desni glow */}
      <motion.div
        style={{ y: sunY }}
        className="absolute -top-20 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-[#F5E9CC] via-[#D9BE92]/40 to-transparent blur-3xl"
      />
      {/* Teget mrlja levo — duboki tonovi za balans */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute left-[-12rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-brand-200/40 via-brand-300/20 to-transparent blur-3xl"
      />
      {/* Topla peščana mrlja dole */}
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-[-4rem] left-1/3 h-[20rem] w-[20rem] rounded-full bg-gradient-to-br from-[#F4ECDA] via-[#E5CFA0]/30 to-transparent blur-3xl"
      />
      {/* Suptilna zlatna kriva pri dnu */}
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
          opacity="0.35"
        />
        <defs>
          <linearGradient id="heroWave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5CFA0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C9A875" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
