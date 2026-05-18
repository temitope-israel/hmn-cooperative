// src/context/AuthContext.tsx
// This file exports ONE thing only — the AuthProvider component.
// Types and AuthContext object live in auth.types.ts
// The useAuth hook lives in useAuth.ts
// This satisfies react-refresh/only-export-components completely.

import { useState, ReactNode } from "react";
import { AuthContext } from "@/context/auth.types";
import type { AuthUser } from "@/context/auth.types";

// Mock user — we replace this with a real API call in Week 2
const MOCK_USER: AuthUser = {
  id: "usr_001",
  fullName: "Adebayo Okafor",
  email: "adebayo.okafor@hondanigeria.com",
  role: "admin",
  memberNo: "HMN-0001",
  photoUrl: null,
  employmentType: "regular",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(MOCK_USER);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
