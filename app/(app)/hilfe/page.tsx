"use client";

import { useState, type FormEvent } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { HelpRequestTyp } from "@/lib/database.types";

const typen: { value: HelpRequestTyp; label: string }[] = [
  { value: "Sprachhilfe", label: "Sprachlich" },
  { value: "Diskriminierung", label: "Diskriminierung" },
  { value: "Sonstiges", label: "Sonstiges" },
];

export default function HilfePage() {
  const [typ, setTyp] = useState<HelpRequestTyp>("Sprachhilfe");
  const [nachricht, setNachricht] = useState("");
  const [gesendet, setGesendet] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: sobald Supabase verbunden ist, hier einen HelpRequest-Datensatz
    // anlegen und die E-Mail-Benachrichtigung an Tabeia ausloesen, statt nur
    // lokal zu bestaetigen.
    setGesendet(true);
  }

  if (gesendet) {
    return (
      <div className="space-y-4 max-w-[60ch]">
        <Eyebrow>Ich brauche Hilfe</Eyebrow>
        <h1 className="font-headline uppercase text-4xl text-hbo-dunkel">Danke.</h1>
        <p>Deine Anfrage ist angekommen. Wir melden uns bei dir.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[60ch]">
      <div>
        <Eyebrow>Ich brauche Hilfe</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">
          Wobei brauchst du Hilfe?
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {typen.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => setTyp(option.value)}
              className={`px-4 py-3 text-sm font-bold border-2 ${
                typ === option.value
                  ? "bg-hbo-dunkel text-weiss border-hbo-dunkel"
                  : "bg-transparent text-hbo-dunkel border-hbo-dunkel/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="nachricht" className="block text-sm font-bold mb-2">
            Magst du uns mehr erzaehlen? (optional)
          </label>
          <textarea
            id="nachricht"
            value={nachricht}
            onChange={(event) => setNachricht(event.target.value)}
            rows={5}
            className="w-full border-2 border-schwarz/20 p-4 font-body"
          />
        </div>

        <Button type="submit">Absenden</Button>
      </form>
    </div>
  );
}
