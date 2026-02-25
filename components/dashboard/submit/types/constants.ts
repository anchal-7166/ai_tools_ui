
import { BillingCycle, PlatformType, PricingType, TargetAudience, } from "../renders/types";




export const CATEGORIES = [
  { id: 'c1', name: 'Productivity' },
  { id: 'c2', name: 'Developer Tools' },
  { id: 'c3', name: 'Design' },
  { id: 'c4', name: 'Analytics' },
  { id: 'c5', name: 'Writing' },
  { id: 'c6', name: 'Image & Video' },
  { id: 'c7', name: 'Audio' },
  { id: 'c8', name: 'Marketing' },
];

export const TAGS = [
  { id: 't1',  name: 'NLP' },
  { id: 't2',  name: 'Code Generation' },
  { id: 't3',  name: 'Image Generation' },
  { id: 't4',  name: 'Automation' },
  { id: 't5',  name: 'Chatbot' },
  { id: 't6',  name: 'API' },
  { id: 't7',  name: 'Open Source' },
  { id: 't8',  name: 'Real-time' },
  { id: 't9',  name: 'No-code' },
  { id: 't10', name: 'Data' },
];

export const USE_CASES = [
  { id: 'u1', name: 'Content Creation' },
  { id: 'u2', name: 'Code Review' },
  { id: 'u3', name: 'Data Analysis' },
  { id: 'u4', name: 'Customer Support' },
  { id: 'u5', name: 'Research' },
  { id: 'u6', name: 'Design Assets' },
  { id: 'u7', name: 'Email Writing' },
  { id: 'u8', name: 'SEO Optimization' },
];

export const INDUSTRIES = [
  { id: 'i1', name: 'Technology' },
  { id: 'i2', name: 'Healthcare' },
  { id: 'i3', name: 'Education' },
  { id: 'i4', name: 'Finance' },
  { id: 'i5', name: 'E-commerce' },
];

export const STEPS = [
  { id: 1, title: 'Basic Info',  desc: 'Name, tagline & description' },
  { id: 2, title: 'Details',     desc: 'URLs, platform & audience' },
  { id: 3, title: 'Categories',  desc: 'Tags, use cases & industry' },
  { id: 4, title: 'Pricing',     desc: 'Plans & billing options' },
  { id: 5, title: 'Media',       desc: 'Screenshots & integrations' },
  { id: 6, title: 'Review',      desc: 'Preview & submit' },
];

export const PRICING_TYPES: { value: PricingType; label: string }[] = [
  { value: 'FREE',         label: 'Free' },
  { value: 'FREEMIUM',     label: 'Freemium' },
  { value: 'SUBSCRIPTION', label: 'Subscription' },
  { value: 'ONE_TIME',     label: 'One-time Payment' },
  { value: 'CONTACT',      label: 'Contact for Pricing' },
];

export const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: 'MONTHLY',  label: 'Monthly' },
  { value: 'YEARLY',   label: 'Yearly' },
  { value: 'LIFETIME', label: 'Lifetime' },
];

export const PLATFORM_TYPES: PlatformType[] = [
  'WEB', 'MOBILE', 'DESKTOP', 'API', 'BROWSER_EXTENSION',
];

export const AUDIENCES: TargetAudience[] = [
  'DEVELOPERS', 'MARKETERS', 'DESIGNERS', 'WRITERS',
  'STUDENTS', 'BUSINESS', 'RESEARCHERS', 'EDUCATORS',
];