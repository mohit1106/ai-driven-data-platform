"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { useUiStore } from "@/stores/ui-store";
import { useTenantStore } from "@/stores/tenant-store";
import { datasetList } from "@/lib/datasets/registry";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] || Icons.Database;
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, toggleRole, role, setInsightPanelOpen } = useUiStore();
  const { setTenant, activeTenant } = useTenantStore();
  const router = useRouter();

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
        onClick={() => setCommandPaletteOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Command dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <Command className="rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden">
            <div className="flex items-center border-b border-white/5 px-4">
              <Icons.Search className="h-4 w-4 text-zinc-500 mr-2" />
              <Command.Input
                placeholder="Type a command or search..."
                className="w-full bg-transparent py-3.5 text-sm text-zinc-300 placeholder-zinc-600 outline-none"
                autoFocus
              />
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                No results found.
              </Command.Empty>

              <Command.Group heading="Departments" className="text-xs text-zinc-500 px-2 py-1.5">
                {datasetList.map((dataset) => {
                  const Icon = getIcon(dataset.icon);
                  return (
                    <Command.Item
                      key={dataset.id}
                      value={`${dataset.name} ${dataset.shortName} ${dataset.department}`}
                      onSelect={() => {
                        setTenant(dataset.id);
                        setCommandPaletteOpen(false);
                        router.push("/dashboard");
                      }}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white"
                    >
                      <Icon className="h-4 w-4 text-zinc-500" />
                      <div className="flex-1">
                        <div className="font-medium">{dataset.shortName}</div>
                        <div className="text-xs text-zinc-600">{dataset.department}</div>
                      </div>
                      {activeTenant === dataset.id && (
                        <span className="text-[10px] font-medium text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>

              <Command.Separator className="my-1 h-px bg-white/5" />

              <Command.Group heading="Actions" className="text-xs text-zinc-500 px-2 py-1.5">
                <Command.Item
                  value="toggle role admin viewer"
                  onSelect={() => {
                    toggleRole();
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5"
                >
                  <Icons.Shield className="h-4 w-4 text-zinc-500" />
                  <span>
                    Switch to {role === "viewer" ? "Admin" : "Viewer"} role
                  </span>
                </Command.Item>
                <Command.Item
                  value="open ai insights"
                  onSelect={() => {
                    setInsightPanelOpen(true);
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5"
                >
                  <Icons.Sparkles className="h-4 w-4 text-zinc-500" />
                  <span>Open AI Insights</span>
                </Command.Item>
              </Command.Group>

              <Command.Separator className="my-1 h-px bg-white/5" />

              <Command.Group heading="Navigation" className="text-xs text-zinc-500 px-2 py-1.5">
                <Command.Item
                  value="go to landing home"
                  onSelect={() => {
                    router.push("/");
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5"
                >
                  <Icons.Home className="h-4 w-4 text-zinc-500" />
                  <span>Go to Landing Page</span>
                </Command.Item>
                <Command.Item
                  value="go to dashboard"
                  onSelect={() => {
                    router.push("/dashboard");
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 cursor-pointer data-[selected=true]:bg-white/5"
                >
                  <Icons.LayoutDashboard className="h-4 w-4 text-zinc-500" />
                  <span>Go to Dashboard</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between border-t border-white/5 px-4 py-2">
              <div className="flex gap-3 text-[10px] text-zinc-600">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </Command>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
