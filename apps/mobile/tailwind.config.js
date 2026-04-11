const { colors, fontFamily } = require("@animekey/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
    "./core/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        surface: colors.surface,
      },
      fontFamily: {
        sans: fontFamily.sans,
        display: fontFamily.display,
        description: fontFamily.description,
      },
    },
  },
  plugins: [],
};
