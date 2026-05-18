// src/App.tsx
// Routes are now split into two groups:
//   Public routes  — no layout (login, register, pending approval)
//   Protected routes — wrapped in AppLayout (dashboard and all app pages)

import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import PendingApprovalPage from "@/pages/auth/PendingApprovalPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

function App() {
  return (
    <Routes>
      {/* ── Public routes — no sidebar or topbar ── */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/pending-approval" element={<PendingApprovalPage />} />

      {/* ── Protected routes — all wrapped in AppLayout ── */}
      {/* Every route inside this group automatically gets the
          sidebar, topbar, and bottom nav — no repetition needed */}
      <Route
        element={
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        }
        path="/dashboard"
      />

      {/* Placeholder routes — we'll build these pages week by week */}
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Members — coming Week 3</div>
          </AppLayout>
        }
        path="/members"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Savings — coming Week 4</div>
          </AppLayout>
        }
        path="/savings"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Withdrawals — coming Week 4</div>
          </AppLayout>
        }
        path="/withdrawals"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Loans — coming Week 5</div>
          </AppLayout>
        }
        path="/loans"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Reports — coming Week 6</div>
          </AppLayout>
        }
        path="/reports"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">
              Notifications — coming Week 7
            </div>
          </AppLayout>
        }
        path="/notifications"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Approvals — coming Week 3</div>
          </AppLayout>
        }
        path="/approvals"
      />
      <Route
        element={
          <AppLayout>
            <div className="text-gray-500 p-8">Settings — coming Week 7</div>
          </AppLayout>
        }
        path="/settings"
      />
    </Routes>
  );
}

export default App;
