import Link from "next/link";
import { getAllPortfolioItems, getAllCollections } from "@/lib/db/queries";

export const metadata = { title: "Studio — Sidney Riojas", robots: { index: false } };

export default async function AdminDashboardPage() {
  const [items, collections] = await Promise.all([
    getAllPortfolioItems(),
    getAllCollections(),
  ]);

  const stats = [
    { label: "Portfolio items", value: items.length, href: "/admin/items" },
    { label: "Collections", value: collections.length, href: "/admin/collections" },
    { label: "Featured", value: items.filter((i) => i.featured).length, href: "/admin/items" },
  ];

  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
        Overview
      </p>
      <h1 className="font-display font-light text-4xl text-ink-900 mb-10">Studio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="border border-ink-100 p-6 hover:border-ink-300 transition-colors"
          >
            <p className="font-display text-5xl font-light text-ink-900">{s.value}</p>
            <p className="mt-2 text-[11px] tracking-[0.18em] uppercase font-sans text-ink-400">
              {s.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
