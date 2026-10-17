import { useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { Spinner } from "../../../shared/components/Spinner";
import { ErrorState } from "../../../shared/components/Error/ErrorState";
import { requestAndSaveFcmToken } from "../../../shared/utils/fcm";
import { normalizeTrendData } from "../utils";
import { DashboardFilters } from "../components/DashboardFilters";
import { SummaryStatsGrid } from "../components/SummaryStatsGrid";
import { IncomeExpenseChart } from "../components/IncomeExpenseChart";
import { PieChartCard } from "../components/PieChartCard";
import { AnalyticalHighlightsCard } from "../components/AnalyticalHighlightsCard";
import { InsightsCard } from "../components/InsightsCard";

export const DashboardPage = () => {
  useEffect(() => {
    requestAndSaveFcmToken();
  }, []);

  const {
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
  } = useDashboard();

  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = summary;

  const {
    data: trendPages,
    isLoading: trendLoading,
    isFetchingNextPage: isFetchingOlderTrend,
    hasNextPage: hasOlderTrend,
    fetchNextPage: fetchOlderTrend,
    error: trendError,
    refetch: refetchTrend,
  } = incomeExpenseTrend;

  const { data: categoriesData } = categories;
  const { data: accountsData } = accounts;

  const latestTrendData = trendPages?.pages?.[0];
  const latestChartData = normalizeTrendData(
    latestTrendData?.series || latestTrendData?.data || []
  );
  const chartData = trendPages?.pages
    ? [...trendPages.pages]
        .reverse()
        .flatMap((page) => normalizeTrendData(page?.series || page?.data || []))
    : [];
  const totalIncomeFromSeries = latestChartData.reduce(
    (sum, row) => sum + row.income,
    0
  );
  const totalExpenseFromSeries = latestChartData.reduce(
    (sum, row) => sum + row.expense,
    0
  );
  const avgIncomePerBucket = latestChartData.length
    ? totalIncomeFromSeries / latestChartData.length
    : 0;
  const avgExpensePerBucket = latestChartData.length
    ? totalExpenseFromSeries / latestChartData.length
    : 0;

  if (summaryLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (summaryError) {
    return (
      <ErrorState
        message="Failed to load dashboard summary."
        onRetry={refetchSummary}
      />
    );
  }

  return (
    <>
      <DashboardFilters
        period={period}
        setPeriod={setPeriod}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        accountId={accountId}
        setAccountId={setAccountId}
        categoriesData={categoriesData}
        accountsData={accountsData}
      />

      <SummaryStatsGrid
        summaryData={summaryData}
        totalIncomeFromSeries={totalIncomeFromSeries}
        totalExpenseFromSeries={totalExpenseFromSeries}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)]">
        <IncomeExpenseChart
          period={period}
          categoryId={categoryId}
          accountId={accountId}
          trendLoading={trendLoading}
          trendError={trendError}
          refetchTrend={refetchTrend}
          chartData={chartData}
          trendPageCount={trendPages?.pages?.length || 0}
          isFetchingOlderTrend={isFetchingOlderTrend}
          hasOlderTrend={hasOlderTrend}
          fetchOlderTrend={fetchOlderTrend}
        />
        <PieChartCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticalHighlightsCard
          avgIncomePerBucket={avgIncomePerBucket}
          avgExpensePerBucket={avgExpensePerBucket}
          summaryData={summaryData}
        />
        <InsightsCard summaryData={summaryData} />
      </div>
    </>
  );
};
