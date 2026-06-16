import HeroSection from "@/components/home/HeroSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import CategoryPreview from "@/components/home/CategoryPreview";
import { getSiteContent } from "@/lib/db/site-content";
import { getFeaturedSections, getCategoryCards } from "@/lib/home-content";

export default async function HomePage() {
  const [site, sections, categories] = await Promise.all([
    getSiteContent(),
    getFeaturedSections(),
    getCategoryCards(),
  ]);

  return (
    <>
      <HeroSection heroImageUrl={site.heroImageUrl} philosophy={site.philosophy} />
      <FeaturedWork sections={sections} />
      <CategoryPreview categories={categories} />
    </>
  );
}
