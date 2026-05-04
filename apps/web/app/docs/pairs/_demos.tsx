"use client";
import { useState } from "react";
import { FilterBar } from "@disenio/ui";

export function FilterBarDemo() {
  const [chips, setChips] = useState(["Status: open", "Sort: newest", "Owner: Ana"]);
  return (
    <FilterBar className="w-full">
      {chips.map((c) => (
        <FilterBar.Chip key={c} onRemove={() => setChips((curr) => curr.filter((x) => x !== c))}>
          {c}
        </FilterBar.Chip>
      ))}
      {chips.length === 0 ? (
        <span className="text-xs text-[var(--ds-muted)] mono px-1">no filters</span>
      ) : (
        <FilterBar.ClearAll onClear={() => setChips([])} />
      )}
    </FilterBar>
  );
}
