import { getAllCollections } from "@/lib/db/queries";
import CollectionEditor from "@/components/admin/CollectionEditor";

export const metadata = { title: "Collections — Studio", robots: { index: false } };

export default async function AdminCollectionsPage() {
  const collections = await getAllCollections();

  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
        Manage
      </p>
      <h1 className="font-display font-light text-4xl text-ink-900 mb-10">Collections</h1>

      <div className="space-y-4">
        {collections.map((c) => (
          <CollectionEditor key={c.slug} collection={c} />
        ))}
      </div>
    </div>
  );
}
