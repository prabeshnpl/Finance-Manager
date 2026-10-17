import { Card } from "@/shared/components/Card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const sampleData = [
  { name: "Housing", value: 40, color: "#2563eb" },
  { name: "Food", value: 25, color: "#16a34a" },
  { name: "Transport", value: 20, color: "#f59e0b" },
  { name: "Other", value: 15, color: "#a855f7" },
];

export const PieChartCard = () => (
  <Card title="Spending Breakdown">
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Sample preview — category data will be available here in the future.
      </p>
      <div className="h-52 w-full sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sampleData}
              dataKey="value"
              nameKey="name"
              innerRadius="42%"
              outerRadius="68%"
              paddingAngle={3}
            >
              {sampleData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {sampleData.map((entry) => (
          <span
            key={entry.name}
            className="inline-flex items-center gap-1.5 text-xs text-gray-600"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  </Card>
);
