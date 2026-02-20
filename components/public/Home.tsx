'use client';
import React from 'react';
import PublicLayout from './PublicLayout';
import Link from 'next/link';


// Enhanced Tool Card Component - Fully Responsive (No Custom Config Needed)
const ToolCard = ({ tool }) => {
  return (
    <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-2 sm:p-2.5 hover:border-[#404040] transition-all duration-200 hover:shadow-lg hover:shadow-[#8a1212]/10 flex flex-col group relative">
      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Icon + Tool Name */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
          {/* Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-md flex items-center justify-center flex-shrink-0 border border-[#262626] group-hover:border-[#8a1212] group-hover:scale-110 transition-all">
            <span className="text-base sm:text-lg">{tool.icon}</span>
          </div>
          
          {/* Tool Name */}
          <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#8a1212] transition-colors line-clamp-1 flex-1">
            {tool.name}
          </h3>
        </div>

        {/* Description - Hidden on mobile, visible on tablet+ */}
        <p className="hidden sm:block text-xs text-[#8c8c8c] leading-relaxed mb-2 line-clamp-2">
          {tool.description || 'An innovative AI tool to boost your productivity and creativity.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
          {tool.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-1 sm:px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-[10px] sm:text-xs text-[#b3b3b3] truncate max-w-[70px] sm:max-w-none"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 2 && (
            <span className="px-1 sm:px-1.5 py-0.5 bg-[#1a1a1a] border border-[#262626] rounded text-[10px] sm:text-xs text-[#737373]">
              +{tool.tags.length - 2}
            </span>
          )}
        </div>

        {/* Stats - Rating, Views & Comments */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2 text-[10px] sm:text-xs text-[#8c8c8c]">
          {/* Rating */}
          <div className="flex items-center gap-0.5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8a1212] fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-[#b3b3b3]">{tool.rating || '4.5'}</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-0.5">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="truncate">{tool.views || '1.2k'}</span>
          </div>

          {/* Comments - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex items-center gap-0.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="truncate">{tool.comments || '42'}</span>
          </div>
        </div>

        {/* Spacer - pushes actions to bottom */}
        <div className="flex-grow"></div>

        {/* Actions - Always at Bottom with Pricing Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t border-[#262626]">
          {/* View Button */}
          <Link href={`/tools/2`} className="flex-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gradient-to-r from-[#8a1212] to-[#991b1b] hover:from-[#991b1b] hover:to-[#8a1212] text-white text-[10px] sm:text-xs font-semibold rounded cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-95">
            View
          </Link>
          
          {/* Favorite Button */}
          <button className="p-0.5 sm:p-1 hover:bg-[#1a1a1a] rounded transition-colors group/btn" title="Add to favorites">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8c8c8c] group-hover/btn:text-[#8a1212] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          {/* Pricing Badge - Responsive sizing */}
          <span className={`
            px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide whitespace-nowrap
            ${tool.pricing === 'Free' ? 'bg-gradient-to-r from-green-900/40 to-green-800/40 text-green-400 border border-green-700/50 shadow-sm shadow-green-900/20' : ''}
            ${tool.pricing === 'Freemium' ? 'bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-400 border border-blue-700/50 shadow-sm shadow-blue-900/20' : ''}
            ${tool.pricing === 'Paid' ? 'bg-gradient-to-r from-purple-900/40 to-purple-800/40 text-purple-400 border border-purple-700/50 shadow-sm shadow-purple-900/20' : ''}
          `}>
            {tool.pricing}
          </span>
        </div>
      </div>
    </div>
  );
};




export default function HomePage() {
  // Sample data
  const tools = [
    {
      id: 1,
      name: 'AI Image Generator Pro',
      description: 'Create stunning images from text descriptions using advanced AI models',
      icon: '🎨',
      pricing: 'Freemium',
      tags: ['Image Generation', 'Art', 'Design'],
      rating: '4.8',
      views: '2.5k',
      comments: '124'
    },
    {
      id: 2,
      name: 'AI Image Generator Pro',
      description: 'Create stunning images from text descriptions using advanced AI models',
      icon: '🎨',
      pricing: 'Freemium',
      tags: ['Image Generation', 'Art', 'Design'],
      rating: '4.8',
      views: '2.5k',
      comments: '124'
    },
    {
      id: 3,
      name: 'AI Image Generator Pro',
      description: 'Create stunning images from text descriptions using advanced AI models',
      icon: '🎨',
      pricing: 'Freemium',
      tags: ['Image Generation', 'Art', 'Design'],
      rating: '4.8',
      views: '2.5k',
      comments: '124'
    },
    {
      id: 4,
      name: 'AI Image Generator Pro',
      description: 'Create stunning images from text descriptions using advanced AI models',
      icon: '🎨',
      pricing: 'Freemium',
      tags: ['Image Generation', 'Art', 'Design'],
      rating: '4.8',
      views: '2.5k',
      comments: '124'
    },
    
    // Add more tools...
  ];

  return (
    <PublicLayout>
      <div className="mb-4 sm:mb-6">
        {/* Title and Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Discover {tools.length} amazing AI tools
            </p>
          </div>

          {/* Mobile Sort Button */}
          <button className="md:hidden flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sort
          </button>
        </div>

        {/* Active Filters Display - Responsive */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm text-neutral-500 whitespace-nowrap">Filters:</span>
          
          {/* Filter Tags - Scrollable on mobile */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2 sm:px-3 py-1 bg-red-900/30 border border-red-800 rounded-full text-xs sm:text-sm text-red-400 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              <span className="truncate max-w-[100px] sm:max-w-none">Image Generation</span>
              <button className="hover:text-red-300 flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
            
            <button className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid - Responsive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* Pagination - Ultra Compact */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center">
        {/* Mobile & Desktop: Unified Compact Pagination */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Previous Button */}
          <button className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Page Numbers */}
          <button className="px-2 sm:px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded text-xs">
            1
          </button>
          <button className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs">
            2
          </button>
          <button className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs">
            3
          </button>
          
          {/* Dots - Hidden on very small screens */}
          <span className="hidden sm:inline px-1 text-neutral-500 text-xs">...</span>
          
          {/* Last page - Hidden on very small screens */}
          <button className="hidden sm:inline-flex px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs">
            10
          </button>
          
          {/* Next Button */}
          <button className="px-2 sm:px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:bg-neutral-800 transition-colors text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}