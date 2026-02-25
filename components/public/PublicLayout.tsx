'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  onFilterChange?: (filters: any) => void;
  activeFilters?: any;
  onSearch?: (query: string) => void; 
}

const PublicLayout = ({ children, onFilterChange, activeFilters, onSearch }: PublicLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        onSidebarToggle={toggleSidebar} 
        onSearch={onSearch}
      />

      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onFilterChange={onFilterChange || (() => {})}
          activeFilters={activeFilters || {}}
        />

        <main className="flex-1 min-h-screen bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PublicLayout;