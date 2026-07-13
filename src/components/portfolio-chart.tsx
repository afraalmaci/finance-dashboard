"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PortfolioHistoryPoint } from "../types/portfolio";

interface PortfolioChartProps {
  history: PortfolioHistoryPoint[];
}

// Renders a line chart of portfolio value over time
export function PortfolioChart({ history }: PortfolioChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          className="fill-gray-500 dark:fill-gray-400"
          minTickGap={40}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="fill-gray-500 dark:fill-gray-400"
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          width={50}
        />
        <Tooltip
            formatter={(value) => {
                const num = typeof value === "number" ? value : Number(value);
                return [`$${num.toLocaleString()}`, "Value"];
            }}
            contentStyle={{
                backgroundColor: "var(--tooltip-bg, #fff)",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "13px",
            }}
        />
        <Line
          type="monotone"
          dataKey="totalValue"
          stroke="#4f46e5"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}