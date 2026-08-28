import type { Config } from "tailwindcss";
import { colors, typography } from "./lib/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tuerkis: colors.tuerkis,
        signalblau: colors.signalblau,
        signalorange: colors.signalorange,
        neutral: colors.neutral,
      },
      fontFamily: {
        headline: ["var(--font-headline)", ...typography.headlineFontFamily],
        body: ["var(--font-body)", ...typography.bodyFontFamily],
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
