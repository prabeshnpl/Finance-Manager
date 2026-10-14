import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const colorClasses = {
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-600",
};

export const SummaryStatsGrid = ({
  summaryData,
  totalIncomeFromSeries,
  totalExpenseFromSeries,
}) => {
  const stats = [
    {
      title: "Income",
      value: formatCurrency(summaryData?.income || totalIncomeFromSeries),
      color: "green",
      trend: summaryData?.income_trend,
    },
    {
      title: "Expenses",
      value: formatCurrency(summaryData?.expenses || totalExpenseFromSeries),
      color: "red",
      trend: summaryData?.expenses_trend,
    },
    {
      title: "Total Balance",
      value: formatCurrency(summaryData?.balance || 0),
      color: Number(summaryData?.balance || 0) >= 0 ? "blue" : "red",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {stats.map((stat) => {
        return (
          <div key={stat.title} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="mt-2 wrap-break-word text-sm font-bold text-slate-900 sm:text-2xl">
                  Rs.{stat.value}
                </p>
                {stat.trend && (
                  <div className="mt-2 flex flex-wrap items-center gap-1 text-xs sm:text-sm">
                    {stat.trend.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-rose-600" />
                    )}
                    <span className={stat.trend.positive ? "text-emerald-700" : "text-rose-700"}>
                      {stat.trend.value}
                    </span>
                    <span className="text-slate-500">vs last period</span>
                  </div>
                )}
              </div>
              <div className={`shrink-0 rounded-xl p-2 ${colorClasses[stat.color]}`}>
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
