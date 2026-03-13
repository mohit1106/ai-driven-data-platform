// Store state types

export type UserRole = "viewer" | "admin";

export interface TenantState {
  activeTenant: string;
  setTenant: (id: string) => void;
  activeFilters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  page: number;
  setPage: (page: number) => void;
  resetPage: () => void;
}

export interface UiState {
  role: UserRole;
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  insightPanelOpen: boolean;
  setInsightPanelOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}
