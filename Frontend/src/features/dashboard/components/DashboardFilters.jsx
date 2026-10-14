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
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Overview</p>
        <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">Financial overview</h1>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          aria-label="Reporting period"
          className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          aria-label="Filter by category"
          className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
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
          className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2"
        >
          <option value="all">All Accounts</option>
          {(accountsData || []).map((account) => (
            <option key={account.id} value={String(account.id)}>
              {account.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
