// src/pages/auth/LoginPage.tsx
// The login page is the very first screen any user sees.
// It collects email and password, validates them, and will
// send them to our Express API in Week 2.
// For now it simulates a network delay and navigates to dashboard.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { LoginFormData } from "@/types/auth.types";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Controls whether the password text is visible or masked
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // This function runs on every keystroke.
  // e.target.name tells us which field changed (email or password).
  // The spread ...prev keeps all other fields unchanged —
  // we only update the one field that changed.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as soon as the user starts correcting their input —
    // don't make them stare at the error while they're already fixing it.
    if (error) setError("");
  }

  // Runs when the form is submitted.
  // e.preventDefault() stops the browser's default full page reload.
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO Week 2: replace this with POST /api/auth/login
      console.log("Login attempt:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      // finally always runs — loading stops whether it succeeded or failed
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* ── Header ── */}
        <div className="text-center mb-8">
          {/* Honda logo badge — spring animation on load */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-[#CC0000] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200"
          >
            <span className="text-white text-3xl font-bold tracking-tight">
              H
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900">
              HMN Cooperative Society
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your account
            </p>
          </motion.div>
        </div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100 overflow-hidden"
        >
          {/* Top accent bar — matches the register page style */}
          <div className="h-1 bg-gradient-to-r from-[#CC0000] via-[#A30000] to-[#CC0000]" />

          <div className="p-8">
            {/* ── Error banner ── */}
            {/* AnimatePresence allows the error to animate OUT when cleared,
                not just disappear abruptly */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ── Email field ── */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Work Email
                </label>
                <div className="relative">
                  {/* Mail icon — turns Honda red when the field is focused */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors pointer-events-none">
                    <Mail size={15} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@hondanigeria.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* ── Password field ── */}
              <div className="group">
                {/* Label row — label on the left, forgot password on the right */}
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  {/* Forgot password — will link to reset flow in a later week */}
                  <span className="text-xs text-[#CC0000] cursor-pointer hover:underline font-medium">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors pointer-events-none">
                    <Lock size={15} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    // Toggle between masked and visible based on showPassword state
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200"
                  />
                  {/* Show/hide password toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* ── Submit button ── */}
              <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full py-3 px-4 bg-[#CC0000] hover:bg-[#A30000] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200 active:scale-[0.99] mt-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    {/* Arrow icon slides in from the left on hover using CSS group */}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">
                New to the cooperative?
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* ── Register link ── */}
            {/* Styled as a secondary button instead of plain text —
                makes the action more visible and clickable on mobile */}
            <Link
              to="/register"
              className="w-full py-2.5 px-4 border border-gray-200 hover:border-[#CC0000]/40 hover:bg-red-50/50 text-gray-600 hover:text-[#CC0000] text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              Request to join
            </Link>

            {/* Test Credentials - Dev Only */}
            <div className="border border-green-600 p-2 rounded-2xl flex flex-col gap-2 text-sm justify-center items-center mt-6 text-green-600">
              <h3 className="underline font-bold">
                Test Credentials - Dev Only
              </h3>
              <p>Test Email: test@hondanigeria.com</p>
              <p>Test Password: Test123</p>
            </div>
          </div>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-400 mt-4"
        >
          Honda Manufacturing Nigeria Limited © {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
