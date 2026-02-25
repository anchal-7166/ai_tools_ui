'use client';


import { useAllMetadata } from '@/lib/hooks/use-metadata';
import { FormData, CreateSubmissionPayload, ApiUseCase } from '../renders/types';
import { useCreateSubmission } from '@/lib/hooks/use-submissions';

// ── UUID v4 validator ─────────────────────────────────────────────────────
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUUID  = (v: string) => UUID_RE.test(v);
const filterUUIDs = (arr: string[]): string[] => arr.filter(isUUID);

// ── Pre-flight validation ─────────────────────────────────────────────────
// Call this BEFORE mutate() to catch stale/invalid IDs on the client,
// showing a readable error instead of a cryptic NestJS class-validator dump.
export function validateBeforeSubmit(form: FormData): string[] {
  const errors: string[] = [];

  if (form.categoryIds.some(id => !isUUID(id)))
    errors.push('Invalid category selection — please open Step 3 and reselect your categories.');
  if (form.tagIds.some(id => !isUUID(id)))
    errors.push('Invalid tag selection — please open Step 3 and reselect your tags.');
  if (form.useCaseIds.some(id => !isUUID(id)))
    errors.push('Invalid use case selection — please open Step 3 and reselect your use cases.');
  if (form.industryIds.some(id => !isUUID(id)))
    errors.push('Invalid industry selection — please open Step 3 and reselect your industries.');

  return errors;
}

export function useSubmitTool() {

  // ── Remote data ───────────────────────────────────────────────────────
  const {
    categories,
    tags,
    industries,
    useCases,
    enums,
    isLoading: taxonomyLoading,
    isError:   taxonomyError,
  } = useAllMetadata();

  // Normalise useCases: backend returns "title", EntitySelect expects "name"
  const normalisedUseCases = (useCases as ApiUseCase[]).map(uc => ({
    id:   uc.id,
    name: uc.title,
  }));

  const platformTypeOptions   = enums?.platformTypes    ?? [];
  const targetAudienceOptions = enums?.targetAudiences  ?? [];
  const pricingTypeOptions    = enums?.pricingTypes     ?? [];
  const billingCycleOptions   = enums?.billingCycles    ?? [];

  // ── Mutation ──────────────────────────────────────────────────────────
  const mutation = useCreateSubmission();

  // ── Form → DTO mapping ────────────────────────────────────────────────
  /**
   * Maps FormData → CreateSubmissionPayload.
   *
   * Key operations:
   *  - strips plan.id        (React key only — not in NestJS DTO)
   *  - strips submissionNote (UI-only — not in NestJS DTO)
   *  - omits empty strings   (avoids @IsUrl() failures on "")
   *  - filterUUIDs() on all ID arrays — ensures @IsUUID() never fails
   *    even if stale non-UUID values somehow ended up in form state
   */
  function buildPayload(form: FormData): CreateSubmissionPayload {
    const optional = (v?: string) => (v && v.trim() !== '' ? v : undefined);

    // Filter every ID array — only valid UUIDs reach the backend.
    // validateBeforeSubmit() surfaces bad IDs to the user before this runs.
    const safeCategories = filterUUIDs(form.categoryIds);
    const safeTags       = filterUUIDs(form.tagIds);
    const safeUseCases   = filterUUIDs(form.useCaseIds);
    const safeIndustries = filterUUIDs(form.industryIds);

    return {
      // Required
      name:        form.name,
      slug:        form.slug,
      tagline:     form.tagline,
      description: form.description,

      // Optional strings — omit entirely if empty (avoids @IsUrl() on "")
      longDescription:  optional(form.longDescription),
      logo:             optional(form.logo),
      websiteUrl:       optional(form.websiteUrl),
      demoUrl:          optional(form.demoUrl),
      documentationUrl: optional(form.documentationUrl),
      videoUrl:         optional(form.videoUrl),
      aiModel:          optional(form.aiModel),

      // Enum arrays — omit if empty
      platformType:   form.platformType.length   ? form.platformType   : undefined,
      targetAudience: form.targetAudience.length ? form.targetAudience : undefined,
      searchKeywords: form.searchKeywords.length ? form.searchKeywords : undefined,

      // Relation IDs — UUID-safe, omit if empty after filtering
      categoryIds: safeCategories.length ? safeCategories : undefined,
      tagIds:      safeTags.length       ? safeTags       : undefined,
      useCaseIds:  safeUseCases.length   ? safeUseCases   : undefined,
      industryIds: safeIndustries.length ? safeIndustries : undefined,

      // Pricing plans — strip React "id" key, not part of NestJS DTO
      pricingPlans: form.pricingPlans.map(({ id: _reactKey, ...rest }) => ({
        ...rest,
        description:  optional(rest.description),
        billingCycle: rest.billingCycle || undefined,
        features:     rest.features.filter(f => f.trim() !== ''),
      })),

      // Screenshots — skip entries with no URL
      screenshots: form.screenshots
        .filter(s => s.url.trim() !== '')
        .map(s => ({
          url:     s.url,
          caption: optional(s.caption),
          order:   s.order,
        })),

      // Integrations — skip entries with no name
      integrations: form.integrations
        .filter(i => i.name.trim() !== '')
        .map(i => ({
          name:        i.name,
          description: optional(i.description),
          logo:        optional(i.logo),
          url:         optional(i.url),
        })),
    };
  }

  return {
    // Taxonomy
    categories,
    tags,
    industries,
    useCases: normalisedUseCases,
    // Enum option arrays
    platformTypeOptions,
    targetAudienceOptions,
    pricingTypeOptions,
    billingCycleOptions,
    // States
    taxonomyLoading,
    taxonomyError,
    // Mutation
    mutate:      mutation.mutate,
    isPending:   mutation.isPending,
    isSuccess:   mutation.isSuccess,
    submitError: mutation.error,
    // Helpers
    buildPayload,
    validateBeforeSubmit,
  };
}