"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchDataset } from "@/lib/api/client";
import { useTenantStore } from "@/stores/tenant-store";
import { getDatasetConfig } from "@/lib/datasets/registry";

const PAGE_SIZE = 100;

export function useDataset() {
  const { activeTenant, activeFilters, page } = useTenantStore();
  const config = getDatasetConfig(activeTenant);

  return useQuery({
    queryKey: ["dataset", activeTenant, page, activeFilters],
    queryFn: () =>
      fetchDataset(config.datasetId, {
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
        filters: activeFilters,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: 2,
  });
}

export function useDatasetMeta() {
  const { activeTenant } = useTenantStore();
  const config = getDatasetConfig(activeTenant);

  return useQuery({
    queryKey: ["dataset-meta", activeTenant],
    queryFn: () =>
      fetchDataset(config.datasetId, {
        limit: 1,
        offset: 0,
      }),
    staleTime: 30 * 60 * 1000,
    select: (data) => ({
      fields: data.field,
      total: data.total,
      title: data.title,
      org: data.org,
    }),
  });
}

export { PAGE_SIZE };
