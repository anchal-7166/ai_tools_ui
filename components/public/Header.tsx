'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);

  const { isAuthenticated } = useAuthStore();

  // Track mouse for spotlight effect
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = header.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    header.addEventListener('mousemove', handleMouseMove);
    return () => header.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVoiceClick = () => {
    setSearchMode('voice');
    setIsListening((p) => !p);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) onSearch(searchQuery.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(e as any);
  };

  return (
    <header
      ref={headerRef}
      className="relative overflow-hidden rounded-lg"
    >

      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#080808]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Left ambient glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Right ambient glow */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-48 h-48 bg-red-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(180,30,30,0.07), transparent 70%)`,
        }}
      />

      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/40 to-transparent pointer-events-none"
        style={{ animation: 'scanline 4s ease-in-out infinite', top: 0 }}
      />

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/50 to-transparent" />

      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(72px); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%);  }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1;    transform: scale(1);    }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        .mode-btn-active::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
      `}</style>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">

          {/* Left: mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-1.5 sm:p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-all duration-200 active:scale-90 border border-transparent hover:border-neutral-700/50"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Center: heading */}
          <div className="hidden md:block text-center flex-1 px-4 lg:px-8">
            <h1 className="text-base lg:text-xl xl:text-2xl font-bold">
             <span className="text-white">Discover the Best </span>
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="text-[10px] lg:text-xs text-neutral-500 mt-0.5 hidden lg:block">
              Explore, compare, and find the perfect AI solution for your tasks.
            </p>
          </div>

          {/* Right: auth button */}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="relative px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden group whitespace-nowrap flex items-center gap-2 border border-red-800/60 bg-red-950/30 hover:bg-red-900/40 transition-all duration-200 active:scale-95"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  style={{ animation: 'shimmer 0.8s ease-in-out', animationFillMode: 'forwards' }}
                />
              </span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {/* <span className="relative z-10 hidden sm:inline">Dashboard</span> */}
            </Link>
          ) : (
            <Link
              href="/login"
              className="relative px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden group whitespace-nowrap border border-red-800/60 bg-red-950/30 hover:bg-red-900/40 transition-all duration-200 active:scale-95"
            >
              <span className="absolute inset-0 overflow-hidden rounded-lg">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  style={{ animation: 'shimmer 0.8s ease-in-out', animationFillMode: 'forwards' }}
                />
              </span>
              <span className="relative z-10">Login</span>
            </Link>
          )}
        </div>

        {/* Search Row */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-1.5 sm:gap-2">

            {/* Search input */}
            <div className="relative flex-1">
              {/* Focus glow ring */}
              <div
                className="absolute -inset-px rounded-lg sm:rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isFocused ? 1 : 0,
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.4), rgba(153,27,27,0.2))',
                  filter: 'blur(4px)',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  searchMode === 'text' ? 'Search AI tools...' :
                  searchMode === 'chat' ? 'Ask AI anything...' :
                  'Listening...'
                }
                className="relative w-full pl-3 sm:pl-4 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/80 rounded-lg sm:rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-red-700/70 transition-all duration-200 text-xs sm:text-sm"
                disabled={searchMode === 'voice' && isListening}
              />

              {/* Mode badge */}
              {searchMode !== 'text' && (
                <div className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2">
                  {searchMode === 'chat' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-900/40 border border-blue-700/40 rounded-full text-[10px] text-blue-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
                      AI
                    </span>
                  )}
                  {searchMode === 'voice' && isListening && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-900/40 border border-red-700/40 rounded-full text-[10px] text-red-300 font-medium">
                      <span className="flex gap-px items-end h-3">
                        {[0, 0.15, 0.3].map((d, i) => (
                          <span
                            key={i}
                            className="w-0.5 bg-red-400 rounded-full"
                            style={{ height: `${[10, 14, 10][i]}px`, animation: `pulse-dot 0.8s ease-in-out ${d}s infinite` }}
                          />
                        ))}
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Mode buttons */}
            <div className="flex items-center bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/60 rounded-lg sm:rounded-xl p-1 sm:p-1.5 gap-0.5 sm:gap-1">
              {[
                {
                  mode: 'text',
                  title: 'Text Search',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  ),
                },
                {
                  mode: 'chat',
                  title: 'AI Chat',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  ),
                },
                {
                  mode: 'voice',
                  title: 'Voice',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  ),
                },
              ].map(({ mode, title, icon }) => {
                const active = searchMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => (mode === 'voice' ? handleVoiceClick() : setSearchMode(mode))}
                    title={title}
                    className={`
                      mode-btn-active relative p-1.5 sm:p-2 lg:p-2.5 rounded-md sm:rounded-lg transition-all duration-200 overflow-hidden
                      ${active
                        ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md shadow-red-900/50 scale-105'
                        : 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/60'
                      }
                    `}
                  >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                  </button>
                );
              })}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-semibold text-xs sm:text-sm rounded-lg sm:rounded-xl overflow-hidden group transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Search</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>

          {/* Hint text */}
          <div className="mt-1.5 sm:mt-2 text-center min-h-[16px] sm:min-h-[20px] hidden sm:block">
            {searchMode === 'text' && (
              <p className="text-[10px] sm:text-xs text-neutral-600">
                💡 Try:{' '}
                <span className="text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors">"image generation"</span>
                ,{' '}
                <span className="text-neutral-500 hover:text-neutral-300 cursor-pointer transition-colors">"code assistant"</span>
              </p>
            )}
            {searchMode === 'chat' && (
              <p className="text-[10px] sm:text-xs text-neutral-600 flex items-center justify-center gap-1">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                Ask: <span className="text-neutral-500 ml-1">"Best tool for presentations?"</span>
              </p>
            )}
            {searchMode === 'voice' && (
              <p className="text-[10px] sm:text-xs text-neutral-600 flex items-center justify-center gap-1">
                <svg className={`w-3 h-3 text-red-500 ${isListening ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                {isListening ? <span className="text-red-400">Listening…</span> : 'Click mic to speak'}
              </p>
            )}
          </div>
        </form>

        {/* Mobile heading */}
        <div className="md:hidden text-center mt-2 sm:mt-3">
          <h2 className="text-sm sm:text-base font-bold">
            <span className="text-white">Discover </span>
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              AI Tools
            </span>
          </h2>
        </div>

      </div>
    </header>

    
  );
};

export default Header;