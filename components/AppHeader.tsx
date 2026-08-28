"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Start" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/leben-in-deutschland", label: "Leben in Deutschland" },
  { href: "/hilfe", label: "Ich brauche Hilfe" },
  { href: "/profil", label: "Profil" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-hbo-dunkel text-weiss">
      <div className="mx-auto max-w-wrap px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
        <span className="font-headline uppercase text-lg tracking-wide">Candidate Journey</span>
        <nav className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm px-3 py-2 ${
                pathname === item.href
                  ? "text-weiss font-bold underline underline-offset-4"
                  : "text-hbo-hell hover:text-weiss"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="font-body text-sm px-3 py-2 text-hbo-hell hover:text-weiss">
            Abmelden
          </Link>
        </nav>
      </div>
    </header>
  );
}
