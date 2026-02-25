'use client';
import React, { useState } from 'react';
import PublicLayout from '@/components/public/PublicLayout';
import Link from 'next/link';
import { useTools, useFilteredTools, useGlobalSearch } from '@/lib/hooks/use-tools';

const ToolCard = ({ tool }: any) => {

  return (
    <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-2 sm:p-2.5 hover:border-[#404040] transition-all duration-200 hover:shadow-lg hover:shadow-[#8a1212]/10 flex flex-col group relative">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Icon + Tool Name */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-md flex items-center justify-center flex-shrink-0 border border-[#262626] group-hover:border-[#8a1212] group-hover:scale-110 transition-all">
            {/* <span className="text-base sm:text-lg">{tool.logo || '🤖'}</span> */}
            <span className="text-base sm:text-lg">{'🤖'}</span>
          </div>
          
          <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#8a1212] transition-colors line-clamp-1 flex-1">
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p className="hidden sm:block text-xs text-[#8c8c8c] leading-relaxed mb-2 line-clamp-2">
          {tool.tagline || tool.description || 'An innovative AI tool'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
          {tool.categories?.slice(0, 2).map((cat: any, index: number) => (
            <span
              key={index}
              className="px-1 sm:px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-[10px] sm:text-xs text-[#b3b3b3] truncate max-w-[70px] sm:max-w-none"
            >
              {cat.category.name}
            </span>
          ))}
          {(tool.categories?.length || 0) > 2 && (
            <span className="px-1 sm:px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-[10px] sm:text-xs text-[#737373]">
              +{tool.categories.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2 text-[10px] sm:text-xs text-[#8c8c8c]">
          <div className="flex items-center gap-0.5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8a1212] fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-[#b3b3b3]">{tool.averageRating?.toFixed(1) || '0.0'}</span>
          </div>

          <div className="flex items-center gap-0.5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="truncate">{tool.viewCount || 0}</span>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t border-[#262626]">
          <Link href={`/tools/${tool.id}`} className="flex-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gradient-to-r from-[#8a1212] to-[#991b1b] hover:from-[#991b1b] hover:to-[#8a1212] text-white text-[10px] sm:text-xs font-semibold rounded text-center transition-all duration-200 transform hover:scale-[1.02] active:scale-95">
            View
          </Link>
          
          <button className="p-0.5 sm:p-1 hover:bg-[#1a1a1a] rounded transition-colors group/btn" title="Add to favorites">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8c8c8c] group-hover/btn:text-[#8a1212] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          {/* Pricing Badge */}
          {tool.pricingPlans && tool.pricingPlans.length > 0 && (
            <span className={`
              px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide whitespace-nowrap
              ${tool.pricingPlans[0].type === 'FREE' ? 'bg-gradient-to-r from-green-900/40 to-green-800/40 text-green-400 border border-green-700/50' : ''}
              ${tool.pricingPlans[0].type === 'FREEMIUM' ? 'bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-400 border border-blue-700/50' : ''}
              ${tool.pricingPlans[0].type === 'SUBSCRIPTION' ? 'bg-gradient-to-r from-purple-900/40 to-purple-800/40 text-purple-400 border border-purple-700/50' : ''}
            `}>
              {tool.pricingPlans[0].type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};




export default function HomePage() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState(''); // Add search state
  const limit = 20;

  // Build filter query for backend
  const buildFilterQuery = () => {
    const filters: any[] = [];

    if (activeFilters.categories?.length > 0) {
      filters.push({
        op: 'in',
        path: 'categories.category.slug',
        value: activeFilters.categories,
      });
    }

    if (activeFilters.platformType?.length > 0) {
      filters.push({
        op: 'in',
        path: 'platformType',
        value: activeFilters.platformType,
      });
    }

    if (activeFilters.targetAudience?.length > 0) {
      filters.push({
        op: 'in',
        path: 'targetAudience',
        value: activeFilters.targetAudience,
      });
    }

    if (activeFilters.pricingType?.length > 0) {
      filters.push({
        op: 'in',
        path: 'pricingPlans.type',
        value: activeFilters.pricingType,
      });
    }

    return {
      page,
      limit,
      filters,
      sort: {
        orderBy: 'createdAt',
        order: 'desc' as const,
      },
    };
  };

  // Determine which data to fetch
  const hasFilters = Object.values(activeFilters).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );

  const hasSearch = searchQuery.length > 0;

  // Fetch data based on search or filters
  const { data: searchData, isLoading: isSearchLoading, error: searchError } = useGlobalSearch(
    searchQuery,
    {},
    { enabled: hasSearch }
  );

  const { data: filteredData, isLoading: isFilterLoading, error: filterError } = useFilteredTools(
    buildFilterQuery(),
    { enabled: !hasSearch && hasFilters }
  );

  const { data: toolsData, isLoading: isToolsLoading, error: toolsError } = useTools(
    { page, limit },
    { enabled: !hasSearch && !hasFilters }
  );

  // Determine which data source to use
  const isLoading = hasSearch ? isSearchLoading : hasFilters ? isFilterLoading : isToolsLoading;
  const error = hasSearch ? searchError : hasFilters ? filterError : toolsError;
  
  const tools = hasSearch 
    ? (searchData?.results || [])
    : (hasFilters ? (filteredData?.data || []) : (toolsData?.data || []));
    
  const meta = hasSearch ? null : (hasFilters ? filteredData?.meta : toolsData?.meta);
  const total = hasSearch ? (searchData?.total || 0) : (meta?.total || 0);

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
    setSearchQuery(''); // Clear search when filtering
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilters({}); // Clear filters when searching
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  const clearFilter = (filterType: string, value: string) => {
    setActiveFilters((prev: any) => ({
      ...prev,
      [filterType]: prev[filterType]?.filter((v: string) => v !== value) || [],
    }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setPage(1);
  };

  const activeFilterCount = Object.values(activeFilters).reduce(
    (acc: number, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  return (
    <PublicLayout 
      onFilterChange={handleFilterChange} 
      activeFilters={activeFilters}
      onSearch={handleSearch}
    >
      <div className="mb-4 sm:mb-6">
        {/* Title and Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div>
            {searchQuery ? (
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">
                  Search Results for "<span className="text-red-500">{searchQuery}</span>"
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  {isLoading ? 'Searching...' : `Found ${total} result${total !== 1 ? 's' : ''}`}
                </p>
              </div>
            ) : (
              <p className="text-neutral-400 text-xs sm:text-sm">
                {isLoading ? 'Loading...' : `Discover ${total} amazing AI tools`}
              </p>
            )}
          </div>
        </div>

        {/* Search/Filter Clear Buttons */}
        {(searchQuery || activeFilterCount > 0) && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
            <span className="text-xs sm:text-sm text-neutral-500">
              {searchQuery ? 'Search active:' : 'Active filters:'}
            </span>
            
            {/* Search Badge */}
            {searchQuery && (
              <span className="px-2 sm:px-3 py-1 bg-purple-900/30 border border-purple-800 rounded-full text-xs text-purple-400 flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="truncate max-w-[150px]">{searchQuery}</span>
                <button onClick={clearSearch} className="hover:text-purple-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}

            {/* Category Filters */}
            {activeFilters.categories?.map((cat: string) => (
              <span key={cat} className="px-2 sm:px-3 py-1 bg-red-900/30 border border-red-800 rounded-full text-xs text-red-400 flex items-center gap-1.5">
                <span className="capitalize">{cat.replace('-', ' ')}</span>
                <button onClick={() => clearFilter('categories', cat)} className="hover:text-red-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}

            {/* Platform Filters */}
            {activeFilters.platformType?.map((platform: string) => (
              <span key={platform} className="px-2 sm:px-3 py-1 bg-blue-900/30 border border-blue-800 rounded-full text-xs text-blue-400 flex items-center gap-1.5">
                <span>{platform.replace('_', ' ')}</span>
                <button onClick={() => clearFilter('platformType', platform)} className="hover:text-blue-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}

            {/* Target Audience Filters */}
            {activeFilters.targetAudience?.map((audience: string) => (
              <span key={audience} className="px-2 sm:px-3 py-1 bg-green-900/30 border border-green-800 rounded-full text-xs text-green-400 flex items-center gap-1.5">
                <span>{audience.replace('_', ' ')}</span>
                <button onClick={() => clearFilter('targetAudience', audience)} className="hover:text-green-300">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}

            <button onClick={clearAllFilters} className="text-xs text-neutral-400 hover:text-white transition-colors underline">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-center">
          Failed to load tools. Please try again.
        </div>
      )}

      {/* Tools Grid */}
      {!isLoading && !error && (
        <>
          {tools.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-neutral-400 text-lg mb-4">
                {searchQuery 
                  ? `No tools found matching "${searchQuery}"` 
                  : 'No tools found matching your filters.'}
              </p>
              <button 
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Clear {searchQuery ? 'Search' : 'Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {tools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}

          {/* Pagination - only show for filtered/normal results, not search */}
          {!searchQuery && meta && meta.totalPages > 1 && (
            <div className="mt-6 sm:mt-8 flex items-center justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {[...Array(Math.min(5, meta.totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-2 sm:px-2.5 py-1 rounded text-xs transition-colors ${
                        page === pageNum
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {meta.totalPages > 5 && (
                  <>
                    <span className="px-1 text-neutral-500 text-xs">...</span>
                    <button
                      onClick={() => setPage(meta.totalPages)}
                      className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs"
                    >
                      {meta.totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                  className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </PublicLayout>
  );
}






