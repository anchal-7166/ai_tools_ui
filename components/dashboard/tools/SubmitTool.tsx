'use client';

import { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
type PricingType = 'FREE' | 'FREEMIUM' | 'SUBSCRIPTION' | 'ONE_TIME' | 'CONTACT';
type BillingCycle = 'MONTHLY' | 'YEARLY' | 'LIFETIME';
type PlatformType = 'WEB' | 'MOBILE' | 'DESKTOP' | 'API' | 'BROWSER_EXTENSION';
type TargetAudience = 'DEVELOPERS' | 'MARKETERS' | 'DESIGNERS' | 'WRITERS' | 'STUDENTS' | 'BUSINESS' | 'RESEARCHERS' | 'EDUCATORS';

interface PricingPlan {
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

interface Screenshot { url: string; caption?: string; order: number; }
interface Integration { name: string; description?: string; logo?: string; url?: string; }

interface FormData {
  // Step 1 – Basic Info
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  logo: string;
  // Step 2 – URLs & Technical
  websiteUrl: string;
  demoUrl: string;
  documentationUrl: string;
  videoUrl: string;
  aiModel: string;
  platformType: PlatformType[];
  targetAudience: TargetAudience[];
  searchKeywords: string[];
  // Step 3 – Categories / Tags (simulated)
  categoryIds: string[];
  tagIds: string[];
  useCaseIds: string[];
  industryIds: string[];
  // Step 4 – Pricing
  pricingPlans: PricingPlan[];
  // Step 5 – Media
  screenshots: Screenshot[];
  integrations: Integration[];
  // Step 6 – Review note
  submissionNote: string;
}

// ── Mock select data (would come from API) ─────────────────────────────────
const CATEGORIES = [
  { id: 'c1', name: 'Productivity' }, { id: 'c2', name: 'Developer Tools' },
  { id: 'c3', name: 'Design' }, { id: 'c4', name: 'Analytics' },
  { id: 'c5', name: 'Writing' }, { id: 'c6', name: 'Image & Video' },
  { id: 'c7', name: 'Audio' }, { id: 'c8', name: 'Marketing' },
];
const TAGS = [
  { id: 't1', name: 'NLP' }, { id: 't2', name: 'Code Generation' }, { id: 't3', name: 'Image Generation' },
  { id: 't4', name: 'Automation' }, { id: 't5', name: 'Chatbot' }, { id: 't6', name: 'API' },
  { id: 't7', name: 'Open Source' }, { id: 't8', name: 'Real-time' }, { id: 't9', name: 'No-code' }, { id: 't10', name: 'Data' },
];
const USE_CASES = [
  { id: 'u1', name: 'Content Creation' }, { id: 'u2', name: 'Code Review' }, { id: 'u3', name: 'Data Analysis' },
  { id: 'u4', name: 'Customer Support' }, { id: 'u5', name: 'Research' }, { id: 'u6', name: 'Design Assets' },
  { id: 'u7', name: 'Email Writing' }, { id: 'u8', name: 'SEO Optimization' },
];
const INDUSTRIES = [
  { id: 'i1', name: 'Technology' }, { id: 'i2', name: 'Healthcare' }, { id: 'i3', name: 'Education' },
  { id: 'i4', name: 'Finance' }, { id: 'i5', name: 'E-commerce' },
];

const STEPS = [
  { id: 1, title: 'Basic Info', desc: 'Name, tagline & description' },
  { id: 2, title: 'Details', desc: 'URLs, platform & audience' },
  { id: 3, title: 'Categories', desc: 'Tags, use cases & industry' },
  { id: 4, title: 'Pricing', desc: 'Plans & billing options' },
  { id: 5, title: 'Media', desc: 'Screenshots & integrations' },
  { id: 6, title: 'Review', desc: 'Preview & submit' },
];

const PRICING_TYPES: { value: PricingType; label: string }[] = [
  { value: 'FREE', label: 'Free' },
  { value: 'FREEMIUM', label: 'Freemium' },
  { value: 'SUBSCRIPTION', label: 'Subscription' },
  { value: 'ONE_TIME', label: 'One-time Payment' },
  { value: 'CONTACT', label: 'Contact for Pricing' },
];
const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'YEARLY', label: 'Yearly' },
  { value: 'LIFETIME', label: 'Lifetime' },
];
const PLATFORM_TYPES: PlatformType[] = ['WEB', 'MOBILE', 'DESKTOP', 'API', 'BROWSER_EXTENSION'];
const AUDIENCES: TargetAudience[] = ['DEVELOPERS', 'MARKETERS', 'DESIGNERS', 'WRITERS', 'STUDENTS', 'BUSINESS', 'RESEARCHERS', 'EDUCATORS'];

