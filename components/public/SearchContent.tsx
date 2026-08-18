'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicLayout from '@/components/public/PublicLayout';
import { useGlobalSearch } from '@/lib/hooks/use-tools';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading, error } = useGlobalSearch(query);

  const tools = data?.results || [];
  const total = data?.total || 0;

  return (
    <div>
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Search Results for "<span className="text-red-500">{query}</span>"
        </h1>
        <p className="text-neutral-400 text-sm">
          {isLoading ? 'Searching...' : `Found ${total} result${total !== 1 ? 's' : ''}`}
        </p>
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
          Failed to search. Please try again.
        </div>
      )}

      {/* Results */}
      {!isLoading && !error && (
        <>
          {tools.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-neutral-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-neutral-400 text-lg mb-4">No tools found matching "{query}"</p>
              <Link href="/" className="text-red-500 hover:text-red-400 underline">
                Back to Browse
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool: any) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4 hover:border-red-600 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-md flex items-center justify-center border border-[#262626] group-hover:border-red-600 transition-colors overflow-hidden shrink-0">
                      {tool.logo && (tool.logo.startsWith('http://') || tool.logo.startsWith('https://') || tool.logo.startsWith('/')) ? (
                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{tool.logo || '🤖'}</span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-red-500 transition-colors line-clamp-1">
                      {tool.name}
                    </h3>
                  </div>
                  
                  <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
                    {tool.tagline || tool.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{tool.averageRating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <span>•</span>
                    <span>{tool.viewCount || 0} views</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <PublicLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </PublicLayout>
  );
}