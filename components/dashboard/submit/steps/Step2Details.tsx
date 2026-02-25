'use client';


import { cardBase, SubSection, Field, Input, PillSelect, TagInput } from '..';
import { EnumOption, FormData } from '../renders/types';

interface Props {
  form: FormData;
  set: <K extends keyof FormData>(key: K, val: FormData[K]) => void;
  toggleArr: <T>(key: keyof FormData, val: T) => void;
  // Dynamic enum options from GET /enums — already { value, label }[]
  platformTypeOptions:   EnumOption[];
  targetAudienceOptions: EnumOption[];
}

export default function Step2Details({
  form, set, toggleArr,
  platformTypeOptions, targetAudienceOptions,
}: Props) {
  return (
    <div className="p-4 sm:p-6 rounded-xl flex flex-col gap-4 sm:gap-6" style={cardBase}>
      <div>
        <h2 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
          URLs & Technical Details
        </h2>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Links and technical metadata to help users find and evaluate your tool.
        </p>
      </div>
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Links */}
      <div className="flex flex-col gap-3">
        <SubSection title="Links" description="Add your key URLs — at least a website is recommended." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Website URL" hint="Main product homepage">
            <Input value={form.websiteUrl} onChange={v => set('websiteUrl', v)} placeholder="https://yourtool.com" />
          </Field>
          <Field label="Demo URL" hint="Live demo or sandbox">
            <Input value={form.demoUrl} onChange={v => set('demoUrl', v)} placeholder="https://yourtool.com/demo" />
          </Field>
          <Field label="Documentation URL" hint="Guides, API docs, etc.">
            <Input value={form.documentationUrl} onChange={v => set('documentationUrl', v)} placeholder="https://docs.yourtool.com" />
          </Field>
          <Field label="Video URL" hint="YouTube, Vimeo, or similar">
            <Input value={form.videoUrl} onChange={v => set('videoUrl', v)} placeholder="https://youtube.com/watch?v=..." />
          </Field>
        </div>
      </div>

      {/* Technical */}
      <div className="flex flex-col gap-3">
        <SubSection title="Technical Details" description="Tell us about the AI technology powering your tool." />
        <Field label="AI Model" hint="e.g. GPT-4o, Claude 3.5 Sonnet, Llama 3, Custom">
          <Input value={form.aiModel} onChange={v => set('aiModel', v)} placeholder="e.g. GPT-4o, Claude 3.5, Custom" />
        </Field>
      </div>

      {/* Platform — from GET /enums/platform-types */}
      <div className="flex flex-col gap-3">
        <SubSection title="Platform Availability" description="Where can users access your tool? Select all that apply." />
        <Field label="Platform Types">
          <PillSelect
            options={platformTypeOptions}
            selected={form.platformType}
            onToggle={v => toggleArr('platformType', v)}
          />
        </Field>
      </div>

      {/* Audience — from GET /enums/target-audiences */}
      <div className="flex flex-col gap-3">
        <SubSection title="Target Audience" description="Who is this tool built for?" />
        <Field label="Primary Audiences">
          <PillSelect
            options={targetAudienceOptions}
            selected={form.targetAudience}
            onToggle={v => toggleArr('targetAudience', v)}
          />
        </Field>
      </div>

      {/* Keywords */}
      <div className="flex flex-col gap-3">
        <SubSection title="Search Keywords" description="Help users discover your tool. Press Enter or click Add." />
        <Field label="Keywords">
          <TagInput
            values={form.searchKeywords}
            onChange={v => set('searchKeywords', v)}
            placeholder="e.g. ai writing, content generation…"
          />
        </Field>
      </div>
    </div>
  );
}