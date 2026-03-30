import type { Config } from "tailwindcss";

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

        // ─── AnimeKey brand palette — source: Figma ───────────────────────
        brand: {
          // Lime green — primary accent extracted from Figma (#71C704)
          DEFAULT: "#71C704",
          50:  "#f4fce3",
          100: "#e5f6c1",
          200: "#cbec86",
          300: "#aedf44",
          400: "#92cc1c",
          500: "#71C704", // ← Figma primary
          600: "#5a9f03",
          700: "#437802",
          800: "#2e5202",
          900: "#1a2e01",
        },

        // ─── Surface palette — background #070707 from Figma ─────────────
        surface: {
          DEFAULT: "#070707", // ← Figma frame background
          raised:  "#1a1a1a", // card lift
          overlay: "#212121", // modals, dropdowns
        },
      },

      // ─── Typography — fonts extracted from Figma ───────────────────────
      fontFamily: {
        sans:        ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display:     ["var(--font-display)", "Anton", "sans-serif"],
        description: ["var(--font-description)", "Montserrat", "sans-serif"],
        mono:        ["var(--font-mono)", "monospace"],
      },

      // ─── Type scale — mapped from Figma sizes (mobile → web) ───────────
      fontSize: {
        "hero":    ["6rem",  { lineHeight: "1.1", fontWeight: "400" }],  // 96px Anton
        "display": ["2.25rem", { lineHeight: "1.1", fontWeight: "700" }], // 36px section
        "title-lg":["2rem",  { lineHeight: "1.1", fontWeight: "700" }],  // 32px card
        "title":   ["1.875rem", { lineHeight: "1.21", fontWeight: "700" }], // 30px
        "title-sm":["1.375rem", { lineHeight: "1.1", fontWeight: "700" }],  // 22px
        "label":   ["1rem",  { lineHeight: "1.45", fontWeight: "500" }],
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
        sm:  "calc(var(--radius) - 4px)",
        md:  "calc(var(--radius) - 2px)",
        lg:  "var(--radius)",
        xl:  "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },

      keyframes: {
        "fade-in":  { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to:   { transform: "translateY(0)",   opacity: "1" },
        },
      },
      animation: {
        "fade-in":  "fade-in 0.2s ease-out",
        "slide-up": "slide-up 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
