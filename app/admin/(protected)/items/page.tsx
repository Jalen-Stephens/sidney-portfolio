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
      <h1 className="font-display font-light text-4xl text-ink-900 mb-2">Work</h1>
      <p className="text-sm font-sans text-ink-400 mb-10">
        Upload images above. Below, each item has <strong className="text-ink-600 font-normal">Save</strong> and{" "}
        <strong className="text-ink-600 font-normal">Delete</strong> on the right, and a ⠿ handle on the left to drag and reorder.
      </p>

      <ItemUploader collections={collections} />
      <ItemTable items={items} collections={collections} />
    </div>
  );
}
