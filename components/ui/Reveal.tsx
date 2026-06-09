"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance to slide up from, in px */
  y?: number;
  /** Slide direction. Default "up" */
  direction?: "up" | "down" | "left" | "right";
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul" | "span";
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport">;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  direction = "up",
  as = "div",
  ...rest
}: RevealProps) {
  const fromOffset = {
    up: { x: 0, y },
    down: { x: 0, y: -y },
    left: { x: y, y: 0 },
    right: { x: -y, y: 0 },
  }[direction];

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, ...fromOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
