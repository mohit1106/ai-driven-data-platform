import { create } from "zustand";
import type { TenantState } from "@/types/store";
import { DEFAULT_TENANT } from "@/lib/datasets/registry";

export const useTenantStore = create<TenantState>((set) => ({
  activeTenant: DEFAULT_TENANT,
  setTenant: (id: string) =>
    set({
      activeTenant: id,
      activeFilters: {},
      page: 0,
    }),
  activeFilters: {},
  setFilter: (key: string, value: string) =>
    set((state) => ({
      activeFilters: { ...state.activeFilters, [key]: value },
      page: 0,
    })),
  removeFilter: (key: string) =>
    set((state) => {
      const next = { ...state.activeFilters };
      delete next[key];
      return { activeFilters: next, page: 0 };
    }),
  clearFilters: () => set({ activeFilters: {}, page: 0 }),
  page: 0,
  setPage: (page: number) => set({ page }),
  resetPage: () => set({ page: 0 }),
}));
