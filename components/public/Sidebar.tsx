'use client';

import React, { useState } from 'react';
import { useFilterOptions } from '@/lib/hooks/use-tools';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const Sidebar = ({ isOpen, onClose, onFilterChange, activeFilters }: SidebarProps) => {
  const { data: filterOptionsResponse, isLoading } = useFilterOptions();
  const filterOptions = filterOptionsResponse?.filters || [];

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    features: false,
    targetUsers: false,
    pricing: false,
  });

  const [sortBy, setSortBy] = useState('newest');

  // ── NO internal selectedFilters state ────────────────────────────────
  // Checkboxes read directly from activeFilters (prop), so when the parent
  // clears or mutates filters the sidebar instantly reflects the change.

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const current: string[] = activeFilters[filterType] || [];
    const updated = isChecked
      ? [...current, value]
      : current.filter((v: string) => v !== value);

    // Notify parent with the full updated filter object
    onFilterChange({ ...activeFilters, [filterType]: updated });
  };

  const clearAllFilters = () => {
    setSortBy('newest');
    onFilterChange({
      categories: [],
      tags: [],
      platformType: [],
      targetAudience: [],
      pricingType: [],
    });
  };

  const getFilterOptions = (path: string) => {
    const filter = filterOptions.find((f: any) => f.path === path);
    return filter?.options || [];
  };

  const categories    = getFilterOptions('categories.category.slug');
  const platforms     = getFilterOptions('platformType');
  const audiences     = getFilterOptions('targetAudience');
  const pricingTypes  = getFilterOptions('pricingPlans.type');

  if (isLoading) {
    return (
      <aside className="fixed top-0 left-0 h-full w-64 bg-black border-r border-[#262626] z-50 lg:static">
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full" />
        </div>
      </aside>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-black border-r border-[#262626] z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
          overflow-y-auto scrollbar-thin scrollbar-thumb-[#404040] scrollbar-track-transparent
        `}
      >
        <div className="p-4 space-y-4">

          {/* Mobile header */}
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-[#262626]">
            <h2 className="text-lg font-bold text-white">Filters</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-[#1a1a1a] rounded">
              <svg className="w-4 h-4 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={clearAllFilters}
              className="px-2.5 py-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] rounded text-sm text-[#b3b3b3] hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setExpandedSections({ categories: true, features: true, targetUsers: true, pricing: true })}
              className="px-2.5 py-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] rounded text-sm text-[#b3b3b3] hover:text-white transition-colors"
            >
              Expand All
            </button>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#262626] rounded text-sm text-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#8a1212]"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          {/* ── Categories ──────────────────────────────────────────────── */}
          {categories.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase">Categories</h3>
                <button onClick={() => toggleSection('categories')} className="p-1 hover:bg-[#1a1a1a] rounded">
                  <svg
                    className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedSections.categories && (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {categories.map((cat: any) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2.5 px-2.5 pb-1 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        // ── Read from prop, not internal state ───────────
                        checked={!!(activeFilters.categories?.includes(cat.value))}
                        onChange={(e) => handleFilterChange('categories', cat.value, e.target.checked)}
                        className="w-4 h-4 flex-shrink-0 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212]"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Platform ─────────────────────────────────────────────────── */}
          {platforms.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase">Platform</h3>
                <button onClick={() => toggleSection('features')} className="p-1 hover:bg-[#1a1a1a] rounded">
                  <svg
                    className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.features ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedSections.features && (
                <div className="space-y-1">
                  {platforms.map((platform: any) => (
                    <label
                      key={platform.value}
                      className="flex items-center gap-2.5 px-2.5 pb-1 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!(activeFilters.platformType?.includes(platform.value))}
                        onChange={(e) => handleFilterChange('platformType', platform.value, e.target.checked)}
                        className="w-4 h-4 flex-shrink-0 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212]"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors capitalize">
                        {platform.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Target Users ─────────────────────────────────────────────── */}
          {audiences.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase">Target Users</h3>
                <button onClick={() => toggleSection('targetUsers')} className="p-1 hover:bg-[#1a1a1a] rounded">
                  <svg
                    className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.targetUsers ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedSections.targetUsers && (
                <div className="space-y-1">
                  {audiences.map((audience: any) => (
                    <label
                      key={audience.value}
                      className="flex items-center gap-2.5 px-2.5 pb-1 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!(activeFilters.targetAudience?.includes(audience.value))}
                        onChange={(e) => handleFilterChange('targetAudience', audience.value, e.target.checked)}
                        className="w-4 h-4 flex-shrink-0 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212]"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                        {audience.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Pricing ──────────────────────────────────────────────────── */}
          {pricingTypes.length > 0 && (
            <div className="space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase">Pricing</h3>
                <button onClick={() => toggleSection('pricing')} className="p-1 hover:bg-[#1a1a1a] rounded">
                  <svg
                    className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {expandedSections.pricing && (
                <div className="space-y-1">
                  {pricingTypes.map((type: any) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2.5 px-2.5 pb-1 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!(activeFilters.pricingType?.includes(type.value))}
                        onChange={(e) => handleFilterChange('pricingType', type.value, e.target.checked)}
                        className="w-4 h-4 flex-shrink-0 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212]"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors capitalize">
                        {type.label.toLowerCase().replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </aside>
    </>
  );
};

export default Sidebar;