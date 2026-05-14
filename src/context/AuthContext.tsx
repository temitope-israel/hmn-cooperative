// src/context/AuthContext.tsx
//
// React Context is a way to share data across the entire component tree
// without passing props down manually through every level.
//
// Think of it like a global variable, but safe and reactive —
// any component that reads from this context automatically re-renders
// when the data changes.
//

import { createContext, useContext, useState, ReactNode } from "react";
import { Role } from "@/config/navigation";

// The shape of our authenticated user object.
// Every component that reads the auth context gets this exact shape.

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  memberNo: string;
  photoUrl: string | null; // null = show initials avatar instead.
  employmentType: "regular" | "contract";
}

// The shape of the context itself -
// the user object plus functions to upaate it.
interface AuthContextType {
  user: AuthUser | null; // null = not logged in
  setUser: (user: AuthUser | null) => void;
  isAuthenticated: boolean;
}

// createContext creates the context with a default value.
// The default is used only if a component tries to read the context
// without being wrapped in AuthProvider - we'll catch that below.
const AuthContext = createContext<AuthContextType | null>(null);

// Mock user first and will replace with real API call later.
// This lets us see the sidebar fully populated without a backend.
const MOCK_USER: AuthUser = {
  id: "usr_001",
  fullName: "Temitope Omoniyi",
  email: "temitope.omoniyi@hondanigeria.com",
  role: "admin",
  memberNo: "HMN-0001",
  photoUrl: null, // no photo - will show initials "TO"
  employmentType: "regular",
};

// AuthProvider wraps the entire app and makes auth data available everywhere.
// Any component inside <AuthProvider> can call useAuth() to get the user.
export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with the mock user so the sidebar is populated from day one.
  // Change late to useState<AuthUser | null>(null) and populate
  // it from the login API response.

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

// useAuth is a custom hook that reads from AuthContext.
// Using a custom hook instead of calling useContext directly mean:
// => We can add a helpful error message if used outside AuthProvider
// => We can add extra logic later without changing every consumer
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  // If context is null, the component is outside AuthProvider -
  // this is always a developer mistake, so we throw a clear error.
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
