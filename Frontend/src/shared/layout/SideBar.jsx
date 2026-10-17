import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Map, 
  ReceiptText,
  ChartNoAxesCombined,
  WalletCards,
  Building2, 
  Bell,
  Settings,
  UserRound,
  LogOut,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Roadmaps', path: '/roadmaps', icon: Map },
  { name: 'Transactions', path: '/transactions', icon: ReceiptText },
  { name: 'Reports', path: '/reports', icon: ChartNoAxesCombined },
  { name: 'Accounts', path: '/accounts', icon: WalletCards },
  { name: 'Organization', path: '/organization', icon: Building2 },
  { name: 'Notifications', path: '/notifications', icon: Bell },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  const navigateAndClose = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    onClose?.();
  };

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed top-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white transform md:relative md:translate-x-0 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <nav className="flex-1 px-3 py-5">
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h3 className="text-lg font-semibold text-slate-900">Menu</h3>
            <button type="button" onClick={onClose} aria-label="Close navigation menu" className="p-2 rounded-lg hover:bg-gray-200">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <h1 className="truncate text-lg sm:text-2xl font-bold text-blue-600 mb-10 ml-2 hidden sm:block">FinanceManager</h1>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/');

            return (
              <button
                key={item.path}
                onClick={() => navigateAndClose(item.path)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-200 p-3">
          <button
            type="button"
            onClick={() => navigateAndClose('/profile')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
              location.pathname === '/profile'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {getInitials()}
              </span>
            )}
            <span className="min-w-0 flex-1 truncate font-medium">
              {user?.first_name || user?.email || 'Profile'}
            </span>
            <UserRound className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navigateAndClose('/settings')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
              location.pathname === '/settings'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLogoutConfirmation(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      {showLogoutConfirmation && (
        <ConfirmationDialog
          title="Log out?"
          message="Are you sure you want to log out?"
          confirmLabel="Log out"
          confirmVariant="danger"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirmation(false)}
        />
      )}
    </>
  );
};