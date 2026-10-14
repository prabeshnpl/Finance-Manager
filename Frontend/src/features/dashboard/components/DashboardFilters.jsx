export const DashboardFilters = ({
  period,
  setPeriod,
  categoryId,
  setCategoryId,
  accountId,
  setAccountId,
  categoriesData,
  accountsData,
}) => {
  return (
    <div className="sticky top-0 z-30 grid grid-cols-2 items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur sm:flex sm:justify-between sm:gap-4 sm:rounded-2xl sm:p-4 lg:p-5">
      
      <h1 className="min-w-0 whitespace-nowrap text-sm font-bold leading-tight text-slate-900 sm:text-xl lg:text-2xl">
        Financial overview
      </h1>

      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        aria-label="Reporting period"
        className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        aria-label="Filter by category"
        className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
      >
        <option value="all">All Categories</option>
        {(categoriesData || []).map((category) => (
          <option key={category.id} value={String(category.id)}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        aria-label="Filter by account"
        className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
      >
        <option value="all">All Accounts</option>
        {(accountsData || []).map((account) => (
          <option key={account.id} value={String(account.id)}>
            {account.name}
          </option>
        ))}
      </select>

    </div>
  );
};
