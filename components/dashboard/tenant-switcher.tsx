"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useTenantStore } from "@/stores/tenant-store";
import { datasetList } from "@/lib/datasets/registry";
import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] || Icons.Database;
}

export function TenantSwitcher() {
  const { activeTenant, setTenant } = useTenantStore();

  return (
    <div className="flex flex-wrap gap-2">
      {datasetList.map((dataset) => {
        const Icon = getIcon(dataset.icon);
        const isActive = activeTenant === dataset.id;

        return (
          <motion.button
            key={dataset.id}
            onClick={() => setTenant(dataset.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "text-white shadow-lg"
                : "glass text-zinc-400 hover:text-zinc-200"
            )}
            style={
              isActive
                ? {
                    background: `linear-gradient(135deg, ${dataset.theme.primary}, ${dataset.theme.accent})`,
                    boxShadow: `0 4px 20px -4px ${dataset.theme.primary}`,
                  }
                : undefined
            }
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{dataset.shortName}</span>
            {isActive && (
              <motion.div
                layoutId="tenant-indicator"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${dataset.theme.primary}, ${dataset.theme.accent})`,
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
