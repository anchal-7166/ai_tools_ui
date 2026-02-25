// ── Enum strings match Prisma schema exactly ──────────────────────────────
// These come dynamically from GET /enums so we use string union types
export type PricingType =
  | 'FREE' | 'FREEMIUM' | 'PAID' | 'SUBSCRIPTION'
  | 'ONE_TIME' | 'USAGE_BASED' | 'CUSTOM';

export type BillingCycle = 'MONTHLY' | 'YEARLY' | 'LIFETIME' | 'PAY_AS_YOU_GO';

// Matches backend PlatformType enum (more granular than the old frontend ones)
export type PlatformType =
  | 'WEB' | 'MOBILE_IOS' | 'MOBILE_ANDROID'
  | 'DESKTOP_MAC' | 'DESKTOP_WINDOWS' | 'DESKTOP_LINUX'
  | 'API' | 'CLI' | 'BROWSER_EXTENSION';

// Matches backend TargetAudience enum
export type TargetAudience =
  | 'DEVELOPERS' | 'MARKETERS' | 'DESIGNERS' | 'WRITERS'
  | 'SALES_TEAMS' | 'CUSTOMER_SUPPORT' | 'DATA_ANALYSTS'
  | 'PRODUCT_MANAGERS' | 'STUDENTS' | 'RESEARCHERS'
  | 'BUSINESS_OWNERS' | 'HR_RECRUITERS';

// ── Enum option shape returned by GET /enums ──────────────────────────────
export interface EnumOption {
  value: string;
  label: string;
}

// ── Taxonomy shape returned by API ───────────────────────────────────────
export interface ApiCategory  { id: string; name: string;  slug: string; }
export interface ApiTag       { id: string; name: string;  slug: string; usageCount: number; }
export interface ApiIndustry  { id: string; name: string;  slug: string; }
// NOTE: UseCase uses "title" not "name" — match backend UseCaseResponseDto
export interface ApiUseCase   { id: string; title: string; slug: string; }

// ── Internal form shape ───────────────────────────────────────────────────
// "id" on PricingPlan is FRONTEND-ONLY (React key) — stripped before sending
export interface PricingPlan {
  id: string;            // frontend key only — NOT sent to backend
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

export interface FormData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  logo: string;
  websiteUrl: string;
  demoUrl: string;
  documentationUrl: string;
  videoUrl: string;
  aiModel: string;
  platformType: string[];     // string[] because values come from API enums
  targetAudience: string[];   // string[] because values come from API enums
  searchKeywords: string[];
  categoryIds: string[];
  tagIds: string[];
  useCaseIds: string[];
  industryIds: string[];
  pricingPlans: PricingPlan[];
  screenshots: Screenshot[];
  integrations: Integration[];
  submissionNote: string;     // UI only — NOT in CreateSubmissionDto
}

// ── What we actually POST to /submissions ────────────────────────────────
// Matches CreateSubmissionDto exactly (no id in plans, no submissionNote)
export interface CreateSubmissionPayload {
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
  platformType?: string[];
  targetAudience?: string[];
  searchKeywords?: string[];
  categoryIds?: string[];
  tagIds?: string[];
  useCaseIds?: string[];
  industryIds?: string[];
  pricingPlans: Omit<PricingPlan, 'id'>[];   // strip frontend id
  screenshots?: Screenshot[];
  integrations?: Integration[];
}