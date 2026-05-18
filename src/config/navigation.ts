// src/config/navigation.ts
//
// This file defines every navigation item in the sidebar.
// The sidebar component simply loops over this array and renders each item —
// it doesn't need to know what pages exist.
//
// Benefits of this pattern:
// → Adding a new page = add one object here, nothing else changes
// → Role-based visibility is handled here, not scattered in JSX
// → TypeScript ensures every nav item has the exact right shape

import {
  LayoutDashboard,
  Users,
  PiggyBank,
  Wallet,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ArrowDownToLine,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

// The shape of a single navigation item.
// Every item in our nav array must match this interface exactly.
export interface NavItem {
  label: string; // Text shown next to the icon
  path: string; // URL path - must match a route in App.tsx
  icon: LucideIcon; // Lucide icon component
  badge?: number; // Optional red badge count (e.g. 3 pending loans)
  roles: Role[]; // Which role can see this item
  section?: string; // Optional section header above this item
}

// The three roles in our system.
// Using a TypeScript union type means you can ONLY assign one of these three exact strings - a typo like "Admin" would be a compile error.
export type Role = "admin" | "treasurer" | "member";

// The full navigation configuration.
// Items are ordered exactly as they appear in the sidebar.
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "treasurer", "member"], // everyone sees dashboard
  },
  {
    label: "Members",
    path: "/members",
    icon: Users,
    section: "Management", // this items starts a new section with a header
    roles: ["admin", "treasurer"], // members cannot manage other members
  },
  {
    label: "Savings",
    path: "/savings",
    icon: PiggyBank,
    roles: ["admin", "treasurer", "member"],
  },
  {
    label: "Withdrawals",
    path: "/withdrawals",
    icon: ArrowDownToLine,
    roles: ["admin", "treasurer", "member"],
  },
  {
    label: "Loans",
    path: "/loans",
    icon: Wallet,
    roles: ["admin", "treasurer", "member"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    section: "Insights",
    roles: ["admin", "treasurer"],
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    section: "General",
    roles: ["admin", "treasurer", "member"],
  },
  {
    label: "Approvals",
    path: "/approvals",
    icon: ShieldCheck,
    roles: ["admin", "treasurer"], // only admin and treasurer approve things
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin"], // only admin can change system settings
  },
];
