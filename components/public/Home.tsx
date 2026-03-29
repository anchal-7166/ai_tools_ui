// 'use client';
// import React, { useState } from 'react';
// import PublicLayout from '@/components/public/PublicLayout';
// import { useTools, useFilteredTools, useGlobalSearch } from '@/lib/hooks/use-tools';
// import { ToolCard } from './ToolCard';
// import Header from './Header';

// export default function HomePage() {
//   const [page, setPage] = useState(1);
//   const [activeFilters, setActiveFilters] = useState<any>({});
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const limit = 20;

//   // Build filter query for backend
//   const buildFilterQuery = () => {
//     const filters: any[] = [];

//     if (activeFilters.categories?.length > 0) {
//       filters.push({
//         op: 'in',
//         path: 'categories.category.slug',
//         value: activeFilters.categories,
//       });
//     }

//     if (activeFilters.platformType?.length > 0) {
//       filters.push({
//         op: 'in',
//         path: 'platformType',
//         value: activeFilters.platformType,
//       });
//     }

//     if (activeFilters.targetAudience?.length > 0) {
//       filters.push({
//         op: 'in',
//         path: 'targetAudience',
//         value: activeFilters.targetAudience,
//       });
//     }

//     if (activeFilters.pricingType?.length > 0) {
//       filters.push({
//         op: 'in',
//         path: 'pricingPlans.type',
//         value: activeFilters.pricingType,
//       });
//     }

//     return {
//       page,
//       limit,
//       filters,
//       sort: {
//         orderBy: 'createdAt',
//         order: 'desc' as const,
//       },
//     };
//   };

//   // Determine which data to fetch
//   const hasFilters = Object.values(activeFilters).some(
//     (arr) => Array.isArray(arr) && arr.length > 0
//   );

//   const hasSearch = searchQuery.length > 0;

//   // Fetch data based on search or filters
//   const { data: searchData, isLoading: isSearchLoading, error: searchError } = useGlobalSearch(
//     searchQuery,
//     {},
//     { enabled: hasSearch }
//   );

//   const { data: filteredData, isLoading: isFilterLoading, error: filterError } = useFilteredTools(
//     buildFilterQuery(),
//     { enabled: !hasSearch && hasFilters }
//   );

//   const { data: toolsData, isLoading: isToolsLoading, error: toolsError } = useTools(
//     { page, limit },
//     { enabled: !hasSearch && !hasFilters }
//   );

//   // Determine which data source to use
//   const isLoading = hasSearch ? isSearchLoading : hasFilters ? isFilterLoading : isToolsLoading;
//   const error = hasSearch ? searchError : hasFilters ? filterError : toolsError;
  
//   const tools = hasSearch 
//     ? (searchData?.results || [])
//     : (hasFilters ? (filteredData?.data || []) : (toolsData?.data || []));
    
//   const meta = hasSearch ? null : (hasFilters ? filteredData?.meta : toolsData?.meta);
//   const total = hasSearch ? (searchData?.total || 0) : (meta?.total || 0);

//   const handleFilterChange = (newFilters: any) => {
//     setActiveFilters(newFilters);
//     setSearchQuery(''); // Clear search when filtering
//     setPage(1);
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     setActiveFilters({}); // Clear filters when searching
//     setPage(1);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setPage(1);
//   };

//   const clearFilter = (filterType: string, value: string) => {
//     setActiveFilters((prev: any) => ({
//       ...prev,
//       [filterType]: prev[filterType]?.filter((v: string) => v !== value) || [],
//     }));
//     setPage(1);
//   };

//   const clearAllFilters = () => {
//     setActiveFilters({});
//     setSearchQuery('');
//     setPage(1);
//   };

//   const activeFilterCount = Object.values(activeFilters).reduce(
//     (acc: number, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
//     0
//   );

//    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//     };

//   return (
//     <PublicLayout 
//       onFilterChange={handleFilterChange} 
//       activeFilters={activeFilters}
//       // onSearch={handleSearch}
//     >

//       <Header 
//         onSidebarToggle={toggleSidebar} 
//         onSearch={handleSearch}
//       />

