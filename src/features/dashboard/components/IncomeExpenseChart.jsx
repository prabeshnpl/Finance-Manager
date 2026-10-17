import { useEffect, useRef, useState } from "react";
import { Card } from "@/shared/components/Card";
import { Spinner } from "@/shared/components/Spinner";
import { ErrorState } from "@/shared/components/Error/ErrorState";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCompactCurrency, periodLabelMap } from "../utils";
import { formatCurrency } from "@/shared/utils/formatCurrency";

export const IncomeExpenseChart = ({
  period,
  categoryId,
  accountId,
  trendLoading,
  trendError,
  refetchTrend,
  chartData,
  trendPageCount,
  isFetchingOlderTrend,
  hasOlderTrend,
  fetchOlderTrend,
}) => {
  const chartScrollRef = useRef(null);
  const previousPageCountRef = useRef(0);
  const hasInitialScrollRef = useRef(false);
  const pendingScrollAnchorRef = useRef(null);
  const isLoadingOlderRef = useRef(false);
  const dragStateRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [canScrollOlder, setCanScrollOlder] = useState(false);
  const [canScrollNewer, setCanScrollNewer] = useState(false);

  const updateScrollButtons = () => {
    const container = chartScrollRef.current;
    if (!container) return;

    setCanScrollOlder(container.scrollLeft > 1);
    setCanScrollNewer(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1
    );
  };
  useEffect(() => {
    const container = chartScrollRef.current;
    const previousPageCount = previousPageCountRef.current;
    previousPageCountRef.current = trendPageCount;
    if (!container || trendPageCount === previousPageCount) return undefined;

    if (!hasInitialScrollRef.current && trendPageCount > 0) {
      container.scrollLeft = container.scrollWidth;
      hasInitialScrollRef.current = true;
      pendingScrollAnchorRef.current = null;
    } else if (trendPageCount > previousPageCount && pendingScrollAnchorRef.current) {
      const { scrollWidth, scrollLeft } = pendingScrollAnchorRef.current;
      container.scrollLeft = scrollLeft + container.scrollWidth - scrollWidth;
      pendingScrollAnchorRef.current = null;
    } else if (trendPageCount === 1) {
      pendingScrollAnchorRef.current = null;
      container.scrollLeft = container.scrollWidth;
    } else if (trendPageCount < previousPageCount) {
      pendingScrollAnchorRef.current = null;
    }
    updateScrollButtons();
    return undefined;
  }, [trendPageCount]);

  useEffect(() => {
    const container = chartScrollRef.current;
    if (!container) return undefined;

    const handleWindowPointerMove = (event) => {
      const dragState = dragStateRef.current;
      const scrollContainer = chartScrollRef.current;
      if (
        !dragState ||
        !scrollContainer ||
        dragState.pointerId !== event.pointerId
      ) {
        return;
      }

      const distance = event.clientX - dragState.startX;
      if (!dragState.isDragging && Math.abs(distance) > 4) {
        dragState.isDragging = true;
        suppressClickRef.current = true;
      }
      if (dragState.isDragging) {
        scrollContainer.scrollLeft = dragState.startScrollLeft - distance;
      }
    };
    const handleWindowPointerEnd = (event) => {
      if (dragStateRef.current?.pointerId !== event.pointerId) return;
      dragStateRef.current = null;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    };

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerEnd);
    window.addEventListener("pointercancel", handleWindowPointerEnd);
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerEnd);
      window.removeEventListener("pointercancel", handleWindowPointerEnd);
    };
  }, []);

  const loadOlderPage = () => {
    const container = chartScrollRef.current;
    if (
      !container ||
      !hasOlderTrend ||
      isFetchingOlderTrend ||
      isLoadingOlderRef.current
    ) {
      return;
    }

    isLoadingOlderRef.current = true;
    pendingScrollAnchorRef.current = {
      scrollWidth: container.scrollWidth,
      scrollLeft: container.scrollLeft,
    };
    fetchOlderTrend().then(
      () => {
        isLoadingOlderRef.current = false;
      },
      () => {
        isLoadingOlderRef.current = false;
      }
    );
  };

  const handleChartScroll = () => {
    const container = chartScrollRef.current;
    if (!container) return;

    updateScrollButtons();
    if (container.scrollLeft <= 24) {
      loadOlderPage();
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const container = chartScrollRef.current;
    if (!container) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      isDragging: false,
    };
  };

  const handleChartClickCapture = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const scrollChart = (direction) => {
    const container = chartScrollRef.current;
    if (!container) return;

    if (direction < 0 && !canScrollOlder && hasOlderTrend) {
      loadOlderPage();
      return;
    }

    container.scrollBy({
      left: direction * container.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <Card
      title="Income vs Expense Trend"
      className="min-w-0 [&>div:last-child]:p-2 sm:[&>div:last-child]:p-4"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="min-w-0 text-xs text-gray-600 sm:text-sm">
            {periodLabelMap[period]} trend
            {categoryId !== "all" ? " by selected category" : ""}
            {accountId !== "all" ? " and account" : ""}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            {(trendLoading || isFetchingOlderTrend) && <Spinner size="sm" />}
            {(chartData.length > 1 || hasOlderTrend) && (
              <>
                <button
                  type="button"
                  onClick={() => scrollChart(-1)}
                  disabled={!canScrollOlder && !hasOlderTrend}
                  aria-label="Show older chart data"
                  className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollChart(1)}
                  disabled={!canScrollNewer}
                  aria-label="Show newer chart data"
                  className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>

        {trendError ? (
          <ErrorState
            message="Failed to load income/expense trend."
            onRetry={refetchTrend}
          />
        ) : chartData.length === 0 ? (
          <div className="text-sm text-gray-500 py-8 text-center">
            No trend data available for the selected filters.
          </div>
        ) : (
          <>
            <div className="flex min-w-0">
              <div
                role="group"
                aria-label="Money axis"
                className="relative h-52 w-19 shrink-0 sm:h-64"
              >
                <span className="absolute inset-y-2 left-0 z-10 flex items-center justify-center text-[10px] font-medium text-gray-600 [writing-mode:vertical-rl] transform-[rotate(180deg)]">
                  Money
                </span>
                <div className="absolute inset-y-0 right-0 w-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
                    >
                      <YAxis
                        width={64}
                        domain={[0, "auto"]}
                        tickFormatter={formatCompactCurrency}
                        tickLine={false}
                        axisLine={{ stroke: "#cbd5e1" }}
                        tick={{ fill: "#6b7280", fontSize: 9 }}
                      />
                      <XAxis
                        height={30}
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                ref={chartScrollRef}
                onScroll={handleChartScroll}
                onPointerDown={handlePointerDown}
                onClickCapture={handleChartClickCapture}
                role="region"
                aria-label="Income and expense trend chart. Drag or scroll horizontally to view older periods."
                tabIndex={0}
                className="scrollbar-hide min-w-0 flex-1 touch-pan-x cursor-grab select-none overflow-x-auto overscroll-x-contain active:cursor-grabbing"
              >
                <div
                  className="h-52 sm:h-64"
                  style={{
                    width: `max(100%, ${Math.max(chartData.length * 44 + 8, 240)}px)`,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                      barGap={4}
                      barCategoryGap="20%"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#f3f4f6", opacity: 0.7 }}
                        formatter={(value, name) => [formatCurrency(value), name]}
                        labelStyle={{ color: "#111827" }}
                      />
                      <Bar
                        dataKey="income"
                        name="Income"
                        barSize={10}
                        stroke="#16a34a"
                        fill="#16a34a"
                        radius={[4, 4, 0, 0]}
                        activeBar={{
                          fill: "#15803d",
                          stroke: "#14532d",
                          strokeWidth: 2,
                        }}
                      />
                      <Bar
                        dataKey="expense"
                        name="Expense"
                        barSize={10}
                        stroke="#dc2626"
                        fill="#dc2626"
                        radius={[4, 4, 0, 0]}
                        activeBar={{
                          fill: "#b91c1c",
                          stroke: "#7f1d1d",
                          strokeWidth: 2,
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 pt-1 text-xs text-gray-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-green-600" aria-hidden="true" />
                Income
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-red-600" aria-hidden="true" />
                Expense
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
