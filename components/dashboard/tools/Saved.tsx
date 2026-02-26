'use client';
import { useState, useMemo } from 'react';
import { useMySavedTools } from '@/lib/hooks/use-tools';
import { useToggleFavorite } from '@/lib/hooks/use-tools';
import Link from 'next/link';

export default function SavedPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [unsaveId, setUnsaveId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useMySavedTools();
  const { mutate: toggleFavorite, isPending: isUnsaving } = useToggleFavorite();

  const tools = data?.data ?? [];

  const categories = useMemo(() => {
    const cats = tools.flatMap((t: any) =>
      t.categories?.map((c: any) => c.category?.name).filter(Boolean) ?? []
    );
    return ['All', ...Array.from(new Set<string>(cats))];
  }, [tools]);

  const filtered = tools.filter((tool: any) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      tool.name?.toLowerCase().includes(searchLower) ||
      tool.tagline?.toLowerCase().includes(searchLower) ||
      tool.tags?.some((t: any) => t.tag?.name?.toLowerCase().includes(searchLower));
    const toolCategory = tool.categories?.[0]?.category?.name;
    const matchesCategory = activeCategory === 'All' || toolCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUnsave = () => {
    if (!unsaveId) return;
    const tool = tools.find((t: any) => t.id === unsaveId);
    toggleFavorite({ toolId: unsaveId, toolSlug: tool?.slug ?? '' });
    setUnsaveId(null);
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-10 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />
        <div className="flex gap-2">
          {[1, 2, 3].map(i => <div key={i} className="h-8 w-20 rounded-lg" style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }} />)}
        </div>
        {[1, 2, 3, 4].map(i => (
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
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>Failed to load saved tools</p>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>Something went wrong. Please try again.</p>
        <button onClick={() => refetch()} className="px-4 py-2 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
          Retry
        </button>
      </div>
    );
  }

  // ── Empty (no saved tools at all) ──
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
          <svg className="w-7 h-7" style={{ color: 'var(--color-text-muted)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>No saved tools yet</h3>
        <p className="text-xs sm:text-sm max-w-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
          Browse the platform and hit the heart icon on any tool to save it here.
        </p>
        <Link href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Browse Tools
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Tools you've bookmarked from the platform
        </p>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shrink-0"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border-light)' }}>
          <svg className="w-3 h-3" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {tools.length} Saved
          </span>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search saved tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2 rounded-lg text-xs sm:text-sm outline-none transition-all"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Category pills — horizontally scrollable on mobile ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap shrink-0"
            style={{
              backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-card)',
              color: activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
              border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(search || activeCategory !== 'All') && (
        <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Showing <span style={{ color: 'var(--color-text-secondary)' }}>{filtered.length}</span> of {tools.length} saved tools
        </p>
      )}

      {/* ── Tools List ── */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((tool: any) => {
            const isExpanded = expandedId === tool.id;
            const primaryCategory = tool.categories?.[0]?.category?.name ?? '—';
            const author = tool.user?.name ?? tool.user?.email ?? '—';
            const savedDate = tool.savedAt
              ? new Date(tool.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '—';

            return (
              <div key={tool.id} className="rounded-lg overflow-hidden transition-all"
                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>

                <div className="p-3 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">

                    {/* Icon */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-primary))',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                      }}>
                      {tool.name?.charAt(0) ?? '?'}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                              {tool.name}
                            </h3>
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium shrink-0"
                              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                              {primaryCategory}
                            </span>
                          </div>

                          {/* Meta — hide some on mobile */}
                          <div className="flex items-center gap-1.5 sm:gap-3 mt-0.5 flex-wrap">
                            <span className="hidden sm:inline text-xs" style={{ color: 'var(--color-text-muted)' }}>by {author}</span>
                            <span className="hidden sm:inline" style={{ color: 'var(--color-border-light)' }}>·</span>
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
                            <span className="hidden sm:inline" style={{ color: 'var(--color-border-light)' }}>·</span>
                            <span className="hidden sm:inline text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              Saved {savedDate}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex items-center gap-1 mt-1.5 sm:mt-2.5 flex-wrap">
                            {tool.tags?.slice(0, 3).map((t: any) => (
                              <span key={t.tag?.id} className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-medium"
                                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                                {t.tag?.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions — desktop */}
                        <div className="hidden sm:flex items-center gap-2 shrink-0">
                          <button onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}>
                            {isExpanded ? 'Hide' : 'Details'}
                            <svg className="w-3 h-3 transition-transform" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {tool.websiteUrl && (
                            <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                              style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
                              Visit
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          <button onClick={() => setUnsaveId(tool.id)}
                            className="p-1.5 rounded-lg transition-all"
                            style={{ color: 'var(--color-primary-light)', backgroundColor: 'transparent', border: '1px solid transparent' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                            title="Remove from saved">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Actions — mobile */}
                      <div className="flex sm:hidden items-center gap-1.5 mt-2">
                        <button onClick={() => setExpandedId(isExpanded ? null : tool.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                          {isExpanded ? 'Hide' : 'Details'}
                          <svg className="w-3 h-3" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {tool.websiteUrl && (
                          <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold"
                            style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', color: '#fff' }}>
                            Visit
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        <button onClick={() => setUnsaveId(tool.id)}
                          className="p-1 rounded-md transition-all"
                          style={{ color: 'var(--color-primary-light)', border: '1px solid transparent' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Expanded Details ── */}
                {isExpanded && (
                  <div className="border-t px-3 sm:px-5 py-3 sm:py-4 space-y-3 sm:space-y-4"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>

                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Description</p>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {tool.tagline || tool.description || '—'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Pricing</p>
                        <span className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                          {tool.pricingPlans?.[0]?.type ?? '—'}
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
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Published by</p>
                        <span className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-secondary)' }}>{author}</span>
                      </div>
                    </div>

                    {/* Rating snapshot */}
                    <div className="flex items-center gap-3 sm:gap-6 p-3 rounded-lg"
                      style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
                      <div className="text-center">
                        <p className="text-base sm:text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {tool.averageRating?.toFixed(1) ?? '—'}
                        </p>
                        <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Rating</p>
                      </div>
                      <div className="w-px h-8" style={{ backgroundColor: 'var(--color-border)' }} />
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 sm:w-4 sm:h-4"
                            style={{ color: star <= Math.round(tool.averageRating ?? 0) ? 'var(--color-primary-light)' : 'var(--color-border-light)' }}
                            fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="w-px h-8" style={{ backgroundColor: 'var(--color-border)' }} />
                      <div className="text-center">
                        <p className="text-base sm:text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {(tool.reviewCount ?? 0).toLocaleString()}
                        </p>
                        <p className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Reviews</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* No results from filter/search */
        <div className="flex flex-col items-center justify-center py-14 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-sm sm:text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>No results found</h3>
          <p className="text-xs text-center max-w-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Try a different search term or category.
          </p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
            Clear filters
          </button>
        </div>
      )}

      {/* ── Unsave Modal — bottom sheet on mobile ── */}
      {unsaveId !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setUnsaveId(null)}>
          <div
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-xl p-5 sm:p-6 space-y-4"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            onClick={(e) => e.stopPropagation()}>
            {/* drag handle */}
            <div className="sm:hidden w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: 'var(--color-border-light)' }} />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Remove from Saved?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {tools.find((t: any) => t.id === unsaveId)?.name}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This tool will be removed from your saved list. You can always save it again from the platform.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setUnsaveId(null)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                Cancel
              </button>
              <button onClick={handleUnsave} disabled={isUnsaving}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-opacity"
                style={{ backgroundColor: 'var(--color-error)', color: '#fff', opacity: isUnsaving ? 0.6 : 1 }}>
                {isUnsaving ? 'Removing…' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}