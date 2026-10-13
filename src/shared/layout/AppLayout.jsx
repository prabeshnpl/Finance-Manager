import { TopBar } from './TopBar';
import { Sidebar } from './SideBar';
import { Outlet } from 'react-router-dom';
import ErrorMessage from '../components/Error/ErrorMessage';
import { useState } from 'react';

export const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-dvh min-h-0 flex-col">
      <TopBar
        isSidebarOpen={showSidebar}
        onToggleSidebar={() => setShowSidebar((s) => !s)}
      />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-yellow-50 scrollbar-hide">
          <div className="space-y-4 p-3 sm:p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <ErrorMessage />
    </div>
  );
};
