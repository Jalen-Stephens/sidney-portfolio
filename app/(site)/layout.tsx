import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/db/site-content";

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
