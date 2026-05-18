// src/components/layout/BottomNav.tsx
//
// On mobile, the sidebar is replaced by a bottom navigation bar —
// the standard pattern for mobile apps (Instagram, Twitter, etc.)
// We show only the 5 most important nav items to avoid overcrowding.

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NAV_ITEMS } from "@/config/navigation";

export function BottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  // Filter to the current user's visible items
  const visibleItems = user
    ? NAV_ITEMS.filter((item) => item.roles.includes(user.role))
    : [];

  // Show max 5 items on mobile — pick the first 5 visible ones
  // This keeps the bottom bar uncluttered and finger-friendly
  const mobileItems = visibleItems.slice(0, 5);

  return (
    // Only visible on mobile (md and above hides it)
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl min-w-[44px] min-h-[44px] justify-center transition-colors"
              // min-w/h of 44px = Apple's minimum touch target size
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? "text-[#CC0000]" : "text-gray-400"}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#CC0000] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${isActive ? "text-[#CC0000]" : "text-gray-400"}`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
