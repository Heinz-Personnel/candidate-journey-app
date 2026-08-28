/**
 * Zentrale Design-Tokens, 1:1 uebernommen aus dem HEINZ. Design Guide
 * (HEINZDesignGuide.html, Stand 28.08.2026), dem aktuellen visuellen
 * System der HPS-Website (site-new, Blau/Orange/Schwarz). Die App nutzt
 * bewusst dieselbe Palette wie die Website, keine eigene Variante.
 *
 * Einzige Quelle der Wahrheit fuer Farben/Typografie/Abstaende.
 * tailwind.config.ts liest ausschliesslich von hier.
 */

export const colors = {
  hbo: {
    // --hbo-basis ist im Guide identisch mit --hbo-dunkel.
    dunkel: "#1B2B99",
    basis: "#1B2B99",
    mittel: "#7C8CFF",
    hell: "#D6DBFF",
  },
  // Einzelner Akzent (z. B. Trennstrich im Hero), niemals als Flaeche.
  orange: "#FF5A1F",
  schwarz: "#0B0B0B",
  charcoal: "#161616",
  // Seiten-Hintergrund statt reinem Weiss.
  beton: "#E7E3DC",
  weiss: "#FFFFFF",
} as const;

export const typography = {
  // Headlines/Zahlen: Anton, uppercase.
  headlineFontFamily: ["Anton", "sans-serif"],
  // Fliesstext/UI.
  bodyFontFamily: ["Inter", "-apple-system", "sans-serif"],
} as const;

/**
 * Abstands-Skala aus dem Guide (Kapitel 3): keine frei erfundenen
 * Zwischenwerte fuer neue Abschnitte.
 */
export const spacing = {
  "sp-1": "8px",
  "sp-2": "16px",
  "sp-3": "24px",
  "sp-4": "32px",
  "sp-5": "48px",
  "sp-6": "64px",
  "sp-7": "96px",
  "sp-8": "128px",
} as const;

export const layout = {
  maxWidth: "1200px",
} as const;

/**
 * Do & Don't (Kapitel 6 des Guides), verbindlich:
 * - Jede Qualitaetsaussage mit Zahl/Siegel/Prozessschritt belegen.
 * - Sie-Anrede, ruhiger warmer Ton, korrekte Fachbegriffe.
 * - Orange nur als einzelner Akzent, nie als Flaeche.
 * - Ein Button-Grundstil mit klar benannten Varianten.
 * - Keine Gedankenstriche im Fliesstext, kein Flieder-/Hellblau-Ton in
 *   Eyebrows oder Fliesstext, kein Eyebrow, der die Headline wiederholt.
 */
export const designTokens = { colors, typography, spacing, layout } as const;

export default designTokens;
