// src/types/tool.types.ts
export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription?: string;
  websiteUrl: string;
  demoUrl?: string;
  logo?: string;
  aiModel?: string;
  platformType: string[];
  targetAudience: string[];
  searchKeywords?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isPublished: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  averageRating: number;
  reviewCount: number;
  viewCount: number;
  weeklyViews: number;
  monthlyViews: number;
  clickCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  categories?: ToolCategory[];
  tags?: ToolTag[];
  pricingPlans?: PricingPlan[];
  screenshots?: Screenshot[];
}

export interface ToolCategory {
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ToolTag {
  tag: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  type: 'FREE' | 'FREEMIUM' | 'SUBSCRIPTION' | 'ONE_TIME';
  price: number;
  billingCycle?: 'MONTHLY' | 'YEARLY';
  features: string[];
}

export interface Screenshot {
  id: string;
  url: string;
  caption?: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  toolCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  toolCount?: number;
}

export interface FilterOption {
  id: string;
  name: string;
  path: string;
  type: 'select' | 'multiselect' | 'range' | 'boolean';
  options?: { value: string; label: string }[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ToolsResponse {
  data: Tool[];
  meta: PaginationMeta;
}

export interface FilterQuery {
  page?: number;
  limit?: number;
  sort?: {
    orderBy: string;
    order: 'asc' | 'desc';
  };
  filters?: Array<{
    op: 'in' | 'contains' | 'equals' | 'gte' | 'lte';
    path: string;
    value: any;
  }>;
}