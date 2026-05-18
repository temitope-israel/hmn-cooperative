// src/components/dashboard/ActivityFeed.tsx
//
// Shows a chronological list of recent cooperative events.
// Each event has a type, which determines its icon and color.
// The timestamp is shown as relative time ("2 hours ago").

import { motion } from "framer-motion";
import {
  PiggyBank,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  CreditCard,
  ArrowDownToLine,
  XCircle,
} from "lucide-react";
import { ActivityItem } from "@/types/dashboard.types";
import { timeAgo, formatNaira } from "@/utils/formatters";

// Maps each activity type to an icon, color, and background
const ACTIVITY_CONFIG = {
  contribution: {
    icon: PiggyBank,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  loan_approved: {
    icon: CheckCircle2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  loan_repayment: {
    icon: CreditCard,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  member_joined: {
    icon: UserPlus,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  overdue: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  withdrawal: {
    icon: ArrowDownToLine,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  loan_declined: {
    icon: XCircle,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => {
        const config = ACTIVITY_CONFIG[item.type];
        const Icon = config.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            // Each item staggers in slightly after the previous
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            {/* Activity type icon */}
            <div
              className={`w-8 h-8 ${config.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
            >
              <Icon size={14} className={config.color} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Activity description */}
              <p className="text-sm text-gray-800 leading-snug">
                <span className="font-medium">{item.memberName}</span>{" "}
                {item.message}
                {/* Show amount if present */}
                {item.amount && (
                  <span className="font-medium text-gray-900">
                    {" — "}
                    {formatNaira(item.amount)}
                  </span>
                )}
              </p>
              {/* Relative timestamp */}
              <p className="text-xs text-gray-400 mt-0.5">
                {timeAgo(item.timestamp)}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
