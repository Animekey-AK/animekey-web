import { colors } from "@animekey/tokens";

export const palette = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  brand: colors.brand.DEFAULT,     // #71C704 — green, Figma primary

  // ── Surfaces ───────────────────────────────────────────────────────────────
  background: "#0F0F14",
  surface: colors.surface.DEFAULT,
  surfaceRaised: colors.surface.raised,
  border: "#1E1E2A",

  // ── Text ───────────────────────────────────────────────────────────────────
  textMuted: "#6B7280",
} as const;
