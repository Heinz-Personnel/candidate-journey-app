-- Grundgeruest-Schema fuer die Candidate-Journey-App.
-- Bildet die fuenf Tabellen aus MVP_Scope_CandidateJourneyApp.md, Kapitel 2, ab.
-- Enthaelt bewusst noch keine RLS-Policies fuer echten Zugriff (Auth-Konzept
-- ist kein Grundgerueststhema), RLS wird aber aktiviert, damit spaeter keine
-- Tabelle versehentlich offen bleibt.

create extension if not exists "pgcrypto";

-- Enums -----------------------------------------------------------------

create type roadmap_phase_code as enum ('P0', 'H', 'E', 'I', 'N', 'Z');

create type roadmap_progress_status as enum ('offen', 'in_bearbeitung', 'erledigt');

create type content_item_kategorie as enum ('Wohnen', 'Behoerden', 'Alltag');

create type content_item_typ as enum ('Artikel', 'Checkliste', 'Video');

create type help_request_typ as enum ('Sprachhilfe', 'Diskriminierung', 'Sonstiges');

create type help_request_status as enum ('neu', 'gesehen', 'bearbeitet');

-- Candidate ---------------------------------------------------------------

create table candidate (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  herkunftsland text not null,
  berufsgruppe text not null,
  email text not null unique,
  ankunftsdatum date not null,
  auflage_bis date,
  erstellt_am timestamptz not null default now()
);

-- RoadmapTemplateStep (global, einmal gepflegt, nicht pro Kandidat:in) ----

create table roadmap_template_step (
  id uuid primary key default gen_random_uuid(),
  phase_code roadmap_phase_code not null,
  titel text not null,
  beschreibung text not null,
  reihenfolge int not null
);

-- CandidateRoadmapProgress (Verknuepfung Kandidat:in <-> Template-Schritt) -

create table candidate_roadmap_progress (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidate (id) on delete cascade,
  template_step_id uuid not null references roadmap_template_step (id) on delete cascade,
  status roadmap_progress_status not null default 'offen',
  abgeschlossen_am timestamptz,
  unique (candidate_id, template_step_id)
);

-- ContentItem (Leben in Deutschland) --------------------------------------

create table content_item (
  id uuid primary key default gen_random_uuid(),
  kategorie content_item_kategorie not null,
  typ content_item_typ not null,
  titel text not null,
  inhalt text,
  video_url text,
  checklist_items jsonb,
  trigger_bedingung text
);

-- HelpRequest (konsolidiert Sprachhilfe + Diskriminierung/Kontakt) --------

create table help_request (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidate (id) on delete cascade,
  typ help_request_typ not null,
  nachricht text,
  status help_request_status not null default 'neu',
  erstellt_am timestamptz not null default now(),
  benachrichtigt_email text not null
);

-- Row Level Security --------------------------------------------------------
-- Aktiviert, aber ohne Policies. Policies folgen mit dem Auth-Konzept
-- (Screen 1, Login/Zugang), damit Kandidat:innen nur ihre eigenen Daten
-- sehen.

alter table candidate enable row level security;
alter table roadmap_template_step enable row level security;
alter table candidate_roadmap_progress enable row level security;
alter table content_item enable row level security;
alter table help_request enable row level security;
