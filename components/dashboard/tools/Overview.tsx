'use client';

import { useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: "Sign up as a developer and complete your profile. Add your bio, social links, and website so users know who built the tool.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    time: '5 min',
    done: true,
  },
  {
    number: '02',
    title: 'Add Your Tool',
    description: "Fill in your tool's name, category, description, tags, pricing, and website. Upload screenshots and a demo video to stand out.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
    time: '15 min',
    done: true,
  },
  {
    number: '03',
    title: 'Submit for Review',
    description: "Once your listing is at least 80% complete, submit it to our admin team. You can include a note explaining your tool's unique value.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    time: '2 min',
    done: true,
  },
  {
    number: '04',
    title: 'Admin Review',
    description: 'Our team reviews every submission for quality, accuracy, and platform guidelines. We check the tool is live, properly described, and safe.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    time: '2–3 days',
    done: false,
    current: true,
  },
  {
    number: '05',
    title: 'Go Live',
    description: "Approved tools appear instantly on the platform, searchable by thousands of users. You'll get an email notification the moment it's live.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    time: 'Instant',
    done: false,
  },
];

const faqs = [
  {
    q: 'How long does review take?',
    a: "Our admin team reviews all submissions within 2–3 business days. During high-volume periods it may take up to 5 days. You'll always receive an email update.",
  },
  {
    q: 'What gets a tool rejected?',
    a: "Tools are rejected if the listing is inaccurate, the tool's website is broken or inaccessible, it violates our content guidelines, or the description is too vague. We always give detailed feedback so you can fix and resubmit.",
  },
  {
    q: "Can I edit my tool after it's published?",
    a: 'Yes. You can edit any field at any time. Minor edits (fixing typos, updating links) go live immediately. Major changes (pricing, category, core description) trigger a re-review within 24 hours.',
  },
  {
    q: 'How do I respond to reviews?',
    a: 'Go to Engagement → Reviews in your dashboard. You can reply publicly to any review. We encourage thoughtful, professional responses — they build trust with new users.',
  },
  {
    q: 'Can I submit multiple tools?',
    a: "Absolutely. There's no limit on how many tools you can publish. Each tool goes through its own independent review.",
  },
  {
    q: 'What happens if my tool goes offline?',
    a: "If users or our team reports that a tool's URL is broken, we'll contact you first. Tools that remain inaccessible for 7+ days may be temporarily hidden until restored.",
  },
];

const guidelines = [
  { icon: '✓', text: 'Tool must be live and accessible at the provided URL', ok: true },
  { icon: '✓', text: 'Description must accurately reflect what the tool does', ok: true },
  { icon: '✓', text: 'Pricing information must be current and truthful', ok: true },
  { icon: '✓', text: 'At least one screenshot or demo is strongly recommended', ok: true },
  { icon: '✗', text: 'No placeholder or "coming soon" tools accepted', ok: false },
  { icon: '✗', text: 'No tools that generate harmful, illegal, or adult content', ok: false },
  { icon: '✗', text: 'No duplicate listings of the same tool', ok: false },
];

const card: React.CSSProperties = {
  backgroundColor: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
};

