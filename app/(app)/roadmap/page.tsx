import { Eyebrow } from "@/components/ui/Eyebrow";
import { mockProgress, mockRoadmapSteps } from "@/lib/mock-data";
import type { RoadmapProgressStatus } from "@/lib/database.types";

function statusLabel(status: RoadmapProgressStatus) {
  if (status === "erledigt") return "Erledigt";
  if (status === "in_bearbeitung") return "Aktuell";
  return "Offen";
}

function statusClasses(status: RoadmapProgressStatus) {
  if (status === "erledigt") return "text-hbo-dunkel";
  if (status === "in_bearbeitung") return "text-orange";
  return "text-schwarz/50";
}

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Deine Anerkennung</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">Roadmap</h1>
      </div>

      <ol className="space-y-4">
        {mockRoadmapSteps.map((step) => {
          const progress = mockProgress.find((p) => p.template_step_id === step.id);
          const status = progress?.status ?? "offen";
          return (
            <li key={step.id} className="border-l-4 border-hbo-mittel pl-6 py-2">
              <details>
                <summary className="cursor-pointer flex flex-wrap items-center gap-4">
                  <span className="font-headline uppercase text-sm text-hbo-dunkel">
                    Phase {step.phase_code}
                  </span>
                  <span className="font-bold">{step.titel}</span>
                  <span className={`text-sm font-semibold uppercase ${statusClasses(status)}`}>
                    {statusLabel(status)}
                  </span>
                </summary>
                <p className="mt-3 max-w-[60ch] text-schwarz/80">{step.beschreibung}</p>
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
