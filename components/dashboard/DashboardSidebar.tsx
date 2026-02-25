'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isCollapsed, onToggle }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    {
      items: [
        {
          id: 'Overview',
          label: 'Overview',
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          href: '/dashboard/overview',
        },
        {
          id: 'drafts',
          label: 'Drafts',
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          href: '/dashboard/pending',
          badge: '2'
        },
        {
          id: 'favorites',
          label: 'Saved Tools',
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-16' : 'w-64'}`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderRight: '1px solid var(--color-border)'
      }}
    >
      <div className="flex flex-col h-full w-full">

        {/* Header */}
        <div
          className="flex items-center justify-between p-3 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {/* Logo — fades out when collapsed using opacity + width trick (no layout jump) */}
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
           
           <h1>AI Tool Store </h1>
           <img src="/aitool3.png" alt="" className='w-12 h-12' />
          </div>

          {/* Toggle button — centered when collapsed */}
          <button
            onClick={onToggle}
            className={`p-1 rounded transition-colors flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
              />
            </svg>
          </button>
        </div>



 <div
          className="p-3 flex-shrink-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2.5 p-2 rounded transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))',
                color: 'var(--color-text-primary)'
              }}
            >
              A
            </div>
            {/* Name + subtitle — slides out on collapse */}
            <div
              className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
                isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
              }`}
            >
              <div
                className="text-sm font-medium whitespace-nowrap truncate"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Anchal
              </div>
              <div className="text-xs whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                View Profile
              </div>
            </div>
          </Link>
        </div>






        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section heading — collapses in height when sidebar is collapsed */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-8 opacity-100 mb-2'
                }`}
              >
                <h3
                  className="px-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {section.section}
                </h3>
              </div>

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
                          : 'transparent',
                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      }}
                      title={isCollapsed ? item.label : ''}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }
                      }}
                    >
                      {/* Icon — always visible, never shrinks */}
                      <div
                        className="flex-shrink-0"
                        style={{
                          color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)'
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Label + badge — slides out on collapse with no overflow */}
                      <div
                        className={`flex items-center flex-1 min-w-0 overflow-hidden transition-all duration-300 ${
                          isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
                        }`}
                      >
                        <span className="text-sm font-medium flex-1 whitespace-nowrap truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                            style={{
                              backgroundColor: isActive
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'var(--color-bg-tertiary)',
                              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Tooltip shown on hover in collapsed mode */}
                      {isCollapsed && (
                        <div
                          className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none"
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
      </div>
    </aside>
  );
};

export default DashboardSidebar;