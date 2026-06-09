"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: string;
  mainImage: string;
  gallery: string[];
};

export function PropertyGallery({ title, mainImage, gallery }: Props) {
  const all = [mainImage, ...gallery];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={all[activeIdx]}
              alt={`${title} — slika ${activeIdx + 1}`}
              fill
              priority={activeIdx === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {all.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {all.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Slika ${idx + 1}`}
              aria-current={activeIdx === idx}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                activeIdx === idx
                  ? "border-brand-500"
                  : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`Mini ${idx + 1}`}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
