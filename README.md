# Candidate Journey App

Grundgeruest fuer die Candidate-Journey-App (siehe `MVP_Scope_CandidateJourneyApp.md`).
Noch keine echten Screens, nur Projektstruktur, Datenbankschema und Design-Tokens.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS, konfiguriert ueber zentrale Design-Tokens in `lib/design-tokens.ts`
- Supabase (Postgres + Auth), Client-Setup in `lib/supabase/`

## Setup

```bash
npm install
cp .env.local.example .env.local   # Supabase-URL/Anon-Key eintragen
npm run dev
```

## Datenbankschema

`supabase/migrations/0001_init_schema.sql` legt die fuenf Tabellen aus dem
Datenmodell an: `candidate`, `roadmap_template_step`,
`candidate_roadmap_progress`, `content_item`, `help_request`.

Migration gegen ein Supabase-Projekt anwenden:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

Passende TypeScript-Typen liegen (handgepflegt) in `lib/database.types.ts`.

## Design-Tokens

`lib/design-tokens.ts` ist die einzige Quelle fuer Farben und Typografie aus
Kapitel 1 des Briefings (Tuerkis-Palette, Signal-Blau, Signal-Orange,
Neutraltoene, Headline-/Body-Fonts). `tailwind.config.ts` liest ausschliesslich
von dort, damit Werte nicht doppelt gepflegt werden.

## Was noch fehlt

Screens (Login, Dashboard, Roadmap, Leben in Deutschland, Ich brauche Hilfe,
Profil), Auth-Logik und RLS-Policies sind bewusst noch nicht gebaut, siehe
`MVP_Scope_CandidateJourneyApp.md`.
