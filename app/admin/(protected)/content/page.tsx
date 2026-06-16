import { getSiteContent } from "@/lib/db/site-content";
import SiteContentForm from "@/components/admin/SiteContentForm";

export const metadata = { title: "Site content — Studio", robots: { index: false } };

export default async function AdminContentPage() {
  const s = await getSiteContent();

  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-blush-400 mb-3">
        Manage
      </p>
      <h1 className="font-display font-light text-4xl text-ink-900 mb-2">Site content</h1>
      <p className="text-sm font-sans text-ink-400 mb-4">
        Bio, philosophy, résumé, and links shown across the public site.
      </p>

      <SiteContentForm
        initial={{
          name: s.name,
          firstName: s.firstName,
          lastName: s.lastName,
          title: s.title,
          location: s.location,
          email: s.email,
          bio: s.bio,
          bioExtended: s.bioExtended,
          philosophy: s.philosophy,
          inspirations: s.inspirations,
          socialLinks: s.socialLinks,
          experience: s.experience,
          education: s.education,
          skills: s.skills,
          exhibitions: s.exhibitions,
        }}
      />
    </div>
  );
}
