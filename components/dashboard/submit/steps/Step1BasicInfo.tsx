'use client';


import { cardBase, SubSection, Field, Input, Textarea } from '..';
import { toSlug } from '../hooks/useFormState';

import { FormData } from '../renders/types';

interface Props {
  form: FormData;
  set: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
}

export default function Step1BasicInfo({ form, set }: Props) {
  return (
    <div className="p-4 sm:p-6 rounded-xl flex flex-col gap-4 sm:gap-6" style={cardBase}>
      <div>
        <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
          Basic Information
        </h2>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Core details that identify your tool on the platform.
        </p>
      </div>
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Logo */}
      <div className="flex flex-col gap-3">
        <SubSection title="Tool Logo" description="Paste a direct image URL (PNG or SVG recommended)." />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center overflow-hidden text-lg font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.25))',
              border: '1px solid var(--color-border)',
              color: 'var(--color-primary-light)',
            }}>
            {form.logo
              ? <img src={form.logo} alt="logo" className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              : (form.name[0] || '?')}
          </div>
          <div className="flex-1 w-full flex flex-col gap-1">
            <Input value={form.logo} onChange={v => set('logo', v)} placeholder="https://cdn.example.com/logo.png" />
            <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>Preview updates automatically.</p>
          </div>
        </div>
      </div>

      {/* Identity */}
      <div className="flex flex-col gap-3">
        <SubSection title="Tool Identity" description="Give your tool a clear, memorable name." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Tool Name" required>
            <Input value={form.name} onChange={v => { set('name', v); set('slug', toSlug(v)); }} placeholder="e.g. ChatGPT" />
          </Field>
          <Field label="Slug" required hint="Auto-generated — edit if needed.">
            <Input value={form.slug} onChange={v => set('slug', toSlug(v))} placeholder="e.g. chatgpt" />
          </Field>
        </div>
      </div>

      {/* Tagline */}
      <div className="flex flex-col gap-3">
        <SubSection title="Tagline" description="One line that sells your tool — max 200 characters." />
        <Field label="Tagline" required>
          <Input value={form.tagline} onChange={v => set('tagline', v)} placeholder="The most powerful AI assistant for everyone" />
          <div className="flex justify-end mt-0.5">
            <span className="text-[10px] sm:text-xs"
              style={{ color: form.tagline.length > 200 ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
              {form.tagline.length}/200
            </span>
          </div>
        </Field>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <SubSection title="Description" description="Tell users what your tool does, who it's for, and why it matters." />
        <Field label="Short Description" required hint="Minimum 50 characters. Shown in search results and tool cards.">
          <Textarea value={form.description} onChange={v => set('description', v)}
            placeholder="Describe what your tool does, who it's for, and why it's useful…" rows={4} />
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[10px] sm:text-xs"
              style={{ color: form.description.length < 50 ? 'var(--color-error)' : 'var(--color-primary-light)' }}>
              {form.description.length < 50
                ? `${50 - form.description.length} more chars needed`
                : '✓ Minimum reached'}
            </span>
            <span className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {form.description.length} chars
            </span>
          </div>
        </Field>
        <Field label="Long Description" hint="Optional. Full markdown shown on the tool's detail page.">
          <Textarea value={form.longDescription} onChange={v => set('longDescription', v)}
            placeholder={'## About\n\nFull feature breakdown, use cases, highlights…'} rows={5} />
        </Field>
      </div>
    </div>
  );
}