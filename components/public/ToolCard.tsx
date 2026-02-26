/** @format */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCheckFavorite, useToggleFavorite } from "@/lib/hooks/use-tools";

export const ToolCard = ({ tool }: any) => {
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ toolId: tool.id, toolSlug: tool.slug });
  };


  const { data: favoriteStatus } = useCheckFavorite(tool.id);
  const isFavorited = favoriteStatus?.isFavorited ?? tool._favorited ?? false;

  return (
    <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-2 sm:p-2.5 hover:border-[#404040] transition-all duration-200 hover:shadow-lg hover:shadow-[#8a1212]/10 flex flex-col group relative">
      <div className="relative z-10 flex flex-col h-full">

        {/* Header - Icon + Tool Name */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-md flex items-center justify-center flex-shrink-0 border border-[#262626] group-hover:scale-110 transition-all">
            <span className="text-base sm:text-lg">{"🤖"}</span>
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-white  transition-colors line-clamp-1 flex-1">
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p className="hidden sm:block text-sm text-[#8c8c8c] leading-tight mb-2 line-clamp-2">
          {tool.tagline || tool.description || "An innovative AI tool"}
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

        {/* Like Button */}
        <button
        onClick={handleLike}
        disabled={isPending}
        className="flex items-start gap-0.5 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
        <svg
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200
            ${isFavorited
                ? "text-[#8a1212] scale-110"
                : "text-[#8c8c8c] hover:text-[#8a1212]"
            }`}
            fill={isFavorited ? "#8a1212" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
        {tool.favoriteCount > 0 && (
            <span className={`text-[13px] transition-colors ${isFavorited ? "text-[#8a1212]" : "text-[#8c8c8c]"}`}>
            {tool.favoriteCount}
            </span>
        )}
        </button>

          {/* View Count */}
          <div className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="truncate text-sm">{tool.clickCount || tool.viewCount || 0}</span>
          </div>

          {/* Visit Link */}
          <a
            href={tool.websiteUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.5 text-gray-300 hover:text-[#800000] transition-colors"
          >
            <span className="text-[13px] font-medium hover:underline underline-offset-2 decoration-[#800000]">
              Visit
            </span>
            <ArrowUpRight className="w-3 h-3 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
          </a>

        </div>

        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t border-[#262626]">
          <Link
            href={`/tools/${tool.id}`}
            className="flex-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gradient-to-r from-[#8a1212] to-[#991b1b] hover:from-[#991b1b] hover:to-[#8a1212] text-white text-[10px] sm:text-xs font-semibold rounded text-center transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
          >
            View
          </Link>

          {/* Pricing Badge */}
          {tool.pricingPlans && tool.pricingPlans.length > 0 && (
            <span
              className={`
                px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide whitespace-nowrap
                ${tool.pricingPlans[0].type === "FREE" ? "bg-gradient-to-r from-green-900/40 to-green-800/40 text-green-400 border border-green-700/50" : ""}
                ${tool.pricingPlans[0].type === "FREEMIUM" ? "bg-gradient-to-r from-blue-900/40 to-blue-800/40 text-blue-400 border border-blue-700/50" : ""}
                ${tool.pricingPlans[0].type === "SUBSCRIPTION" ? "bg-gradient-to-r from-purple-900/40 to-purple-800/40 text-purple-400 border border-purple-700/50" : ""}
              `}
            >
              {tool.pricingPlans[0].type}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};