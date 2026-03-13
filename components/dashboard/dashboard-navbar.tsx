"use client";

import Link from "next/link";
import { BarChart3, Command, Sparkles, Shield, Eye, LogOut, User } from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";
import { cn } from "@/lib/utils/cn";

export function DashboardNavbar() {
  const { setCommandPaletteOpen, insightPanelOpen, setInsightPanelOpen } = useUiStore();
  const { user, role, isConfigured, signOut } = useAuthStore();
  const { activeTenant } = useTenantStore();
  const config = getDatasetConfig(activeTenant);

  // Fallback role toggling when Supabase is not configured
  const { toggleRole } = useUiStore();
  const displayRole = isConfigured ? role : useUiStore.getState().role;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5" style={{ background: "rgba(9, 9, 11, 0.9)", backdropFilter: "blur(16px)" }}>
      <div className="flex h-14 items-center justify-between px-4 lg:px-8 xl:px-12">
        {/* Left: Logo + Dataset name */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <BarChart3 className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold hidden sm:inline">
              Bharat<span className="text-orange-400">Insight</span>
            </span>
          </Link>
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <span className="text-sm text-zinc-400 hidden sm:inline truncate max-w-[250px]">
            {config.shortName}
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Command palette trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-300"
          >
            <Command className="h-3 w-3" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* AI Insights toggle */}
          <button
            onClick={() => setInsightPanelOpen(!insightPanelOpen)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all",
              insightPanelOpen
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
            )}
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">AI Insights</span>
          </button>

          {/* Role display / toggle */}
          {isConfigured && user ? (
            // Supabase authenticated — show user info
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs",
                displayRole === "admin"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "border border-white/10 bg-white/5 text-zinc-400"
              )}>
                {displayRole === "admin" ? (
                  <Shield className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
                <span className="hidden sm:inline capitalize">{displayRole}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-zinc-400">
                <User className="h-3 w-3" />
                <span className="max-w-[120px] truncate">{user.email}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all"
                title="Sign Out"
              >
                <LogOut className="h-3 w-3" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            // Supabase not configured — manual role toggle
            <button
              onClick={toggleRole}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all",
                displayRole === "admin"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
              )}
            >
              {displayRole === "admin" ? (
                <Shield className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
              <span className="hidden sm:inline capitalize">{displayRole}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
