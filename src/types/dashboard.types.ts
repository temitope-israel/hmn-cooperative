//src/types/dashboard.types.ts
//
// These types define the exact shape of all data the dashboard displays.
// Defining them here means:
// => the UI components know exactly what data to expect.
// => When we connect to the real API, we will immediately flag any mismatch between API response
// and what the UI expects - catching any bugs before they happen.

export interface DashboardStats {
  totalMembers: number;
  totalSavings: number;
  activeLoans: number;
  totalLoansDisbursed: number;
  interestEarned: number;
  pendingApprovals: number; // registration awaiting admin approval
  overdueLoans: number; // loans with missed repayments
}

export interface MonthlyContribution {
  month: string; // e.g. "Jan", "Feb".
  amount: number; // total contributions that month in naira
  target: number; // expected total (num members * monthly amount)
}

export interface LoanProgress {
  id: string;
  memberName: string;
  memberNo: string;
  loanAmount: number;
  amountRepaid: number;
  percentComplete: number; // 0-100
  status: "on_track" | "overdue" | "completed";
  dueDate: string;
}

export interface ActivityItem {
  id: string;
  type:
    | "contribution"
    | "loan_approved"
    | "loan_repayment"
    | "member_joined"
    | "overdue"
    | "withdrawal"
    | "loan_declined";
  message: string;
  memberName: string;
  amount?: number; // optional = not all events have an amount
  timestamp: string; // ISO string - will be formatted for display
}
