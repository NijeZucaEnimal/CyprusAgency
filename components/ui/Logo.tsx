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
        "group inline-flex items-center gap-2.5 font-bold tracking-tight",
        variant === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      <span className="text-lg leading-none">
        Stay<span className="text-brand-500">Property</span>
      </span>
    </Link>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-brand shadow-brand"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10 L12 4 L20 10 V20 H4 Z" />
        <path d="M9 20 V14 H15 V20" />
      </svg>
    </span>
  );
}
