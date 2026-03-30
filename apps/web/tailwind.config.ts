import type { Config } from "tailwindcss";
import { colors, fontFamily, fontSize, borderRadius, keyframes, animation } from "@animekey/tokens";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Design tokens from Figma (phone-site-animekey, node 1498-5404) ──
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // ─── AnimeKey brand + surface palette — from @animekey/tokens ────
        ...colors,
      },

      // ─── Typography — CSS vars wrap base stacks from @animekey/tokens ──
      fontFamily: {
        sans:        [`var(--font-sans)`, ...fontFamily.sans],
        display:     [`var(--font-display)`, ...fontFamily.display],
        description: [`var(--font-description)`, ...fontFamily.description],
        mono:        [`var(--font-mono)`, ...fontFamily.mono],
      },

      // ─── Type scale — from @animekey/tokens ───────────────────────────
      fontSize: { ...fontSize },

      borderRadius: {
        DEFAULT: "var(--radius)",
        ...borderRadius,
      },

      // ─── Animations — from @animekey/tokens ───────────────────────────
      keyframes: { ...keyframes },
      animation: { ...animation },
    },
  },
  plugins: [],
};

export default config;
