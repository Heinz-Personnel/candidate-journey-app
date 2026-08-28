import { Eyebrow } from "@/components/ui/Eyebrow";
import { mockCandidate } from "@/lib/mock-data";

function formatDate(dateString: string | null) {
  if (!dateString) return "Nicht angegeben";
  return new Date(dateString).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ProfilPage() {
  const fields: Array<{ label: string; value: string }> = [
    { label: "Name", value: mockCandidate.name },
    { label: "Herkunftsland", value: mockCandidate.herkunftsland },
    { label: "Berufsgruppe", value: mockCandidate.berufsgruppe },
    { label: "E-Mail", value: mockCandidate.email },
    { label: "Ankunftsdatum", value: formatDate(mockCandidate.ankunftsdatum) },
    { label: "Auflage bis", value: formatDate(mockCandidate.auflage_bis) },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Dein Profil</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel">Profil</h1>
      </div>

      <dl className="divide-y divide-schwarz/10 max-w-[60ch]">
        {fields.map((field) => (
          <div key={field.label} className="py-4 flex justify-between gap-4">
            <dt className="text-schwarz/60">{field.label}</dt>
            <dd className="font-bold text-right">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
