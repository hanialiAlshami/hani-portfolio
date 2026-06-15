export interface BilingualText {
  ar: string;
  en: string;
}

export interface SkillCategory {
  id: string;
  name: BilingualText;
  order: number;
}

export interface Skill {
  id: string;
  categoryId: string;
  name: string;
  iconClass: string;
  businessValue: BilingualText;
  order: number;
}

export interface Service {
  id: string;
  title: BilingualText;
  excerpt: BilingualText;
  description: BilingualText;
  iconClass: string;
  expectedResult: BilingualText;
  relatedTech: string[];
  order: number;
}

export interface ProjectCategory {
  id: string;
  name: BilingualText;
  slug: string;
}

export interface Project {
  id: string;
  slug: string;
  title: BilingualText;
  summary: BilingualText;
  problem: BilingualText;
  goal: BilingualText;
  solution: BilingualText;
  role: BilingualText;
  challenges: BilingualText;
  results: BilingualText;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoVideoUrl?: string;
  projectStatus: 'live' | 'private' | 'local_demo' | 'in_progress';
  projectLanguages: string[];
  projectFrameworks: string[];
  projectTools: string[];
  projectPlatforms: string[];
  isFeatured: boolean;
  categoryIds: string[];
  imageUrl: string;
  order: number;
  gallery?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  alt?: BilingualText;
  caption?: BilingualText;
  sortOrder?: number;
}

export interface ResumeSection {
  id: string;
  type: 'experience' | 'education' | 'certification';
  title: BilingualText;
  organization: BilingualText;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: BilingualText;
  order: number;
}

export type SiteSettings = {
  id: string;
  ownerName: BilingualText;
  jobTitle?: BilingualText;
  heroHeadline?: BilingualText;
  heroSubtitle?: BilingualText;
  shortBio?: BilingualText;
  email?: string;
  whatsapp?: string;
  phone?: string;
  location?: BilingualText;
  social?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
    facebook?: string;
  };
  cvUrl?: string;
  avatarImageUrl?: string;
  primaryCta?: BilingualText;
  secondaryCta?: BilingualText;
  aboutEyebrow?: BilingualText;
  aboutTitle?: BilingualText;
  aboutSubtitle?: BilingualText;
  aboutStory?: BilingualText;
  aboutFocus?: BilingualText;
  aboutTrustTitle?: BilingualText;
  aboutTrustDescription?: BilingualText;
  aboutValue1Title?: BilingualText;
  aboutValue1Description?: BilingualText;
  aboutValue2Title?: BilingualText;
  aboutValue2Description?: BilingualText;
  aboutValue3Title?: BilingualText;
  aboutValue3Description?: BilingualText;
  aboutValue4Title?: BilingualText;
  aboutValue4Description?: BilingualText;
  
  aboutAchievement1Icon?: string;
  aboutAchievement1Text?: BilingualText;
  aboutAchievement2Icon?: string;
  aboutAchievement2Text?: BilingualText;
  aboutAchievement3Icon?: string;
  aboutAchievement3Text?: BilingualText;
  aboutAchievement4Icon?: string;
  aboutAchievement4Text?: BilingualText;
};

export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived' | 'spam';

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  locale?: string;
  status: ContactMessageStatus;
  isRead: boolean;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
};
