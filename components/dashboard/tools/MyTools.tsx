'use client';
import { useState } from 'react';

const allTools = [
  {
    id: 1,
    name: 'AI Image Generator',
    category: 'Image & Video',
    status: 'Published',
    publishedAt: '2025-01-15',
    lastEdited: '2025-01-15',
    description: 'Generate stunning, high-resolution images from text prompts using state-of-the-art diffusion models.',
    tags: ['Image Generation', 'Creative', 'AI Art'],
    pricing: 'Freemium',
    website: 'https://aiimggen.io',
    views: 8200,
    rating: 4.9,
    reviewCount: 142,
    saves: 310,
    completeness: 100,
  },
  {
    id: 2,
    name: 'Code Assistant Pro',
    category: 'Developer Tools',
    status: 'Published',
    publishedAt: '2025-01-28',
    lastEdited: '2025-01-28',
    description: 'AI-powered coding assistant that autocompletes, refactors, and explains code across 50+ programming languages.',
    tags: ['Code', 'Productivity', 'Developer'],
    pricing: 'Paid',
    website: 'https://codeassistpro.dev',
    views: 6100,
    rating: 4.7,
    reviewCount: 98,
    saves: 214,
    completeness: 100,
  },
  {
    id: 3,
    name: 'DataViz AI',
    category: 'Analytics',
    status: 'Published',
    publishedAt: '2025-02-03',
    lastEdited: '2025-02-03',
    description: 'Transform raw spreadsheets and databases into interactive charts and dashboards with a single prompt.',
    tags: ['Analytics', 'Data', 'Visualization'],
    pricing: 'Free',
    website: 'https://dataviz.ai',
    views: 3750,
    rating: 4.5,
    reviewCount: 57,
    saves: 89,
    completeness: 100,
  },
  {
    id: 4,
    name: 'VoiceClone Studio',
    category: 'Audio',
    status: 'Published',
    publishedAt: '2025-02-10',
    lastEdited: '2025-02-10',
    description: 'Clone any voice with just 10 seconds of audio. Generate lifelike speech in over 30 languages.',
    tags: ['Voice', 'Audio', 'TTS'],
    pricing: 'Freemium',
    website: 'https://voiceclone.studio',
    views: 5480,
    rating: 4.6,
    reviewCount: 73,
    saves: 162,
    completeness: 100,
  },
  {
    id: 5,
    name: 'Neural Text Summarizer',
    category: 'Productivity',
    status: 'Pending',
    publishedAt: null,
    lastEdited: '2025-02-18',
    description: 'An AI-powered tool that summarizes long articles, documents, and web pages into concise bullet points.',
    tags: ['NLP', 'Summarization', 'Productivity'],
    pricing: 'Freemium',
    website: 'https://neuralsummarize.ai',
    views: 0,
    rating: null,
    reviewCount: 0,
    saves: 0,
    completeness: 100,
  },
  {
    id: 6,
    name: 'PixelCraft AI Designer',
    category: 'Design',
    status: 'Pending',
    publishedAt: null,
    lastEdited: '2025-02-17',
    description: 'Generate pixel-perfect UI designs, icons, and illustrations using natural language prompts.',
    tags: ['Design', 'Image Generation', 'UI/UX'],
    pricing: 'Paid',
    website: 'https://pixelcraft.design',
    views: 0,
    rating: null,
    reviewCount: 0,
    saves: 0,
    completeness: 100,
  },
  {
    id: 7,
    name: 'SmartResume AI',
    category: 'Productivity',
    status: 'Draft',
    publishedAt: null,
    lastEdited: '2025-02-19',
    description: 'Generate tailored resumes and cover letters in seconds using AI. Matches your experience to job descriptions.',
    tags: ['Resume', 'Career', 'Productivity'],
    pricing: 'Freemium',
    website: 'https://smartresume.ai',
    views: 0,
    rating: null,
    reviewCount: 0,
    saves: 0,
    completeness: 85,
  },
  {
    id: 8,
    name: 'MeetingMind Transcriber',
    category: 'Productivity',
    status: 'Draft',
    publishedAt: null,
    lastEdited: '2025-02-17',
    description: 'Automatically transcribes, summarizes, and extracts action items from your meetings in real time.',
    tags: ['Transcription', 'Meetings', 'Automation'],
    pricing: 'Paid',
    website: '',
    views: 0,
    rating: null,
    reviewCount: 0,
    saves: 0,
    completeness: 52,
  },
  {
    id: 9,
    name: 'LogoForge AI',
    category: 'Design',
    status: 'Draft',
    publishedAt: null,
    lastEdited: '2025-02-14',
    description: 'Create professional logos, brand kits, and visual identities using AI. Export in SVG, PNG, and PDF formats.',
    tags: ['Logo', 'Branding', 'Design'],
    pricing: 'Free',
    website: 'https://logoforge.design',
    views: 0,
    rating: null,
    reviewCount: 0,
    saves: 0,
    completeness: 95,
  },
];

