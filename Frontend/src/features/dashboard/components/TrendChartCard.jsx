import { Card } from "@/shared/components/Card";
import { Spinner } from "@/shared/components/Spinner";
import { ErrorState } from "@/shared/components/Error/ErrorState";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCompactCurrency, periodLabelMap } from "../utils";
import { formatCurrency } from "@/shared/utils/formatCurrency";

export const TrendChartCard = ({
  period,
  categoryId,
  accountId,
  trendLoading,
  trendError,
  refetchTrend,
  chartData,
}) => {
  return (
    <Card title="Income vs Expense Trend">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-gray-600">
            {periodLabelMap[period]} trend
            {categoryId !== "all" ? " by selected category" : ""}
            {accountId !== "all" ? " and account" : ""}
          </p>
          {trendLoading && <Spinner size="sm" />}
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
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 20, left: 0, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={formatCompactCurrency}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  shared={false}
                  cursor={false}
                  formatter={(value, name) => [formatCurrency(value), name]}
                  labelStyle={{ color: "#111827" }}
                />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
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
        )}
      </div>
    </Card>
  );
};
