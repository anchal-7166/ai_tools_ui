'use client';

import React, { useState } from 'react';
import Link from 'next/link';


const Sidebar = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    rating: false,
    features: false,
    targetUsers: false,
    pricing: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      categories: true,
      rating: true,
      features: true,
      targetUsers: true,
      pricing: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      categories: false,
      rating: false,
      features: false,
      targetUsers: false,
      pricing: false,
    });
  };

  const clearAllFilters = () => {
    // Clear all filters logic here
    console.log('Clear all filters');
  };

  // Sort options
  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'highest-rated', name: 'Highest Rated' },
    { id: 'trending', name: 'Trending' },
    { id: 'az', name: 'A-Z' },
    { id: 'za', name: 'Z-A' },
  ];

  // Categories
  const categories = [
    {
      id: 'content-creation',
      name: 'Content Creation',
      subcategories: [
        { id: 'writing', name: 'Writing', count: 145 },
        { id: 'image-gen', name: 'Image Gen', count: 89 },
        { id: 'video', name: 'Video', count: 67 },
        { id: 'audio', name: 'Audio', count: 54 },
      ]
    },
    {
      id: 'business',
      name: 'Business',
      subcategories: [
        { id: 'automation', name: 'Automation', count: 92 },
        { id: 'analytics', name: 'Analytics', count: 71 },
        { id: 'crm', name: 'CRM', count: 45 },
      ]
    },
    {
      id: 'development',
      name: 'Development',
      subcategories: [
        { id: 'code-assistant', name: 'Code AI', count: 56 },
        { id: 'testing', name: 'Testing', count: 34 },
        { id: 'devops', name: 'DevOps', count: 29 },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      subcategories: [
        { id: 'seo', name: 'SEO', count: 63 },
        { id: 'social-media', name: 'Social', count: 82 },
        { id: 'email', name: 'Email', count: 47 },
      ]
    },
    {
      id: 'research',
      name: 'Research',
      subcategories: [
        { id: 'data-analysis', name: 'Data', count: 51 },
        { id: 'summarization', name: 'Summary', count: 36 },
      ]
    },
  ];

  // Rating options
  const ratingOptions = [
    { id: '5-star', name: '5 Stars', stars: 5, count: 89 },
    { id: '4-star', name: '4+ Stars', stars: 4, count: 234 },
    { id: '3-star', name: '3+ Stars', stars: 3, count: 456 },
    { id: '2-star', name: '2+ Stars', stars: 2, count: 612 },
  ];

  // Features & Capabilities
  const featuresCapabilities = [
    { id: 'api', name: 'API Available', count: 167 },
    { id: 'opensource', name: 'Open Source', count: 89 },
    { id: 'mobile', name: 'Mobile App', count: 134 },
    { id: 'chrome', name: 'Chrome Ext', count: 201 },
    { id: 'integrations', name: 'Integrations', count: 278 },
    { id: 'no-code', name: 'No-Code', count: 156 },
    { id: 'multilingual', name: 'Multilingual', count: 143 },
    { id: 'real-time', name: 'Real-time', count: 98 },
  ];

  // Target Users
  const targetUsers = [
    { id: 'developers', name: 'Developers', count: 342 },
    { id: 'designers', name: 'Designers', count: 289 },
    { id: 'students', name: 'Students', count: 156 },
    { id: 'marketers', name: 'Marketers', count: 234 },
    { id: 'content-creators', name: 'Content Creators', count: 298 },
    { id: 'researchers', name: 'Researchers', count: 167 },
    { id: 'entrepreneurs', name: 'Entrepreneurs', count: 203 },
    { id: 'writers', name: 'Writers', count: 178 },
  ];

  // Pricing options
  const pricingOptions = [
    { id: 'free', name: 'Free', count: 234 },
    { id: 'freemium', name: 'Freemium', count: 456 },
    { id: 'paid', name: 'Paid Only', count: 189 },
    { id: 'trial', name: 'Free Trial', count: 312 },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
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
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between lg:hidden pb-3 border-b border-[#262626]">
            <h2 className="text-lg font-bold text-white">Filters</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#1a1a1a] rounded transition-colors"
            >
              <svg className="w-4 h-4 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Top Actions Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={clearAllFilters}
              className="px-2.5 py-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] rounded text-sm text-[#b3b3b3] hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={expandAll}
              className="px-2.5 py-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] rounded text-sm text-[#b3b3b3] hover:text-white transition-colors"
            >
              Expand All
            </button>
          </div>

          {/* Famous Categories - Quick Tabs */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Popular</h3>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/category/development"
                className="group relative px-2 py-1.5 bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#8a1212] hover:to-[#991b1b] border border-[#262626] hover:border-[#8a1212] rounded text-xs text-center text-[#b3b3b3] hover:text-white transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-medium">Dev</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a1212]/0 to-[#8a1212]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                href="/category/video"
                className="group relative px-2 py-1.5 bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#8a1212] hover:to-[#991b1b] border border-[#262626] hover:border-[#8a1212] rounded text-xs text-center text-[#b3b3b3] hover:text-white transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Video</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a1212]/0 to-[#8a1212]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                href="/category/design"
                className="group relative px-2 py-1.5 bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#8a1212] hover:to-[#991b1b] border border-[#262626] hover:border-[#8a1212] rounded text-xs text-center text-[#b3b3b3] hover:text-white transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span className="font-medium">Design</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a1212]/0 to-[#8a1212]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                href="/category/writing"
                className="group relative px-2 py-1.5 bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#8a1212] hover:to-[#991b1b] border border-[#262626] hover:border-[#8a1212] rounded text-xs text-center text-[#b3b3b3] hover:text-white transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="font-medium">Write</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#8a1212]/0 to-[#8a1212]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Sort By</h3>
            <select className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#262626] rounded text-sm text-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#8a1212] focus:border-transparent transition-all">
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* All Categories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Categories</h3>
              <button
                onClick={() => toggleSection('categories')}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {expandedSections.categories && (
              <div className="space-y-1">
                {categories.map((category) => (
                  <NestedCategory key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>

          {/* Pricing Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Pricing</h3>
              <button
                onClick={() => toggleSection('pricing')}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expandedSections.pricing && (
              <div className="space-y-1">
                {pricingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                        {option.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#8c8c8c]">{option.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Features & Capabilities */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Features</h3>
              <button
                onClick={() => toggleSection('features')}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.features ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expandedSections.features && (
              <div className="space-y-1">
                {featuresCapabilities.map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                        {feature.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#8c8c8c]">{feature.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Target Users */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Target Users</h3>
              <button
                onClick={() => toggleSection('targetUsers')}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.targetUsers ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expandedSections.targetUsers && (
              <div className="space-y-1">
                {targetUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212] focus:ring-offset-0"
                      />
                      <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#8c8c8c]">{user.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating - Moved to Last */}
          <div className="space-y-2 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Rating</h3>
              <button
                onClick={() => toggleSection('rating')}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[#8c8c8c] transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expandedSections.rating && (
              <div className="space-y-1">
                {ratingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-[#1a1a1a] rounded cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        className="w-4 h-4 bg-[#0a0a0a] border-[#404040] rounded text-[#8a1212] focus:ring-[#8a1212] focus:ring-offset-0"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(option.stars)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-[#8a1212] fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        <span className="text-sm text-[#b3b3b3] group-hover:text-white transition-colors ml-1">
                          & up
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#8c8c8c]">{option.count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};




// Nested Category Component
const NestedCategory = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-[#1a1a1a] rounded transition-colors group"
      >
        <span className="text-sm font-medium text-[#b3b3b3] group-hover:text-white transition-colors">
          {category.name}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-[#8c8c8c] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="ml-3 pl-3 border-l border-[#262626] space-y-1">
          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/category/${category.id}/${sub.id}`}
              className="flex items-center justify-between px-2.5 py-1.5 hover:bg-[#1a1a1a] rounded transition-colors group"
            >
              <span className="text-sm text-[#8c8c8c] group-hover:text-white transition-colors">
                {sub.name}
              </span>
              <span className="text-xs text-[#8c8c8c]">
                {sub.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;