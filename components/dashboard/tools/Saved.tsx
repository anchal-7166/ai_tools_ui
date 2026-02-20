'use client';

import { useState } from 'react';

const savedTools = [
  {
    id: 1,
    name: 'Runway ML',
    category: 'Video & Animation',
    savedAt: '2025-02-18',
    description: 'Professional-grade AI video generation and editing platform. Create cinematic videos, remove backgrounds, and apply visual effects using text prompts.',
    tags: ['Video', 'Animation', 'Creative'],
    pricing: 'Freemium',
    website: 'https://runwayml.com',
    rating: 4.8,
    reviewCount: 2340,
    author: 'Runway AI Inc.',
  },
  {
    id: 2,
    name: 'Perplexity AI',
    category: 'Research & Search',
    savedAt: '2025-02-15',
    description: 'AI-powered search engine that answers complex questions with cited sources in real time. Great for research, fact-checking, and deep dives.',
    tags: ['Search', 'Research', 'Q&A'],
    pricing: 'Freemium',
    website: 'https://perplexity.ai',
    rating: 4.7,
    reviewCount: 4120,
    author: 'Perplexity Inc.',
  },
  {
    id: 3,
    name: 'Midjourney',
    category: 'Image Generation',
    savedAt: '2025-02-10',
    description: 'Industry-leading AI image generator known for its artistic, high-quality outputs. Works via Discord and a dedicated web interface.',
    tags: ['Image Generation', 'Art', 'Creative'],
    pricing: 'Paid',
    website: 'https://midjourney.com',
    rating: 4.9,
    reviewCount: 8900,
    author: 'Midjourney Inc.',
  },
  {
    id: 4,
    name: 'ElevenLabs',
    category: 'Audio & Voice',
    savedAt: '2025-02-05',
    description: 'State-of-the-art AI voice synthesis and cloning. Generate ultra-realistic speech in 29 languages with fine control over emotion and tone.',
    tags: ['Voice', 'TTS', 'Audio'],
    pricing: 'Freemium',
    website: 'https://elevenlabs.io',
    rating: 4.8,
    reviewCount: 3670,
    author: 'ElevenLabs Inc.',
  },
  {
    id: 5,
    name: 'Cursor',
    category: 'Developer Tools',
    savedAt: '2025-01-30',
    description: 'AI-first code editor built on VS Code. Chat with your codebase, auto-complete entire functions, and get contextual bug fixes instantly.',
    tags: ['Code Editor', 'AI Coding', 'Developer'],
    pricing: 'Freemium',
    website: 'https://cursor.sh',
    rating: 4.9,
    reviewCount: 6210,
    author: 'Anysphere Inc.',
  },
  {
    id: 6,
    name: 'Notion AI',
    category: 'Productivity',
    savedAt: '2025-01-22',
    description: 'AI writing, summarization, and Q&A assistant built directly into Notion. Helps you draft content, autofill tables, and summarize pages.',
    tags: ['Writing', 'Productivity', 'Notes'],
    pricing: 'Paid',
    website: 'https://notion.so',
    rating: 4.5,
    reviewCount: 5540,
    author: 'Notion Labs',
  },
];

const categories = ['All', ...Array.from(new Set(savedTools.map((t) => t.category)))];

export default function SavedPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [unsaveId, setUnsaveId] = useState<number | null>(null);

  const filtered = savedTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Tools you've bookmarked from the platform
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {savedTools.length} Saved
          </span>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--color-text-muted)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search saved tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-card)',
                color: activeCategory === cat ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeCategory !== 'All') && (
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Showing <span style={{ color: 'var(--color-text-secondary)' }}>{filtered.length}</span> of {savedTools.length} saved tools
        </p>
      )}

      {/* Tools Grid */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((tool) => {
            const isExpanded = expandedId === tool.id;

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
                    {/* Left */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon placeholder */}
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 text-base font-bold"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-primary))',
                          color: 'var(--color-text-primary)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {tool.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                            {tool.name}
                          </h3>
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              color: 'var(--color-text-muted)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            {tool.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            by {tool.author}
                          </span>
                          <span style={{ color: 'var(--color-border-light)' }}>·</span>
                          {/* Star Rating */}
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                              {tool.rating}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              ({tool.reviewCount.toLocaleString()})
                            </span>
                          </div>
                          <span style={{ color: 'var(--color-border-light)' }}>·</span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            Saved {new Date(tool.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                          {tool.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium"
                              style={{
                                backgroundColor: 'var(--color-bg-tertiary)',
                                color: 'var(--color-text-muted)',
                                border: '1px solid var(--color-border)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
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
                          className="w-3.5 h-3.5"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Visit */}
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        Visit
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>

                      {/* Unsave heart */}
                      <button
                        onClick={() => setUnsaveId(tool.id)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--color-primary-light)',
                          border: '1px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        title="Remove from saved"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

                    {/* Pricing + Website + Saved date */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Published by</p>
                        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{tool.author}</span>
                      </div>
                    </div>

                    {/* Rating snapshot */}
                    <div
                      className="flex items-center gap-6 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{tool.rating}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Rating</p>
                      </div>
                      <div
                        className="w-px h-8 self-center"
                        style={{ backgroundColor: 'var(--color-border)' }}
                      />
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-4 h-4"
                            style={{
                              color: star <= Math.round(tool.rating)
                                ? 'var(--color-primary-light)'
                                : 'var(--color-border-light)',
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div
                        className="w-px h-8 self-center"
                        style={{ backgroundColor: 'var(--color-border)' }}
                      />
                      <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {tool.reviewCount.toLocaleString()}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Reviews</p>
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
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg className="w-7 h-7" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>No results found</h3>
          <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
            Try a different search term or category filter.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Unsave Confirmation Modal */}
      {unsaveId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setUnsaveId(null)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Remove from Saved?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {savedTools.find((t) => t.id === unsaveId)?.name}
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This tool will be removed from your saved list. You can always save it again later from the platform.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setUnsaveId(null)}
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
                onClick={() => setUnsaveId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}