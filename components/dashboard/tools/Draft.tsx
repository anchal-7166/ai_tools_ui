'use client';

import { useState } from 'react';

const draftTools = [
  {
    id: 1,
    name: 'SmartResume AI',
    category: 'Productivity',
    lastEdited: '2025-02-19',
    description: 'Generate tailored resumes and cover letters in seconds using AI. Matches your experience to job descriptions automatically.',
    tags: ['Resume', 'Career', 'Productivity'],
    pricing: 'Freemium',
    website: 'https://smartresume.ai',
    completeness: 85,
    missing: ['Screenshots', 'Demo video'],
  },
  {
    id: 2,
    name: 'MeetingMind Transcriber',
    category: 'Productivity',
    lastEdited: '2025-02-17',
    description: 'Automatically transcribes, summarizes, and extracts action items from your meetings in real time. Supports Zoom, Meet, and Teams.',
    tags: ['Transcription', 'Meetings', 'Automation'],
    pricing: 'Paid',
    website: '',
    completeness: 52,
    missing: ['Website URL', 'Screenshots', 'Pricing details'],
  },
  {
    id: 3,
    name: 'LogoForge AI',
    category: 'Design',
    lastEdited: '2025-02-14',
    description: 'Create professional logos, brand kits, and visual identities using AI. Export in SVG, PNG, and PDF formats.',
    tags: ['Logo', 'Branding', 'Design'],
    pricing: 'Free',
    website: 'https://logoforge.design',
    completeness: 95,
    missing: ['Demo video'],
  },
];

export default function DraftsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getCompletenessColor = (pct: number) => {
    if (pct >= 90) return 'var(--color-primary-light)';
    if (pct >= 60) return 'var(--color-text-secondary)';
    return 'var(--color-text-muted)';
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Tools you're still working on — not visible to the public
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {draftTools.length} Drafts
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Complete all required fields before submitting. Tools need to be{' '}
          <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>at least 80% complete</span>{' '}
          to be eligible for review.
        </p>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {draftTools.map((tool) => {
          const isExpanded = expandedId === tool.id;
          const isReady = tool.completeness >= 80;

          return (
            <div
              key={tool.id}
              className="rounded-lg overflow-hidden transition-all"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
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
                      <svg className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                            backgroundColor: 'var(--color-bg-tertiary)',
                            color: 'var(--color-text-muted)',
                            border: '1px solid var(--color-border-light)',
                          }}
                        >
                          Draft
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {tool.category}
                        </span>
                        <span style={{ color: 'var(--color-border-light)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          Last edited {new Date(tool.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Completeness Bar */}
                      <div className="mt-3 flex items-center gap-3">
                        <div
                          className="flex-1 h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${tool.completeness}%`,
                              backgroundColor: isReady
                                ? 'var(--color-primary-light)'
                                : 'var(--color-text-muted)',
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold shrink-0"
                          style={{ color: getCompletenessColor(tool.completeness) }}
                        >
                          {tool.completeness}%
                        </span>
                      </div>

                      {/* Missing fields */}
                      {tool.missing.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Missing:</span>
                          {tool.missing.map((m) => (
                            <span
                              key={m}
                              className="text-[11px] px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: 'rgba(220, 38, 38, 0.08)',
                                color: 'var(--color-error)',
                                border: '1px solid rgba(220, 38, 38, 0.15)',
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
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
                        className="w-3.5 h-3.5"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
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
                      Edit
                    </button>

                    {/* Submit for Review — only enabled if ready */}
                    <button
                      disabled={!isReady}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: isReady
                          ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))'
                          : 'var(--color-bg-tertiary)',
                        color: isReady ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                        border: isReady ? 'none' : '1px solid var(--color-border)',
                        cursor: isReady ? 'pointer' : 'not-allowed',
                        opacity: isReady ? 1 : 0.5,
                      }}
                      title={!isReady ? `Complete missing fields to submit` : 'Submit for review'}
                    >
                      Submit
                    </button>

                    <button
                      onClick={() => setDeleteId(tool.id)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-text-muted)',
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)';
                        e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.2)';
                        e.currentTarget.style.color = 'var(--color-error)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                      }}
                      title="Delete draft"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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

                  {/* Tags + Pricing + Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Tags</p>
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
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Pricing</p>
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
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Website</p>
                      {tool.website ? (
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium flex items-center gap-1 hover:underline"
                          style={{ color: 'var(--color-primary-light)' }}
                        >
                          {tool.website.replace('https://', '')}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: 'var(--color-error)' }}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Not set
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checklist */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      Submission Checklist
                    </p>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Tool name & category', done: true },
                        { label: 'Description', done: !!tool.description },
                        { label: 'Tags', done: tool.tags.length > 0 },
                        { label: 'Pricing', done: !!tool.pricing },
                        { label: 'Website URL', done: !!tool.website },
                        { label: 'Screenshots', done: !tool.missing.includes('Screenshots') },
                        { label: 'Demo video', done: !tool.missing.includes('Demo video') },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: item.done ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                              border: `1.5px solid ${item.done ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                            }}
                          >
                            {item.done && (
                              <svg className="w-2.5 h-2.5" style={{ color: 'var(--color-text-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: item.done ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {draftTools.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>No drafts yet</h3>
          <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
            Start building a tool and save it as a draft to work on it later.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
              color: 'var(--color-text-primary)',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Tool
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setDeleteId(null)}
        >
          <div
            className="w-full max-w-md rounded-xl p-6 space-y-4 animate-fade-in"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Delete Draft?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              The draft and all its content will be{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>permanently deleted</strong>. You won't be able to recover it.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setDeleteId(null)}
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
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}