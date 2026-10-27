import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
        },
        line: "var(--color-line)",
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
          DEFAULT: "var(--color-brand-500)",
        },
        gold: {
          50: "var(--color-gold-50)",
          100: "var(--color-gold-100)",
          200: "var(--color-gold-200)",
          300: "var(--color-gold-300)",
          400: "var(--color-gold-400)",
          500: "var(--color-gold-500)",
          600: "var(--color-gold-600)",
          700: "var(--color-gold-700)",
          DEFAULT: "var(--color-gold-400)",
        },
        kismet: {
          50: "var(--color-slate-50)",
          100: "var(--color-slate-100)",
          200: "var(--color-slate-200)",
          300: "var(--color-slate-300)",
          400: "var(--color-slate-400)",
          500: "var(--color-slate-500)",
          DEFAULT: "var(--color-slate-300)",
        },
        // Backwards-compat aliases — sada upućuju na nove vrednosti
        sea: "var(--color-sea)",
        sand: "var(--color-sand)",
        sun: "var(--color-sun)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: [
          "var(--font-serif)",
          "Cormorant Garamond",
          "Georgia",
          "ui-serif",
          "serif",
        ],
      },
      fontSize: {
        // Display: sada 500 weight jer je serif (Cormorant) i izgleda heavy
        "display-xl": [
          "clamp(2.75rem, 6.5vw, 5.25rem)",
          { lineHeight: "1.04", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4.8vw, 4rem)",
          { lineHeight: "1.06", letterSpacing: "-0.018em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.2vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        eyebrow: [
          "0.75rem",
          { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "600" },
        ],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        brand: "var(--shadow-brand)",
        gold: "var(--shadow-gold)",
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-sky": "var(--gradient-sky)",
        "gradient-sand": "var(--gradient-sand)",
        "gradient-slate": "var(--gradient-slate)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "fade-up": "fadeUp 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
