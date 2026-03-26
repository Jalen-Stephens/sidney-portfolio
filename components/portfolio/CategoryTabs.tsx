"use client";

import clsx from "clsx";
import { TOP_LEVEL_TAXONOMY } from "@/data/taxonomy";
import type { TopLevelCategory } from "@/types/portfolio";

export type FilterCategory = TopLevelCategory | "all";

interface CategoryTabsProps {
  selected: FilterCategory;
  onChange: (category: FilterCategory) => void;
  counts: Partial<Record<FilterCategory, number>>;
}

export default function CategoryTabs({ selected, onChange, counts }: CategoryTabsProps) {
  const tabs: { id: FilterCategory; label: string }[] = [
    { id: "all", label: "All Work" },
    ...TOP_LEVEL_TAXONOMY.map((cat) => ({ id: cat.id as FilterCategory, label: cat.label })),
  ];

  return (
    <div className="flex items-center overflow-x-auto scrollbar-none -mx-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            "relative shrink-0 px-4 md:px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-200 whitespace-nowrap",
            selected === tab.id
              ? "text-ink-900 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-ink-900"
              : "text-ink-400 hover:text-ink-700"
          )}
        >
          {tab.label}
          {tab.id !== "all" &&
            counts[tab.id] !== undefined &&
            (counts[tab.id] ?? 0) > 0 && (
              <span
                className={clsx(
                  "ml-1.5 text-[9px] transition-colors duration-200",
                  selected === tab.id ? "text-ink-400" : "text-ink-200"
                )}
              >
                {counts[tab.id]}
              </span>
            )}
        </button>
      ))}
    </div>
  );
}
