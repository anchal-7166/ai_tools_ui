'use client';

import { useState } from 'react';

const pendingTools = [
  {
    id: 1,
    name: 'Neural Text Summarizer',
    category: 'Productivity',
    submittedAt: '2025-02-18',
    description: 'An AI-powered tool that summarizes long articles, documents, and web pages into concise bullet points using advanced NLP.',
    tags: ['NLP', 'Summarization', 'Productivity'],
    pricing: 'Freemium',
    website: 'https://neuralsummarize.ai',
    submissionNote: 'Updated pricing model and added new features for bulk summarization.',
    reviewCount: 0,
    estimatedReview: '1-2 days',
  },
  {
    id: 2,
    name: 'PixelCraft AI Designer',
    category: 'Design',
    submittedAt: '2025-02-17',
    description: 'Generate pixel-perfect UI designs, icons, and illustrations using natural language prompts. Supports export to Figma and Sketch.',
    tags: ['Design', 'Image Generation', 'UI/UX'],
    pricing: 'Paid',
    website: 'https://pixelcraft.design',
    submissionNote: 'First submission. Looking forward to feedback!',
    reviewCount: 0,
    estimatedReview: '2-3 days',
  },
  {
    id: 3,
    name: 'CodeScan Security Pro',
    category: 'Developer Tools',
    submittedAt: '2025-02-15',
    description: 'Automatically scans your codebase for vulnerabilities, security risks, and code quality issues with AI-generated fix suggestions.',
    tags: ['Security', 'Code Review', 'DevOps'],
    pricing: 'Free',
    website: 'https://codescan.pro',
    submissionNote: 'Resubmitting after addressing admin feedback on documentation.',
    reviewCount: 1,
    estimatedReview: 'Today',
  },
];

const statusSteps = ['Submitted', 'In Queue', 'Under Review', 'Decision'];

export default function PendingPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [withdrawId, setWithdrawId] = useState<number | null>(null);

  const getStepIndex = (tool: typeof pendingTools[0]) => {
    if (tool.reviewCount >= 1) return 2;
    const daysAgo = Math.floor((Date.now() - new Date(tool.submittedAt).getTime()) / 86400000);
    if (daysAgo >= 2) return 1;
    return 0;
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Tools awaiting admin approval before going live
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(138, 18, 18, 0.12)',
            border: '1px solid var(--color-primary)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          />
          <span className="text-sm font-semibold" style={{ color: 'var(--color-primary-light)' }}>
            {pendingTools.length} Pending
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-lg"
        style={{
          backgroundColor: 'rgba(138, 18, 18, 0.06)',
          border: '1px solid var(--color-primary)',
        }}
      >
        <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Our admin team reviews all tool submissions within{' '}
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>2–3 business days</span>.
          You'll receive an email notification once a decision is made. Tools under review cannot be edited.
        </p>
      </div>

      {/* Tools List */}
      <div className="space-y-4">
        {pendingTools.map((tool) => {
          const isExpanded = expandedId === tool.id;
          const stepIndex = getStepIndex(tool);

          return (
            <div
              key={tool.id}
              className="rounded-lg overflow-hidden transition-all"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Tool Header Row */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Icon + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <svg className="w-5 h-5" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {tool.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide shrink-0"
                          style={{
                            backgroundColor: 'rgba(138, 18, 18, 0.12)',
                            color: 'var(--color-primary-light)',
                            border: '1px solid var(--color-primary)',
                          }}
                        >
                          Pending
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {tool.category}
                        </span>
                        <span style={{ color: 'var(--color-border-light)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          Submitted {new Date(tool.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span style={{ color: 'var(--color-border-light)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          Est. review:{' '}
                          <span style={{ color: 'var(--color-text-secondary)' }}>{tool.estimatedReview}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-light)';
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                      }}
                    >
                      {isExpanded ? 'Hide' : 'Details'}
                      <svg
                        className="w-3.5 h-3.5 transition-transform"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => setWithdrawId(tool.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: 'rgba(220, 38, 38, 0.08)',
                        color: 'var(--color-error)',
                        border: '1px solid rgba(220, 38, 38, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)';
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>

                {/* Review Progress Stepper */}
                <div className="mt-5">
                  <div className="flex items-center gap-0">
                    {statusSteps.map((step, i) => {
                      const isCompleted = i < stepIndex;
                      const isCurrent = i === stepIndex;
                      const isLast = i === statusSteps.length - 1;

                      return (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all"
                              style={{
                                backgroundColor: isCompleted
                                  ? 'var(--color-primary)'
                                  : isCurrent
                                    ? 'rgba(138, 18, 18, 0.2)'
                                    : 'var(--color-bg-tertiary)',
                                border: `2px solid ${isCompleted
                                  ? 'var(--color-primary)'
                                  : isCurrent
                                    ? 'var(--color-primary-light)'
                                    : 'var(--color-border-light)'}`,
                                color: isCompleted
                                  ? 'var(--color-text-primary)'
                                  : isCurrent
                                    ? 'var(--color-primary-light)'
                                    : 'var(--color-text-muted)',
                              }}
                            >
                              {isCompleted ? (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                i + 1
                              )}
                            </div>
                            <span
                              className="text-[10px] font-medium whitespace-nowrap"
                              style={{
                                color: isCompleted
                                  ? 'var(--color-primary-light)'
                                  : isCurrent
                                    ? 'var(--color-text-primary)'
                                    : 'var(--color-text-muted)',
                              }}
                            >
                              {step}
                            </span>
                          </div>

                          {!isLast && (
                            <div
                              className="flex-1 h-0.5 mx-1 mb-4 rounded-full"
                              style={{
                                backgroundColor: i < stepIndex
                                  ? 'var(--color-primary)'
                                  : 'var(--color-border)',
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div
                  className="border-t px-5 py-4 space-y-4 animate-fade-in"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-bg-secondary)',
                  }}
                >
                  {/* Description */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      Description
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {tool.description}
                    </p>
                  </div>

                  {/* Tags + Pricing + Website row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-xs font-medium"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              color: 'var(--color-text-secondary)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        Pricing
                      </p>
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-semibold"
                        style={{
                          backgroundColor: 'var(--color-bg-tertiary)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {tool.pricing}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                        Website
                      </p>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium flex items-center gap-1 hover:underline transition-colors"
                        style={{ color: 'var(--color-primary-light)' }}
                      >
                        {tool.website.replace('https://', '')}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Submission Note */}
                  {tool.submissionNote && (
                    <div
                      className="flex gap-3 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-text-muted)' }}>
                          Your Note to Admin
                        </p>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          {tool.submissionNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {pendingTools.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-lg"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>All clear!</h3>
          <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
            You have no tools pending review right now.
          </p>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {withdrawId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setWithdrawId(null)}
        >
          <div
            className="w-full max-w-md rounded-xl p-6 space-y-4 animate-fade-in"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Withdraw Submission?
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  This will remove the tool from the review queue.
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              The tool will be moved back to your{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>Drafts</strong>. You can edit and resubmit it at any time.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setWithdrawId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                Cancel
              </button>
              <button
                onClick={() => setWithdrawId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: 'var(--color-error)',
                  color: 'var(--color-text-primary)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}