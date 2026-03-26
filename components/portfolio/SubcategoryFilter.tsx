"use client";

import clsx from "clsx";

interface SubcategoryFilterProps {
  subcategories: { id: string; label: string }[];
  selected: string | null;
  onChange: (sub: string | null) => void;
  counts: Record<string, number>;
}

export default function SubcategoryFilter({
  subcategories,
  selected,
  onChange,
  counts,
}: SubcategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
      <button
        onClick={() => onChange(null)}
        className={clsx(
          "shrink-0 px-3.5 py-1 text-[9px] tracking-[0.2em] uppercase font-sans border transition-all duration-200",
          selected === null
            ? "border-ink-900 text-ink-900"
            : "border-ink-200 text-ink-400 hover:border-ink-400 hover:text-ink-700"
        )}
      >
        All
      </button>
      {subcategories.map((sub) => (
        <button
          key={sub.id}
          onClick={() => onChange(sub.id)}
          className={clsx(
            "shrink-0 px-3.5 py-1 text-[9px] tracking-[0.2em] uppercase font-sans border transition-all duration-200",
            selected === sub.id
              ? "border-ink-900 text-ink-900"
              : "border-ink-200 text-ink-400 hover:border-ink-400 hover:text-ink-700"
          )}
        >
          {sub.label}
          {(counts[sub.id] ?? 0) > 0 && (
            <span
              className={clsx(
                "ml-1.5 text-[8px] transition-colors duration-200",
                selected === sub.id ? "text-ink-400" : "text-ink-200"
              )}
            >
              {counts[sub.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