//       <div className="mb-4 sm:mb-6">
//         {/* Title and Count */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
//           <div>
//             {searchQuery ? (
//               <div>
//                 <h2 className="text-lg font-semibold text-white mb-1">
//                   Search Results for "<span className="text-red-500">{searchQuery}</span>"
//                 </h2>
//                 <p className="text-neutral-400 text-xs sm:text-sm">
//                   {isLoading ? 'Searching...' : `Found ${total} result${total !== 1 ? 's' : ''}`}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-neutral-400 text-xs sm:text-sm">
//                 {isLoading ? 'Loading...' : ``}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Search/Filter Clear Buttons */}
//         {(searchQuery || activeFilterCount > 0) && (
//           <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
//             <span className="text-xs sm:text-sm text-neutral-500">
//               {searchQuery ? 'Search active:' : 'Active filters:'}
//             </span>
            
//             {/* Search Badge */}
//             {searchQuery && (
//               <span className="px-2 sm:px-3 py-1 bg-purple-900/30 border border-purple-800 rounded-full text-xs text-purple-400 flex items-center gap-1.5">
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <span className="truncate max-w-[150px]">{searchQuery}</span>
//                 <button onClick={clearSearch} className="hover:text-purple-300">
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </span>
//             )}

//             {/* Category Filters */}
//             {activeFilters.categories?.map((cat: string) => (
//               <span key={cat} className="px-2 sm:px-3 py-1 bg-red-900/30 border border-red-800 rounded-full text-xs text-red-400 flex items-center gap-1.5">
//                 <span className="capitalize">{cat.replace('-', ' ')}</span>
//                 <button onClick={() => clearFilter('categories', cat)} className="hover:text-red-300">
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </span>
//             ))}

//             {/* Platform Filters */}
//             {activeFilters.platformType?.map((platform: string) => (
//               <span key={platform} className="px-2 sm:px-3 py-1 bg-blue-900/30 border border-blue-800 rounded-full text-xs text-blue-400 flex items-center gap-1.5">
//                 <span>{platform.replace('_', ' ')}</span>
//                 <button onClick={() => clearFilter('platformType', platform)} className="hover:text-blue-300">
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </span>
//             ))}

//             {/* Target Audience Filters */}
//             {activeFilters.targetAudience?.map((audience: string) => (
//               <span key={audience} className="px-2 sm:px-3 py-1 bg-green-900/30 border border-green-800 rounded-full text-xs text-green-400 flex items-center gap-1.5">
//                 <span>{audience.replace('_', ' ')}</span>
//                 <button onClick={() => clearFilter('targetAudience', audience)} className="hover:text-green-300">
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </span>
//             ))}

//             <button onClick={clearAllFilters} className="text-xs text-neutral-400 hover:text-white transition-colors underline">
//               Clear all
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex items-center justify-center py-20">
//           <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-center">
//           Failed to load tools. Please try again.
//         </div>
//       )}

//       {/* Tools Grid */}
//       {!isLoading && !error && (
//         <>
//           {tools.length === 0 ? (
//             <div className="text-center py-20">
//               <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <p className="text-neutral-400 text-lg mb-4">
//                 {searchQuery 
//                   ? `No tools found matching "${searchQuery}"` 
//                   : 'No tools found matching your filters.'}
//               </p>
//               <button 
//                 onClick={clearAllFilters}
//                 className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//               >
//                 Clear {searchQuery ? 'Search' : 'Filters'}
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//               {tools.map((tool: any) => (
//                 <ToolCard key={tool.id} tool={tool} />
//               ))}
//             </div>
//           )}

//           {/* Pagination - only show for filtered/normal results, not search */}
//           {!searchQuery && meta && meta.totalPages > 1 && (
//             <div className="mt-6 sm:mt-8 flex items-center justify-center">
//               <div className="flex items-center gap-1 sm:gap-1.5">
//                 <button
//                   onClick={() => setPage(p => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
//                 >
//                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
                
//                 {[...Array(Math.min(5, meta.totalPages))].map((_, i) => {
//                   const pageNum = i + 1;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setPage(pageNum)}
//                       className={`px-2 sm:px-2.5 py-1 rounded text-xs transition-colors ${
//                         page === pageNum
//                           ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold'
//                           : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
//                       }`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
                
