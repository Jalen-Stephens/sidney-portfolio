import { getAllPortfolioItems, getAllCollections } from "@/lib/db/queries";
import ItemUploader from "@/components/admin/ItemUploader";
import ItemTable from "@/components/admin/ItemTable";

export const metadata = { title: "Work — Studio", robots: { index: false } };

export default async function AdminItemsPage() {
  const [items, collections] = await Promise.all([
    getAllPortfolioItems(),
    getAllCollections(),
  ]);

  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
        Manage
      </p>
      <h1 className="font-display font-light text-4xl text-ink-900 mb-10">Work</h1>

      <ItemUploader collections={collections} />
      <ItemTable items={items} collections={collections} />
    </div>
  );
}
