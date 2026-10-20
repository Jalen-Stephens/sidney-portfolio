import Link from "next/link";
import { getAllPortfolioItems, getAllCollections } from "@/lib/db/queries";
import { GALLERY_CATEGORIES, getCategoryLabel } from "@/data/taxonomy";

export const metadata = { title: "Studio — Sidney Riojas", robots: { index: false } };

export default async function AdminDashboardPage() {
  const [items, collections] = await Promise.all([
    getAllPortfolioItems(),
    getAllCollections(),
  ]);

  const galleryIds = new Set<string>(GALLERY_CATEGORIES.map((c) => c.id));
  const galleryItems = items.filter((i) => !i.collection);
  const stats = [
    { label: "Portfolio items", value: items.length, href: "/admin/items" },
    { label: "Collections", value: collections.length, href: "/admin/collections" },
    { label: "In the gallery", value: galleryItems.length, href: "/admin/items" },
  ];

  // Things that make work hard to find on the public site.
  const issues: { text: string; href: string }[] = [];
  const noTab = galleryItems.filter((i) => !galleryIds.has(i.topLevelCategory));
  if (noTab.length) {
    issues.push({
      text: `${noTab.length} image${noTab.length === 1 ? " is" : "s are"} filed under a category with no tab (${[
        ...new Set(noTab.map((i) => getCategoryLabel(i.topLevelCategory))),
      ].join(", ")}), so ${noTab.length === 1 ? "it only shows" : "they only show"} under All Work.`,
      href: "/admin/items",
    });
  }
  for (const c of collections) {
    if (!items.some((i) => i.collection === c.slug)) {
      issues.push({ text: `“${c.title}” has no images yet, so its page is empty.`, href: "/admin/items" });
    }
  }
  const untitled = items.filter((i) => /^\d+$/.test(i.title.trim()));
  if (untitled.length) {
    issues.push({
      text: `${untitled.length} image${untitled.length === 1 ? " has" : "s have"} a number for a title (from the file name).`,
      href: "/admin/items",
    });
  }

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

      {/* Health check */}
      <div className="mt-12 border-t border-ink-100 pt-8">
        <p className="eyebrow text-blush-400 mb-5">Site check</p>
        {issues.length === 0 ? (
          <p className="text-sm font-sans text-green-700">✓ Everything is placed where visitors can find it.</p>
        ) : (
          <ul className="space-y-2">
            {issues.map((issue, i) => (
              <li key={i} className="text-sm font-sans text-ink-600">
                <span className="text-blush-600 mr-2">⚠</span>
                {issue.text}{" "}
                <Link href={issue.href} className="text-ink-900 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-900">
                  Fix
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick guide */}
      <div className="mt-12 border-t border-ink-100 pt-8">
        <p className="eyebrow text-blush-400 mb-5">Where things live</p>
        <ul className="space-y-3 text-sm font-sans text-ink-600">
          <li>
            <Link href="/admin/items" className="text-ink-900 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-900">Work</Link>
            {" — "}upload images, choose where each one shows (“Shows in”), edit titles and descriptions, replace or delete images, and drag ⠿ to reorder.
          </li>
          <li>
            <Link href="/admin/collections" className="text-ink-900 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-900">Collections</Link>
            {" — "}create a collection, edit its details and cover, drag to reorder, or delete one.
          </li>
          <li>
            <Link href="/admin/content" className="text-ink-900 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-900">Site</Link>
            {" — "}home image, portrait, About gallery, résumé PDF, bio, résumé entries, and social links.
          </li>
          <li className="text-ink-400">
            Saved changes go live right away. If a page still looks old, refresh it — on iPhone/iPad, pull down to reload.
          </li>
        </ul>
      </div>
    </div>
  );
}
