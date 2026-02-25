export type PricingType = 'FREE' | 'FREEMIUM' | 'PAID' | 'SUBSCRIPTION' | 'ONE_TIME' | 'USAGE_BASED' | 'CUSTOM';
export type BillingCycle = 'MONTHLY' | 'YEARLY' | 'LIFETIME' | 'PAY_AS_YOU_GO';
export type PlatformType = 'WEB' | 'MOBILE_IOS' | 'MOBILE_ANDROID' | 'DESKTOP_MAC' | 'DESKTOP_WINDOWS' | 'DESKTOP_LINUX' | 'API' | 'CLI' | 'BROWSER_EXTENSION';
export type TargetAudience = 'DEVELOPERS' | 'MARKETERS' | 'DESIGNERS' | 'WRITERS' | 'SALES_TEAMS' | 'CUSTOMER_SUPPORT' | 'DATA_ANALYSTS' | 'PRODUCT_MANAGERS' | 'STUDENTS' | 'RESEARCHERS' | 'BUSINESS_OWNERS' | 'HR_RECRUITERS';

export interface PricingPlan {
  id: string;
  name: string;
  type: PricingType;
  price?: number;
  currency: string;
  billingCycle?: BillingCycle;
  description?: string;
  features: string[];
  trialDays?: number;
  monthlyRequests?: number;
  storageLimit?: number;
}

export interface Screenshot {
  url: string;
  caption?: string;
  order: number;
}

export interface Integration {
  name: string;
  description?: string;
  logo?: string;
  url?: string;
}

export interface CreateSubmissionDto {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription?: string;
  logo?: string;
  websiteUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  videoUrl?: string;
  aiModel?: string;
  platformType: PlatformType[];
  targetAudience: TargetAudience[];
  searchKeywords: string[];
  categoryIds: string[];
  tagIds: string[];
  useCaseIds: string[];
  industryIds: string[];
  pricingPlans: PricingPlan[];
  screenshots: Screenshot[];
  integrations: Integration[];
  submissionNote?: string;
}