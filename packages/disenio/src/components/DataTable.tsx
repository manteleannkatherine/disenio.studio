"use client";
import * as React from "react";
import { cn } from "../utils/cn";

/**
 * DataTable (lite) — sortable headers + free-text filter, no virtualization.
 * Pass any rows; declare columns with an accessor (string key or function) and
 * optional cell renderer. Built for ≤ 5,000 rows; for more, drop a virtualized variant.
 *
 *   <DataTable
 *     data={users}
 *     columns={[
 *       { id: "name", header: "Name", accessor: "name", sortable: true },
 *       { id: "email", header: "Email", accessor: "email" },
 *       { id: "role", header: "Role", accessor: (u) => u.role.toUpperCase() },
 *     ]}
 *     searchable
 *   />
 */

export interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  /** Custom cell render. Defaults to the accessor's output. */
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  /** Override sort key extractor (defaults to accessor). */
  sortValue?: (row: T) => string | number | Date;
  align?: "left" | "right" | "center";
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Stable id getter — defaults to row index. */
  rowKey?: (row: T, index: number) => React.Key;
  /** Render when filtered results are empty. */
  empty?: React.ReactNode;
  className?: string;
  /** Page size; pass undefined to disable paging. */
  pageSize?: number;
}

function getValue<T>(row: T, accessor: DataTableColumn<T>["accessor"]): React.ReactNode {
  if (typeof accessor === "function") return accessor(row);
  return row[accessor] as React.ReactNode;
}

function getSortValue<T>(row: T, col: DataTableColumn<T>): string | number | Date {
  if (col.sortValue) return col.sortValue(row);
  if (typeof col.accessor === "function") return String(col.accessor(row) ?? "");
  const v = row[col.accessor];
  if (typeof v === "number" || v instanceof Date) return v;
  return String(v ?? "");
}

export function DataTable<T>({
  data,
  columns,
  searchable,
  searchPlaceholder = "Search…",
  rowKey,
  empty,
  className,
  pageSize,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{ id: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);

  // Filter
  const filtered = React.useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const v = getValue(row, col.accessor);
        return String(v ?? "").toLowerCase().includes(q);
      }),
    );
  }, [data, columns, query]);

  // Sort
  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.id === sort.id);
    if (!col) return filtered;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = getSortValue(a, col);
      const bv = getSortValue(b, col);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [filtered, sort, columns]);

  // Page
  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const paged = pageSize ? sorted.slice(page * pageSize, page * pageSize + pageSize) : sorted;

  React.useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [page, totalPages]);

  const onHeader = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    setSort((curr) => {
      if (!curr || curr.id !== col.id) return { id: col.id, dir: "asc" };
      if (curr.dir === "asc") return { id: col.id, dir: "desc" };
      return null;
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {searchable && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-muted)] text-sm">⌕</span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder={searchPlaceholder}
              className="w-full h-9 pl-8 pr-3 rounded-[var(--ds-field-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)] text-sm text-[var(--ds-ink)] placeholder:text-[var(--ds-muted)] outline-none focus:border-[var(--ds-ink)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-accent)_25%,transparent)] transition-[border-color,box-shadow] duration-150"
            />
          </div>
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
            {sorted.length} of {data.length}
          </span>
        </div>
      )}

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b hairline bg-[var(--ds-paper-deep)]">
                {columns.map((col) => {
                  const isSorted = sort?.id === col.id;
                  return (
                    <th
                      key={col.id}
                      style={{ textAlign: col.align ?? "left", width: col.width }}
                      className="px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal"
                    >
                      {col.sortable ? (
                        <button
                          type="button"
                          onClick={() => onHeader(col)}
                          className="inline-flex items-center gap-1 hover:text-[var(--ds-ink)] transition-colors"
                        >
                          {col.header}
                          <span className="text-[var(--ds-muted)]" aria-hidden>
                            {isSorted ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}
                          </span>
                        </button>
                      ) : (
                        col.header
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-[var(--ds-muted)] text-sm">
                    {empty ?? "No results."}
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr
                    key={rowKey ? rowKey(row, i) : i}
                    className={i < paged.length - 1 ? "border-b hairline" : ""}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        style={{ textAlign: col.align ?? "left" }}
                        className="px-4 py-3 align-top text-[var(--ds-ink)]"
                      >
                        {col.cell ? col.cell(row) : getValue(row, col.accessor)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageSize && totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
            page {page + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 px-3 rounded-md border hairline text-sm disabled:opacity-50 disabled:pointer-events-none hover:bg-[var(--ds-paper-deep)] transition-colors"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="h-8 px-3 rounded-md border hairline text-sm disabled:opacity-50 disabled:pointer-events-none hover:bg-[var(--ds-paper-deep)] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
