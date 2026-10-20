import type {
  ResumeEducation,
  ResumeExperience,
  SkillGroup,
  Exhibition,
  SocialLink,
} from "@/types/portfolio";

// Plain types shared with client components. Kept out of the "use server"
// module, which may only export async functions.
export interface LoginState {
  error?: string;
}

export interface ActionState {
  ok?: boolean;
  error?: string;
}

export interface NewItemInput {
  title: string;
  description: string;
  topLevelCategory: string;
  subcategory?: string;
  collectionSlug?: string | null;
  featured: boolean;
  imageUrl: string;
  blobPathname: string;
  imageWidth: number;
  imageHeight: number;
}

export interface UpdateItemInput {
  id: string;
  title?: string;
  description?: string;
  topLevelCategory?: string;
  subcategory?: string | null;
  collectionSlug?: string | null;
  featured?: boolean;
  /** Set together to replace the item's image. */
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  blobPathname?: string | null;
}

export interface NewCollectionInput {
  title: string;
  season: string;
  year: number;
  description: string;
  coverImageUrl: string;
  coverImageWidth: number;
  coverImageHeight: number;
  coverBlobPathname: string;
  coverAlt: string;
}

export interface CollectionInput {
  slug: string;
  title?: string;
  season?: string;
  year?: number;
  description?: string;
  coverAlt?: string;
  coverImageUrl?: string;
  coverImageWidth?: number;
  coverImageHeight?: number;
  coverBlobPathname?: string | null;
}

export interface SiteContentInput {
  name?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  location?: string;
  email?: string;
  bio?: string;
  bioExtended?: string;
  philosophy?: string;
  heroImageUrl?: string;
  portraitUrl?: string;
  aboutImageUrl?: string;
  aboutImages?: string[];
  resumePdfUrl?: string;
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  skills?: SkillGroup[];
  exhibitions?: Exhibition[];
  socialLinks?: SocialLink[];
  inspirations?: string[];
}
