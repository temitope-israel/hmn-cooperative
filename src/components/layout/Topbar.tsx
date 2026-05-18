// src/components/layout/Topbar.tsx
//
// The topbar sits at the top of every protected page.
// It shows:
//   Left  — current page title + breadcrumb
//   Right — notifications bell + user avatar + name

import { useLocation, Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/context/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import { NAV_ITEMS } from "@/config/navigation";

interface TopbarProps {
  // Callback to open the mobile menu drawer
  onMobileMenuOpen: () => void;
}

export function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Find the current page's label from our nav config
  // so we can display it as the page title
  const currentNav = NAV_ITEMS.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/"),
  );

  const pageTitle = currentNav?.label ?? "Dashboard";

  // Placeholder notification count — Week 7 will make this dynamic
  const notificationCount = 3;

  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
      {/* Mobile menu button — only visible on mobile */}
      <button
        onClick={onMobileMenuOpen}
        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* ── Page title — left side ── */}
      <div className="flex-1">
        <h1 className="text-base font-semibold text-gray-900">{pageTitle}</h1>
        {/* Breadcrumb — shows "Honda Manufacturing · PageName" */}
        <p className="text-xs text-gray-400 hidden sm:block">
          Honda Manufacturing Nigeria · {pageTitle}
        </p>
      </div>

      {/* ── Right side actions ── */}
      <div className="flex items-center gap-2">
        {/* Notifications bell */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label={`${notificationCount} notifications`}
        >
          <Bell size={19} />
          {/* Red badge with count */}
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#CC0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-100 mx-1" />

        {/* User info — avatar + name, links to profile */}
        {user && (
          <Link
            to="/profile"
            className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <Avatar
              fullName={user.fullName}
              photoUrl={user.photoUrl}
              size="sm"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-[#CC0000] transition-colors">
                {user.fullName}
              </p>
              <p className="text-[10px] text-gray-400 capitalize leading-tight">
                {user.role}
              </p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
