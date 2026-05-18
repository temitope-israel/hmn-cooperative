// src/components/layout/Sidebar.tsx
//
// The sidebar is the primary navigation for the entire app.
// It has three states:
//   1. Expanded (desktop) — full width with labels
//   2. Collapsed (desktop) — icon-only with tooltips
//   3. Hidden (mobile) — replaced by bottom nav bar
//
// It reads from the navigation config and filters items
// based on the current user's role.

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "@/config/navigation";
import { useAuth } from "@/context/useAuth";
import { Avatar } from "@/components/ui/Avatar";

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // Collapsed state — user can toggle the sidebar width
  // We persist this in localStorage so it survives page refreshes
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    // Read from localStorage on first render.
    // If nothing is stored yet, default to expanded (false).
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      // Save preference so it persists across refreshes
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  }

  // Filter nav items to only those the current user's role can see.
  // If no user is loaded yet, show nothing.
  const visibleItems = user
    ? NAV_ITEMS.filter((item) => item.roles.includes(user.role))
    : [];

  // Group items by their section header so we can render section labels.
  // Items without a section are grouped under a "" (empty) key.
  const grouped = visibleItems.reduce<Record<string, typeof visibleItems>>(
    (acc, item) => {
      const key = item.section ?? "";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {},
  );

  return (
    // The sidebar is hidden on mobile (hidden) and shown on md+ screens (md:flex)
    // We animate the width change between expanded and collapsed
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="hidden md:flex flex-col flex-shrink-0 bg-[#1A1A1A] border-r border-white/5 overflow-hidden relative"
    >
      {/* ── Logo area ── */}
      <div
        className={`flex items-center h-16 border-b border-white/5 flex-shrink-0 ${collapsed ? "justify-center px-0" : "px-5 gap-3"}`}
      >
        {/* Honda H badge */}
        <div className="w-8 h-8 rounded-lg bg-[#CC0000] flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/30">
          <span className="text-white text-sm font-bold">H</span>
        </div>

        {/* App name — animates out when collapsed */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-white text-sm font-semibold leading-tight">
                HMN Cooperative
              </p>
              <p className="text-white/40 text-xs">Society Portal</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section}>
            {/* Section header — only shown when sidebar is expanded */}
            {section && !collapsed && (
              <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 pt-4 pb-2">
                {section}
              </p>
            )}

            {/* Spacer line when collapsed — replaces section text */}
            {section && collapsed && (
              <div className="my-2 mx-2 h-px bg-white/10" />
            )}

            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  // title gives us a native browser tooltip when collapsed —
                  // simple and accessible without extra libraries
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm transition-all duration-150 group relative
                    ${
                      isActive
                        ? "bg-[#CC0000] text-white shadow-md shadow-red-900/30"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <Icon
                    size={18}
                    className={`flex-shrink-0 ${isActive ? "text-white" : "text-white/50 group-hover:text-white"}`}
                  />

                  {/* Label — animates out when collapsed */}
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 font-medium truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge — notification count */}
                  {item.badge && item.badge > 0 && (
                    <span
                      className={`
                      text-[10px] font-bold px-1.5 py-0.5 rounded-full
                      ${isActive ? "bg-white text-[#CC0000]" : "bg-[#CC0000] text-white"}
                      ${collapsed ? "absolute top-1 right-1 w-4 h-4 flex items-center justify-center p-0" : ""}
                    `}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User profile area ── */}
      <div className="border-t border-white/5 p-3">
        {user && (
          <div
            className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
          >
            <Avatar
              fullName={user.fullName}
              photoUrl={user.photoUrl}
              size="sm"
            />
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-white text-xs font-medium truncate">
                    {user.fullName}
                  </p>
                  <p className="text-white/35 text-[10px] truncate capitalize">
                    {user.role} · {user.memberNo}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Collapse toggle button ── */}
      {/* Sits on the right edge of the sidebar */}
      <button
        onClick={toggleCollapsed}
        className="absolute top-[68px] -right-3 w-6 h-6 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all z-10 shadow-md"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
