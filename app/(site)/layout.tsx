import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/db/site-content";

// Admin edits refresh pages instantly via revalidatePath; this is a safety net
// so the public site is never more than a minute behind the database.
export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteContent();
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={site.socialLinks} />
    </>
  );
}
