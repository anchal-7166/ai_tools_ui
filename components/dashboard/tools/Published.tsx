'use client';
import { useState } from 'react';

const publishedTools = [
  {
    id: 1,
    name: 'AI Image Generator',
    category: 'Image & Video',
    publishedAt: '2025-01-15',
    description: 'Generate stunning, high-resolution images from text prompts using state-of-the-art diffusion models. Supports multiple styles and aspect ratios.',
    tags: ['Image Generation', 'Creative', 'AI Art'],
    pricing: 'Freemium',
    website: 'https://aiimggen.io',
    views: '8,200',
    rating: 4.9,
    reviewCount: 142,
    saves: 310,
  },
  {
    id: 2,
    name: 'Code Assistant Pro',
    category: 'Developer Tools',
    publishedAt: '2025-01-28',
    description: 'AI-powered coding assistant that autocompletes, refactors, and explains code across 50+ programming languages directly in your IDE.',
    tags: ['Code', 'Productivity', 'Developer'],
    pricing: 'Paid',
    website: 'https://codeassistpro.dev',
    views: '6,100',
    rating: 4.7,
    reviewCount: 98,
    saves: 214,
  },
  {
    id: 3,
    name: 'DataViz AI',
    category: 'Analytics',
    publishedAt: '2025-02-03',
    description: 'Transform raw spreadsheets and databases into interactive charts and dashboards with a single prompt. No coding required.',
    tags: ['Analytics', 'Data', 'Visualization'],
    pricing: 'Free',
    website: 'https://dataviz.ai',
    views: '3,750',
    rating: 4.5,
    reviewCount: 57,
    saves: 89,
  },
  {
    id: 4,
    name: 'VoiceClone Studio',
    category: 'Audio',
    publishedAt: '2025-02-10',
    description: 'Clone any voice with just 10 seconds of audio. Generate lifelike speech in over 30 languages for podcasts, ads, and more.',
    tags: ['Voice', 'Audio', 'TTS'],
    pricing: 'Freemium',
    website: 'https://voiceclone.studio',
    views: '5,480',
    rating: 4.6,
    reviewCount: 73,
    saves: 162,
  },
];

type SortKey = 'publishedAt' | 'views' | 'rating';

export default function PublishedPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('publishedAt');
  const [unpublishId, setUnpublishId] = useState<number | null>(null);

  const sorted = [...publishedTools].sort((a, b) => {
    if (sortBy === 'views') return parseInt(b.views.replace(/,/g, '')) - parseInt(a.views.replace(/,/g, ''));
    if (sortBy === 'rating') return b.rating - a.rating;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const totalViews = publishedTools.reduce((sum, t) => sum + parseInt(t.views.replace(/,/g, '')), 0);
  const avgRating = (publishedTools.reduce((sum, t) => sum + t.rating, 0) / publishedTools.length).toFixed(1);
  const totalSaves = publishedTools.reduce((sum, t) => sum + t.saves, 0);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'publishedAt', label: 'Newest' },
    { key: 'views', label: 'Most Viewed' },
    { key: 'rating', label: 'Top Rated' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Your live tools visible to the public
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(138, 18, 18, 0.12)',
            border: '1px solid var(--color-primary)',
          }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: 'var(--color-primary-light)' }}>
            {publishedTools.length} Live
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Views', value: `${(totalViews / 1000).toFixed(1)}k`, icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )},
          { label: 'Avg. Rating', value: avgRating, icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )},
          { label: 'Total Saves', value: totalSaves.toLocaleString(), icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )},
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg flex items-center gap-3"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(138, 18, 18, 0.12)', color: 'var(--color-primary-light)' }}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              <p className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {publishedTools.length} tools published
        </p>
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}>
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                backgroundColor: sortBy === opt.key ? 'var(--color-primary)' : 'transparent',
                color: sortBy === opt.key ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools List */}
      <div className="space-y-4">
        {sorted.map((tool) => {
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
                          Live
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {tool.category}
                        </span>
                        <span style={{ color: 'var(--color-border-light)' }}>·</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          Published {new Date(tool.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Stats inline */}
                      <div className="flex items-center gap-4 mt-2.5">
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool.rating}</span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>({tool.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool.saves}</span>
                        </div>
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

                    <button
                      onClick={() => setUnpublishId(tool.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: 'rgba(220, 38, 38, 0.08)',
                        color: 'var(--color-error)',
                        border: '1px solid rgba(220, 38, 38, 0.2)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.08)'; }}
                    >
                      Unpublish
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
                  </div>

                  {/* Performance snapshot */}
                  <div
                    className="grid grid-cols-3 gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
                  >
                    {[
                      { label: 'Views', value: tool.views },
                      { label: 'Rating', value: `${tool.rating} / 5` },
                      { label: 'Reviews', value: tool.reviewCount },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {publishedTools.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>No published tools yet</h3>
          <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
            Submit a tool for review and it will appear here once approved.
          </p>
        </div>
      )}

      {/* Unpublish Confirmation Modal */}
      {unpublishId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setUnpublishId(null)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Unpublish Tool?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>This will remove the tool from public listings.</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              The tool will be moved to your <strong style={{ color: 'var(--color-text-primary)' }}>Drafts</strong>. All existing reviews and ratings will be preserved. You can republish at any time.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setUnpublishId(null)}
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
                onClick={() => setUnpublishId(null)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Unpublish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}