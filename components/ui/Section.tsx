import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  /** Background variant */
  tone?: "default" | "surface" | "sand" | "sky" | "dark";
  /** Vertical padding scale */
  size?: "sm" | "md" | "lg";
};

const toneMap: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-bg",
  surface: "bg-surface",
  sand: "bg-gradient-sand",
  sky: "bg-gradient-sky",
  dark: "bg-brand-900 text-white",
};

const sizeMap: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
};

export function Section({
  id,
  className,
  innerClassName,
  children,
  tone = "default",
  size = "md",
}: SectionProps) {
  return (
    <section id={id} className={cn(toneMap[tone], sizeMap[size], className)}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-eyebrow uppercase text-brand-600">{eyebrow}</p>
      )}
      <h2 className="mt-4 text-display-md text-balance">{title}</h2>
      {description && (
        <p className="mt-5 text-pretty text-lg text-ink-muted">{description}</p>
      )}
    </div>
  );
}
