'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      section: 'Tools',
      items: [
        {
          id: 'Overview',
          label: 'Overview',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          href: '/dashboard/overview',
          badge: '12'
        },
        {
          id: 'drafts',
          label: 'Drafts',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          href: '/dashboard/drafts',
          badge: '3'
        },
        {
          id: 'published',
          label: 'Published',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/dashboard/published',
          badge: '9'
        },
        {
          id: 'pending',
          label: 'Pending Review',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/dashboard/pending',
          badge: '2'
        }
      ]
    },
    {
      section: 'Engagement',
      items: [
        {
          id: 'reviews',
          label: 'Reviews',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ),
          href: '/dashboard/reviews',
          badge: '15'
        },
        {
          id: 'comments',
          label: 'Comments',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          ),
          href: '/dashboard/comments',
          badge: '8'
        },
        {
          id: 'favorites',
          label: 'Saved Tools',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
          href: '/dashboard/saved',
          badge: '24'
        }
      ]
    },
    {
      section: 'Settings',
      items: [
        {
          id: 'profile',
          label: 'Profile',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          href: '/dashboard/profile',
          badge: null
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          href: '/dashboard/settings',
          badge: null
        }
      ]
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderRight: '1px solid var(--color-border)'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div 
          className="flex items-center justify-between p-3" 
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))' 
                }}
              >
                <svg 
                  className="w-5 h-5" 
                  style={{ color: 'var(--color-text-primary)' }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span 
                className="text-sm font-bold" 
                style={{ color: 'var(--color-text-primary)' }}
              >
                Dashboard
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded transition-colors"
            style={{ 
              color: 'var(--color-text-muted)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!isCollapsed && (
                <h3 
                  className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider" 
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {section.section}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded transition-all group relative"
                      style={{
                        background: isActive 
                          ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' 
                          : item.highlight 
                            ? 'var(--color-bg-tertiary)'
                            : 'transparent',
                        color: isActive || item.highlight 
                          ? 'var(--color-text-primary)' 
                          : 'var(--color-text-secondary)',
                        border: item.highlight && !isActive ? '1px solid var(--color-primary)' : 'none'
                      }}
                      title={isCollapsed ? item.label : ''}
                      onMouseEnter={(e) => {
                        if (!isActive && !item.highlight) {
                          e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive && !item.highlight) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }
                      }}
                    >
                      <div 
                        style={{ 
                          color: isActive 
                            ? 'var(--color-text-primary)' 
                            : item.highlight 
                              ? 'var(--color-primary)' 
                              : 'var(--color-text-muted)' 
                        }}
                      >
                        {item.icon}
                      </div>
                      
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1">{item.label}</span>
                          {item.badge && (
                            <span 
                              className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                              style={{
                                backgroundColor: isActive 
                                  ? 'rgba(255, 255, 255, 0.2)' 
                                  : 'var(--color-bg-tertiary)',
                                color: isActive 
                                  ? 'var(--color-text-primary)' 
                                  : 'var(--color-text-muted)'
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div 
                          className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-primary)'
                          }}
                        >
                          {item.label}
                          {item.badge && (
                            <span 
                              className="ml-2 px-1.5 py-0.5 rounded-full text-[10px]"
                              style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div 
          className="p-3" 
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2.5 p-2 rounded transition-all group"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))',
                color: 'var(--color-text-primary)'
              }}
            >
              JD
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div 
                  className="text-sm font-medium truncate" 
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  John Doe
                </div>
                <div 
                  className="text-xs" 
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  View Profile
                </div>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;