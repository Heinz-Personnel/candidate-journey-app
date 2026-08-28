/**
 * Zentrale Design-Tokens, abgeleitet aus dem HPS Design-Briefing
 * (MVP_Scope_CandidateJourneyApp.md, Kapitel 1), Fachkraefte-Variante.
 *
 * Einzige Quelle der Wahrheit fuer Farben/Typografie. tailwind.config.ts
 * liest ausschliesslich von hier, damit Farbwerte nicht doppelt gepflegt
 * werden muessen.
 */

export const colors = {
  // Leitfarbe fuer Fachkraefte-facing App-Flaechen (nicht Signal-Blau,
  // das bleibt fuer Struktur-/Markenelemente reserviert, siehe unten).
  tuerkis: {
    dunkel: "#0B7A75",
    basis: "#0FB3A8",
    hell: "#8CE8DE",
  },
  // Uebergeordnete Markenfarbe: Struktur-/Markenelemente (Login, App-Header).
  signalblau: {
    dunkel: "#1B2B99",
    basis: "#3D5AFE",
    mittel: "#7C8CFF",
  },
  // Ausschliesslich fuer Icons/Akzente, nie als Flaechenfarbe oder Headline.
  signalorange: "#FF7A3D",
  neutral: {
    schwarz: "#0B0B0B",
    charcoal: "#161616",
    betonOffwhite: "#E7E3DC",
  },
} as const;

export const typography = {
  // Screen-Titel: fette, condensed Grossbuchstaben-Grotesk. Sparsam
  // einsetzen (z. B. "ROADMAP"), nicht fuer Fliesstext oder UI-Labels.
  headlineFontFamily: ["Archivo Black", "Anton", "sans-serif"],
  // Fliesstext/UI: klare moderne Grotesk.
  bodyFontFamily: ["Inter", "Source Sans 3", "sans-serif"],
} as const;

/**
 * Kontrast-Pflichtregeln (verbindlich, siehe Kapitel 1):
 * - Niemals Farbe-auf-Farbe aus derselben Familie (nie Blau auf Blau,
 *   nie Tuerkis auf Tuerkis) - Text/Hintergrund immer aus klar
 *   unterschiedlichen Farbfamilien, meist Weiss oder Schwarz auf Farbe.
 * - Buttons brauchen sichtbaren Kontrast zu ihrem Hintergrund: auf
 *   dunklen/farbigen Flaechen eine helle/weisse Button-Variante nutzen,
 *   nie eine aehnliche Farbfamilie.
 *
 * Layout-Prinzipien: editorial statt verspielt (viel Weissraum, klare
 * Bloecke statt Card-UI mit Schatten/Rundungen), grosse nuechterne Zahlen
 * ohne Icon-Dekoration, kleine Versal-Eyebrow-Labels statt bunter Badges,
 * kein Amtsstempel-/Buerokratie-Look.
 */
export const designTokens = { colors, typography } as const;

export default designTokens;
