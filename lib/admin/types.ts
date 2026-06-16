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
  education?: ResumeEducation[];
  experience?: ResumeExperience[];
  skills?: SkillGroup[];
  exhibitions?: Exhibition[];
  socialLinks?: SocialLink[];
  inspirations?: string[];
}
