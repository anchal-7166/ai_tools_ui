'use client';

import { cardBase } from '.';

const STEPS = [
  { id: 1, title: 'Basic Info',  desc: 'Name, tagline & description' },
  { id: 2, title: 'Details',     desc: 'URLs, platform & audience' },
  { id: 3, title: 'Categories',  desc: 'Tags, use cases & industry' },
  { id: 4, title: 'Pricing',     desc: 'Plans & billing options' },
  { id: 5, title: 'Media',       desc: 'Screenshots & integrations' },
  { id: 6, title: 'Review',      desc: 'Preview & submit' },
];

interface Props { step: number; onStepClick: (id: number) => void; }

export default function StepIndicator({ step, onStepClick }: Props) {
  return (
    <div className="p-3 sm:p-4 overflow-x-auto rounded-xl" style={cardBase}>
      <div className="flex gap-1 min-w-max sm:min-w-0 sm:flex-wrap">
        {STEPS.map(s => {
          const done   = step > s.id;
          const active = step === s.id;
          return (
            <button key={s.id} type="button" onClick={() => onStepClick(s.id)}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg text-left transition-all shrink-0"
              style={{
                backgroundColor: active ? 'rgba(138,18,18,0.08)' : 'transparent',
                border: `1px solid ${active ? 'var(--color-primary)' : 'transparent'}`,
                minWidth: '6rem',
              }}>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] sm:text-[10px] font-bold"
                style={{
                  backgroundColor: done ? 'var(--color-primary)' : active ? 'rgba(138,18,18,0.2)' : 'var(--color-bg-tertiary)',
                  color: done ? '#fff' : active ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                  border: `2px solid ${done ? 'var(--color-primary)' : active ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                }}>
                {done
                  ? <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  : s.id}
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-semibold leading-tight"
                  style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                  {s.title}
                </p>
                <p className="text-[9px] leading-tight mt-0.5 hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
                  {s.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="h-1 rounded-full overflow-hidden mt-2 sm:mt-3" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((step - 1) / (STEPS.length - 1)) * 100}%`,
            background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-light))',
          }} />
      </div>
    </div>
  );
}