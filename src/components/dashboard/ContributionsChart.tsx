// src/components/dashboard/ContributionsChart.tsx
//
// A bar chart showing monthly contribution amounts vs target.
// Built with Recharts — every element is a React component.
//
// ResponsiveContainer makes the chart fill its parent width automatically —
// this is what makes it mobile responsive.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { MonthlyContribution } from "@/types/dashboard.types";
import { formatNairaCompact } from "@/utils/formatters";

interface ContributionsChartProps {
  data: MonthlyContribution[];
}

// Custom tooltip — shown when you hover over a bar.
// Recharts passes payload and label to any custom tooltip.
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  // active is true only when the user is hovering over a bar
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      <p className="text-[#CC0000]">
        Collected: {formatNairaCompact(payload[0]?.value ?? 0)}
      </p>
      {payload[1] && (
        <p className="text-gray-400">
          Target: {formatNairaCompact(payload[1]?.value ?? 0)}
        </p>
      )}
    </div>
  );
}

export function ContributionsChart({ data }: ContributionsChartProps) {
  // Get the target value from the first data point for the reference line.
  // All months share the same target so we just read it once.
  const target = data[0]?.target ?? 0;

  return (
    // ResponsiveContainer fills 100% of its parent's width.
    // height is fixed at 220px — enough to be readable without dominating the page.
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {/* Horizontal grid lines — subtle, helps read values */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />

        {/* X axis — month names */}
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y axis — formatted Naira amounts */}
        <YAxis
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: number) => formatNairaCompact(value)}
        />

        {/* Custom hover tooltip */}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />

        {/* Dashed reference line showing the monthly target */}
        <ReferenceLine
          y={target}
          stroke="#e5e7eb"
          strokeDasharray="4 4"
          label={{
            value: "Target",
            position: "right",
            fontSize: 10,
            fill: "#9ca3af",
          }}
        />

        {/* The actual contribution bars — Honda red */}
        <Bar
          dataKey="amount"
          fill="#CC0000"
          radius={[4, 4, 0, 0]} // rounded top corners
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
