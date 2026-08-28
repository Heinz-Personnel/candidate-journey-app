"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isTriggerActive, mockCandidate, mockContentItems } from "@/lib/mock-data";
import type { ContentItemKategorie } from "@/lib/database.types";

const kategorien: ContentItemKategorie[] = ["Wohnen", "Behoerden", "Alltag"];

export default function LebenInDeutschlandPage() {
  const [activeTab, setActiveTab] = useState<ContentItemKategorie>("Wohnen");
  const [checklistState, setChecklistState] = useState<Record<string, boolean[]>>(() => {
    const initial: Record<string, boolean[]> = {};
    mockContentItems.forEach((item) => {
      if (item.checklist_items) {
        initial[item.id] = item.checklist_items.map((entry) => entry.erledigt);
      }
    });
    return initial;
  });

  const bannerItem = mockContentItems.find((item) =>
    isTriggerActive(item.trigger_bedingung, mockCandidate.ankunftsdatum),
  );

  const items = mockContentItems.filter((item) => item.kategorie === activeTab);

  function toggleChecklistItem(itemId: string, index: number) {
    setChecklistState((prev) => {
      const next = [...(prev[itemId] ?? [])];
      next[index] = !next[index];
      return { ...prev, [itemId]: next };
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Alltag in Deutschland</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">
          Leben in Deutschland
        </h1>
      </div>

      {bannerItem && (
        <div className="border-l-4 border-orange bg-orange/10 p-6">
          <p className="font-bold">{bannerItem.titel}</p>
          {bannerItem.inhalt && <p className="mt-2 max-w-[60ch]">{bannerItem.inhalt}</p>}
        </div>
      )}

      <div className="flex gap-2 border-b border-schwarz/10">
        {kategorien.map((kategorie) => (
          <button
            key={kategorie}
            onClick={() => setActiveTab(kategorie)}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest ${
              activeTab === kategorie
                ? "text-hbo-dunkel border-b-2 border-hbo-dunkel"
                : "text-schwarz/50"
            }`}
          >
            {kategorie}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id}>
            <p className="font-bold text-lg mb-2">{item.titel}</p>
            {item.typ === "Artikel" && item.inhalt && (
              <p className="max-w-[60ch] text-schwarz/80">{item.inhalt}</p>
            )}
            {item.typ === "Video" && item.video_url && (
              <p className="text-sm text-hbo-basis underline">{item.video_url}</p>
            )}
            {item.typ === "Checkliste" && item.checklist_items && (
              <ul className="space-y-2">
                {item.checklist_items.map((checkItem, index) => (
                  <li key={checkItem.text} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklistState[item.id]?.[index] ?? false}
                      onChange={() => toggleChecklistItem(item.id, index)}
                      className="h-5 w-5 accent-hbo-dunkel"
                    />
                    <span>{checkItem.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-schwarz/60">Noch keine Inhalte in dieser Kategorie.</p>
        )}
      </div>
    </div>
  );
}
