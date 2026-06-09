"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { stats } from "@/data/stats";
import { formatNumber } from "@/lib/format";

function AnimatedNumber({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{formatNumber(display)}</span>;
}

export function Stats() {
  return (
    <Section id="brojevi" tone="dark" size="md">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="text-center sm:text-left">
            <p className="text-5xl font-bold tracking-tight md:text-6xl">
              <AnimatedNumber value={stat.value} />
              {stat.suffix && (
                <span className="text-sun">{stat.suffix}</span>
              )}
            </p>
            <p className="mt-3 text-sm text-brand-100/80 md:text-base">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
