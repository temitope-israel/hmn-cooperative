// src/context/auth.types.ts
// Holds the TypeScript interfaces and the AuthContext object.
// Lives in a .ts file (not .tsx) so the react-refresh rule
// never applies here — that rule only checks .tsx files.

import { createContext } from "react";
import type { Role } from "@/config/navigation";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  memberNo: string;
  photoUrl: string | null;
  employmentType: "regular" | "contract";
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isAuthenticated: boolean;
}

// createContext lives here in a plain .ts file.
// The react-refresh rule only flags .tsx files,
// so this is completely safe here.
export const AuthContext = createContext<AuthContextType | null>(null);
