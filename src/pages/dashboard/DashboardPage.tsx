// src/pages/dashboard/DashboardPage.tsx
//
// The main dashboard — the first page members and admins see after login.
// It gives an at-a-glance overview of the cooperative's financial health.
//
// Data flow today:
//   Mock data → components (works immediately, looks real)
//
// Data flow Week 2:
//   API call → useState → components (real data from backend)
//
// The swap in Week 2 is seamless because our TypeScript types
// ensure the shape of mock data matches the shape of real API data.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  PiggyBank,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";

import { useAuth } from "@/context/useAuth";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  SkeletonStatsCard,
  SkeletonCard,
} from "@/components/dashboard/SkeletonCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { LoanProgressList } from "@/components/dashboard/LoanProgressList";
import { ContributionsChart } from "@/components/dashboard/ContributionsChart";
import { formatNairaCompact } from "@/utils/formatters";

import {
  MOCK_STATS,
  MOCK_MONTHLY_CONTRIBUTIONS,
  MOCK_LOAN_PROGRESS,
  MOCK_ACTIVITY,
} from "@/data/dashboard.mock";

import type {
  DashboardStats,
  MonthlyContribution,
  LoanProgress,
  ActivityItem,
} from "@/types/dashboard.types";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Each piece of data has its own loading state.
  // In a real app each comes from a separate API call.
  // We initialise as null — null means "not loaded yet"
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [contributions, setContributions] = useState<MonthlyContribution[]>([]);
  const [loanProgress, setLoanProgress] = useState<LoanProgress[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetch with a realistic 800ms delay.
  // useEffect runs once after the component mounts.
  // The empty [] dependency array means "run this once on mount only".
  // Week 2: replace the setTimeout with real fetch() calls to our API.
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
      setContributions(MOCK_MONTHLY_CONTRIBUTIONS);
      setLoanProgress(MOCK_LOAN_PROGRESS);
      setActivity(MOCK_ACTIVITY);
      setIsLoading(false);
    }, 800);

    // Cleanup function — if the component unmounts before the timeout,
    // cancel it to avoid a "setState on unmounted component" warning.
    return () => clearTimeout(timer);
  }, []);

  // Get the first name only for the greeting
  const firstName = user?.fullName.split(" ")[0] ?? "there";

  // Determine greeting based on time of day
  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }

  return (
    <div className="space-y-6">
      {/* ── Greeting header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {getGreeting()}, {firstName} 👋
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with HMN Cooperative today
          </p>
        </div>

        {/* Pending approvals alert — only shown to admin/treasurer */}
        {!isLoading &&
          stats &&
          stats.pendingApprovals > 0 &&
          (user?.role === "admin" || user?.role === "treasurer") && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate("/approvals")}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium rounded-xl hover:bg-amber-100 transition-colors self-start sm:self-auto"
            >
              <Clock size={15} />
              {stats.pendingApprovals} pending approval
              {stats.pendingApprovals !== 1 ? "s" : ""}
            </motion.button>
          )}
      </motion.div>

      {/* ── Stats cards grid ── */}
      {/* On mobile: 2 columns. On md+: 3 columns. On lg+: 6 cards in one row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {isLoading ? (
          // Show 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, i) => <SkeletonStatsCard key={i} />)
        ) : stats ? (
          <>
            <StatsCard
              label="Total members"
              value={String(stats.totalMembers)}
              icon={Users}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              change="+3 this month"
              changeType="positive"
              index={0}
              onClick={() => navigate("/members")}
            />
            <StatsCard
              label="Savings pool"
              value={formatNairaCompact(stats.totalSavings)}
              icon={PiggyBank}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              change="+₦320K"
              changeType="positive"
              index={1}
              onClick={() => navigate("/savings")}
            />
            <StatsCard
              label="Active loans"
              value={String(stats.activeLoans)}
              icon={Wallet}
              iconColor="text-[#CC0000]"
              iconBg="bg-red-50"
              change="12 members"
              changeType="neutral"
              index={2}
              onClick={() => navigate("/loans")}
            />
            <StatsCard
              label="Disbursed"
              value={formatNairaCompact(stats.totalLoansDisbursed)}
              icon={TrendingUp}
              iconColor="text-indigo-600"
              iconBg="bg-indigo-50"
              index={3}
            />
            <StatsCard
              label="Interest earned"
              value={formatNairaCompact(stats.interestEarned)}
              icon={TrendingUp}
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50"
              change="+8% vs Q1"
              changeType="positive"
              index={4}
            />
            <StatsCard
              label="Overdue loans"
              value={String(stats.overdueLoans)}
              icon={AlertTriangle}
              iconColor="text-red-600"
              iconBg="bg-red-50"
              change="needs attention"
              changeType="negative"
              index={5}
              onClick={() => navigate("/loans")}
            />
          </>
        ) : null}
      </div>

      {/* ── Chart + Activity row ── */}
      {/* On mobile: stacked. On lg+: chart takes 60%, activity 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contributions bar chart — takes 3/5 of the row on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Monthly contributions
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Last 10 months vs target
              </p>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
              2025 – 2026
            </span>
          </div>
          {isLoading ? (
            <SkeletonCard height="h-[220px]" />
          ) : (
            <ContributionsChart data={contributions} />
          )}
        </motion.div>

        {/* Activity feed — takes 2/5 of the row on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Recent activity
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Latest transactions & events
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ActivityFeed items={activity} />
          )}
        </motion.div>
      </div>

      {/* ── Loan progress section ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Loan repayment progress
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Active loans — repayment status
            </p>
          </div>
          <button
            onClick={() => navigate("/loans")}
            className="text-xs text-[#CC0000] hover:underline font-medium"
          >
            View all →
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3.5 bg-gray-100 rounded animate-pulse w-1/4" />
                  <div className="h-3.5 bg-gray-100 rounded animate-pulse w-8" />
                </div>
                <div className="h-2 bg-gray-100 rounded-full animate-pulse" />
                <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <LoanProgressList loans={loanProgress} />
        )}
      </motion.div>
    </div>
  );
}
