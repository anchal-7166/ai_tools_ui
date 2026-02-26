'use client';
import { useState } from 'react';
import { useMyPublishedTools } from '@/lib/hooks/use-tools';
import Link from 'next/link';

type SortKey = 'publishedAt' | 'viewCount' | 'averageRating';

export default function PublishedPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('publishedAt');
  const [unpublishId, setUnpublishId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useMyPublishedTools();
  const tools = data?.data ?? [];

  const sorted = [...tools].sort((a: any, b: any) => {
    if (sortBy === 'viewCount') return (b.viewCount ?? 0) - (a.viewCount ?? 0);
    if (sortBy === 'averageRating') return (b.averageRating ?? 0) - (a.averageRating ?? 0);
    return new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime();
  });

  const totalViews = tools.reduce((s: number, t: any) => s + (t.viewCount ?? 0), 0);
  const totalSaves = tools.reduce((s: number, t: any) => s + (t.favoriteCount ?? 0), 0);
  const avgRating = tools.length
    ? (tools.reduce((s: number, t: any) => s + (t.averageRating ?? 0), 0) / tools.length).toFixed(1)
    : '—';

  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
          ))}
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
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
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Failed to load tools</p>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Something went wrong. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Empty ──
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        
        <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>No published tools yet</h3>
        <p className="text-xs sm:text-sm max-w-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
          Submit a tool for review and it will appear here once approved.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Your live tools visible to the public
        </p>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shrink-0"
          style={{ backgroundColor: 'rgba(138,18,18,0.12)', border: '1px solid var(--color-primary)' }}
        >
          <svg className="w-3 h-3" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-primary-light)' }}>
            {tools.length} Live
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          {
            label: 'Total Views', value: formatNum(totalViews),
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
          },
          {
            label: 'Avg. Rating', value: avgRating,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
          },
          {
            label: 'Total Saves', value: formatNum(totalSaves),
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
          },
        ].map((stat) => (
          <div key={stat.label} className="p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(138,18,18,0.12)', color: 'var(--color-primary-light)' }}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              <p className="text-sm sm:text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Sort Bar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {tools.length} tool{tools.length !== 1 ? 's' : ''} published
        </p>
        <div className="flex items-center gap-1 p-1 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
          {([
            { key: 'publishedAt', label: 'Newest' },
            { key: 'viewCount', label: 'Views' },
            { key: 'averageRating', label: 'Rating' },
          ] as { key: SortKey; label: string }[]).map((opt) => (
            <button key={opt.key} onClick={() => setSortBy(opt.key)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium transition-all"
              style={{
                backgroundColor: sortBy === opt.key ? 'var(--color-primary)' : 'transparent',
                color: sortBy === opt.key ? '#fff' : 'var(--color-text-muted)',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tools List ── */}
      <div className="space-y-3">
        {sorted.map((tool: any) => {
          const isExpanded = expandedId === tool.id;
          const primaryCategory = tool.categories?.[0]?.category?.name ?? '—';

          return (
            <div key={tool.id} className="rounded-lg overflow-hidden transition-all"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

              {/* ── Tool Row ── */}
              <div className="p-3 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">

                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-primary-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>

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
                            Live
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5 flex-wrap">
                          <span className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>{primaryCategory}</span>
                          <span className="hidden sm:inline" style={{ color: 'var(--color-border-light)' }}>·</span>
                          <span className="hidden sm:inline text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {tool.publishedAt
                              ? new Date(tool.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Recently published'}
                          </span>
                        </div>
                      </div>

                      {/* Actions — desktop */}
                      <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <button onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                        >
                          {isExpanded ? 'Hide' : 'Details'}
                          <svg className="w-3 h-3 transition-transform" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                        >
                          Edit
                        </button>
                        <button onClick={() => setUnpublishId(tool.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.15)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'; }}
                        >
                          Unpublish
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 sm:gap-4 mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                          {formatNum(tool.viewCount ?? 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                          {tool.averageRating?.toFixed(1) ?? '—'}
                        </span>
                        <span className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          ({tool.reviewCount ?? 0})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                          {tool.favoriteCount ?? 0}
                        </span>
                      </div>
                    </div>

                    {/* Actions — mobile */}
                    <div className="flex sm:hidden items-center gap-1.5 mt-2.5">
                      <button onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                      >
                        {isExpanded ? 'Hide' : 'Details'}
                        <svg className="w-3 h-3" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button className="px-2 py-1 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                        Edit
                      </button>
                      <button onClick={() => setUnpublishId(tool.id)}
                        className="px-2 py-1 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        Unpublish
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Expanded Details ── */}
              {isExpanded && (
                <div className="border-t px-3 sm:px-5 py-4 space-y-4"
                  style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>

                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Description</p>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {tool.tagline || tool.description || '—'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* Tags */}
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags?.slice(0, 5).map((t: any) => (
                          <span key={t.tag?.id} className="px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-medium"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                            {t.tag?.name}
                          </span>
                        ))}
                        {(!tool.tags || tool.tags.length === 0) && <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>No tags</span>}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Pricing</p>
                      <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                        {tool.pricingPlans?.[0]?.type ?? '—'}
                      </span>
                    </div>

                    {/* Website */}
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Website</p>
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
                  </div>

                  {/* Performance */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                    {[
                      { label: 'Views', value: formatNum(tool.viewCount ?? 0) },
                      { label: 'Rating', value: tool.averageRating ? `${tool.averageRating.toFixed(1)} / 5` : '—' },
                      { label: 'Reviews', value: tool.reviewCount ?? 0 },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
                        <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Unpublish Modal ── */}
      {unpublishId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setUnpublishId(null)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-5 sm:p-6 space-y-4"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden w-10 h-1 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--color-border-light)' }} />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Unpublish Tool?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>This will remove the tool from public listings.</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              The tool will be moved to your <strong style={{ color: 'var(--color-text-primary)' }}>Drafts</strong>. All reviews and ratings are preserved. You can republish at any time.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setUnpublishId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                Cancel
              </button>
              <button onClick={() => setUnpublishId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: 'var(--color-error)', color: '#fff' }}>
                Unpublish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}