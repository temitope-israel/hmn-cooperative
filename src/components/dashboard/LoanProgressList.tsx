// src/components/dashboard/LoanProgressList.tsx
//
// Shows each active loan as a progress bar.
// Color-codes by status: green = on track, red = overdue.
// Members can see their own loan; admin sees all.

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { LoanProgress } from "@/types/dashboard.types";
import { formatNaira } from "@/utils/formatters";

interface LoanProgressListProps {
  loans: LoanProgress[];
}

export function LoanProgressList({ loans }: LoanProgressListProps) {
  return (
    <div className="space-y-4">
      {loans.map((loan, index) => (
        <motion.div
          key={loan.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07, duration: 0.35 }}
        >
          {/* Member name row */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">
                {loan.memberName}
              </span>
              <span className="text-xs text-gray-400">{loan.memberNo}</span>
              {/* Overdue warning icon */}
              {loan.status === "overdue" && (
                <AlertTriangle size={13} className="text-red-500" />
              )}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {loan.percentComplete}%
            </span>
          </div>

          {/* Progress bar track */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                loan.status === "overdue"
                  ? "bg-red-500"
                  : loan.percentComplete >= 80
                    ? "bg-green-500"
                    : "bg-[#CC0000]"
              }`}
              // Animate from 0 to the actual percentage width
              initial={{ width: 0 }}
              animate={{ width: `${loan.percentComplete}%` }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Loan amount detail row */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">
              {formatNaira(loan.amountRepaid)} repaid of{" "}
              {formatNaira(loan.loanAmount)}
            </span>
            <span
              className={`text-xs font-medium ${
                loan.status === "overdue" ? "text-red-500" : "text-gray-400"
              }`}
            >
              {loan.status === "overdue"
                ? "Overdue"
                : `Due ${new Date(loan.dueDate).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}`}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
