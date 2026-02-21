'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToolBySlug, useSimilarTools, useTrackClick, useToolById } from '@/lib/hooks/use-tools';
import { 
  useToolReviews, 
  useReviewStats, 
  useMyReviewForTool, 
  useCreateReview, 
  useMarkHelpful 
} from '@/lib/hooks/use-reviews';
import { useAuthStore } from '@/lib/store/auth-store';
import Footer from '@/components/public/Footer';
import { toast } from 'sonner';

const ToolDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  
  const { isAuthenticated } = useAuthStore();
  const { data: tool, isLoading: toolLoading } = useToolById(id);
  const { data: similarTools } = useSimilarTools(tool?.slug, 3);
  const { data: reviewsData, isLoading: reviewsLoading } = useToolReviews(tool?.slug, 1, 10);
  const { data: reviewStats } = useReviewStats(tool?.slug);
  const { data: myReview } = useMyReviewForTool(tool?.slug);
  const trackClick = useTrackClick();
  const createReview = useCreateReview();
  const markHelpful = useMarkHelpful();

  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleVisitWebsite = () => {
    if (tool?.websiteUrl) {
      trackClick.mutate(tool?.slug);
      window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }
  
    if (!userRating || !commentText.trim()) {
      toast.error('Please provide a rating and comment');
      return;
    }

    try {
      await createReview.mutateAsync({
        toolSlug: tool?.slug,
        rating: userRating,
        title: reviewTitle.trim() || undefined,
        comment: commentText.trim(),
      });
      
      

      toast.success('Review submitted successfully!');
      setUserRating(0);
      setReviewTitle('');
      setCommentText('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      await markHelpful.mutateAsync(reviewId);
      toast.success('Marked as helpful!');
    } catch (error) {
      toast.error('Failed to mark as helpful');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // Loading State
  if (toolLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading tool details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (!tool) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Tool Not Found</h1>
          <p className="text-neutral-400 mb-6">The tool you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:scale-105 transition-transform">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const reviews = reviewsData?.data || [];
  const reviewsMeta = reviewsData?.meta;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Icon & Stats */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-gradient-to-br from-[#8a1212] to-[#991b1b]">
                {tool.logo || '🤖'}
              </div>
              
              <div className="flex gap-4 text-xs">
                <div className="text-center">
                  <div className="font-bold text-white">{tool.averageRating?.toFixed(1) || '0.0'}</div>
                  <div className="text-[#8c8c8c]">Rating</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">{tool.viewCount || 0}</div>
                  <div className="text-[#8c8c8c]">Views</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">{tool.totalClicks || 0}</div>
                  <div className="text-[#8c8c8c]">Clicks</div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1 text-white">{tool.name}</h1>
                  <p className="text-sm text-[#b3b3b3] mb-2">{tool.tagline}</p>
                </div>
                
                {tool.pricingPlans && tool.pricingPlans.length > 0 && (
                  <div className="relative px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ml-2"
                    style={{
                      background: tool.pricingPlans[0].type === 'FREE' 
                        ? 'linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2))'
                        : tool.pricingPlans[0].type === 'FREEMIUM'
                        ? 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))'
                        : 'linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(147, 51, 234, 0.2))',
                      color: tool.pricingPlans[0].type === 'FREE' 
                        ? '#4ade80'
                        : tool.pricingPlans[0].type === 'FREEMIUM'
                        ? '#60a5fa'
                        : '#a78bfa',
                      border: `1px solid ${
                        tool.pricingPlans[0].type === 'FREE' 
                          ? 'rgba(34, 197, 94, 0.5)'
                          : tool.pricingPlans[0].type === 'FREEMIUM'
                          ? 'rgba(59, 130, 246, 0.5)'
                          : 'rgba(168, 85, 247, 0.5)'
                      }`
                    }}
                  >
                    {tool.pricingPlans[0].type}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tool.categories?.slice(0, 3).map((cat: any) => (
                  <span
                    key={cat.id}
                    className="px-2 py-0.5 rounded text-xs bg-[#1a1a1a] text-[#b3b3b3] border border-[#262626]"
                  >
                    {cat.category.name}
                  </span>
                ))}
                {tool.tags?.slice(0, 3).map((tag: any) => (
                  <span
                    key={tag.id}
                    className="px-2 py-0.5 rounded text-xs bg-[#1a1a1a] text-[#b3b3b3] border border-[#262626]"
                  >
                    {tag.tag.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleVisitWebsite}
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-[#8a1212] to-[#991b1b] text-white text-sm font-semibold flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </button>
                <button className="px-4 py-1.5 rounded bg-[#1a1a1a] text-white text-sm font-semibold flex items-center gap-1.5 border border-[#262626] hover:bg-[#262626] transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Save
                </button>
                <button className="px-4 py-1.5 rounded bg-[#1a1a1a] text-white text-sm font-semibold flex items-center gap-1.5 border border-[#262626] hover:bg-[#262626] transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 border-b border-[#262626]">
          {['overview', 'features', 'pricing', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 text-sm font-medium capitalize whitespace-nowrap transition-all rounded"
              style={{
                color: activeTab === tab ? '#8a1212' : '#8c8c8c',
                backgroundColor: activeTab === tab ? '#1a1a1a' : 'transparent',
                borderBottom: activeTab === tab ? '2px solid #8a1212' : 'none'
              }}
            >
              {tab}
              {tab === 'reviews' && reviewsMeta && (
                <span className="ml-1 text-xs">({reviewsMeta.total})</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                  <h2 className="text-lg font-bold mb-2 text-white">About</h2>
                  <p className="text-sm leading-relaxed text-[#b3b3b3] whitespace-pre-line">
                    {tool.description}
                  </p>
                </div>

                {tool.screenshots && tool.screenshots.length > 0 && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                    <h2 className="text-lg font-bold mb-3 text-white">Screenshots</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {tool.screenshots.map((screenshot: any, index: number) => (
                        <div
                          key={index}
                          className="aspect-square rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-[#1a1a1a] border border-[#262626]"
                        >
                          <img 
                            src={screenshot.imageUrl} 
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {tool.platformType && tool.platformType.length > 0 && (
                    <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                      <h3 className="text-sm font-bold mb-3 text-white">Platforms</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.platformType.map((platform: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-[#1a1a1a] text-[#b3b3b3] border border-[#262626] rounded"
                          >
                            {platform.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.targetAudience && tool.targetAudience.length > 0 && (
                    <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                      <h3 className="text-sm font-bold mb-3 text-white">Target Audience</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.targetAudience.map((audience: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-[#1a1a1a] text-[#b3b3b3] border border-[#262626] rounded"
                          >
                            {audience.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                <h2 className="text-lg font-bold mb-3 text-white">Key Features</h2>
                {tool.keyFeatures && tool.keyFeatures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tool.keyFeatures.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="p-2.5 rounded flex items-center gap-2 bg-[#1a1a1a] border border-[#262626]"
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#8a1212]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8c8c8c]">No features listed.</p>
                )}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">Pricing Plans</h2>
                {tool.pricingPlans && tool.pricingPlans.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tool.pricingPlans.map((plan: any) => (
                      <div
                        key={plan.id}
                        className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]"
                      >
                        <h3 className="text-base font-bold mb-1 text-white">{plan.name}</h3>
                        <div className="text-2xl font-bold mb-3 text-[#8a1212]">
                          {plan.price > 0 ? `$${plan.price}` : 'Free'}
                          {plan.price > 0 && (
                            <span className="text-xs font-normal text-[#8c8c8c]">/{plan.billingCycle || 'mo'}</span>
                          )}
                        </div>
                        {plan.description && (
                          <p className="text-xs text-[#8c8c8c] mb-3">{plan.description}</p>
                        )}
                        {plan.features && plan.features.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-[#b3b3b3]">
                                <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8c8c8c]">No pricing information available.</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {/* Review Statistics */}
                {reviewStats && reviewStats.totalReviews > 0 && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">
                          {reviewStats.averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4"
                              fill={star <= Math.round(reviewStats.averageRating) ? '#fbbf24' : '#737373'}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-xs text-[#8c8c8c]">
                          Based on {reviewStats.totalReviews} review{reviewStats.totalReviews !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Rating Distribution */}
                      <div className="flex-1 max-w-xs ml-6">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviewStats.ratingDistribution[rating] || 0;
                          const percentage = reviewStats.totalReviews > 0
                            ? (count / reviewStats.totalReviews) * 100
                            : 0;

                          return (
                            <div key={rating} className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-[#8c8c8c] w-8">{rating} ★</span>
                              <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#8a1212] to-[#991b1b]"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-[#8c8c8c] w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Write Review Form */}
                {isAuthenticated && !myReview && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                    <h3 className="text-base font-bold mb-3 text-white">Write a Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#b3b3b3]">Your Rating *</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserRating(star)}
                              className="text-2xl transition-all hover:scale-110"
                              style={{ color: star <= userRating ? '#fbbf24' : '#737373' }}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#b3b3b3]">Title (Optional)</label>
                        <input
                          type="text"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          maxLength={100}
                          placeholder="Sum up your experience..."
                          className="w-full px-3 py-2 rounded text-sm focus:outline-none bg-[#1a1a1a] border border-[#262626] text-white placeholder-[#737373]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-[#b3b3b3]">Your Review *</label>
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          rows={4}
                          maxLength={2000}
                          placeholder="Share your experience with this tool..."
                          className="w-full px-3 py-2 rounded text-sm resize-none focus:outline-none bg-[#1a1a1a] border border-[#262626] text-white placeholder-[#737373]"
                        />
                        <div className="text-xs text-[#737373] mt-1 text-right">
                          {commentText.length}/2000
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!userRating || !commentText.trim() || createReview.isPending}
                        className="px-4 py-2 rounded text-sm font-semibold transition-all hover:scale-105 bg-gradient-to-r from-[#8a1212] to-[#991b1b] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {createReview.isPending ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                )}

                {/* User's Existing Review */}
                {myReview && (
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-green-900/20">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold text-white">Your Review</h3>
                      <span className="text-xs text-green-400">✓ Submitted</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className="text-sm"
                            style={{ color: star <= myReview.rating ? '#fbbf24' : '#737373' }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-[#8c8c8c]">{formatDate(myReview.createdAt)}</span>
                    </div>
                    {myReview.title && (
                      <h4 className="font-semibold text-sm text-white mb-1">{myReview.title}</h4>
                    )}
                    <p className="text-sm text-[#b3b3b3]">{myReview.comment}</p>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">
                    All Reviews ({reviewsMeta?.total || 0})
                  </h3>

                  {reviewsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="p-8 rounded-lg bg-[#0a0a0a] border border-[#262626] text-center">
                      <p className="text-[#8c8c8c]">No reviews yet. Be the first to review this tool!</p>
                    </div>
                  ) : (
                    reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8a1212] to-[#991b1b] flex items-center justify-center text-white font-bold">
                            {review.user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <h4 className="font-bold text-sm text-white">{review.user.username}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span
                                        key={star}
                                        className="text-xs"
                                        style={{ color: star <= review.rating ? '#fbbf24' : '#737373' }}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-xs text-[#8c8c8c]">{formatDate(review.createdAt)}</span>
                                  {review.isVerified && (
                                    <span className="text-xs text-green-400 flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                      Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {review.title && (
                              <h5 className="font-semibold text-sm text-white mb-1">{review.title}</h5>
                            )}
                            <p className="mb-2 text-sm text-[#b3b3b3]">{review.comment}</p>

                            <div className="flex items-center gap-3 text-xs">
                              <button
                                onClick={() => handleMarkHelpful(review.id)}
                                className="flex items-center gap-1 hover:text-[#8a1212] text-[#8c8c8c] transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Helpful ({review.isHelpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Info */}
            <div className="p-4 rounded-lg sticky top-4 bg-[#0a0a0a] border border-[#262626]">
              <h3 className="text-sm font-bold mb-3 text-white">Quick Info</h3>
              <div className="space-y-2 text-xs">
                {tool.categories && tool.categories[0] && (
                  <div className="flex justify-between">
                    <span className="text-[#8c8c8c]">Category</span>
                    <span className="text-white">{tool.categories[0].category.name}</span>
                  </div>
                )}
                {tool.pricingPlans && tool.pricingPlans[0] && (
                  <div className="flex justify-between">
                    <span className="text-[#8c8c8c]">Pricing</span>
                    <span className="text-white">{tool.pricingPlans[0].type}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Rating</span>
                  <span className="text-white">{tool.averageRating?.toFixed(1) || '0.0'}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Reviews</span>
                  <span className="text-white">{tool.totalReviews || 0}</span>
                </div>
                {tool.aiModel && (
                  <div className="flex justify-between">
                    <span className="text-[#8c8c8c]">AI Model</span>
                    <span className="text-white">{tool.aiModel}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Tools */}
            {similarTools && similarTools.length > 0 && (
              <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                <h3 className="text-sm font-bold mb-3 text-white">Similar Tools</h3>
                <div className="space-y-2">
                  {similarTools.map((similarTool: any) => (
                    <Link
                      key={similarTool.id}
                      href={`/tools/${similarTool.slug}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-[#1a1a1a] transition-all"
                    >
                      <div className="w-8 h-8 rounded flex items-center justify-center text-lg bg-gradient-to-br from-[#8a1212] to-[#991b1b]">
                        {similarTool.logo || '🤖'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs text-white truncate">
                          {similarTool.name}
                        </div>
                        <div className="text-xs flex items-center gap-0.5 text-[#8c8c8c]">
                          <span className="text-[#8a1212]">★</span> {similarTool.averageRating?.toFixed(1) || '0.0'}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ToolDetailPage;