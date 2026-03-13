"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { AuthModal } from "./auth-modal";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, isConfigured, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // If Supabase is not configured, skip auth and show dashboard directly
  if (!isConfigured) {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-sm text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated → show auth modal
  if (!user) {
    return <AuthModal />;
  }

  // Authenticated → render children
  return <>{children}</>;
}
