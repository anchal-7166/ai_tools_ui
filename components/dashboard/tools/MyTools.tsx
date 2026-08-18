'use client';
import React from 'react';
import Link from 'next/link';

const benefits = [
  { icon: '👁️', title: '2,000+ Monthly Visitors' },
  { icon: '📈', title: 'Grow Organically' },
  { icon: '📊', title: 'Real Analytics' },
  { icon: '✅', title: 'Verified Badge' },
  { icon: '💬', title: 'User Reviews' },
  { icon: '⚡', title: 'Live in 3 Days' },
];

const steps = [
  { num: '01', label: 'Fill the form', desc: '~15 min' },
  { num: '02', label: 'Admin reviews', desc: '2–3 days' },
  { num: '03', label: 'Go live', desc: 'Instant' },
];

export default function MyToolsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-10 text-center">

      {/* Heading */}
      <h1 className="text-lg sm:text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
        No tools yet
      </h1>
      <p className="text-xs sm:text-sm max-w-sm mb-6 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        Submit your AI tool and reach{' '}
        <span style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>2,000+ monthly users</span>
        {' '}— completely free.
      </p>

      {/* How it works — inline steps */}
      <div className="flex items-center gap-1 sm:gap-2 mb-8 flex-wrap justify-center">
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <span className="text-[10px] font-black" style={{ color: 'var(--color-primary-light)' }}>{s.num}</span>
              <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(138,18,18,0.1)', color: 'var(--color-primary-light)' }}>{s.desc}</span>
            </div>
            {i < steps.length - 1 && (
              <svg className="w-3 h-3 shrink-0" style={{ color: 'var(--color-border-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full max-w-sm mb-5" style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

      {/* Benefits grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-sm sm:max-w-md mb-5">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-left"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            {/* <span className="text-base shrink-0">{b.icon}</span> */}
            <span className="text-[10px] sm:text-xs font-medium leading-tight" style={{ color: 'var(--color-text-secondary)' }}>
              {b.title}
            </span>
          </div>
        ))}
      </div>

      {/* Social proof line */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {['S', 'M', 'P', 'A'].map((l, i) => (
            <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                color: '#fff',
                borderColor: 'var(--color-bg-secondary)',
              }}
            >
              {l}
            </div>
          ))}
        </div>
        <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>500+ developers</span> already listed their tools
        </p>
      </div>

      {/* Footer note */}
      <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Free forever · No credit card · Live in 2–3 days
      </p>

    </div>
  );
}