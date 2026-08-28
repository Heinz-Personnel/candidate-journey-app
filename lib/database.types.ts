/**
 * Handgeschriebene Typen fuer die fuenf Tabellen aus
 * supabase/migrations/0001_init_schema.sql (Datenmodell, Kapitel 2 des
 * Briefings). Sobald ein echtes Supabase-Projekt existiert, koennen diese
 * durch `supabase gen types typescript` ersetzt/abgeglichen werden.
 */

export type RoadmapPhaseCode = "P0" | "H" | "E" | "I" | "N" | "Z";

export type RoadmapProgressStatus = "offen" | "in_bearbeitung" | "erledigt";

export type ContentItemKategorie = "Wohnen" | "Behoerden" | "Alltag";

export type ContentItemTyp = "Artikel" | "Checkliste" | "Video";

export type HelpRequestTyp = "Sprachhilfe" | "Diskriminierung" | "Sonstiges";

export type HelpRequestStatus = "neu" | "gesehen" | "bearbeitet";

export interface Candidate {
  id: string;
  name: string;
  herkunftsland: string;
  berufsgruppe: string;
  email: string;
  ankunftsdatum: string;
  auflage_bis: string | null;
  erstellt_am: string;
}

export interface RoadmapTemplateStep {
  id: string;
  phase_code: RoadmapPhaseCode;
  titel: string;
  beschreibung: string;
  reihenfolge: number;
}

export interface CandidateRoadmapProgress {
  id: string;
  candidate_id: string;
  template_step_id: string;
  status: RoadmapProgressStatus;
  abgeschlossen_am: string | null;
}

export interface ChecklistItem {
  text: string;
  erledigt: boolean;
}

export interface ContentItem {
  id: string;
  kategorie: ContentItemKategorie;
  typ: ContentItemTyp;
  titel: string;
  inhalt: string | null;
  video_url: string | null;
  checklist_items: ChecklistItem[] | null;
  trigger_bedingung: string | null;
}

export interface HelpRequest {
  id: string;
  candidate_id: string;
  typ: HelpRequestTyp;
  nachricht: string | null;
  status: HelpRequestStatus;
  erstellt_am: string;
  benachrichtigt_email: string;
}
