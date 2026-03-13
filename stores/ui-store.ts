import { create } from "zustand";
import type { UiState } from "@/types/store";

export const useUiStore = create<UiState>((set) => ({
  role: "viewer",
  toggleRole: () =>
    set((state) => ({
      role: state.role === "viewer" ? "admin" : "viewer",
    })),
  setRole: (role) => set({ role }),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  insightPanelOpen: false,
  setInsightPanelOpen: (open) => set({ insightPanelOpen: open }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
