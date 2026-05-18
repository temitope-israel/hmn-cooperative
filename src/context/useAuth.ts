// src/context/useAuth.ts
// Exports only the useAuth hook.
// Imports AuthContext from auth.types.ts where it now lives.

import { useContext } from "react";
import { AuthContext } from "@/context/auth.types";
import type { AuthContextType } from "@/context/auth.types";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth() must be used inside <AuthProvider>");
  }

  return context;
}
