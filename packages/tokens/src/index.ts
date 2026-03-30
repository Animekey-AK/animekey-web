// Color palette — extracted from Figma (phone-site-animekey)
export const colors = {
  brand: {
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
  surface: {
    DEFAULT: "#070707", // ← Figma frame background
    raised:  "#1a1a1a", // card lift
    overlay: "#212121", // modals, dropdowns
  },
} as const;

// Typography — base font stacks without CSS var wrappers (those are web-only)
export const fontFamily = {
  sans:        ["Inter", "system-ui", "sans-serif"],
  display:     ["Anton", "sans-serif"],
  description: ["Montserrat", "sans-serif"],
  mono:        ["monospace"],
} as const;

// Type scale — mapped from Figma sizes (mobile → web)
// Not `as const` — Tailwind requires mutable tuples for fontSize values
export const fontSize: Record<string, [string, { lineHeight?: string; fontWeight?: string }]> = {
  "hero":     ["6rem",    { lineHeight: "1.1",  fontWeight: "400" }],
  "display":  ["2.25rem", { lineHeight: "1.1",  fontWeight: "700" }],
  "title-lg": ["2rem",    { lineHeight: "1.1",  fontWeight: "700" }],
  "title":    ["1.875rem",{ lineHeight: "1.21", fontWeight: "700" }],
  "title-sm": ["1.375rem",{ lineHeight: "1.1",  fontWeight: "700" }],
  "label":    ["1rem",    { lineHeight: "1.45", fontWeight: "500" }],
};

// Border radius — CSS var references intentional (set by shadcn/ui at runtime)
// Mobile will define numeric values when Expo is set up (Phase 9)
export const borderRadius = {
  sm:    "calc(var(--radius) - 4px)",
  md:    "calc(var(--radius) - 2px)",
  lg:    "var(--radius)",
  xl:    "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
} as const;

// Keyframe animation definitions
export const keyframes = {
  "fade-in":  { from: { opacity: "0" }, to: { opacity: "1" } },
  "slide-up": {
    from: { transform: "translateY(8px)", opacity: "0" },
    to:   { transform: "translateY(0)",   opacity: "1" },
  },
} as const;

// Animation shorthand utilities
export const animation = {
  "fade-in":  "fade-in 0.2s ease-out",
  "slide-up": "slide-up 0.25s ease-out",
} as const;

// Convenience: all tokens bundled — use this for React Native StyleSheet imports
export const tokens = {
  colors,
  fontFamily,
  fontSize,
  borderRadius,
  keyframes,
  animation,
} as const;