// ── Helpers ─────────────────────────────────────────────────────────────────
const toSlug = (v: string) => v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const uid = () => Math.random().toString(36).slice(2, 9);

const inputCls: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-tertiary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
};
const labelCls: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.375rem',
  color: 'var(--color-text-muted)',
};
const cardCls: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
};

// ── Reusable Field ────────────────────────────────────────────────────────
function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelCls}>
        {label}
        {required && <span style={{ color: 'var(--color-error)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{hint}</p>}
    </div>
  );
}

// ── MultiSelect pill toggle ────────────────────────────────────────────────
function PillSelect<T extends string>({
  options, selected, onToggle, max,
}: { options: { value: T; label?: string }[] | T[]; selected: T[]; onToggle: (v: T) => void; max?: number }) {
  const items = (options as any[]).map(o => typeof o === 'string' ? { value: o, label: o } : o);
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {items.map(o => {
        const active = selected.includes(o.value);
        const disabled = !active && max !== undefined && selected.length >= max;
        return (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onToggle(o.value)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
              color: active ? 'var(--color-text-primary)' : disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
              border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.4 : 1,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ── TagInput ──────────────────────────────────────────────────────────────
function TagInput({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setInput('');
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          style={{ ...inputCls, flex: 1 }}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold shrink-0"
          style={{
            background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
            color: 'var(--color-text-primary)',
          }}
        >Add</button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map(v => (
            <span
              key={v}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
            >
              {v}
              <button type="button" onClick={() => onChange(values.filter(x => x !== v))} style={{ color: 'var(--color-text-muted)', lineHeight: 1 }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── EntitySelect (multi with search) ─────────────────────────────────────
function EntitySelect({ options, selected, onToggle, max, placeholder }: {
  options: { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  max?: number;
  placeholder?: string;
}) {
  const [search, setSearch] = useState('');
  const filtered = options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder || 'Search…'}
        style={{ ...inputCls, marginBottom: '0.5rem' }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      />
      <div className="flex flex-wrap gap-2">
        {filtered.map(o => {
          const active = selected.includes(o.id);
          const disabled = !active && max !== undefined && selected.length >= max;
          return (
            <button
              key={o.id}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onToggle(o.id)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                color: active ? 'var(--color-text-primary)' : disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1,
              }}
            >
              {o.name}
            </button>
          );
        })}
      </div>
      {max && <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>{selected.length}/{max} selected</p>}
    </div>
  );
}

// ── Input helper ─────────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = 'text', disabled }: {
  value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputCls, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text' }}
      onFocus={e => { if (!disabled) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    />
  );
}
function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputCls, resize: 'vertical', minHeight: `${rows * 1.6}rem` }}
      onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    />
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function SubmitToolPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: '', slug: '', tagline: '', description: '', longDescription: '', logo: '',
    websiteUrl: '', demoUrl: '', documentationUrl: '', videoUrl: '',
    aiModel: '', platformType: [], targetAudience: [], searchKeywords: [],
    categoryIds: [], tagIds: [], useCaseIds: [], industryIds: [],
    pricingPlans: [{ id: uid(), name: 'Free', type: 'FREE', currency: 'USD', features: [] }],
    screenshots: [], integrations: [], submissionNote: '',
  });

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const toggleArr = <T,>(key: keyof FormData, val: T) => {
    const arr = form[key] as T[];
    set(key, (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]) as any);
  };

  // Pricing helpers
  const setPlan = (id: string, patch: Partial<PricingPlan>) =>
    set('pricingPlans', form.pricingPlans.map(p => p.id === id ? { ...p, ...patch } : p));
  const addPlan = () => set('pricingPlans', [...form.pricingPlans, { id: uid(), name: '', type: 'SUBSCRIPTION', currency: 'USD', features: [] }]);
  const removePlan = (id: string) => set('pricingPlans', form.pricingPlans.filter(p => p.id !== id));
  const addFeature = (planId: string) => {
    const plan = form.pricingPlans.find(p => p.id === planId)!;
    setPlan(planId, { features: [...plan.features, ''] });
  };
  const setFeature = (planId: string, idx: number, val: string) => {
    const plan = form.pricingPlans.find(p => p.id === planId)!;
    const features = [...plan.features];
    features[idx] = val;
    setPlan(planId, { features });
  };
  const removeFeature = (planId: string, idx: number) => {
    const plan = form.pricingPlans.find(p => p.id === planId)!;
    setPlan(planId, { features: plan.features.filter((_, i) => i !== idx) });
  };

  // Screenshot helpers
  const addScreenshot = () => set('screenshots', [...form.screenshots, { url: '', caption: '', order: form.screenshots.length }]);
  const setScreenshot = (idx: number, patch: Partial<Screenshot>) =>
    set('screenshots', form.screenshots.map((s, i) => i === idx ? { ...s, ...patch } : s));
  const removeScreenshot = (idx: number) =>
    set('screenshots', form.screenshots.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));

  // Integration helpers
  const addIntegration = () => set('integrations', [...form.integrations, { name: '', description: '', logo: '', url: '' }]);
  const setIntegration = (idx: number, patch: Partial<Integration>) =>
    set('integrations', form.integrations.map((s, i) => i === idx ? { ...s, ...patch } : s));
  const removeIntegration = (idx: number) =>
    set('integrations', form.integrations.filter((_, i) => i !== idx));

  // Completeness per step
  const stepValid = [
    form.name.length > 0 && form.tagline.length > 0 && form.description.length >= 50,
    true,
    form.categoryIds.length > 0,
    form.pricingPlans.length > 0 && form.pricingPlans.every(p => p.name && p.type),
    true,
    true,
  ];
  const allValid = stepValid.every(Boolean);
  const completeness = Math.round((stepValid.filter(Boolean).length / stepValid.length) * 100);

  const handleSubmit = () => {
    if (!allValid) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
          <svg className="w-8 h-8" style={{ color: '#fff' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Tool Submitted!</h2>
        <p className="text-sm text-center max-w-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          <strong style={{ color: 'var(--color-primary-light)' }}>{form.name}</strong> has been sent for admin review. You'll receive an email within 2–3 business days.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, name: '', slug: '', tagline: '', description: '' })); }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
          >
            Submit Another
          </button>
          <a
            href="/dashboard/pending"
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}
          >
            View Pending
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Submit a Tool</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Fill in the details below. Your tool will be reviewed within 2–3 business days.
          </p>
        </div>
        {/* Completeness badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Completeness</p>
            <p className="text-lg font-bold" style={{ color: 'var(--color-primary-light)' }}>{completeness}%</p>
          </div>
          <div className="w-12 h-12 relative shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-bg-tertiary)" strokeWidth="4" />
              <circle
                cx="22" cy="22" r="18" fill="none"
                stroke="var(--color-primary-light)"
                strokeWidth="4"
                strokeDasharray={`${(completeness / 100) * 113} 113`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div style={cardCls} className="overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {STEPS.map((s, i) => {
            const done = step > s.id;
            const active = step === s.id;
            const valid = stepValid[i];
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all"
                style={{
                  backgroundColor: active ? 'rgba(138,18,18,0.08)' : 'transparent',
                  border: `1px solid ${active ? 'var(--color-primary)' : 'transparent'}`,
                  minWidth: '9rem',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                  style={{
                    backgroundColor: done ? 'var(--color-primary)' : active ? 'rgba(138,18,18,0.2)' : 'var(--color-bg-tertiary)',
                    color: done ? '#fff' : active ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                    border: `2px solid ${done ? 'var(--color-primary)' : active ? 'var(--color-primary-light)' : 'var(--color-border-light)'}`,
                  }}
                >
                  {done
                    ? <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    : s.id}
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{s.title}</p>
                  <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="h-1 rounded-full overflow-hidden mt-3" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-light))' }}
          />
        </div>
      </div>

      {/* ══ STEP 1: BASIC INFO ══════════════════════════════════════════════ */}
      {step === 1 && (
        <div style={cardCls} className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Basic Information</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Core details that identify your tool on the platform.</p>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)' }} />

          {/* Logo URL + preview */}
          <Field label="Logo URL" hint="Paste a direct image URL for your tool's logo (PNG, SVG recommended)">
            <div className="flex gap-3 items-start">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.3))', border: '1px solid var(--color-border)', color: 'var(--color-primary-light)' }}
              >
                {form.logo ? (
                  <img src={form.logo} alt="logo" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (form.name[0] || '?')}
              </div>
              <Input value={form.logo} onChange={v => set('logo', v)} placeholder="https://cdn.example.com/logo.png" />
            </div>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tool Name" required>
              <Input value={form.name} onChange={v => { set('name', v); set('slug', toSlug(v)); }} placeholder="e.g. ChatGPT" />
            </Field>
            <Field label="Slug" required hint="Auto-generated — edit if needed">
              <Input value={form.slug} onChange={v => set('slug', toSlug(v))} placeholder="e.g. chatgpt" />
            </Field>
          </div>

          <Field label="Tagline" required hint="One-line value proposition (max 200 chars)">
            <Input value={form.tagline} onChange={v => set('tagline', v)} placeholder="The most powerful AI assistant for everyone" />
            <p className="text-xs mt-1 text-right" style={{ color: form.tagline.length > 200 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
              {form.tagline.length}/200
            </p>
          </Field>

          <Field label="Short Description" required hint="Min 50 characters. Shown in search results and tool cards.">
            <Textarea value={form.description} onChange={v => set('description', v)} placeholder="Describe what your tool does, who it's for, and why it's useful…" rows={4} />
            <p className="text-xs mt-1 flex justify-between">
              <span style={{ color: form.description.length < 50 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                {form.description.length < 50 ? `${50 - form.description.length} more chars needed` : '✓ Minimum reached'}
              </span>
              <span style={{ color: 'var(--color-text-muted)' }}>{form.description.length} chars</span>
            </p>
          </Field>

          <Field label="Long Description (optional)" hint="Full markdown description shown on the tool's detail page.">
            <Textarea value={form.longDescription} onChange={v => set('longDescription', v)} placeholder="## About\n\nFull details, feature highlights, use cases…" rows={6} />
          </Field>
        </div>
      )}

      {/* ══ STEP 2: DETAILS ════════════════════════════════════════════════ */}
      {step === 2 && (
        <div style={cardCls} className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>URLs & Technical Details</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Links and technical metadata for your tool.</p>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Website URL" hint="Main product URL">
              <Input value={form.websiteUrl} onChange={v => set('websiteUrl', v)} placeholder="https://yourtool.com" />
            </Field>
            <Field label="Demo URL" hint="Live demo or playground">
              <Input value={form.demoUrl} onChange={v => set('demoUrl', v)} placeholder="https://yourtool.com/demo" />
            </Field>
            <Field label="Documentation URL">
              <Input value={form.documentationUrl} onChange={v => set('documentationUrl', v)} placeholder="https://docs.yourtool.com" />
            </Field>
            <Field label="Video URL" hint="Demo video (YouTube, Vimeo, etc.)">
              <Input value={form.videoUrl} onChange={v => set('videoUrl', v)} placeholder="https://youtube.com/watch?v=..." />
            </Field>
          </div>

          <Field label="AI Model" hint="The underlying model powering your tool (e.g. GPT-4, Claude, Llama, Custom)">
            <Input value={form.aiModel} onChange={v => set('aiModel', v)} placeholder="e.g. GPT-4o, Claude 3.5, Custom" />
          </Field>

          <Field label="Platform Types" hint="Where can users access your tool? (select all that apply)">
            <PillSelect
              options={PLATFORM_TYPES}
              selected={form.platformType}
              onToggle={v => toggleArr('platformType', v)}
            />
          </Field>

          <Field label="Target Audience" hint="Who is this tool built for? (select all that apply)">
            <PillSelect
              options={AUDIENCES.map(a => ({ value: a, label: a.charAt(0) + a.slice(1).toLowerCase() }))}
              selected={form.targetAudience}
              onToggle={v => toggleArr('targetAudience', v)}
            />
          </Field>

          <Field label="Search Keywords" hint="Add keywords that help users discover your tool. Press Enter or click Add.">
            <TagInput values={form.searchKeywords} onChange={v => set('searchKeywords', v)} placeholder="e.g. ai writing, content generation…" />
          </Field>
        </div>
      )}

      {/* ══ STEP 3: CATEGORIES ════════════════════════════════════════════ */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div style={cardCls} className="space-y-4">
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Categories</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Select up to 5 categories. First selected = primary.</p>
            </div>
            <div style={{ borderTop: '1px solid var(--color-border)' }} />
            <EntitySelect
              options={CATEGORIES}
              selected={form.categoryIds}
              onToggle={id => toggleArr('categoryIds', id)}
              max={5}
              placeholder="Search categories…"
            />
            {form.categoryIds.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Primary:</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(138,18,18,0.12)', color: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
                  {CATEGORIES.find(c => c.id === form.categoryIds[0])?.name}
                </span>
              </div>
            )}
          </div>

          <div style={cardCls} className="space-y-4">
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Tags</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Up to 10 tags that describe your tool's features.</p>
            </div>
            <div style={{ borderTop: '1px solid var(--color-border)' }} />
            <EntitySelect
              options={TAGS}
              selected={form.tagIds}
              onToggle={id => toggleArr('tagIds', id)}
              max={10}
              placeholder="Search tags…"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div style={cardCls} className="space-y-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Use Cases</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>What problems does your tool solve? (max 8)</p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)' }} />
              <EntitySelect
                options={USE_CASES}
                selected={form.useCaseIds}
                onToggle={id => toggleArr('useCaseIds', id)}
                max={8}
                placeholder="Search use cases…"
              />
            </div>
            <div style={cardCls} className="space-y-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Industries</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Which industries is your tool relevant for? (max 5)</p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)' }} />
              <EntitySelect
                options={INDUSTRIES}
                selected={form.industryIds}
                onToggle={id => toggleArr('industryIds', id)}
                max={5}
                placeholder="Search industries…"
              />
            </div>
          </div>
        </div>
      )}

      {/* ══ STEP 4: PRICING ═══════════════════════════════════════════════ */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in">
          <div style={cardCls}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Pricing Plans</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>At least one plan required. Add multiple tiers if needed.</p>
              </div>
              <button
                type="button"
                onClick={addPlan}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Plan
              </button>
            </div>

            <div className="space-y-5">
              {form.pricingPlans.map((plan, pi) => (
                <div
                  key={plan.id}
                  className="p-4 rounded-lg space-y-4"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-primary-light)' }}>
                      Plan {pi + 1}
                    </span>
                    {form.pricingPlans.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlan(plan.id)}
                        className="p-1 rounded transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Field label="Plan Name" required>
                      <Input value={plan.name} onChange={v => setPlan(plan.id, { name: v })} placeholder="e.g. Pro" />
                    </Field>
                    <Field label="Type" required>
                      <select
                        value={plan.type}
                        onChange={e => setPlan(plan.id, { type: e.target.value as PricingType })}
                        style={{ ...inputCls, cursor: 'pointer' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                      >
                        {PRICING_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
                      </select>
                    </Field>

                    {(plan.type === 'SUBSCRIPTION' || plan.type === 'ONE_TIME') && (
                      <>
                        <Field label="Price">
                          <Input type="number" value={plan.price ?? ''} onChange={v => setPlan(plan.id, { price: parseFloat(v) || 0 })} placeholder="0.00" />
                        </Field>
                        <Field label="Currency">
                          <select
                            value={plan.currency}
                            onChange={e => setPlan(plan.id, { currency: e.target.value })}
                            style={{ ...inputCls, cursor: 'pointer' }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                          >
                            {['USD', 'EUR', 'GBP', 'INR', 'JPY'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </Field>
                        {plan.type === 'SUBSCRIPTION' && (
                          <Field label="Billing Cycle">
                            <select
                              value={plan.billingCycle ?? ''}
                              onChange={e => setPlan(plan.id, { billingCycle: e.target.value as BillingCycle || undefined })}
                              style={{ ...inputCls, cursor: 'pointer' }}
                              onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                            >
                              <option value="">Select cycle</option>
                              {BILLING_CYCLES.map(bc => <option key={bc.value} value={bc.value}>{bc.label}</option>)}
                            </select>
                          </Field>
                        )}
                        <Field label="Trial Days">
                          <Input type="number" value={plan.trialDays ?? ''} onChange={v => setPlan(plan.id, { trialDays: parseInt(v) || undefined })} placeholder="0" />
                        </Field>
                      </>
                    )}

                    <Field label="Monthly Requests">
                      <Input type="number" value={plan.monthlyRequests ?? ''} onChange={v => setPlan(plan.id, { monthlyRequests: parseInt(v) || undefined })} placeholder="e.g. 10000" />
                    </Field>
                    <Field label="Storage Limit (GB)">
                      <Input type="number" value={plan.storageLimit ?? ''} onChange={v => setPlan(plan.id, { storageLimit: parseInt(v) || undefined })} placeholder="e.g. 10" />
                    </Field>
                  </div>

                  <Field label="Plan Description">
                    <Input value={plan.description ?? ''} onChange={v => setPlan(plan.id, { description: v })} placeholder="Brief description of what's included" />
                  </Field>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label style={labelCls}>Features</label>
                      <button type="button" onClick={() => addFeature(plan.id)} className="text-xs font-semibold" style={{ color: 'var(--color-primary-light)' }}>
                        + Add Feature
                      </button>
                    </div>
                    {plan.features.length === 0 && (
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No features yet. Click "+ Add Feature".</p>
                    )}
                    <div className="space-y-2">
                      {plan.features.map((feat, fi) => (
                        <div key={fi} className="flex gap-2">
                          <input
                            value={feat}
                            onChange={e => setFeature(plan.id, fi, e.target.value)}
                            placeholder={`Feature ${fi + 1}, e.g. Unlimited requests`}
                            style={{ ...inputCls, flex: 1 }}
                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(plan.id, fi)}
                            className="p-2 rounded-lg transition-colors shrink-0"
                            style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ STEP 5: MEDIA ═════════════════════════════════════════════════ */}
      {step === 5 && (
        <div className="space-y-4 animate-fade-in">
          {/* Screenshots */}
          <div style={cardCls}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Screenshots</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Up to 10 screenshots of your tool's UI. Order matters — first = hero image.</p>
              </div>
              {form.screenshots.length < 10 && (
                <button type="button" onClick={addScreenshot} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Screenshot
                </button>
              )}
            </div>

            {form.screenshots.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 rounded-lg"
                style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)' }}
              >
                <svg className="w-8 h-8 mb-2" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No screenshots yet. Add up to 10 images.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {form.screenshots.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-lg items-start"
                    style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    {/* Preview */}
                    <div
                      className="w-16 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                    >
                      {s.url ? (
                        <img src={s.url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : `#${i + 1}`}
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input value={s.url} onChange={v => setScreenshot(i, { url: v })} placeholder="https://cdn.example.com/screenshot.png" />
                      <Input value={s.caption ?? ''} onChange={v => setScreenshot(i, { caption: v })} placeholder="Caption (optional)" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeScreenshot(i)}
                      className="p-1.5 rounded-lg shrink-0 transition-colors"
                      style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-tertiary)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Integrations */}
          <div style={cardCls}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Integrations</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Third-party services your tool integrates with (up to 20).</p>
              </div>
              {form.integrations.length < 20 && (
                <button type="button" onClick={addIntegration} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Integration
                </button>
              )}
            </div>

            {form.integrations.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-10 rounded-lg"
                style={{ backgroundColor: 'var(--color-bg-secondary)', border: '2px dashed var(--color-border)' }}
              >
                <svg className="w-8 h-8 mb-2" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No integrations yet — optional but recommended.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {form.integrations.map((intg, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg space-y-2"
                    style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Integration {i + 1}</span>
                      <button type="button" onClick={() => removeIntegration(i)}
                        className="p-1 rounded" style={{ color: 'var(--color-text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-error)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input value={intg.name} onChange={v => setIntegration(i, { name: v })} placeholder="Name (e.g. Slack) *" />
                      <Input value={intg.url ?? ''} onChange={v => setIntegration(i, { url: v })} placeholder="URL (e.g. https://slack.com)" />
                      <Input value={intg.description ?? ''} onChange={v => setIntegration(i, { description: v })} placeholder="Short description" />
                      <Input value={intg.logo ?? ''} onChange={v => setIntegration(i, { logo: v })} placeholder="Logo URL (optional)" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ STEP 6: REVIEW ════════════════════════════════════════════════ */}
      {step === 6 && (
        <div className="space-y-4 animate-fade-in">

          {/* Validation summary */}
          <div style={cardCls}>
            <h2 className="text-base font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Submission Checklist</h2>
            <div className="space-y-2">
              {[
                { label: 'Tool name & tagline filled', ok: form.name.length > 0 && form.tagline.length > 0 },
                { label: 'Description has at least 50 characters', ok: form.description.length >= 50 },
                { label: 'Slug is set', ok: form.slug.length > 0 },
                { label: 'At least one category selected', ok: form.categoryIds.length > 0 },
                { label: 'At least one pricing plan defined', ok: form.pricingPlans.length > 0 && form.pricingPlans.every(p => p.name) },
                { label: 'Platform types selected', ok: form.platformType.length > 0, optional: true },
                { label: 'Screenshots added', ok: form.screenshots.length > 0, optional: true },
                { label: 'Website URL provided', ok: form.websiteUrl.length > 0, optional: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: item.ok ? 'rgba(138,18,18,0.12)' : item.optional ? 'var(--color-bg-tertiary)' : 'rgba(220,38,38,0.1)',
                    }}
                  >
                    {item.ok ? (
                      <svg className="w-3 h-3" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" style={{ color: item.optional ? 'var(--color-text-muted)' : 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm flex-1" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</p>
                  {item.optional && !item.ok && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}>Optional</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary preview */}
          <div style={cardCls}>
            <h2 className="text-base font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Preview</h2>
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.3))', border: '1px solid var(--color-border)', color: 'var(--color-primary-light)' }}
              >
                {form.logo ? <img src={form.logo} alt="logo" className="w-full h-full object-cover" /> : (form.name[0] || '?')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{form.name || 'Untitled Tool'}</h3>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{form.tagline || 'No tagline yet'}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.categoryIds.slice(0, 3).map(id => (
                    <span key={id} className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                      {CATEGORIES.find(c => c.id === id)?.name}
                    </span>
                  ))}
                  {form.pricingPlans.length > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(138,18,18,0.1)', color: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
                      {form.pricingPlans[0].type === 'FREE' ? 'Free' : form.pricingPlans[0].type === 'FREEMIUM' ? 'Freemium' : `From $${form.pricingPlans.find(p => p.price)?.price ?? '—'}`}
                    </span>
                  )}
                </div>
                <p className="text-xs mt-2 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{form.description || 'No description yet.'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              {[
                { label: 'Pricing Plans', value: form.pricingPlans.length },
                { label: 'Screenshots', value: form.screenshots.length },
                { label: 'Tags', value: form.tagIds.length },
                { label: 'Integrations', value: form.integrations.length },
              ].map(s => (
                <div key={s.label} className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
                  <p className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
                  <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Note */}
          <div style={cardCls}>
            <Field label="Note to Reviewer (optional)" hint="Help our admins understand your tool. Explain any unique context, intended audience, or anything that might not be obvious.">
              <Textarea value={form.submissionNote} onChange={v => set('submissionNote', v)} placeholder="e.g. This tool is specifically designed for enterprise developers working with LLMs…" rows={3} />
            </Field>
          </div>
        </div>
      )}

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: step === 1 ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
            cursor: step === 1 ? 'not-allowed' : 'pointer',
            opacity: step === 1 ? 0.5 : 1,
          }}
          onMouseEnter={e => { if (step > 1) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = step === 1 ? 'var(--color-text-muted)' : 'var(--color-text-secondary)'; }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Step {step} of {STEPS.length}
        </p>

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
              color: '#fff',
            }}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allValid}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: allValid ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' : 'var(--color-bg-tertiary)',
              color: allValid ? '#fff' : 'var(--color-text-muted)',
              border: allValid ? 'none' : '1px solid var(--color-border)',
              cursor: allValid ? 'pointer' : 'not-allowed',
              opacity: allValid ? 1 : 0.5,
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Submit for Review
          </button>
        )}
      </div>

    </div>
  );
}