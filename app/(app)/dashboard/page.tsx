import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { mockCandidate, mockProgress, mockRoadmapSteps } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const currentProgress =
    mockProgress.find((p) => p.status === "in_bearbeitung") ??
    mockProgress.find((p) => p.status === "offen");
  const currentStep = mockRoadmapSteps.find((s) => s.id === currentProgress?.template_step_id);

  const tageSeitAnkunft = Math.floor(
    (Date.now() - new Date(mockCandidate.ankunftsdatum).getTime()) / (1000 * 60 * 60 * 24),
  );

  const vorname = mockCandidate.name.split(" ")[0];

  return (
    <div className="space-y-12">
      <div>
        <Eyebrow>Willkommen zurueck</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">
          Hallo, {vorname}.
        </h1>
      </div>

      <div className="bg-hbo-dunkel text-weiss p-8 md:p-12">
        <Eyebrow onDark>Du stehst hier</Eyebrow>
        <p className="font-headline text-6xl md:text-7xl uppercase mt-2 mb-6">
          Tag {tageSeitAnkunft}
        </p>
        {currentStep && (
          <div>
            <p className="text-sm uppercase tracking-widest text-hbo-hell mb-2">
              Phase {currentStep.phase_code}
            </p>
            <p className="text-xl font-bold mb-2">{currentStep.titel}</p>
            <p className="max-w-[60ch] opacity-90">{currentStep.beschreibung}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <ButtonLink href="/hilfe" size="big">
          Ich brauche Hilfe
        </ButtonLink>
        <ButtonLink href="/roadmap" variant="pill">
          Ganze Roadmap ansehen
        </ButtonLink>
      </div>
    </div>
  );
}
