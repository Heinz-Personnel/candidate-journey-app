"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mockProgress, mockRoadmapSteps } from "@/lib/mock-data";
import type { RoadmapProgressStatus } from "@/lib/database.types";

function statusLabel(status: RoadmapProgressStatus) {
  if (status === "erledigt") return "Erledigt";
  if (status === "in_bearbeitung") return "Aktuell";
  return "Offen";
}

function statusTextClasses(status: RoadmapProgressStatus) {
  if (status === "erledigt") return "text-hbo-dunkel";
  if (status === "in_bearbeitung") return "text-orange";
  return "text-schwarz/50";
}

function statusDotClasses(status: RoadmapProgressStatus) {
  if (status === "erledigt") return "bg-hbo-dunkel";
  if (status === "in_bearbeitung") return "bg-orange animate-pulse-dot";
  return "bg-schwarz/20";
}

export default function RoadmapPage() {
  const [openSteps, setOpenSteps] = useState<Set<string>>(new Set());

  function toggleStep(id: string) {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Deine Anerkennung</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">Roadmap</h1>
      </div>

      <ol className="space-y-2">
        {mockRoadmapSteps.map((step, index) => {
          const progress = mockProgress.find((p) => p.template_step_id === step.id);
          const status = progress?.status ?? "offen";
          const isOpen = openSteps.has(step.id);

          return (
            <li
              key={step.id}
              className="animate-fade-up border-l-4 border-hbo-mittel"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <button
                type="button"
                onClick={() => toggleStep(step.id)}
                aria-expanded={isOpen}
                className="w-full flex flex-wrap items-center gap-4 pl-6 py-4 text-left hover:bg-hbo-dunkel/5 transition-colors"
              >
                <span
                  className={`h-3 w-3 flex-shrink-0 rounded-full ${statusDotClasses(status)}`}
                  aria-hidden
                />
                <span className="font-headline uppercase text-sm text-hbo-dunkel">
                  Phase {step.phase_code}
                </span>
                <span className="font-bold">{step.titel}</span>
                <span className={`text-sm font-semibold uppercase ${statusTextClasses(status)}`}>
                  {statusLabel(status)}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[60ch] pb-4 pl-6 text-schwarz/80">{step.beschreibung}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
