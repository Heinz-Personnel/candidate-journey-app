import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-wrap px-6 md:px-12 py-12">{children}</main>
    </div>
  );
}
