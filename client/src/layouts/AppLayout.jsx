import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobileMenuOpen={mobileSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-30 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <Sidebar mobile onClose={() => setMobileSidebarOpen(false)} />
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto min-w-0 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
