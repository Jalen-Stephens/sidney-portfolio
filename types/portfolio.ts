export type PortfolioCategory = "lookbook" | "editorial" | "campaign" | "details";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  /** Resolved image URL. Swap source in lib/assets.ts for ImageKit integration. */
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
  featured: boolean;
  year?: number;
  tags?: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  year: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}
