"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: echten Magic-Link-Versand ueber Supabase Auth ausloesen, sobald
    // ein Supabase-Projekt verbunden ist. Aktuell nur UI-Mock, leitet direkt
    // weiter.
    router.push("/assistent");
  }

  return (
    <div className="min-h-screen bg-hbo-dunkel text-weiss flex items-center justify-center px-6">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <Eyebrow onDark>Candidate Journey</Eyebrow>
          <h1 className="font-headline uppercase text-4xl">Willkommen.</h1>
        </div>
        <p className="opacity-90">
          Gib deine E-Mail-Adresse ein. Wir schicken dir einen Anmeldelink.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="deine@email.de"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-2 border-weiss/30 bg-transparent p-4 text-weiss placeholder:text-weiss/50 font-body"
          />
          <Button type="submit" variant="onDark" className="w-full">
            Link anfordern
          </Button>
        </form>
      </div>
    </div>
  );
}
