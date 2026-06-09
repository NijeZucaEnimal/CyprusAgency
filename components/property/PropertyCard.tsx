"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bed, Bath, Maximize2, Waves, ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/cn";
import type { Property } from "@/lib/types";
import { formatEur, formatArea, formatDistance } from "@/lib/format";
import { getCityBySlug } from "@/data/cities";
import { Badge } from "@/components/ui/Badge";

type Props = {
  property: Property;
  className?: string;
  /** Da li da kartica ima 3D tilt efekat na hover (default true) */
  tilt?: boolean;
};

export function PropertyCard({ property, className, tilt = true }: Props) {
  const city = getCityBySlug(property.city);

  // Tilt: mapiraj poziciju kursora (-0.5 do 0.5) u rotaciju ±5°
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const xPos = useMotionValue(0);
  const yPos = useMotionValue(0);
  const tiltX = useTransform(yPos, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(xPos, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xPos.set(x);
    yPos.set(y);
    rotateX.set(tiltX.get());
    rotateY.set(tiltY.get());
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    xPos.set(0);
    yPos.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <Link
        href={`/nekretnine/${property.slug}`}
        className="block focus-visible:outline-none"
        aria-label={property.title}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient za čitljivost gornjih ikona */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Badge-i gore */}
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="dark" size="sm">
              {property.type.toUpperCase()}
            </Badge>
            {property.interestFreePlan && (
              <Badge variant="sun" size="sm">
                Rate bez kamate
              </Badge>
            )}
          </div>

          {/* Strelica desno gore */}
          <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-md transition-transform group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" />
          </div>

          {/* Cena dole */}
          <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-bold text-ink shadow-md">
            {formatEur(property.price)}
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            {city?.name ?? property.city}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
            {property.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted">
            {property.bedrooms > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Bed className="h-4 w-4" /> {property.bedrooms} sobe
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4" /> {property.bathrooms}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4" /> {formatArea(property.sqm)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Waves className="h-4 w-4" /> {formatDistance(property.distanceToSea)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
