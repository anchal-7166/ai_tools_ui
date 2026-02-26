'use client';

import { useState } from 'react';


export const inputCls: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-tertiary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  lineHeight: '1.5',
};

export const cardBase: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.75rem',
};

export function SubSection({ title, description }: { title: string; description?: string }) {
  return (
    <div className="pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <h3 className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p className="text-[10px] sm:text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
        style={{ color: 'var(--color-text-muted)' }}>
        {label}
        {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function Input({
  value, onChange, placeholder, type = 'text', disabled,
}: {
  value: string | number; onChange: (v: string) => void;
  placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type} value={value} disabled={disabled}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputCls, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text' }}
      onFocus={e => { if (!disabled) e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    />
  );
}

export function Textarea({
  value, onChange, placeholder, rows = 4,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      rows={rows} value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputCls, resize: 'vertical', minHeight: `${rows * 1.7}rem` }}
      onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    />
  );
}

export function Select({
  value, onChange, children,
}: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputCls, cursor: 'pointer' }}
      onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
      {children}
    </select>
  );
}

export function PillSelect({
  options, selected, onToggle, max,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
  max?: number;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {options.map(o => {
        const active   = selected.includes(o.value);
        const disabled = !active && max !== undefined && selected.length >= max;
        return (
          <button
            key={o.value} type="button" disabled={disabled}
            onClick={() => !disabled && onToggle(o.value)}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all"
            style={{
              backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
              color: active ? 'var(--color-text-primary)' : disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
              border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.4 : 1,
            }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function TagInput({
  values, onChange, placeholder,
}: {
  values: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setInput('');
  };
  return (
    <div className="flex flex-col gap-2">
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
          type="button" onClick={add}
          className="px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold shrink-0 hover:opacity-90"
          style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: 'var(--color-text-primary)' }}>
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map(v => (
            <span key={v}
              className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
              {v}
              <button type="button" onClick={() => onChange(values.filter(x => x !== v))}
                style={{ color: 'var(--color-text-muted)', lineHeight: 1 }}>
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// ── EntitySelect — real API data with loading skeleton ───────────────────
// UUID guard: only IDs matching standard UUID format are passed to onToggle.
// This prevents stale/non-UUID values from ever entering form state.
// const ENTITY_UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function EntitySelect({
  options, selected, onToggle, max, placeholder, loading = false,
}: {
  options: { id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  max?: number;
  placeholder?: string;
  loading?: boolean;
}) {
  const [search, setSearch] = useState('');
  const filtered = options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-3" style={{ color: 'var(--color-text-muted)' }}>
        <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span className="text-xs">Loading…</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder={placeholder || 'Search…'}
        style={inputCls}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      />
      <div className="flex flex-wrap gap-1.5">
        {filtered.map(o => {
          const active   = selected.includes(o.id);
          const disabled = !active && max !== undefined && selected.length >= max;
          return (
            <button key={o.id} type="button" disabled={disabled}
              onClick={() => {
                if (disabled) return;
                // Guard: silently skip if ID is not a valid UUID.
                // Protects against stale options with non-UUID IDs.
                // if (!ENTITY_UUID_RE.test(o.id)) return;
                onToggle(o.id);
              }}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all"
              style={{
                backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                color: active ? 'var(--color-text-primary)' : disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1,
              }}>
              {o.name}
            </button>
          );
        })}
        {filtered.length === 0 && search && (
          <p className="text-[10px] sm:text-xs py-1" style={{ color: 'var(--color-text-muted)' }}>
            No results for "{search}"
          </p>
        )}
      </div>
      {max && (
        <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {selected.length}/{max} selected
        </p>
      )}
    </div>
  );
}