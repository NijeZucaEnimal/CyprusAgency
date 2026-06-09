import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
    "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-300",
    "hover:[&>svg]:translate-x-0.5 active:translate-y-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-brand text-white",
          "shadow-[0_10px_28px_-8px_rgba(42,126,230,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]",
          "hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(42,126,230,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]",
        ].join(" "),
        secondary: [
          "border border-line bg-white text-ink shadow-sm",
          "hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 hover:shadow-md",
        ].join(" "),
        ghost: "text-ink hover:bg-brand-50 hover:text-brand-700",
        outline:
          "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        sun: "bg-sun text-ink shadow-md hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant, size, className, children, ...rest } = props;
    const classes = cn(buttonStyles({ variant, size }), className);

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorProps } = rest;
      const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            {...anchorProps}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
