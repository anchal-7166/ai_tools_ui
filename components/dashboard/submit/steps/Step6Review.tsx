'use client';

import { cardBase, Field, Textarea } from '..';
import { FormData } from '../renders/types';

interface Props {
  form: FormData;
  set: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
  categories: { id: string; name: string }[];
  // API submission error (from mutation)
  submitError?: Error | null;
  // Client-side pre-flight UUID validation errors
  preflightErrors?: string[];
}

export default function Step6Review({ form, set, categories, submitError, preflightErrors = [] }: Props) {
  const checklist = [
    { label: 'Tool name & tagline filled',        ok: form.name.length > 0 && form.tagline.length > 0 },
    { label: 'Description ≥ 50 characters',       ok: form.description.length >= 50 },
    { label: 'Tagline ≤ 200 characters',          ok: form.tagline.length <= 200 },
    { label: 'Slug is set',                        ok: form.slug.length > 0 },
    { label: 'At least one category selected',    ok: form.categoryIds.length > 0 },
    { label: 'At least one pricing plan defined', ok: form.pricingPlans.length > 0 && form.pricingPlans.every(p => p.name) },
    { label: 'Platform types selected',           ok: form.platformType.length > 0,   optional: true },
    { label: 'Screenshots added',                 ok: form.screenshots.length > 0,    optional: true },
    { label: 'Website URL provided',              ok: form.websiteUrl.length > 0,     optional: true },
  ];

  // Parse server error messages (NestJS returns message as string | string[])
  const apiErrorMessages: string[] = (() => {
    if (!submitError) return [];
    const raw = (submitError as any)?.response?.data?.message;
    if (!raw) return [(submitError as Error).message || 'Submission failed'];
    return Array.isArray(raw) ? raw : [raw];
  })();

  // Combine both error sources — preflight shown first, then API
  const hasErrors = preflightErrors.length > 0 || apiErrorMessages.length > 0;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">

      {/* ── Error banner (preflight + API errors) ───────────────────────── */}
      {hasErrors && (
        <div className="p-3 sm:p-4 rounded-xl flex flex-col gap-1.5"
          style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)' }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-error)' }}>
              {preflightErrors.length > 0 ? 'Please fix these issues before submitting' : 'Submission failed'}
            </span>
          </div>
          <ul className="flex flex-col gap-0.5 pl-6">
            {[...preflightErrors, ...apiErrorMessages].map((msg, i) => (
              <li key={i} className="text-[10px] sm:text-xs" style={{ color: 'var(--color-error)', opacity: 0.85 }}>
                • {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Submission Checklist ─────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3" style={cardBase}>
        <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Submission Checklist
        </h2>
        <div>
          {checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3"
              style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: item.ok
                    ? 'rgba(138,18,18,0.12)'
                    : item.optional ? 'var(--color-bg-tertiary)' : 'rgba(220,38,38,0.1)',
                }}>
                {item.ok
                  ? <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  : <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      style={{ color: item.optional ? 'var(--color-text-muted)' : 'var(--color-error)' }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                }
              </div>
              <p className="text-xs sm:text-sm flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                {item.label}
              </p>
              {item.optional && !item.ok && (
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>
                  Optional
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Preview card ─────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl flex flex-col gap-3 sm:gap-4" style={cardBase}>
        <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Preview</h2>
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          {/* Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 text-base sm:text-lg font-bold overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.3))',
              border: '1px solid var(--color-border)',
              color: 'var(--color-primary-light)',
            }}>
            {form.logo
              ? <img src={form.logo} alt="logo" className="w-full h-full object-cover" />
              : (form.name[0] || '?')}
          </div>
          {/* Meta */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {form.name || 'Untitled Tool'}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              {form.tagline || 'No tagline yet'}
            </p>
            {/* Category pills — real names from API */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.categoryIds.slice(0, 3).map(id => {
                const cat = categories.find(c => c.id === id);
                if (!cat) return null;
                return (
                  <span key={id} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                    {cat.name}
                  </span>
                );
              })}
              {/* Pricing badge */}
              {form.pricingPlans.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(138,18,18,0.1)', color: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
                  {form.pricingPlans[0].type === 'FREE'
                    ? 'Free'
                    : form.pricingPlans[0].type === 'FREEMIUM'
                    ? 'Freemium'
                    : `From $${form.pricingPlans.find(p => p.price != null)?.price ?? '—'}`}
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
              {form.description || 'No description yet.'}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-3"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          {[
            { label: 'Pricing Plans', value: form.pricingPlans.length },
            { label: 'Screenshots',   value: form.screenshots.filter(s => s.url).length },
            { label: 'Tags',          value: form.tagIds.length },
            { label: 'Integrations',  value: form.integrations.filter(i => i.name).length },
          ].map(s => (
            <div key={s.label} className="text-center p-2 sm:p-3 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
              <p className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
              <p className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Note to reviewer ─────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-xl" style={cardBase}>
        <Field label="Note to Reviewer (optional)"
          hint="Explain context, audience, or anything that might not be obvious. Not sent to the API — for your reference only.">
          <Textarea value={form.submissionNote} onChange={v => set('submissionNote', v)}
            placeholder="e.g. This tool is designed for enterprise developers working with LLMs…" rows={3} />
        </Field>
      </div>
    </div>
  );
}