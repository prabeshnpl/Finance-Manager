import { NotificationBell } from '@/features/notification/components/NotificationBell';
import { Menu } from 'lucide-react';

export const TopBar = ({ onToggleSidebar, isSidebarOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 flex items-center justify-between sm:hidden">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isSidebarOpen}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <h1 className="truncate text-lg sm:text-2xl font-bold text-blue-600">FinanceManager</h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <NotificationBell />
      </div>
    </div>
  );
};