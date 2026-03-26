"use client";

import clsx from "clsx";

export type FilterCategory = "all" | "lookbook" | "editorial" | "campaign" | "details";

const tabs: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "lookbook", label: "Lookbook" },
  { value: "editorial", label: "Editorial" },
  { value: "campaign", label: "Campaign" },
  { value: "details", label: "Details" },
];

interface CategoryTabsProps {
  selected: FilterCategory;
  onChange: (category: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

export default function CategoryTabs({ selected, onChange, counts }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 md:gap-0">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "relative px-4 md:px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-200",
            selected === tab.value
              ? "text-ink-900 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-ink-900"
              : "text-ink-400 hover:text-ink-700"
          )}
        >
          {tab.label}
          {counts[tab.value] > 0 && tab.value !== "all" && (
            <span
              className={clsx(
                "ml-1.5 text-[9px] transition-colors duration-200",
                selected === tab.value ? "text-ink-400" : "text-ink-200"
              )}
            >
              {counts[tab.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
