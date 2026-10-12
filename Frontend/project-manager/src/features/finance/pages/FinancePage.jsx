import { useState } from 'react';
import { FinanceDashboard } from '../components/Dashboard/FinanceDashboard';
import { TransactionsList } from '../components/Transaction/TransactionsList';
import { BarChart3, List, PieChart, Settings, Building2 } from 'lucide-react';
import { FinanceSettings } from '../components/Settings/FinanceSettings';
import { ReportsPage } from '../components/Report/ReportsPage';
import { AccountPage } from '../components/Account/AccountPage';

export const FinancePage = () => {

  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: List,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: PieChart,
    },
    {
      id: 'accounts',
      label: 'Accounts',
      icon: Building2,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleTabKeyDown = (event) => {
    let nextIndex = activeTabIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (activeTabIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    document.getElementById(`finance-tab-${tabs[nextIndex].id}`)?.focus();
  };

  return (
    <>
      <div className="flex max-h-[calc(100dvh-7rem)] flex-col sm:px-6 sm:py-5 lg:py-0 lg:px-0">
        <nav
          className="-mx-4 shrink-0 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-2"
          aria-label="Finance sections"
          role="tablist"
          onKeyDown={handleTabKeyDown}
        >
          <div className="flex w-max min-w-full gap-4 sm:gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`finance-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`finance-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div
          id={`finance-panel-${activeTab}`}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 rounded-lg bg-white shadow-md"
          role="tabpanel"
          aria-labelledby={`finance-tab-${activeTab}`}
          tabIndex={0}
        >
          {activeTab === 'dashboard' && <FinanceDashboard />}
          {activeTab === 'transactions' && <TransactionsList />}
          {activeTab === 'reports' && <ReportsPage />}
          {activeTab === 'accounts' && <AccountPage />}
          {activeTab === 'settings' && <FinanceSettings />}
        </div>
      </div>
    </>
  );
};
