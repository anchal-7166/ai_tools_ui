// 'use client';

// import React, { useState } from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

// interface PublicLayoutProps {
//   children: React.ReactNode;
//   onFilterChange?: (filters: any) => void;
//   activeFilters?: any;
//   onSearch?: (query: string) => void; 
// }

// const PublicLayout = ({ children, onFilterChange, activeFilters }: PublicLayoutProps) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // const toggleSidebar = () => {
//   //   setIsSidebarOpen(!isSidebarOpen);
//   // };

//   return (
//     <div className="min-h-screen bg-black">
//       {/* <Header 
//         onSidebarToggle={toggleSidebar} 
//         onSearch={onSearch}
//       /> */}

//       <div className="flex">
//         <Sidebar 
//           isOpen={isSidebarOpen} 
//           onClose={() => setIsSidebarOpen(false)}
//           onFilterChange={onFilterChange || (() => {})}
//           activeFilters={activeFilters || {}}
//         />

//         <main className="flex-1 min-h-screen bg-neutral-950">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             {children}
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default PublicLayout;















'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  onFilterChange?: (filters: any) => void;
  activeFilters?: any;
  // Sidebar open state is owned by Home so the Header toggle button can control it
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
}

const PublicLayout = ({
  children,
  onFilterChange,
  activeFilters,
  isSidebarOpen,
  onSidebarClose,
}: PublicLayoutProps) => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">

      {/* ── LEFT: Sidebar, full viewport height ──────────────────────── */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={onSidebarClose}
        onFilterChange={onFilterChange || (() => {})}
        activeFilters={activeFilters || {}}
      />

      {/* ── RIGHT: stacked column — Header on top, content scrolls below ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {children}
          </div>
          <Footer />
        </main>
      </div>

    </div>
  );
};

export default PublicLayout;