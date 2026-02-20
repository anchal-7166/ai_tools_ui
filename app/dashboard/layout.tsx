import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Link from 'next/link';
import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="min-h-screen flex"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Sidebar */}
      <DashboardSidebar />
      <main className="flex-1 ml-64 mb-12">
        <header 
          className="sticky top-0 z-40 px-6 py-4"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <div className="flex items-center justify-between">
            {/* Page Title - Will be dynamic based on route */}
            <div>
              <p 
                className="text-sm mt-0.5 text-gray-200"
              >
                Manage your AI tools and analytics
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button 
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Notification Badge */}
                <span 
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-error)' }}
                />
              </button>

              {/* Help */}
              <button
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Add New Tool Button */}
              <Link 
                 href="/dashboard/submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
                  color: 'var(--color-text-primary)'
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Tool
              </Link>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}