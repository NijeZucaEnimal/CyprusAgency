import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium tracking-tight",
  {
    variants: {
      variant: {
        brand: "bg-brand-50 text-brand-700",
        sand: "bg-sand text-ink",
        sun: "bg-sun/15 text-ink",
        outline: "border border-line bg-white text-ink-muted",
        dark: "bg-ink text-white",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "sm",
    },
  },
);

export function Badge({
  className,
  variant,
  size,
  children,
}: VariantProps<typeof badgeStyles> & {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn(badgeStyles({ variant, size }), className)}>{children}</span>;
}