//                 {meta.totalPages > 5 && (
//                   <>
//                     <span className="px-1 text-neutral-500 text-xs">...</span>
//                     <button
//                       onClick={() => setPage(meta.totalPages)}
//                       className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs"
//                     >
//                       {meta.totalPages}
//                     </button>
//                   </>
//                 )}
                
//                 <button
//                   onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
//                   disabled={page === meta.totalPages}
//                   className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
//                 >
//                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </PublicLayout>

//   );
// }









'use client';
import React, { useState } from 'react';
import PublicLayout from '@/components/public/PublicLayout';
import { useTools, useFilteredTools, useGlobalSearch } from '@/lib/hooks/use-tools';
import { ToolCard } from './ToolCard';
import Header from './Header';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 20;

  // ── Sidebar state lives here so the Header toggle button can control it ──
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Build filter query for backend
  const buildFilterQuery = () => {
    const filters: any[] = [];

    if (activeFilters.categories?.length > 0) {
      filters.push({ op: 'in', path: 'categories.category.slug', value: activeFilters.categories });
    }
    if (activeFilters.platformType?.length > 0) {
      filters.push({ op: 'in', path: 'platformType', value: activeFilters.platformType });
    }
    if (activeFilters.targetAudience?.length > 0) {
      filters.push({ op: 'in', path: 'targetAudience', value: activeFilters.targetAudience });
    }
    if (activeFilters.pricingType?.length > 0) {
      filters.push({ op: 'in', path: 'pricingPlans.type', value: activeFilters.pricingType });
    }

    return {
      page,
      limit,
      filters,
      sort: { orderBy: 'createdAt', order: 'desc' as const },
    };
  };

  const hasFilters = Object.values(activeFilters).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );
  const hasSearch = searchQuery.length > 0;

  const { data: searchData,   isLoading: isSearchLoading,  error: searchError  } = useGlobalSearch(searchQuery, {}, { enabled: hasSearch });
  const { data: filteredData, isLoading: isFilterLoading,  error: filterError  } = useFilteredTools(buildFilterQuery(), { enabled: !hasSearch && hasFilters });
  const { data: toolsData,    isLoading: isToolsLoading,   error: toolsError   } = useTools({ page, limit }, { enabled: !hasSearch && !hasFilters });

  const isLoading = hasSearch ? isSearchLoading : hasFilters ? isFilterLoading : isToolsLoading;
  const error     = hasSearch ? searchError     : hasFilters ? filterError     : toolsError;
  const tools     = hasSearch ? (searchData?.results || []) : (hasFilters ? (filteredData?.data || []) : (toolsData?.data || []));
  const meta      = hasSearch ? null : (hasFilters ? filteredData?.meta : toolsData?.meta);
  const total     = hasSearch ? (searchData?.total || 0) : (meta?.total || 0);

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
    setSearchQuery('');
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilters({});
    setPage(1);
  };

  const clearSearch = () => { setSearchQuery(''); setPage(1); };

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
    (acc: number, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0
  );

  return (
    <PublicLayout
      onFilterChange={handleFilterChange}
      activeFilters={activeFilters}
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={() => setIsSidebarOpen(false)}
    >
      {/* ── Header: top of the right column ─────────────────────── */}
      <Header
        onSidebarToggle={() => setIsSidebarOpen(prev => !prev)}
        onSearch={handleSearch}
      />

      {/* ── Content below the header ─────────────────────────────── */}
      <div className="mt-4 mb-4 sm:mb-6">

        {/* Search result title / loading hint */}
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
                {isLoading ? 'Loading...' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Active search / filter badges */}
        {(searchQuery || activeFilterCount > 0) && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
            <span className="text-xs sm:text-sm text-neutral-500">
              {searchQuery ? 'Search active:' : 'Active filters:'}
            </span>

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

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-center">
          Failed to load tools. Please try again.
        </div>
      )}

      {/* Tools grid */}
      {!isLoading && !error && (
        <>
          {tools.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-neutral-400 text-lg mb-4">
                {searchQuery ? `No tools found matching "${searchQuery}"` : 'No tools found matching your filters.'}
              </p>
              <button onClick={clearAllFilters} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
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

          {/* Pagination — only for non-search views */}
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
