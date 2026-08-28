# Candidate Journey App

Candidate-Journey-App fuer internationale Pflegefachkraefte (siehe
`MVP_Scope_CandidateJourneyApp.md`). Alle sechs MVP-Screens sind klickbar,
aktuell mit Beispieldaten (Mock), noch ohne echte Supabase-Anbindung.

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

`lib/design-tokens.ts` ist die einzige Quelle fuer Farben, Typografie und
Abstaende, 1:1 uebernommen aus dem HEINZ. Design Guide (Blau `#1B2B99`/
`#7C8CFF`/`#D6DBFF`, Orange `#FF5A1F` nur als Akzent, Schwarz/Charcoal/Beton,
Anton fuer Headlines, Inter fuer Fliesstext/UI, Abstands-Skala 8 bis 128px).
Die App nutzt bewusst dieselbe Palette wie die HPS-Website, keine eigene
Variante. `tailwind.config.ts` liest ausschliesslich von dort, damit Werte
nicht doppelt gepflegt werden.

## Screens

Alle sechs Screens aus dem MVP-Scope (Kapitel 3) sind gebaut und ueber die
Navigation klickbar:

- `/login`: E-Mail-Eingabe, aktuell UI-Mock (kein echter Magic-Link-Versand)
- `/dashboard`: Begruessung, aktueller Roadmap-Schritt, Schnellzugriff "Ich brauche Hilfe"
- `/roadmap`: vertikale Timeline P0 bis H/E/I/N/Z, Klick oeffnet Beschreibung
- `/leben-in-deutschland`: Tabs Wohnen/Behoerden/Alltag, Checkliste, Winter-Hinweis-Banner
- `/hilfe`: Formular Typ-Auswahl + optionaler Freitext
- `/profil`: read-only Candidate-Basisdaten

Datenquelle ist aktuell `lib/mock-data.ts` (eine Beispiel-Kandidatin, Maria),
noch keine echten Supabase-Queries. Die Roadmap-Schritt-Titel sind bewusst
als "Platzhalter-Schritt" markiert, da die echten HEINZ-Schritte (P0/H/E/I/N/Z)
laut MVP-Scope Kapitel 8 noch redaktionell fehlen.

## Was noch fehlt

- Screens an echte Supabase-Queries anbinden (aktuell Mock-Daten)
- Echte Magic-Link-Auth statt UI-Mock beim Login
- HelpRequest wirklich speichern + E-Mail-Benachrichtigung ausloesen
- Echte Roadmap-Inhalte statt Platzhalter-Texte
- RLS-Policies, sobald Auth steht

Details siehe `MVP_Scope_CandidateJourneyApp.md`.
