'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from './Footer';

const ToolDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState('');

  // Sample tool data
  const tool = {
    id: 1,
    name: 'AI Image Generator Pro',
    tagline: 'Create stunning images from text descriptions',
    description: 'AI Image Generator Pro is a cutting-edge tool that transforms your text descriptions into stunning, high-quality images using advanced AI models. Perfect for artists, designers, content creators, and anyone looking to bring their imagination to life.',
    icon: '🎨',
    rating: 4.8,
    totalReviews: 1247,
    views: '125.5k',
    likes: 8934,
    category: 'Image Generation',
    pricing: 'Freemium',
    website: 'https://aiimagegenator.com',
    tags: ['Image Generation', 'AI Art', 'Design', 'Content Creation'],
    features: [
      'Text-to-Image Generation',
      'Multiple Art Styles',
      'High Resolution Output',
      'Batch Processing',
      'API Access',
      'Commercial License',
      'Custom Training',
      'Advanced Editing Tools'
    ],
    pricingPlans: [
      { name: 'Free', price: '$0', features: ['10 images/month', 'Basic quality', 'Watermark'] },
      { name: 'Pro', price: '$29', features: ['Unlimited images', 'HD quality', 'No watermark', 'Priority processing'] },
      { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'API access', 'Custom models', 'Dedicated support'] }
    ],
    screenshots: ['🖼️', '🎨', '🌄', '🎭'],
    pros: ['Easy to use', 'High quality output', 'Fast generation', 'Great support'],
    cons: ['Free tier limited', 'Can be pricey for heavy users']
  };

  // Sample comments
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely amazing! This tool has transformed my workflow. The image quality is incredible and the interface is so intuitive.',
      likes: 23,
      replies: 3
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: '👨',
      rating: 4,
      date: '1 week ago',
      comment: 'Great tool overall. The free tier is a bit limited but the Pro plan is worth every penny. Customer support is excellent!',
      likes: 15,
      replies: 1
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: '👩‍💼',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Best AI image generator I\'ve tried! The results are consistently high quality and the speed is impressive.',
      likes: 31,
      replies: 5
    }
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && userRating > 0) {
      const newComment = {
        id: comments.length + 1,
        author: 'You',
        avatar: '😊',
        rating: userRating,
        date: 'Just now',
        comment: commentText,
        likes: 0,
        replies: 0
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      setUserRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Compact */}
      <div className="border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Icon & Stats */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-gradient-to-br from-[#8a1212] to-[#991b1b]">
                {tool.icon}
              </div>
              
              {/* Stats - Horizontal on mobile */}
              <div className="flex gap-4 text-xs">
                <div className="text-center">
                  <div className="font-bold text-white">{tool.rating}</div>
                  <div className="text-[#8c8c8c]">Rating</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">{tool.views}</div>
                  <div className="text-[#8c8c8c]">Views</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">{tool.likes}</div>
                  <div className="text-[#8c8c8c]">Likes</div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1 text-white">
                    {tool.name}
                  </h1>
                  <p className="text-sm text-[#b3b3b3] mb-2">
                    {tool.tagline}
                  </p>
                </div>
                <div className="relative px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-green-900/40 to-green-800/40 text-green-400 shadow-sm shadow-green-900/50 ml-2">
                  {tool.pricing}
                </div>
              </div>

              {/* Tags - Compact */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tool.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded text-xs bg-[#1a1a1a] text-[#b3b3b3] border border-[#262626]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons - Compact */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-[#8a1212] to-[#991b1b] text-white text-sm font-semibold flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
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
        {/* Tabs - Compact */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 border-b border-[#262626]">
          {['overview', 'features', 'pricing'].map((tab) => (
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
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {activeTab === 'overview' && (
              <>
                {/* Description */}
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                  <h2 className="text-lg font-bold mb-2 text-white">About</h2>
                  <p className="text-sm leading-relaxed text-[#b3b3b3]">{tool.description}</p>
                </div>

                {/* Screenshots */}
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                  <h2 className="text-lg font-bold mb-3 text-white">Screenshots</h2>
                  <div className="grid grid-cols-4 gap-2">
                    {tool.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition-transform bg-[#1a1a1a] border border-[#262626]"
                      >
                        {screenshot}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5 text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pros
                    </h3>
                    <ul className="space-y-1.5">
                      {tool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs text-[#b3b3b3]">
                          <span className="text-green-400 text-sm">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5 text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cons
                    </h3>
                    <ul className="space-y-1.5">
                      {tool.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-xs text-[#b3b3b3]">
                          <span className="text-red-400 text-sm">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'features' && (
              <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                <h2 className="text-lg font-bold mb-3 text-white">Key Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  {tool.features.map((feature, index) => (
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
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">Pricing Plans</h2>
                <div className="grid grid-cols-3 gap-3">
                  {tool.pricingPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[#0a0a0a]"
                      style={{ 
                        border: index === 1 ? '2px solid #8a1212' : '1px solid #262626'
                      }}
                    >
                      {index === 1 && (
                        <div className="px-2 py-0.5 rounded-full text-[10px] font-bold mb-2 inline-block bg-gradient-to-r from-[#8a1212] to-[#991b1b] text-white">
                          POPULAR
                        </div>
                      )}
                      <h3 className="text-base font-bold mb-1 text-white">{plan.name}</h3>
                      <div className="text-2xl font-bold mb-3 text-[#8a1212]">
                        {plan.price}
                        <span className="text-xs font-normal text-[#8c8c8c]">/mo</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-[#b3b3b3]">
                            <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full py-2 rounded text-sm font-semibold transition-all hover:scale-105"
                        style={{
                          background: index === 1 ? 'linear-gradient(to right, #8a1212, #991b1b)' : '#1a1a1a',
                          color: 'white',
                          border: '1px solid #262626'
                        }}
                      >
                        Choose Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Compact */}
          <div className="space-y-4">
            {/* Quick Info */}
            <div className="p-4 rounded-lg sticky top-4 bg-[#0a0a0a] border border-[#262626]">
              <h3 className="text-sm font-bold mb-3 text-white">Quick Info</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Category</span>
                  <span className="text-white">{tool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Pricing</span>
                  <span className="text-white">{tool.pricing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Rating</span>
                  <span className="text-white">{tool.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c8c8c]">Reviews</span>
                  <span className="text-white">{tool.totalReviews}</span>
                </div>
              </div>
            </div>

            {/* Similar Tools */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
              <h3 className="text-sm font-bold mb-3 text-white">Similar Tools</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="flex items-center gap-2 p-2 rounded hover:bg-[#1a1a1a] transition-all"
                  >
                    <div className="w-8 h-8 rounded flex items-center justify-center text-lg bg-gradient-to-br from-[#8a1212] to-[#991b1b]">
                      🎨
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs text-white truncate">
                        Similar Tool {item}
                      </div>
                      <div className="text-xs flex items-center gap-0.5 text-[#8c8c8c]">
                        <span className="text-[#8a1212]">★</span> 4.{item}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Outside Tabs */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-bold text-white">User Reviews</h2>
          
          {/* Add Review Form - Compact */}
          <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
            <h3 className="text-base font-bold mb-3 text-white">Write a Review</h3>
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#b3b3b3]">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="text-xl transition-all hover:scale-110"
                      style={{ color: star <= userRating ? '#fbbf24' : '#737373' }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-[#b3b3b3]">Your Review</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  placeholder="Share your experience with this tool..."
                  className="w-full px-3 py-2 rounded text-sm resize-none focus:outline-none bg-[#1a1a1a] border border-[#262626] text-white placeholder-[#737373]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded text-sm font-semibold transition-all hover:scale-105 bg-gradient-to-r from-[#8a1212] to-[#991b1b] text-white"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Comments List - Compact */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">Reviews ({comments.length})</h3>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{comment.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h4 className="font-bold text-sm text-white">{comment.author}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="text-xs"
                                style={{ color: star <= comment.rating ? '#fbbf24' : '#737373' }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-[#8c8c8c]">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-2 text-sm text-[#b3b3b3]">{comment.comment}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <button className="flex items-center gap-1 hover:text-[#8a1212] text-[#8c8c8c] transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {comment.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#8a1212] text-[#8c8c8c] transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {comment.replies}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ToolDetail;