export default function OverviewPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── HERO BANNER ── */}
      <div
        className="rounded-xl p-8"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">

          {/* Left: Text */}
          <div className="flex-1 min-w-0 ">
            <span
              className="inline-block mb-4 px-3 py-1  rounded-full text-[11px] font-bold uppercase tracking-widest"
              style={{
                backgroundColor: 'rgba(138, 18, 18, 0.2)',
                color: 'var(--color-primary-light)',
              }}
            >
              Developer Guide
            </span>
            <h1 className="text-3xl font-bold leading-snug mb-3" style={{ color: 'var(--color-text-primary)' }}>
              Welcome to the{' '}
              <span style={{ color: 'var(--color-primary-light)' }}>Developer Dashboard</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', maxWidth: '36rem' }}>
              Take an overview of how to use our platform, learn how to publish your tools, and understand how to review and interact with our team. Everything you need to go from idea to live listing.
            </p>
          </div>

          {/* Right: Stats */}
          <div
            className="flex gap-0 shrink-0 rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--color-border)' }}
          >
            {[
              { value: '2–3', unit: 'days', label: 'Review time' },
              { value: '2k+', unit: '', label: 'Monthly users' },
              { value: '500+', unit: '', label: 'Tools listed' },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="text-center px-6 py-4"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRight: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <p className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {s.value}
                  {s.unit && (
                    <span className="text-sm ml-0.5" style={{ color: 'var(--color-primary-light)' }}>{s.unit}</span>
                  )}
                </p>
                <p className="text-xs mt-1 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REVIEW PROCESS ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>How the Review Process Works</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>From submission to live — here's exactly what happens and when.</p>
          </div>
        </div>

        {/* 3 process cards — clean equal columns, no overlap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'You Submit',
              time: 'Day 0',
              desc: 'You click "Submit for Review." Your tool enters the queue and you receive a confirmation email immediately.',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ),
            },
            {
              title: 'Admin Reviews',
              time: 'Day 1–3',
              desc: 'A member of our team manually checks your tool — live URL, description accuracy, screenshots, and compliance.',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
            },
            {
              title: 'Decision & Go Live',
              time: 'Day 3 (max)',
              desc: 'Approved tools go live instantly. Rejected tools come with detailed feedback so you can fix and resubmit quickly.',
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
                >
                  {item.icon}
                </div>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(138, 18, 18, 0.08)',
                    color: 'var(--color-primary-light)',
                    border: '1px solid var(--color-primary)',
                  }}
                >
                  {item.time}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </div>
              <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                  Step {i + 1} of 3
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* After approval note */}
        <div
          className="mt-5 flex items-start gap-3 p-4 rounded-lg"
          style={{
            backgroundColor: 'rgba(138, 18, 18, 0.05)',
            border: '1px solid var(--color-primary)',
          }}
        >
          <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>After approval,</span>{' '}
            your tool is instantly visible to all users — no extra steps needed. It appears in category pages, search results, and our weekly "New Tools" digest sent to subscribers.
          </p>
        </div>
      </div>

      {/* ── STEP BY STEP GUIDE ── */}
      <div style={card}>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Step-by-Step Guide</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Follow these steps to publish your first tool.</p>
          </div>
        </div>

        {/* Steps — flat rows, no z-index issues */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const currentIdx = steps.findIndex(s => s.current);
            const isFaded = !step.done && !step.current && i > currentIdx;

            return (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-lg"
                style={{
                  backgroundColor: step.current ? 'rgba(138, 18, 18, 0.04)' : 'var(--color-bg-secondary)',
                  border: `1px solid ${step.current ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  opacity: isFaded ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {/* Circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    backgroundColor: step.done
                      ? 'var(--color-primary)'
                      : step.current
                        ? 'rgba(138, 18, 18, 0.15)'
                        : 'var(--color-bg-tertiary)',
                    border: `2px solid ${step.done
                      ? 'var(--color-primary)'
                      : step.current
                        ? 'var(--color-primary-light)'
                        : 'var(--color-border-light)'}`,
                    color: step.done ? '#fff' : step.current ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                    flexShrink: 0,
                  }}
                >
                  {step.done ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step.number}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: step.done || step.current ? 'rgba(138, 18, 18, 0.12)' : 'var(--color-bg-tertiary)',
                        color: step.done || step.current ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                      }}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {step.title}
                    </h3>
                    {step.current && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: 'rgba(138, 18, 18, 0.12)',
                          color: 'var(--color-primary-light)',
                          border: '1px solid var(--color-primary)',
                        }}
                      >
                        Current stage
                      </span>
                    )}
                    <span
                      className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      ⏱ {step.time}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── GUIDELINES + DASHBOARD SECTIONS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Guidelines */}
        <div style={card}>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Submission Guidelines</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>What our reviewers check for</p>
            </div>
          </div>

          <div className="space-y-2">
            {guidelines.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: g.ok ? 'rgba(138, 18, 18, 0.03)' : 'rgba(220, 38, 38, 0.04)',
                  border: `1px solid ${g.ok ? 'var(--color-border)' : 'rgba(220,38,38,0.18)'}`,
                }}
              >
                <span
                  className="shrink-0 text-sm font-bold w-4 text-center leading-5"
                  style={{ color: g.ok ? 'var(--color-primary-light)' : 'var(--color-error)' }}
                >
                  {g.icon}
                </span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {g.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Sections */}
        <div style={card}>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Dashboard Sections</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Navigate your workspace quickly</p>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { label: 'My Tools', desc: 'See all your tools — published, pending, and drafts', href: '/dashboard/my-tools' },
              { label: 'Drafts', desc: 'Continue working on incomplete listings before submitting', href: '/dashboard/drafts' },
              { label: 'Pending Review', desc: 'Track tools currently waiting for admin approval', href: '/dashboard/pending' },
              { label: 'Published', desc: 'View analytics and manage your live tools', href: '/dashboard/published' },
              { label: 'Reviews', desc: 'Read and respond to user feedback on your tools', href: '/dashboard/reviews' },
              { label: 'Saved Tools', desc: "Browse tools you've bookmarked from the platform", href: '/dashboard/favorites' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg group transition-all"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{link.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{link.desc}</p>
                </div>
                <svg
                  className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={card}>     
        <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>Frequently Asked Questions</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Common questions from developers</p>
          </div>
        </div>

        {/* Divider between header and items */}
        <div style={{ borderTop: '1px solid var(--color-border)', marginBottom: '1.25rem' }} />

        {/* FAQ items — generous gap so they breathe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: openFaq === i ? 'rgba(138, 18, 18, 0.04)' : 'var(--color-bg-secondary)',
                border: `1px solid ${openFaq === i ? 'var(--color-primary)' : 'var(--color-border)'}`,
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left"
                style={{ padding: '1rem 1.25rem' }}
              >
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {faq.q}
                </span>
                <svg
                  className="w-4 h-4 shrink-0"
                  style={{
                    color: 'var(--color-text-muted)',
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--color-border)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', paddingTop: '0.875rem' }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}