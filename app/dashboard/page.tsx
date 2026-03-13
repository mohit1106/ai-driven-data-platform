"use client";

import { TenantSwitcher } from "@/components/dashboard/tenant-switcher";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { Charts } from "@/components/dashboard/charts";
import { DataTable } from "@/components/dashboard/data-table";
import { Pagination } from "@/components/dashboard/pagination";
import { InsightPanel } from "@/components/dashboard/insight-panel";
import { AiQueryBar } from "@/components/dashboard/ai-query-bar";
import { Chatbot } from "@/components/dashboard/chatbot";
import { useUiStore } from "@/stores/ui-store";

export default function DashboardPage() {
  const { insightPanelOpen } = useUiStore();

  return (
    <div className="space-y-4">
      {/* Tenant Switcher */}
      <TenantSwitcher />

      {/* AI Query Bar */}
      <AiQueryBar />

      {/* Filters */}
      <FilterBar />

      {/* Main content area with optional AI panel */}
      <div className={`grid gap-4 ${insightPanelOpen ? "lg:grid-cols-[1fr_350px]" : "grid-cols-1"}`}>
        <div className="space-y-4 min-w-0">
          {/* Analytics Cards */}
          <AnalyticsCards />

          {/* Charts */}
          <Charts />

          {/* Data Table */}
          <DataTable />

          {/* Pagination */}
          <Pagination />
        </div>

        {/* AI Insight Panel */}
        {insightPanelOpen && (
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <InsightPanel />
            </div>
          </div>
        )}
      </div>

      {/* Mobile AI Panel */}
      {insightPanelOpen && (
        <div className="lg:hidden">
          <InsightPanel />
        </div>
      )}
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
