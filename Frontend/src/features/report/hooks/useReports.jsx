import { useQuery } from "@tanstack/react-query";
import { reportService } from "../services/reportService";
import { useState } from "react";

export function useReports() {
  const [filters, setFilters] = useState({
    type: null, // income, expense, or null for both
    category: [],
    account: [],
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Start of year
    endDate: new Date().toISOString().split('T')[0], // Today
    groupBy: 'category',
  });

  // Queries
  const detailedReport = useQuery({
    queryKey: ["finance", "reports", "detailed", filters],
    queryFn: () => reportService.getDetailedReport(filters),
  });

  const categoryBreakdown = useQuery({
    queryKey: ["finance", "reports", "category-breakdown", filters],
    queryFn: () => reportService.getCategoryBreakdown({
      type: filters.type,
      start_date: filters.startDate,
      end_date: filters.endDate,
    }),
  });

  const category = useQuery({
    queryKey: ["finance", "categories"],
    queryFn: () => reportService.getCategories()
  })

  const accountBreakdown = useQuery({
    queryKey: ["finance", "reports", "account-breakdown", filters],
    queryFn: () => reportService.getAccountBreakdown({
      start_date: filters.startDate,
      end_date: filters.endDate,
    }),
  });

  const account = useQuery({
    queryKey: ["finance", "accounts"],
    queryFn: () => reportService.getAccounts()
  })

  const monthlyComparison = useQuery({
    queryKey: ["finance", "reports", "monthly-comparison", filters.startDate],
    queryFn: () => reportService.getMonthlyComparison({
      year: new Date(filters.startDate).getFullYear(),
      months: 12,
    }),
  });

  const trendAnalysis = useQuery({
    queryKey: ["finance", "reports", "trend-analysis", filters],
    queryFn: () => reportService.getTrendAnalysis(filters),
  });

  const cashFlow = useQuery({
    queryKey: ["finance", "reports", "cash-flow", filters],
    queryFn: () => reportService.getCashFlow({
      start_date: filters.startDate,
      end_date: filters.endDate,
    }),
  });

  const exportReport = async (format = 'csv') => {
    try {
      const response = await reportService.exportReport(format, filters);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `financial_report_${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };

  return {
    // Data
    detailedReport: detailedReport.data?.data || { summary: {}, transactions: [], grouped_data: {} },
    categoryBreakdown: categoryBreakdown.data?.data || [],
    category: category.data?.data || [],
    accountBreakdown: accountBreakdown.data?.data || [],
    account: account.data?.data || [],
    monthlyComparison: monthlyComparison.data?.data || { months: [], income: [], expenses: [], net: [] },
    trendAnalysis: trendAnalysis.data?.data || {},
    cashFlow: cashFlow.data?.data || {},

    // Loading states
    isLoading: detailedReport.isLoading,
    isLoadingCategory: categoryBreakdown.isLoading,
    isLoadingAccount: accountBreakdown.isLoading,
    isLoadingMonthly: monthlyComparison.isLoading,
    isLoadingCategories: category.isLoading,
    isLoadingAccounts: account.isLoading,

    // Filters
    filters,
    setFilters,

    // Actions
    exportReport,
    refetch: detailedReport.refetch,
  };
}