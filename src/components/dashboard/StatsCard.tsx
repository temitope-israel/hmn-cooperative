// src/components/dashboard/StatsCard.tsx
//
// A single stat card — shows a metric, its label, an icon,
// and an optional change indicator (up/down vs last period).
// Used across the top row of the dashboard.

import { motion } from "framer-motion";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string; // pre-formatted string e.g. "₦4.2M" or "48"
  icon: LucideIcon;
  iconColor: string; // Tailwind color class e.g. "text-blue-500"
  iconBg: string; // Tailwind bg class e.g. "bg-blue-50"
  change?: string; // e.g. "+3 this month"
  changeType?: "positive" | "negative" | "neutral";
  index: number; // used to stagger the animation delay
  onClick?: () => void; // Optional - makes the card navigable
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  change,
  changeType = "neutral",
  index,
  onClick,
}: StatsCardProps) {
  return (
    // Each card animates in with a staggered delay based on its index.
    // index 0 = 0ms delay, index 1 = 75ms, index 2 = 150ms etc.
    // This creates a cascade effect that feels polished and intentional.
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.075, ease: "easeOut" }}
      className={`bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? "cursor-pointer hover:-translate-y-0.5" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icon Badge */}
        <div
          className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}
        >
          <Icon size={20} className={iconColor} />
        </div>
        {/* Change Indictor pill */}
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
                ${changeType === "positive" ? "bg-green-50 text-green-700" : ""} ${changeType === "negative" ? "bg-red-50 text-red-600" : ""} ${changeType === "neutral" ? "bg-gray-50 text-gray-500" : ""}
                `}
          >
            {changeType === "positive" && <TrendingUp size={11} />}
            {changeType === "negative" && <TrendingDown size={11} />}
          </div>
        )}
      </div>

      {/* /value = large and prominent  */}
      <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  );
}
