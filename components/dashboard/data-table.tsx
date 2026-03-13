"use client";

import { useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Download, Trash2, Pencil } from "lucide-react";
import { useDataset } from "@/hooks/use-dataset";
import { useDatasetMeta } from "@/hooks/use-dataset";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils/cn";
import { parseNumeric, formatIndianNumber } from "@/lib/utils/format";

export function DataTable() {
  const { data, isLoading, isError } = useDataset();
  const { data: meta } = useDatasetMeta();
  const { role } = useUiStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null);
  const [localEdits, setLocalEdits] = useState<Record<string, Record<string, string>>>({});
  const [deletedRows, setDeletedRows] = useState<Set<number>>(new Set());
  const parentRef = useRef<HTMLDivElement>(null);

  // Dynamic columns from API metadata
  const columns: ColumnDef<Record<string, string | number>>[] = useMemo(() => {
    if (!meta?.fields) return [];

    const cols: ColumnDef<Record<string, string | number>>[] = meta.fields.map(
      (field) => ({
        accessorKey: field.id,
        header: field.name,
        cell: ({ row, getValue }) => {
          const rowIndex = row.index;
          const value = localEdits[rowIndex]?.[field.id] ?? String(getValue() ?? "");

          if (editingCell?.row === rowIndex && editingCell?.col === field.id && role === "admin") {
            return (
              <input
                autoFocus
                defaultValue={value}
                className="w-full bg-transparent border border-orange-500/50 rounded px-1 py-0.5 text-xs outline-none"
                onBlur={(e) => {
                  setLocalEdits((prev) => ({
                    ...prev,
                    [rowIndex]: {
                      ...(prev[rowIndex] || {}),
                      [field.id]: e.target.value,
                    },
                  }));
                  setEditingCell(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  if (e.key === "Escape") setEditingCell(null);
                }}
              />
            );
          }

          // Format numeric fields
          if (field.type === "double") {
            const num = parseNumeric(value);
            return (
              <span className="font-mono text-xs tabular-nums">
                {num > 0 ? formatIndianNumber(num) : value}
              </span>
            );
          }

          return <span className="text-xs">{value}</span>;
        },
        enableSorting: true,
      })
    );

    // Add actions column for admin
    if (role === "admin") {
      cols.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-1">
            <button
              onClick={() =>
                setEditingCell({ row: row.index, col: meta!.fields[0].id })
              }
              className="p-1 rounded hover:bg-white/10 text-zinc-500 hover:text-zinc-300"
            >
              <Pencil className="h-3 w-3" />
            </button>
            <button
              onClick={() =>
                setDeletedRows((prev) => new Set([...prev, row.index]))
              }
              className="p-1 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ),
        enableSorting: false,
      });
    }

    return cols;
  }, [meta?.fields, role, editingCell, localEdits]);

  // Filter out deleted rows
  const tableData = useMemo(() => {
    if (!data?.records) return [];
    return data.records.filter((_, i) => !deletedRows.has(i));
  }, [data?.records, deletedRows]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  // Export CSV
  const handleExport = () => {
    if (!data?.records || !meta?.fields) return;
    const headers = meta.fields.map((f) => f.name).join(",");
    const csvRows = tableData.map((row) =>
      meta.fields.map((f) => `"${String(row[f.id] || "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bharat-insight-export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="glass rounded-xl gradient-border overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <div className="skeleton h-8 w-64 rounded-lg" />
        </div>
        <div className="p-4 space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass rounded-xl p-8 text-center gradient-border">
        <p className="text-red-400 text-sm">Failed to load data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl gradient-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-3 border-b border-white/5">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search across all columns..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-300 placeholder-zinc-600 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">
            {rows.length} rows
          </span>
          {role === "admin" && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-300 transition-colors"
            >
              <Download className="h-3 w-3" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: "640px" }}
      >
        <table className="data-table w-full text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "px-4 py-3 text-xs font-medium text-zinc-400 border-b border-white/5 whitespace-nowrap select-none",
                      header.column.getCanSort() && "cursor-pointer hover:text-zinc-200"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-zinc-600">
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="h-3 w-3 text-orange-400" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="h-3 w-3 text-orange-400" />
                          ) : (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-zinc-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              <>
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      style={{
                        height: `${virtualRow.size}px`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2.5 whitespace-nowrap"
                          onDoubleClick={() => {
                            if (role === "admin" && cell.column.id !== "actions") {
                              setEditingCell({
                                row: virtualRow.index,
                                col: cell.column.id,
                              });
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
