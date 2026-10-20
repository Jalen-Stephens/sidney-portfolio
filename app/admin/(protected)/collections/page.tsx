import { getAllCollections, getAllPortfolioItems } from "@/lib/db/queries";
import CollectionList from "@/components/admin/CollectionList";
import CollectionCreator from "@/components/admin/CollectionCreator";

export const metadata = { title: "Collections — Studio", robots: { index: false } };

export default async function AdminCollectionsPage() {
  const [collections, items] = await Promise.all([getAllCollections(), getAllPortfolioItems()]);
  const itemCounts: Record<string, number> = {};
  for (const i of items) if (i.collection) itemCounts[i.collection] = (itemCounts[i.collection] ?? 0) + 1;

  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
        Manage
      </p>
      <h1 className="font-display font-light text-4xl text-ink-900 mb-2">Collections</h1>
      <p className="text-sm font-sans text-ink-400 mb-8">
        Create, edit, reorder, or remove collections. Add images to a collection from the Work page. Deleting a collection keeps its images.
      </p>

      <CollectionCreator />

      <CollectionList collections={collections} itemCounts={itemCounts} />
    </div>
  );
}
