'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMyPublishedTools } from '@/lib/hooks/use-tools';
import { useMyPendingTools } from '@/lib/hooks/use-submissions';
import { useMySavedTools } from '@/lib/hooks/use-tools';
import { useMe } from '@/lib/hooks/use-user';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isCollapsed, onToggle }: DashboardSidebarProps) => {
  const pathname = usePathname();

  // Mobile drawer state is fully self-contained here
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { data: me } = useMe();
  const { data: publishedData } = useMyPublishedTools();
  const { data: pendingData } = useMyPendingTools();
  const { data: savedData } = useMySavedTools();

  const publishedCount = publishedData?.data?.length ?? 0;
  const pendingCount = Array.isArray(pendingData) ? pendingData.length : (pendingData?.data?.length ?? 0);
  const savedCount = savedData?.data?.length ?? 0;

  const displayName =
    me ? `${me.firstName ?? ''} ${me.lastName ?? ''}`.trim() || me.username || me.email : '—';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  // Auto-close mobile drawer on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  // Lock body scroll while mobile drawer open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Derive current page label for mobile topbar
  const pageTitle = (() => {
    const seg = pathname.split('/').filter(Boolean).pop() ?? 'dashboard';
    return seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
  })();

  const menuItems = [
    {
      section: null,
      items: [
        {
          id: 'overview',
          label: 'Overview',
          href: '/dashboard/overview',
          badge: null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
        },
        {
          id: 'submit',
          label: 'Submit Tool',
          href: '/dashboard/submit',
          badge: null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ),
        },
        {
          id: 'published',
          label: 'Published',
          href: '/dashboard/published',
          badge: publishedCount > 0 ? String(publishedCount) : null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          id: 'pending',
          label: 'Pending Review',
          href: '/dashboard/pending',
          badge: pendingCount > 0 ? String(pendingCount) : null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          id: 'saved',
          label: 'Saved Tools',
          href: '/dashboard/saved',
          badge: savedCount > 0 ? String(savedCount) : null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      section: 'Settings',
      items: [
        {
          id: 'profile',
          label: 'Profile',
          href: '/dashboard/profile',
          badge: null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          href: '/dashboard/settings',
          badge: null,
          icon: (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
      ],
    },
  ];

  // ── Shared sidebar inner content ──────────────────────────────────
  const SidebarBody = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex flex-col h-full w-full">

      {/* Header */}
      <div className="flex items-center justify-between p-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--color-border)' }}>

        {/* Home link (hidden when collapsed on desktop) */}
        <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <Link
            href="/"
            className="flex items-center gap-1.5 group whitespace-nowrap"
            title="Back to Explore"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:-translate-x-0.5"
              style={{ color: 'var(--color-text-muted)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs font-medium transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              Explore Tools
            </span>
          </Link>
        </div>

        {/* Desktop collapse toggle */}
        <button onClick={onToggle}
          className={`hidden md:flex items-center justify-center p-1.5 rounded transition-colors flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`}
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
        </button>

        {/* Mobile close (X) button */}
        <button onClick={() => setIsMobileOpen(false)}
          className="md:hidden flex items-center justify-center p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: 'var(--color-text-muted)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User pill */}
      <div className="p-3 flex-shrink-0" >
        <Link href="/dashboard/profile"
          className="flex items-center gap-2.5 p-2 rounded transition-all"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden"
            style={{
              background: me?.avatar ? undefined : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              backgroundImage: me?.avatar ? `url(${me.avatar})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
            }}
          >
            {!me?.avatar && avatarLetter}
          </div>

          <div className={`flex-1 min-w-0 overflow-hidden transition-all duration-300 ${collapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
            <p className="text-sm font-medium whitespace-nowrap truncate" style={{ color: 'var(--color-text-primary)' }}>
              {displayName}
            </p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span className="capitalize">{me?.role?.toLowerCase() ?? 'user'}</span>
              {me?.isVerified && (
                <svg className="w-3 h-3 flex-shrink-0" style={{ color: 'rgb(34,197,94)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-3">
        {menuItems.map((group, gi) => (
          <div key={gi}>
            {/* Section label */}
            <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'max-h-0 opacity-0' : 'max-h-8 opacity-100 mb-1'}`}>
              {group.section && (
                <p className="px-2 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {group.section}
                </p>
              )}
            </div>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.id} href={item.href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded transition-all group relative"
                    style={{
                      background: active ? 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' : 'transparent',
                      color: active ? '#fff' : 'var(--color-text-secondary)',
                    }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'; e.currentTarget.style.color = 'var(--color-text-primary)'; } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-text-secondary)'; } }}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex-shrink-0" style={{ color: active ? '#fff' : 'var(--color-text-muted)' }}>
                      {item.icon}
                    </div>

                    <div className={`flex items-center flex-1 min-w-0 overflow-hidden transition-all duration-300 ${collapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                      <span className="text-sm font-medium flex-1 whitespace-nowrap truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(138,18,18,0.15)',
                            color: active ? '#fff' : 'var(--color-primary-light)',
                          }}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Collapsed tooltip (desktop only) */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none"
                        style={{ backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
                        {item.label}
                        {item.badge && (
                          <span className="ml-1 px-1 py-0.5 rounded-full text-[9px]"
                            style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
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

      {/* Footer: email */}
      <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
        <div className="px-4 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-[10px] truncate" style={{ color: 'var(--color-text-muted)' }}>
            {me?.email ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
  // ── end SidebarBody ──────────────────────────────────────────────

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          MOBILE: sticky top bar  (visible only below md breakpoint)
         ════════════════════════════════════════════════════════════ */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 h-14"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Hamburger ☰ */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Open navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Current page label */}
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {pageTitle}
        </span>

        {/* Avatar → profile shortcut */}
        <Link href="/dashboard/profile" aria-label="Go to profile">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold overflow-hidden"
            style={{
              background: me?.avatar ? undefined : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              backgroundImage: me?.avatar ? `url(${me.avatar})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#fff',
            }}
          >
            {!me?.avatar && avatarLetter}
          </div>
        </Link>
      </header>

      {/* ════════════════════════════
          DESKTOP sidebar
         ════════════════════════════ */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-full z-50 flex-col transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-16' : 'w-64'}`}
        style={{ backgroundColor: 'var(--color-bg-primary)', borderRight: '1px solid var(--color-border)' }}
      >
        <SidebarBody collapsed={isCollapsed} />
      </aside>

      {/* ════════════════════════════
          MOBILE backdrop overlay
         ════════════════════════════ */}
      <div
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* ════════════════════════════
          MOBILE slide-in drawer
         ════════════════════════════ */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed top-0 left-0 h-full z-50 w-[280px] flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-bg-primary)', borderRight: '1px solid var(--color-border)' }}
      >
        <SidebarBody collapsed={false} />
      </aside>
    </>
  );
};

export default DashboardSidebar;