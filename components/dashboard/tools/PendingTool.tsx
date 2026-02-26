'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useMyPendingTools } from '@/lib/hooks/use-submissions';

const statusSteps = ['Submitted', 'In Queue', 'Under Review', 'Decision'];

function getStepIndex(submission: any): number {
  if (submission.status === 'UNDER_REVIEW') return 2;
  if (submission.status === 'REVIEWED') return 3;
  const daysAgo = Math.floor((Date.now() - new Date(submission.createdAt).getTime()) / 86400000);
  if (daysAgo >= 2) return 1;
  return 0;
}

export default function PendingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [withdrawId, setWithdrawId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useMyPendingTools();
  const submissions = data ?? [];

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-12 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
        ))}
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
          <svg className="w-6 h-6" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Failed to load pending tools</p>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Something went wrong. Please try again.</p>
        <button onClick={() => refetch()} className="px-4 py-2 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
          Retry
        </button>
      </div>
    );
  }

  // ── Empty ──
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
          <svg className="w-7 h-7" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>All clear!</h3>
        <p className="text-xs sm:text-sm max-w-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
          No tools pending review right now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Tools awaiting admin approval
        </p>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shrink-0"
          style={{ backgroundColor: 'rgba(138,18,18,0.12)', border: '1px solid var(--color-primary)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary-light)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--color-primary-light)' }}>
            {submissions.length} Pending
          </span>
        </div>
      </div>

      {/* ── Info Banner ── */}
      <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg"
        style={{ backgroundColor: 'rgba(138,18,18,0.06)', border: '1px solid var(--color-primary)' }}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Our admin team reviews submissions within{' '}
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>2–3 business days</span>.
          You'll get an email once a decision is made. Tools under review cannot be edited.
        </p>
      </div>

      {/* ── Submissions List ── */}
      <div className="space-y-3">
        {submissions.map((submission: any) => {
          const tool = submission.toolData;          // ← nested toolData object
          const isExpanded = expandedId === submission.id;
          const stepIndex = getStepIndex(submission);

          const submittedDate = submission.createdAt
            ? new Date(submission.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '—';

          // pricingPlans is an array inside toolData
          const pricingType = tool.pricingPlans?.[0]?.type ?? '—';

          // platforms as readable pills
          const platforms: string[] = tool.platformType ?? [];

          return (
            <div key={submission.id} className="rounded-lg overflow-hidden transition-all"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

              {/* ── Tool Row ── */}
              <div className="p-3 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                            {tool.name}
                          </h3>
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide shrink-0"
                            style={{ backgroundColor: 'rgba(138,18,18,0.12)', color: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
                            {submission.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5 flex-wrap">
                          <span className="text-[10px] sm:text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
                            "{tool.tagline}"
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5 flex-wrap">
                          <span className="hidden sm:inline text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            Submitted {submittedDate}
                          </span>
                          {tool.aiModel && (
                            <>
                              <span className="hidden sm:inline" style={{ color: 'var(--color-border-light)' }}>·</span>
                              <span className="hidden sm:inline text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                Model: <span style={{ color: 'var(--color-text-secondary)' }}>{tool.aiModel}</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions — desktop */}
                      <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <button onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                        >
                          {isExpanded ? 'Hide' : 'Details'}
                          <svg className="w-3 h-3 transition-transform" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button onClick={() => setWithdrawId(submission.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.15)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'; }}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>

                    {/* Actions — mobile */}
                    <div className="flex sm:hidden items-center gap-1.5 mt-2">
                      <button onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                        {isExpanded ? 'Hide' : 'Details'}
                        <svg className="w-3 h-3" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button onClick={() => setWithdrawId(submission.id)}
                        className="px-2 py-1 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        Withdraw
                      </button>
                    </div>

                    {/* ── Progress Stepper ── */}
                    <div className="mt-3 sm:mt-5">
                      <div className="flex items-center">
                        {statusSteps.map((step, i) => {
                          const isCompleted = i < stepIndex;
                          const isCurrent = i === stepIndex;
                          const isLast = i === statusSteps.length - 1;
                          return (
                            <div key={step} className="flex items-center flex-1">
                              <div className="flex flex-col items-center gap-1">
                                <div
                                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold shrink-0 transition-all"
                                  style={{
                                    backgroundColor: isCompleted ? 'var(--color-primary)' : isCurrent ? 'rgba(138,18,18,0.2)' : 'var(--color-bg-tertiary)',
                                    border: `2px solid ${isCompleted ? 'var(--color-primary)' : isCurrent ? 'var(--color-primary-light)' : 'var(--color-border-light)'}`,
                                    color: isCompleted ? '#fff' : isCurrent ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                                  }}
                                >
                                  {isCompleted ? (
                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  ) : i + 1}
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-medium whitespace-nowrap"
                                  style={{ color: isCompleted ? 'var(--color-primary-light)' : isCurrent ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                                  <span className="sm:hidden">{step.split(' ')[0]}</span>
                                  <span className="hidden sm:inline">{step}</span>
                                </span>
                              </div>
                              {!isLast && (
                                <div className="flex-1 h-0.5 mx-1 mb-3 sm:mb-4 rounded-full"
                                  style={{ backgroundColor: i < stepIndex ? 'var(--color-primary)' : 'var(--color-border)' }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Expanded Details ── */}
              {isExpanded && (
                <div className="border-t px-3 sm:px-5 py-3 sm:py-4 space-y-3 sm:space-y-4"
                  style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>

                  {/* Description */}
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Description</p>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {tool.description || '—'}
                    </p>
                  </div>

                  {/* Grid: Pricing / Website / AI Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Pricing</p>
                      <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                        {pricingType}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Website</p>
                      {tool.websiteUrl ? (
                        <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] sm:text-xs font-medium flex items-center gap-1 hover:underline truncate"
                          style={{ color: 'var(--color-primary-light)' }}>
                          {tool.websiteUrl.replace('https://', '')}
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>—</span>}
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>AI Model</p>
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {tool.aiModel ?? '—'}
                      </span>
                    </div>
                  </div>

                  {/* Platforms + Target Audience */}
                  {(platforms.length > 0 || tool.targetAudience?.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {platforms.length > 0 && (
                        <div>
                          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Platforms</p>
                          <div className="flex flex-wrap gap-1">
                            {platforms.map((p) => (
                              <span key={p} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium"
                                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                                {p.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {tool.targetAudience?.length > 0 && (
                        <div>
                          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Target Audience</p>
                          <div className="flex flex-wrap gap-1">
                            {tool.targetAudience.map((a: string) => (
                              <span key={a} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium"
                                style={{ backgroundColor: 'rgba(138,18,18,0.08)', color: 'var(--color-primary-light)', border: '1px solid rgba(138,18,18,0.2)' }}>
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search Keywords */}
                  {tool.searchKeywords?.length > 0 && (
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Keywords</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.searchKeywords.map((kw: string) => (
                          <span key={kw} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px]"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin review note (if any) */}
                  {submission.reviewNote && (
                    <div className="flex gap-2 sm:gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--color-error)' }}>Admin Note</p>
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>{submission.reviewNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Withdraw Modal — bottom sheet on mobile ── */}
      {withdrawId !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setWithdrawId(null)}>
          <div
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-5 sm:p-6 space-y-4"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="sm:hidden w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: 'var(--color-border-light)' }} />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Withdraw Submission?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {submissions.find((s: any) => s.id === withdrawId)?.toolData?.name}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              The submission will be removed from the review queue. You can edit and resubmit at any time.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setWithdrawId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                Cancel
              </button>
              <button onClick={() => setWithdrawId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-error)', color: '#fff' }}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}