import React from 'react';
import { useReports } from '../hooks/useReports';
import { ReportFilters } from '../components/ReportFilters';
import { ReportSummary } from '../components/ReportSummary';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { AccountComparison } from '../components/AccountComparison';
import { MonthlyComparison } from '../components/MonthlyComparison';
import { TrendChart } from '../components/TrendChart';
import { ExportReport } from '../components/ExportReport';
import { Spinner } from '../../../shared/components/Spinner';
import { FileBarChart } from 'lucide-react';

export const ReportsPage = () => {
  const {
    detailedReport,
    categoryBreakdown,
    accountBreakdown,
    monthlyComparison,
    trendAnalysis,
    cashFlow,
    isLoading,
    isLoadingCategory,
    isLoadingAccount,
    isLoadingMonthly,
    isLoadingCategories,
    isLoadingAccounts,
    filters,
    category,
    account,
    setFilters,
    exportReport,
  } = useReports();

  const handleResetFilters = () => {
    setFilters({
      type: null,
      category: [],
      account: [],
      startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      groupBy: 'category',
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <FileBarChart className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Reports</h2>
            <p className="text-sm text-gray-600">Comprehensive analysis of your finances</p>
          </div>
        </div>
        <ExportReport onExport={exportReport} />
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFilterChange={setFilters}
        categories={category}
        accounts={account}
        isLoadingCategories={isLoadingCategories}
        isLoadingAccounts={isLoadingAccounts}
        onReset={handleResetFilters}
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* Summary */}
          <ReportSummary summary={detailedReport.summary} filters={filters} />

          {/* Category & Account Breakdown */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              <CategoryBreakdown data={categoryBreakdown} isLoading={isLoadingCategory} />
              <AccountComparison data={accountBreakdown} isLoading={isLoadingAccount} />
          </div>

          {/* Monthly Comparison */}
          <MonthlyComparison data={monthlyComparison} isLoading={isLoadingMonthly} />

          {/* Trend Analysis */}
          <TrendChart data={trendAnalysis} cashFlow={cashFlow} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};