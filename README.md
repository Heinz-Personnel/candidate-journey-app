# Candidate Journey App

Candidate-Journey-App fuer internationale Pflegefachkraefte (siehe
`MVP_Scope_CandidateJourneyApp.md`). KI-first aufgebaut: nach dem Login
landet man direkt beim Assistenten, alle anderen Screens sind zusaetzlich
ueber die Navigation erreichbar, aktuell mit Beispieldaten (Mock), noch
ohne echte Supabase-Anbindung.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS, konfiguriert ueber zentrale Design-Tokens in `lib/design-tokens.ts`
- Supabase (Postgres + Auth), Client-Setup in `lib/supabase/`
- Anthropic Claude API fuer den Integrationsassistenten (`app/api/assistant/route.ts`)

## Setup

```bash
npm install
cp .env.local.example .env.local   # Supabase-URL/Anon-Key + ANTHROPIC_API_KEY eintragen
npm run dev
```

Fuer den Assistenten (`/assistent`) brauchst du einen eigenen Anthropic-API-Key
von [console.anthropic.com](https://console.anthropic.com). Lokal in
`.env.local` eintragen, in Vercel unter Project Settings -> Environment
Variables als `ANTHROPIC_API_KEY` hinterlegen und neu deployen. Ohne Key
zeigt der Assistent eine klare Fehlermeldung statt eines stillen Fehlers.

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

Nach dem Login (`/login`) landet man direkt auf `/assistent`, dem
KI-Integrationsassistenten. Alle anderen Screens bleiben ueber die
Navigation erreichbar, fuer alle, die gezielt durch Roadmap, Inhalte oder
Profil klicken wollen:

- `/assistent`: Chat mit dem Integrationsassistenten (siehe unten)
- `/login`: E-Mail-Eingabe, aktuell UI-Mock (kein echter Magic-Link-Versand)
- `/dashboard` ("Uebersicht"): Begruessung, aktueller Roadmap-Schritt, Schnellzugriff "Ich brauche Hilfe"
- `/roadmap`: vertikale Timeline P0 bis H/E/I/N/Z, Klick oeffnet Beschreibung, animiert
- `/leben-in-deutschland`: Tabs Wohnen/Behoerden/Alltag, Checkliste, Winter-Hinweis-Banner
- `/hilfe`: Formular Typ-Auswahl + optionaler Freitext
- `/profil`: read-only Candidate-Basisdaten

Datenquelle ist aktuell `lib/mock-data.ts` (eine Beispiel-Kandidatin, Maria),
noch keine echten Supabase-Queries. Die Roadmap-Schritt-Titel sind bewusst
als "Platzhalter-Schritt" markiert, da die echten HEINZ-Schritte (P0/H/E/I/N/Z)
laut MVP-Scope Kapitel 8 noch redaktionell fehlen.

## Integrationsassistent (/assistent)

Rollenvorbild ist Tabea: heute laufen die meisten Alltags- und Prozessfragen
("Wie wechsle ich eine Gluehbirne?", "Ich habe meine Anerkennungsurkunde
bekommen, was jetzt?") per Anruf, WhatsApp oder E-Mail bei ihr auf. Der
Assistent soll diese wiederkehrenden Fragen abfangen, damit Tabea sich auf
Faelle konzentrieren kann, die wirklich einen Menschen brauchen.

Technisch ist das aktuell System-Prompt-Grounding, kein trainiertes/
feingetuntes Modell: `lib/assistant/system-prompt.ts` baut bei jeder Anfrage
einen System-Prompt aus der HPS-Rolle, dem HEINZ-Modell (P0/H/E/I/N/Z) als
Orientierungsrahmen und dem aktuellen Candidate-/Roadmap-Stand (aus den
Mock-Daten). `app/api/assistant/route.ts` ruft darueber die Anthropic API
(`claude-opus-5`) auf. Der System-Prompt weist das Modell explizit an, keine
Rechtsauskuenfte oder offiziellen HPS-Prozessdetails zu erfinden, die es
nicht sicher weiss, und bei Diskriminierung oder heiklen Themen auf das
Hilfe-Formular beziehungsweise Tabea zu verweisen.

**Was hier bewusst noch fehlt:** eine echte kuratierte Wissensbasis
(Retrieval/RAG) zu Migrationsrecht und den tatsaechlichen HEINZ-Modell-
Inhalten. Ohne die kann der Assistent allgemein und im HEINZ-Modell-Rahmen
einordnen, aber keine verbindlichen Rechts- oder Prozessauskuenfte geben.
Das waere der naechste Ausbauschritt. Ebenso noch offen: eine Anbindung an
Ankaadia fuer echte, live aktuelle Kandidat:innen-Daten statt Mock-Daten.

## Was noch fehlt

- Screens an echte Supabase-Queries anbinden (aktuell Mock-Daten)
- Echte Magic-Link-Auth statt UI-Mock beim Login
- HelpRequest wirklich speichern + E-Mail-Benachrichtigung ausloesen
- Echte Roadmap-Inhalte statt Platzhalter-Texte
- RLS-Policies, sobald Auth steht
- Kuratierte Wissensbasis (RAG) fuer den Assistenten, Ankaadia-Anbindung

Details siehe `MVP_Scope_CandidateJourneyApp.md`.
