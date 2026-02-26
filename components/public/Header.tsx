'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';

interface HeaderProps {
  onSidebarToggle: () => void;
  onSearch?: (query: string) => void; 
}

const Header = ({ onSidebarToggle, onSearch }: HeaderProps) => {
  const [searchMode, setSearchMode] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const { isAuthenticated } = useAuthStore();

  const handleVoiceClick = () => {
    setSearchMode('voice');
    setIsListening(!isListening);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <header className="relative bg-black border-b border-neutral-800">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        
        {/* Top Row: Logo + Heading/Description + Login/Dashboard */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sidebar Toggle (Mobile) */}
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo + Title */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/logo44.png" 
                alt="AI Tool Store" 
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-17 lg:h-17 object-contain" 
              />
              <span className="font-bold text-sm sm:text-base lg:text-lg text-white whitespace-nowrap">
                AI Tool Store
              </span>
            </Link>
          </div>

          {/* Center: Heading + Description - Hidden on mobile */}
          <div className="hidden md:block text-center flex-1 px-4 lg:px-8">
            <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
              <span className="text-white">Discover the Best </span>
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="text-[10px] lg:text-xs text-neutral-500 mt-0.5 hidden lg:block">
              Explore, compare, and find perfect AI solution for your tasks.
            </p>
          </div>

          {/* Right: Login Button OR Dashboard Icon */}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="relative px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r border border-red-800 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden group whitespace-nowrap flex items-center gap-2"
              title="Dashboard"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="relative z-10 hidden sm:inline">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="relative px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 bg-gradient-to-r border border-red-800 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden group whitespace-nowrap"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          )}
        </div>

        {/* Bottom Row: Enhanced Search Bar */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-1.5 sm:gap-2">
            {/* Search Input with Mode Indicator */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  searchMode === 'text' ? 'Search AI tools...' :
                  searchMode === 'chat' ? 'Ask AI...' :
                  'Listening...'
                }
                className={`
                  w-full pl-3 sm:pl-4 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 bg-neutral-900 border rounded-lg sm:rounded-xl text-white placeholder-neutral-500 
                  focus:outline-none transition-all text-xs sm:text-sm
                  ${searchMode === 'text' ? 'border-neutral-700 focus:border-red-600' : ''}
                  ${searchMode === 'chat' ? 'border-neutral-700 focus:border-red-600 shadow-lg shadow-red-900/20' : ''}
                  ${searchMode === 'voice' ? 'border-neutral-700 focus:border-red-600 shadow-lg shadow-red-900/20' : ''}
                `}
                disabled={searchMode === 'voice' && isListening}
              />
              
              {/* Active Mode Badge */}
              {searchMode !== 'text' && (
                <div className="hidden sm:block absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                  {searchMode === 'chat' && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-blue-900/40 border border-blue-700/50 rounded-full text-[10px] sm:text-xs text-blue-300 font-medium backdrop-blur-sm">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="3" />
                      </svg>
                      <span className="hidden sm:inline">AI</span>
                    </span>
                  )}
                  {searchMode === 'voice' && isListening && (
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-purple-900/40 border border-purple-700/50 rounded-full text-[10px] sm:text-xs text-purple-300 font-medium backdrop-blur-sm">
                      <div className="flex gap-0.5">
                        <span className="w-0.5 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse"></span>
                        <span className="w-0.5 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-0.5 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* AI Mode Options */}
            <div className="flex items-center bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-700/50 rounded-lg sm:rounded-xl p-1 sm:p-1.5 gap-0.5 sm:gap-1 shadow-xl">
              {/* Text Search */}
              <button
                type="button"
                onClick={() => setSearchMode('text')}
                className={`
                  relative p-1.5 sm:p-2 lg:p-2.5 rounded-md sm:rounded-lg transition-all duration-300 group overflow-hidden
                  ${searchMode === 'text' 
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50 scale-105' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }
                `}
                title="Text Search"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* AI Chatbot */}
              <button
                type="button"
                onClick={() => setSearchMode('chat')}
                className={`
                  relative p-1.5 sm:p-2 lg:p-2.5 rounded-md sm:rounded-lg transition-all duration-300 group overflow-hidden
                  ${searchMode === 'chat' 
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50 scale-105' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }
                `}
                title="AI Chat"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>

              {/* Voice Search */}
              <button
                type="button"
                onClick={handleVoiceClick}
                className={`
                  relative p-1.5 sm:p-2 lg:p-2.5 rounded-md sm:rounded-lg transition-all duration-300 group overflow-hidden
                  ${searchMode === 'voice' 
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-900/50 scale-105' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }
                `}
                title="Voice"
              >
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10 transition-transform ${isListening && searchMode === 'voice' ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>

            {/* Search Button */}
            <button 
              type="submit"
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl overflow-hidden group transition-all hover:shadow-2xl hover:shadow-red-900/50 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Search</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </div>

          {/* Mode Description */}
          <div className="mt-1.5 sm:mt-2 text-center min-h-[16px] sm:min-h-[20px] hidden sm:block">
            {searchMode === 'text' && (
              <p className="text-[10px] sm:text-xs text-neutral-500 animate-fade-in">
                💡 Try: <span className="text-neutral-400">"image generation"</span>, <span className="text-neutral-400">"code assistant"</span>
              </p>
            )}
            {searchMode === 'chat' && (
              <p className="text-[10px] sm:text-xs text-neutral-500 animate-fade-in flex items-center justify-center gap-1">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                Ask: "Best tool for presentations?"
              </p>
            )}
            {searchMode === 'voice' && (
              <p className="text-[10px] sm:text-xs text-neutral-500 animate-fade-in flex items-center justify-center gap-1">
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isListening ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                {isListening ? 'Listening...' : 'Click to speak'}
              </p>
            )}
          </div>
        </form>

        {/* Mobile: Heading below search */}
        <div className="md:hidden text-center mt-2 sm:mt-3">
          <h2 className="text-sm sm:text-base font-bold">
            <span className="text-white">Discover </span>
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;