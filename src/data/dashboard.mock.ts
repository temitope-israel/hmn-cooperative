//src/data/dashbaord.mock.ts

//

// Mock data that mirrors exactly what our real API will return.
// Using realistic Nigerian names and Naira amounts makes the UI
// feel real and helps us spot layout issues early.
//

import {
    DashboardStats,
    MonthlyContribution,
    LoanProgress,
    ActivityItem,
} from '@/types/dashboard.types'

export const MOCK_STATS: DashboardStats={
    totalMembers: 48,
    totalSavings: 4200000,
    activeLoans: 12,
    totalLoansDisbursed: 1800000,
    interestEarned:210000,
    pendingApprovals: 3,
    overdueLoans:2,
}


export const MOCK_MONTHLY_CONTRIBUTIONS: MonthlyContribution[] = [
  { month: "Aug", amount: 720000, target: 960000 },
  { month: "Sep", amount: 840000, target: 960000 },
  { month: "Oct", amount: 780000, target: 960000 },
  { month: "Nov", amount: 900000, target: 960000 },
  { month: "Dec", amount: 820000, target: 960000 },
  { month: "Jan", amount: 910000, target: 960000 },
  { month: "Feb", amount: 880000, target: 960000 },
  { month: "Mar", amount: 840000, target: 960000 },
  { month: "Apr", amount: 920000, target: 960000 },
  { month: "May", amount: 985000, target: 960000 },
];


export const MOCK_LOAN_PROGRESS: LoanProgress[] = [
  {
    id: "ln_001",
    memberName: "Fatima Bello",
    memberNo: "HMN-0012",
    loanAmount: 300000,
    amountRepaid: 216000,
    percentComplete: 72,
    status: "on_track",
    dueDate: "2026-08-01",
  },
  {
    id: "ln_002",
    memberName: "Chidi Nwosu",
    memberNo: "HMN-0008",
    loanAmount: 150000,
    amountRepaid: 67500,
    percentComplete: 45,
    status: "on_track",
    dueDate: "2026-09-01",
  },
  {
    id: "ln_003",
    memberName: "Tunde Bakare",
    memberNo: "HMN-0019",
    loanAmount: 200000,
    amountRepaid: 40000,
    percentComplete: 20,
    status: "overdue",
    dueDate: "2026-05-01",
  },
  {
    id: "ln_004",
    memberName: "Ngozi Adeyemi",
    memberNo: "HMN-0041",
    loanAmount: 500000,
    amountRepaid: 300000,
    percentComplete: 60,
    status: "on_track",
    dueDate: "2026-10-01",
  },
  {
    id: "ln_005",
    memberName: "Emeka Eze",
    memberNo: "HMN-0005",
    loanAmount: 250000,
    amountRepaid: 220000,
    percentComplete: 88,
    status: "on_track",
    dueDate: "2026-06-01",
  },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "act_001",
    type: "contribution",
    message: "made a monthly contribution",
    memberName: "Chidi Nwosu",
    amount: 30000,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: "act_002",
    type: "loan_approved",
    message: "loan application was approved",
    memberName: "Fatima Bello",
    amount: 300000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(), // yesterday
  },
  {
    id: "act_003",
    type: "overdue",
    message: "loan repayment is overdue",
    memberName: "Tunde Bakare",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "act_004",
    type: "member_joined",
    message: "joined the cooperative",
    memberName: "Ngozi Adeyemi",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    id: "act_005",
    type: "loan_repayment",
    message: "made a loan repayment",
    memberName: "Emeka Eze",
    amount: 20833,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
  },
  {
    id: "act_006",
    type: "withdrawal",
    message: "withdrawal request was approved",
    memberName: "Bisi Adebayo",
    amount: 100000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
  },
];






