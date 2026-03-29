'use client';

import React, { useState } from 'react';
import { useFilterOptions } from '@/lib/hooks/use-tools';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  activeCount?: number;
  children: React.ReactNode;
}

// ── Collapsible filter section ────────────────────────────────────────────────
const FilterSection = ({ title, isExpanded, onToggle, activeCount = 0, children }: FilterSectionProps) => (
  <div className="border-b border-[#1f1f1f] last:border-0">
    {/*
      FIX 1: type="button" is REQUIRED.
      Without it the button defaults to type="submit" inside any ancestor
      form (or Next.js router context), which causes page navigation on click.
    */}
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2 px-1 group hover:bg-[#111] rounded transition-colors"
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider group-hover:text-[#b3b3b3] transition-colors">
          {title}
        </span>
        {activeCount > 0 && (
          <span className="px-1.5 py-0.5 bg-red-600/80 text-white text-[10px] font-bold rounded-full leading-none">
            {activeCount}
          </span>
        )}
      </div>
      <svg
        className={`w-3.5 h-3.5 text-[#555] transition-transform duration-300 ease-in-out flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {/*
      FIX 2: overflow-hidden is ALWAYS present.
      Previously it was removed when expanded, which let content bleed
      over the next section causing the visual overlap.
      The grid-rows trick animates height without needing to remove overflow-hidden.
    */}
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="pb-3 space-y-0.5">
        {children}
      </div>
    </div>
  </div>
);

// ── Checkbox item ─────────────────────────────────────────────────────────────
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxItem = ({ label, checked, onChange }: CheckboxItemProps) => (
  /*
    The <label> wraps the hidden <input> — clicking anywhere on the row
    fires onChange exactly ONCE via the input.
    The visual div has pointer-events-none so it doesn't fire a second time.
  */
  <label className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer group hover:bg-[#161616] transition-all duration-150 select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />

    {/* Visual checkbox — purely decorative */}
    <div
      className={`
        pointer-events-none w-4 h-4 flex-shrink-0 rounded border
        transition-all duration-200 ease-in-out flex items-center justify-center
        ${checked
          ? 'bg-red-600 border-red-600 shadow-[0_0_8px_rgba(220,38,38,0.35)]'
          : 'bg-[#0d0d0d] border-[#3a3a3a] group-hover:border-[#666]'
        }
      `}
    >
      <svg
        className={`w-2.5 h-2.5 text-white transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <span className={`text-sm transition-colors duration-150 leading-tight ${
      checked ? 'text-white font-medium' : 'text-[#a3a3a3] group-hover:text-[#d4d4d4]'
    }`}>
      {label}
    </span>
  </label>
);

// ── Main Sidebar ──────────────────────────────────────────────────────────────
const Sidebar = ({ isOpen, onClose, onFilterChange, activeFilters }: SidebarProps) => {
  const { data: filterOptionsResponse, isLoading } = useFilterOptions();
  const filterOptions = filterOptionsResponse?.filters || [];

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    platform: false,
    targetUsers: false,
    pricing: false,
  });

  const [sortBy, setSortBy] = useState('newest');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const current: string[] = activeFilters[filterType] || [];
    const updated = isChecked
      ? [...current, value]
      : current.filter((v: string) => v !== value);
    onFilterChange({ ...activeFilters, [filterType]: updated });
  };

  const clearAllFilters = () => {
    setSortBy('newest');
    onFilterChange({ categories: [], tags: [], platformType: [], targetAudience: [], pricingType: [] });
  };

  const getFilterOptions = (path: string) => {
    const filter = filterOptions.find((f: any) => f.path === path);
    return filter?.options || [];
  };

  const categories   = getFilterOptions('categories.category.slug');
  const platforms    = getFilterOptions('platformType');
  const audiences    = getFilterOptions('targetAudience');
  const pricingTypes = getFilterOptions('pricingPlans.type');

  const totalActive      = Object.values(activeFilters).reduce((acc: number, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0) as number;
  const categoriesActive = activeFilters.categories?.length     || 0;
  const platformsActive  = activeFilters.platformType?.length   || 0;
  const audiencesActive  = activeFilters.targetAudience?.length || 0;
  const pricingActive    = activeFilters.pricingType?.length    || 0;

  if (isLoading) {
    return (
      <aside className="hidden lg:flex w-64 h-screen bg-[#080808] border-r border-[#1f1f1f] items-center justify-center flex-shrink-0">
        <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full" />
      </aside>
    );
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bg-[#080808] border-r border-[#1f1f1f] z-50
          flex flex-col
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:flex
          ${isCollapsed ? 'lg:w-[60px]' : 'lg:w-64'}
          w-64
        `}
        style={{ height: '100dvh' }}
      >

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className={`flex items-center border-b border-[#1f1f1f] flex-shrink-0 h-16 min-h-[64px] ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
              <img src="/logo44.png" alt="AI Tool Store" className="w-8 h-8 object-contain flex-shrink-0" />
              <span className="font-bold text-sm text-white whitespace-nowrap truncate">AI Tool Store</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center justify-center">
              <img src="/logo44.png" alt="AI Tool Store" className="w-8 h-8 object-contain" />
            </Link>
          )}

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(prev => !prev)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md hover:bg-[#1a1a1a] text-[#555] hover:text-white transition-all flex-shrink-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md hover:bg-[#1a1a1a] text-[#555] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Collapsed icon strip ─────────────────────────────────────── */}
        {isCollapsed && (
          <div className="hidden lg:flex flex-col items-center gap-3 pt-4 px-2 flex-shrink-0">
            {totalActive > 0 && (
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalActive}
                </span>
              </div>
            )}
            <div className="w-7 h-px bg-[#2a2a2a]" />
            <div className="w-9 h-9 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center cursor-pointer text-[#555] hover:text-white transition-colors" title="Sort">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h6M15 16h2" />
              </svg>
            </div>
          </div>
        )}

        {/* ── Scrollable filter body ───────────────────────────────────── */}
        {/* min-h-0 is critical — without it flex-1 won't shrink and     */}
        {/* overflow-y-auto never triggers, making the list un-scrollable */}
        {!isCollapsed && (
          <div className="sidebar-filter-scroll flex-1 min-h-0 overflow-y-auto px-3 pt-3 pb-6">


            {/* Sort By */}
            <div className="mb-4">
              <label className="block text-[10px] font-semibold text-[#555] uppercase tracking-wider mb-1.5 px-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#252525] rounded-lg text-sm text-[#b3b3b3] focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700 transition-colors cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            {/* Filter sections — each stacks naturally in normal flow */}
            <div className="flex flex-col">
              {categories.length > 0 && (
                <FilterSection
                  title="Categories"
                  isExpanded={expandedSections.categories}
                  onToggle={() => toggleSection('categories')}
                  activeCount={categoriesActive}
                >
                  {categories.map((cat: any) => (
                    <CheckboxItem
                      key={cat.value}
                      label={cat.label}
                      checked={!!(activeFilters.categories?.includes(cat.value))}
                      onChange={(checked) => handleFilterChange('categories', cat.value, checked)}
                    />
                  ))}
                </FilterSection>
              )}

              {platforms.length > 0 && (
                <FilterSection
                  title="Platform"
                  isExpanded={expandedSections.platform}
                  onToggle={() => toggleSection('platform')}
                  activeCount={platformsActive}
                >
                  {platforms.map((platform: any) => (
                    <CheckboxItem
                      key={platform.value}
                      label={platform.label}
                      checked={!!(activeFilters.platformType?.includes(platform.value))}
                      onChange={(checked) => handleFilterChange('platformType', platform.value, checked)}
                    />
                  ))}
                </FilterSection>
              )}

              {audiences.length > 0 && (
                <FilterSection
                  title="Target Users"
                  isExpanded={expandedSections.targetUsers}
                  onToggle={() => toggleSection('targetUsers')}
                  activeCount={audiencesActive}
                >
                  {audiences.map((audience: any) => (
                    <CheckboxItem
                      key={audience.value}
                      label={audience.label}
                      checked={!!(activeFilters.targetAudience?.includes(audience.value))}
                      onChange={(checked) => handleFilterChange('targetAudience', audience.value, checked)}
                    />
                  ))}
                </FilterSection>
              )}

              {pricingTypes.length > 0 && (
                <FilterSection
                  title="Pricing"
                  isExpanded={expandedSections.pricing}
                  onToggle={() => toggleSection('pricing')}
                  activeCount={pricingActive}
                >
                  {pricingTypes.map((type: any) => (
                    <CheckboxItem
                      key={type.value}
                      label={type.label.toLowerCase().replace('_', ' ')}
                      checked={!!(activeFilters.pricingType?.includes(type.value))}
                      onChange={(checked) => handleFilterChange('pricingType', type.value, checked)}
                    />
                  ))}
                </FilterSection>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;