import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label={site.name}
      className={cn(
        "group inline-flex items-center gap-3 tracking-tight",
        variant === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark variant={variant} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-semibold uppercase tracking-[0.08em]">
          Kismet
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-medium uppercase tracking-[0.32em]",
            variant === "light" ? "text-gold-300" : "text-gold-500",
          )}
        >
          Real Estate
        </span>
      </span>
    </Link>
  );
}

function LogoMark({ variant }: { variant: "default" | "light" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid h-11 w-11 place-items-center transition-colors",
      )}
    >
      <KismetStar
        className={cn(
          "h-11 w-11",
          variant === "light" ? "text-gold-300" : "text-brand-700",
        )}
      />
    </span>
  );
}

/**
 * 8-krak Kismet zvezda — iz brand PDF-a.
 * 16 tačaka naizmenično na spoljnom (R=44) i unutrašnjem (R=18) radijusu.
 * Centralne radijalne linije daju compass-star efekat.
 */
export function KismetStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* Spoljna kontura — 8-krak zvezda (16 tačaka) */}
      <path d="M50 6 L56.9 33.4 L81.1 18.9 L66.6 43.1 L94 50 L66.6 56.9 L81.1 81.1 L56.9 66.6 L50 94 L43.1 66.6 L18.9 81.1 L33.4 56.9 L6 50 L33.4 43.1 L18.9 18.9 L43.1 33.4 Z" />
      {/* Unutrašnje linije — po jedna osovina kroz svaki krak (compass detalj) */}
      <path d="M50 6 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M50 94 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M6 50 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M94 50 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M18.9 18.9 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M81.1 18.9 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M18.9 81.1 L50 50" strokeWidth={0.7} opacity={0.55} />
      <path d="M81.1 81.1 L50 50" strokeWidth={0.7} opacity={0.55} />
    </svg>
  );
}
