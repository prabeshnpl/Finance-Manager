import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import { useState } from "react";

export function useDashboard() {
  const [period, setPeriod] = useState("monthly"); // weekly, monthly, yearly
  const [categoryId, setCategoryId] = useState("all");
  const [accountId, setAccountId] = useState("all");

  const dashboardFilters = {
    period,
    category:
      categoryId && categoryId !== "all" ? categoryId : undefined,
    account:
      accountId && accountId !== "all" ? accountId : undefined,
  };

  const summary = useQuery({
    queryKey: ["finance", "summary", dashboardFilters],
    queryFn: () => dashboardService.getSummary(dashboardFilters),
    retry: false,
  });

  const incomeExpenseTrend = useInfiniteQuery({
    queryKey: ["finance", "income-expense-trend", dashboardFilters],
    queryFn: ({ pageParam }) =>
      dashboardService.getIncomeExpenseTrend({
        ...dashboardFilters,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.has_next
        ? lastPage.pagination.page + 1
        : undefined,
    retry: false,
  });

  const categories = useQuery({
    queryKey: ["finance", "categories"],
    queryFn: () => dashboardService.getCategories(),
    retry: false,
  });

  const accounts = useQuery({
    queryKey: ["finance", "accounts"],
    queryFn: () => dashboardService.getAccounts(),
    retry: false,
  });

  return {
    summary,
    incomeExpenseTrend,
    categories,
    accounts,
    period,
    setPeriod,
    categoryId,
    setCategoryId,
    accountId,
    setAccountId,
  };
}
