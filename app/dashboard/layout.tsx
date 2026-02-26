'use client';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Link from 'next/link';
import React, { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>

      {/* Sidebar renders its own mobile topbar + slide-in drawer */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/*
        Content offset rules:
        ┌─ Mobile  (<md): pl-0  + pt-14 (clears the 56px sticky mobile topbar)
        └─ Desktop (≥md): pl-16 or pl-64 (matches w-16 / w-64 sidebar) + pt-0
      */}
      <div
        className={`
          transition-all duration-300
          pt-14 md:pt-0
          pl-0
          ${isCollapsed ? 'md:pl-16' : 'md:pl-64'}
        `}
      >
        <main className="min-h-screen flex flex-col pb-12">

          {/* Desktop-only header bar */}
          <header className="hidden md:flex items-center justify-between sticky top-0 z-30 px-6 py-3"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Manage your AI tools and analytics
            </p>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-error)' }} />
              </button>

              {/* Help */}
              <button className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Add Tool */}
              <Link href="/dashboard/submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: '#fff',
                }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Tool
              </Link>
            </div>
          </header>

          {/* Page content */}
          <div className="p-4 sm:p-6 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}