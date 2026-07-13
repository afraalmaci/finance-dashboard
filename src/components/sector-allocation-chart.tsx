"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SectorAllocation } from "../types/portfolio";

interface SectorAllocationChartProps {
  data: SectorAllocation[];
}

// Distinct colors for each sector slice
const COLORS = ["#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

// Renders a pie chart showing portfolio allocation by sector
export function SectorAllocationChart({ data }: SectorAllocationChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="sector"
          cx="50%"
          cy="45%"
          outerRadius={70}
          label={(entry) => `${entry.percent}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={entry.sector} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: "12px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}