"use client";

import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[var(--background)]">
        <DashboardNavbar />
        <main className="mx-auto max-w-[1600px] px-4 lg:px-8 xl:px-12 py-6">
          {children}
        </main>
        <CommandPalette />
      </div>
    </AuthGuard>
  );
}
