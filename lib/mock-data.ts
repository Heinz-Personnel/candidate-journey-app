/**
 * Beispieldaten fuer die Screens, solange noch kein Supabase-Projekt
 * verbunden ist. Form und Felder entsprechen exakt den Typen aus
 * database.types.ts, damit der spaetere Wechsel auf echte Supabase-Queries
 * nur den Datenzugriff ersetzt, nicht die Screens selbst.
 *
 * Die Roadmap-Schritt-Titel/Beschreibungen sind bewusst Platzhalter: die
 * echten HEINZ-Schritte (P0/H/E/I/N/Z) sind laut MVP-Scope (Kapitel 8)
 * noch nicht redaktionell ausformuliert.
 */

import type {
  Candidate,
  CandidateRoadmapProgress,
  ContentItem,
  RoadmapTemplateStep,
} from "./database.types";

export const mockCandidate: Candidate = {
  id: "mock-candidate-1",
  name: "Maria Santos",
  herkunftsland: "Philippinen",
  berufsgruppe: "Pflegefachkraft",
  email: "maria.santos@example.com",
  ankunftsdatum: "2025-11-14",
  auflage_bis: "2027-03-01",
  erstellt_am: "2025-11-14T09:00:00.000Z",
};

const phaseCodes: RoadmapTemplateStep["phase_code"][] = ["P0", "H", "E", "I", "N", "Z"];

export const mockRoadmapSteps: RoadmapTemplateStep[] = phaseCodes.map((phase, index) => ({
  id: `step-${phase}`,
  phase_code: phase,
  titel: `Platzhalter-Schritt ${phase}`,
  beschreibung:
    "Echter Text folgt redaktionell, siehe MVP-Scope Kapitel 8. Hier steht bislang nur Platzhalter-Text zur Strukturpruefung.",
  reihenfolge: index + 1,
}));

export const mockProgress: CandidateRoadmapProgress[] = mockRoadmapSteps.map((step, index) => ({
  id: `progress-${step.id}`,
  candidate_id: mockCandidate.id,
  template_step_id: step.id,
  status: index < 2 ? "erledigt" : index === 2 ? "in_bearbeitung" : "offen",
  abgeschlossen_am: index < 2 ? "2026-01-15T00:00:00.000Z" : null,
}));

export const mockContentItems: ContentItem[] = [
  {
    id: "content-winter",
    kategorie: "Alltag",
    typ: "Artikel",
    titel: "Es wird kalt. Das brauchst du fuer den Start.",
    inhalt:
      "Der deutsche Winter ist kaelter, als du es vielleicht gewohnt bist. Eine warme Jacke, feste Schuhe und eine Heizungsanleitung fuer deine Wohnung helfen dir gut durch die ersten Monate.",
    video_url: null,
    checklist_items: null,
    trigger_bedingung: "ankunftsmonat in [11,12,1,2]",
  },
  {
    id: "content-wohnen-checkliste",
    kategorie: "Wohnen",
    typ: "Checkliste",
    titel: "Wohnung beziehen",
    inhalt: null,
    video_url: null,
    checklist_items: [
      { text: "Mietvertrag unterschreiben", erledigt: true },
      { text: "Anmeldung beim Buergeramt", erledigt: false },
      { text: "Stromanbieter waehlen", erledigt: false },
    ],
    trigger_bedingung: null,
  },
  {
    id: "content-behoerden-artikel",
    kategorie: "Behoerden",
    typ: "Artikel",
    titel: "Dein erster Weg zum Buergeramt",
    inhalt:
      "Innerhalb von zwei Wochen nach dem Einzug meldest du dich beim Buergeramt an. Bring deinen Reisepass, den Mietvertrag und die Wohnungsgeberbestaetigung mit.",
    video_url: null,
    checklist_items: null,
    trigger_bedingung: null,
  },
  {
    id: "content-alltag-video",
    kategorie: "Alltag",
    typ: "Video",
    titel: "Einkaufen in Deutschland",
    inhalt: null,
    video_url: "https://example.com/video-einkaufen",
    checklist_items: null,
    trigger_bedingung: null,
  },
];

export function isTriggerActive(triggerBedingung: string | null, ankunftsdatum: string): boolean {
  if (!triggerBedingung) return false;
  const match = triggerBedingung.match(/ankunftsmonat in \[(.+)\]/);
  if (!match) return false;
  const months = match[1].split(",").map((m) => parseInt(m.trim(), 10));
  const ankunftsMonat = new Date(ankunftsdatum).getMonth() + 1;
  return months.includes(ankunftsMonat);
}