type StatusFilter = 'All' | 'Published' | 'Pending' | 'Draft';
type SortKey = 'lastEdited' | 'views' | 'rating' | 'name';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  Published: {
    label: 'Published',
    color: 'var(--color-primary-light)',
    bg: 'rgba(138, 18, 18, 0.12)',
    border: 'var(--color-primary)',
  },
  Pending: {
    label: 'Pending',
    color: 'var(--color-text-secondary)',
    bg: 'var(--color-bg-tertiary)',
    border: 'var(--color-border-light)',
  },
  Draft: {
    label: 'Draft',
    color: 'var(--color-text-muted)',
    bg: 'var(--color-bg-tertiary)',
    border: 'var(--color-border)',
  },
};

export default function MyToolsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<SortKey>('lastEdited');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const statusCounts = {
    All: allTools.length,
    Published: allTools.filter((t) => t.status === 'Published').length,
    Pending: allTools.filter((t) => t.status === 'Pending').length,
    Draft: allTools.filter((t) => t.status === 'Draft').length,
  };

  const filtered = allTools
    .filter((t) => {
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
    });

  const totalViews = allTools.filter(t => t.status === 'Published').reduce((s, t) => s + t.views, 0);
  const avgRating = (() => {
    const rated = allTools.filter((t) => t.rating);
    return rated.length ? (rated.reduce((s, t) => s + (t.rating ?? 0), 0) / rated.length).toFixed(1) : '—';
  })();

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Tools',
            value: allTools.length,
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
          },
          {
            label: 'Published',
            value: statusCounts.Published,
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: 'Total Views',
            value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews,
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ),
          },
          {
            label: 'Avg. Rating',
            value: avgRating,
            icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ),
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
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

      {/* Filters + Controls Row */}
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
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
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

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          <option value="lastEdited">Sort: Last Edited</option>
          <option value="views">Sort: Most Viewed</option>
          <option value="rating">Sort: Top Rated</option>
          <option value="name">Sort: Name A–Z</option>
        </select>

        {/* View Mode Toggle */}
        <div
          className="flex gap-1 p-1 rounded-lg"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)' }}
        >
          {(['list', 'grid'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="p-1.5 rounded-md transition-all"
              style={{
                backgroundColor: viewMode === mode ? 'var(--color-bg-card)' : 'transparent',
                color: viewMode === mode ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                border: viewMode === mode ? '1px solid var(--color-border)' : '1px solid transparent',
              }}
              title={mode === 'list' ? 'List view' : 'Grid view'}
            >
              {mode === 'list' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-1 flex-wrap">
        {(['All', 'Published', 'Pending', 'Draft'] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: statusFilter === s ? 'var(--color-primary)' : 'var(--color-bg-card)',
              color: statusFilter === s ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              border: `1px solid ${statusFilter === s ? 'var(--color-primary)' : 'var(--color-border)'}`,
            }}
          >
            {s}
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: statusFilter === s ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-tertiary)',
                color: statusFilter === s ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}
            >
              {statusCounts[s]}
            </span>
          </button>
        ))}
        {search && (
          <p className="ml-2 text-xs self-center" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
          </p>
        )}
      </div>

      {/* Tools — LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filtered.map((tool) => {
            const sc = statusConfig[tool.status];
            return (
              <div
                key={tool.id}
                className="p-4 rounded-lg flex items-center gap-4 transition-all group"
                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.3))',
                    color: 'var(--color-primary-light)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tool.name.charAt(0)}
                </div>

                {/* Name + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {tool.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide shrink-0"
                      style={{ backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{tool.category}</span>
                    <span style={{ color: 'var(--color-border-light)' }}>·</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {tool.status === 'Published'
                        ? `Published ${new Date(tool.publishedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : `Edited ${new Date(tool.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                    </span>
                  </div>
                </div>

                {/* Stats (published only) */}
                {tool.status === 'Published' && (
                  <div className="hidden md:flex items-center gap-5 shrink-0">
                    <div className="text-center">
                      <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {tool.views >= 1000 ? `${(tool.views / 1000).toFixed(1)}k` : tool.views}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Views</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-0.5">
                        <svg className="w-3 h-3" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{tool.rating}</span>
                      </div>
                      <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{tool.reviewCount} reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{tool.saves}</p>
                      <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Saves</p>
                    </div>
                  </div>
                )}

                {/* Draft completeness */}
                {tool.status === 'Draft' && (
                  <div className="hidden md:flex flex-col items-end gap-1 shrink-0 w-28">
                    <span className="text-xs font-semibold" style={{ color: tool.completeness >= 80 ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}>
                      {tool.completeness}% complete
                    </span>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${tool.completeness}%`,
                          backgroundColor: tool.completeness >= 80 ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Pending label */}
                {tool.status === 'Pending' && (
                  <div className="hidden md:flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>In review queue</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.borderColor = 'var(--color-border-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(tool.id)}
                    className="p-1.5 rounded-lg transition-all"
                    style={{ color: 'var(--color-text-muted)', backgroundColor: 'transparent', border: '1px solid transparent' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-error)';
                      e.currentTarget.style.backgroundColor = 'rgba(220,38,38,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tools — GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const sc = statusConfig[tool.status];
            return (
              <div
                key={tool.id}
                className="rounded-lg p-4 flex flex-col gap-3 transition-all group"
                style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                {/* Card top */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-bg-tertiary), rgba(138,18,18,0.3))',
                      color: 'var(--color-primary-light)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {tool.name.charAt(0)}
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide shrink-0"
                    style={{ backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}
                  >
                    {sc.label}
                  </span>
                </div>

                {/* Name + desc */}
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{tool.name}</h3>
                  <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {tool.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[11px]"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {tool.tags.length > 2 && (
                    <span className="text-[11px] self-center" style={{ color: 'var(--color-text-muted)' }}>
                      +{tool.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Stats row */}
                {tool.status === 'Published' && (
                  <div
                    className="flex items-center justify-between pt-3 mt-auto"
                    style={{ borderTop: '1px solid var(--color-border)' }}
                  >
                    <div className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {tool.views >= 1000 ? `${(tool.views / 1000).toFixed(1)}k` : tool.views}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <svg className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-light)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                        style={{
                          backgroundColor: 'var(--color-bg-tertiary)',
                          color: 'var(--color-text-secondary)',
                          border: '1px solid var(--color-border)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}

                {/* Draft completeness bar */}
                {tool.status === 'Draft' && (
                  <div
                    className="pt-3 mt-auto"
                    style={{ borderTop: '1px solid var(--color-border)' }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Completeness</span>
                      <span className="text-[11px] font-semibold" style={{ color: tool.completeness >= 80 ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }}>
                        {tool.completeness}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${tool.completeness}%`,
                          backgroundColor: tool.completeness >= 80 ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {tool.status === 'Pending' && (
                  <div
                    className="flex items-center gap-1.5 pt-3 mt-auto"
                    style={{ borderTop: '1px solid var(--color-border)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ backgroundColor: 'var(--color-text-muted)' }} />
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Awaiting admin review</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-lg"
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
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>No tools found</h3>
          <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
            Try a different search or filter.
          </p>
          <button
            onClick={() => { setSearch(''); setStatusFilter('All'); }}
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
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'var(--color-error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Delete Tool?</h3>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {allTools.find((t) => t.id === deleteId)?.name}
                </p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This will <strong style={{ color: 'var(--color-text-primary)' }}>permanently delete</strong> the tool and all its data including reviews and ratings. This action cannot be undone.
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
                Delete Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}