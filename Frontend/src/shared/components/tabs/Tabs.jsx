export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <>      
      <nav className="flex space-x-1 sm:space-x-8 font-bold" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center space-x-1 sm:space-x-2 py-2 px-1 border-b-2 
                text-xs sm:text-base transition-colors cursor-pointer
                ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {Icon && <Icon className="h-3 w-3 sm:h-5 sm:w-5" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export const TabPanel = ({ children, isActive }) => {
  if (!isActive) return null;
  
  return (
    <div>
      {children}
    </div>
  );
};