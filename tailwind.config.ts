import type { Config } from "tailwindcss";
import { colors, typography, spacing, layout } from "./lib/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hbo: colors.hbo,
        orange: colors.orange,
        schwarz: colors.schwarz,
        charcoal: colors.charcoal,
        beton: colors.beton,
        weiss: colors.weiss,
      },
      fontFamily: {
        headline: ["var(--font-headline)", ...typography.headlineFontFamily],
        body: ["var(--font-body)", ...typography.bodyFontFamily],
      },
      spacing,
      maxWidth: {
        wrap: layout.maxWidth,
      },
      borderRadius: {
        // Editorial statt verspielt: keine abgerundeten Card-Ecken als Default.
        DEFAULT: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
