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
        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 scrollbar-hide">
          <div className="mx-auto w-full max-w-400 space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
      <ErrorMessage />
    </div>
  );
};
