'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

// This layout is ONLY for public pages with sidebar and header
const PublicLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header - only shows on public pages */}
      <Header onSidebarToggle={toggleSidebar} />

      {/* Main Content Area with Sidebar */}
      <div className="flex">
        {/* Sidebar - only shows on public pages */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </div>
        </main>
      </div>

       {/* footer section  */}
        <Footer/>
    </div>
  );
};

export default PublicLayout;