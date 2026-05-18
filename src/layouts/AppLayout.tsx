// src/layouts/AppLayout.tsx
//
// AppLayout is the shell that wraps every protected page.
// Structure:
//   <AppLayout>
//     ├── <Sidebar />          (left, desktop only)
//     ├── <main>
//     │     ├── <Topbar />     (top of every page)
//     │     └── {children}     (the actual page content)
//     └── <BottomNav />        (mobile only, fixed at bottom)
//
// Every page inside the app just renders its own content —
// it doesn't need to think about the sidebar or topbar at all.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { NAV_ITEMS } from "@/config/navigation";

// AppLayout accepts "children" — whatever page is currently active.
// This is the standard React composition pattern.
interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Controls the mobile drawer menu (slides in from the left on mobile)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleItems = user
    ? NAV_ITEMS.filter((item) => item.roles.includes(user.role))
    : [];

  return (
    <div className="flex h-screen bg-[#F9F9F9] overflow-hidden">
      {/* ── Desktop sidebar ── */}
      <Sidebar />

      {/* ── Mobile drawer overlay ── */}
      {/* Sits on top of everything when the mobile menu is open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark backdrop — click it to close the menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Drawer panel — slides in from the left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#1A1A1A] z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between h-16 px-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CC0000] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">H</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      HMN Cooperative
                    </p>
                    <p className="text-white/40 text-xs">Society Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer nav items */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                        ${
                          isActive
                            ? "bg-[#CC0000] text-white"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Drawer user section */}
              {user && (
                <div className="border-t border-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      fullName={user.fullName}
                      photoUrl={user.photoUrl}
                      size="md"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user.fullName}
                      </p>
                      <p className="text-white/35 text-xs capitalize">
                        {user.role} · {user.memberNo}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar is always at the top */}
        <Topbar onMobileMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Page content — scrollable, padded bottom on mobile for BottomNav */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom navigation ── */}
      <BottomNav />
    </div>
  );
}
