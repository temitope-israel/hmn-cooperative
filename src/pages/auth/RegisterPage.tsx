// src/pages/auth/RegisterPage.tsx
// Registration page — collects all details needed to create a pending
// cooperative member account. Submitted accounts await admin approval
// before the member can log in.

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Hash,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Landmark,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { RegistrationFormData } from "@/types/auth.types";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEPARTMENTS: string[] = [
  "Engineering",
  "Finance",
  "Human Resources",
  "Information Technology",
  "Legal",
  "Logistics",
  "Management",
  "Operations",
  "Procurement",
  "Production",
  "Warehouse",
  "Sales",
];

const NIGERIAN_BANKS: string[] = [
  "Access Bank",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Guaranty Trust Bank (GTB)",
  "Keystone Bank",
  "Kuda Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Sterling Bank",
  "Union Bank",
  "United Bank for Africa (UBA)",
  "Wema Bank",
  "Zenith Bank",
];

// ─── Reusable Field Component ─────────────────────────────────────────────────
// Defined outside RegisterPage so React doesn't recreate it on every render,
// which would cause inputs to lose focus on each keystroke.

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ElementType; // lucide icons are React components
}) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {/* Icon sits inside the input on the left side */}
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors">
            <Icon size={15} />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full border border-gray-200 py-2.5 rounded-lg text-sm
            text-gray-900 placeholder-gray-400 bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20
            focus:border-[#CC0000] focus:bg-white
            transition-all duration-200
            ${Icon ? "pl-9 pr-3.5" : "px-3.5"}
          `}
        />
      </div>
    </div>
  );
}

// ─── Password Field with show/hide toggle ─────────────────────────────────────
// Separate component because it manages its own "show password" state,
// and has a different right-side element (the eye icon toggle).

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  // Controls whether the password text is visible or masked
  const [show, setShow] = useState(false);

  return (
    <div className="group">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors">
          <Lock size={15} />
        </div>
        <input
          id={name}
          name={name}
          // Toggle between "password" (masked) and "text" (visible)
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-gray-200 py-2.5 pl-9 pr-10 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200"
        />
        {/* Toggle button — sits inside the input on the right */}
        <button
          type="button" // type="button" prevents it from submitting the form
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
// Each form section (Personal, Employment, Bank, Security) gets a consistent
// styled header with an icon and title.

function SectionHeader({
  icon: Icon,
  title,
  step,
}: {
  icon: React.ElementType;
  title: string;
  step: number;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {/* Step number badge in Honda red */}
      <div className="w-7 h-7 rounded-full bg-[#CC0000] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">{step}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-[#CC0000]" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {title}
        </h2>
      </div>
      {/* Horizontal rule that fills remaining space */}
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function RegisterPage() {
  const navigate = useNavigate();
  const errorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    staffId: "",
    email: "",
    phone: "",
    department: "",
    employmentType: "regular",
    bankName: "",
    accountNo: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Tracks which sections have all their required fields filled.
  // We use this to show green checkmarks on completed sections.
  const sectionStatus = {
    personal:
      !!formData.fullName &&
      !!formData.staffId &&
      !!formData.email &&
      !!formData.phone,
    employment: !!formData.department && !!formData.employmentType,
    bank: !!formData.bankName && formData.accountNo.length === 10,
    security:
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword,
  };

  // How many of the 4 sections are complete — drives the progress bar
  const completedSections = Object.values(sectionStatus).filter(Boolean).length;
  const progressPercent = (completedSections / 4) * 100;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm(): string {
    if (!formData.fullName.trim()) return "Full name is required.";
    if (!formData.staffId.trim()) return "Staff ID is required.";
    if (!formData.department) return "Please select a department.";
    if (!formData.bankName) return "Please select your bank.";
    if (formData.accountNo.length !== 10)
      return "Account number must be exactly 10 digits.";
    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setTimeout(() => {
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
      return;
    }

    setIsLoading(true);
    try {
      // TODO Week 2: replace with POST /api/auth/register
      console.log("Registration data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/pending-approval");
    } catch {
      setError("Registration failed. Please try again.");
      setTimeout(() => {
        errorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/20 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* ── Header ── */}
        <div className="text-center mb-8">
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Join HMN Cooperative Society
          </h1>
          <p className="text-sm text-gray-500 mt-1.5 max-w-sm mx-auto">
            Fill in your details below. Your account will be reviewed by an
            admin before activation.
          </p>
        </div>

        {/* ── Progress bar ── */}
        {/* Shows how many of the 4 sections are fully filled in */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-400">Form completion</span>
            <span className="text-xs font-medium text-[#CC0000]">
              {completedSections} of 4 sections complete
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#CC0000] rounded-full"
              // animate the width change smoothly as sections are completed
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* ── Main card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100 overflow-hidden">
          {/* Card top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#CC0000] via-[#A30000] to-[#CC0000]" />

          <div className="p-8">
            {/* ── Error banner ── */}
            {/* AnimatePresence lets the error animate in AND out smoothly */}
            <AnimatePresence>
              {error && (
                <motion.div
                  ref={errorRef}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── Section 1: Personal Information ── */}
              <div>
                <SectionHeader
                  icon={User}
                  title="Personal Information"
                  step={1}
                />
                {/* Section completion checkmark */}
                {sectionStatus.personal && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 mb-4 -mt-2"
                  >
                    <CheckCircle2 size={13} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Section complete
                    </span>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full Name"
                    name="fullName"
                    placeholder="Temitope Omoniyi"
                    value={formData.fullName}
                    onChange={handleChange}
                    icon={User}
                  />
                  <Field
                    label="Staff ID"
                    name="staffId"
                    placeholder="HMN-EMP-0042"
                    value={formData.staffId}
                    onChange={handleChange}
                    icon={Hash}
                  />
                  <Field
                    label="Work Email"
                    name="email"
                    type="email"
                    placeholder="you@hondanigeria.com"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                  />
                  <Field
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={Phone}
                  />
                </div>
              </div>

              {/* ── Section 2: Employment Details ── */}
              <div>
                <SectionHeader
                  icon={Briefcase}
                  title="Employment Details"
                  step={2}
                />
                {sectionStatus.employment && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 mb-4 -mt-2"
                  >
                    <CheckCircle2 size={13} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Section complete
                    </span>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department */}
                  <div className="group">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Department
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors pointer-events-none">
                        <Building2 size={15} />
                      </div>
                      <select
                        name="department"
                        id="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <ChevronRight
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="group">
                    <label
                      htmlFor="employmentType"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Employment Type
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors pointer-events-none">
                        <Briefcase size={15} />
                      </div>
                      <select
                        name="employmentType"
                        id="employmentType"
                        required
                        value={formData.employmentType}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="regular">Full-time / Regular</option>
                        <option value="contract">Contract</option>
                      </select>
                      <ChevronRight
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
                      />
                    </div>
                    {/* Loan eligibility hint — updates live as they switch type */}
                    <motion.p
                      key={formData.employmentType} // key change triggers re-animation
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs mt-1.5 flex items-center gap-1"
                    >
                      <CheckCircle2
                        size={11}
                        className={
                          formData.employmentType === "regular"
                            ? "text-green-500"
                            : "text-amber-500"
                        }
                      />
                      <span className="text-gray-400">
                        {formData.employmentType === "regular"
                          ? "Eligible for loans up to 200% of savings"
                          : "Eligible for loans up to 150% of savings"}
                      </span>
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* ── Section 3: Bank Details ── */}
              <div>
                <SectionHeader icon={Landmark} title="Bank Details" step={3} />
                {sectionStatus.bank && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 mb-4 -mt-2"
                  >
                    <CheckCircle2 size={13} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Section complete
                    </span>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bank Name */}
                  <div className="group">
                    <label
                      htmlFor="bankName"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Bank Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors pointer-events-none">
                        <Landmark size={15} />
                      </div>
                      <select
                        name="bankName"
                        id="bankName"
                        required
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000]/20 focus:border-[#CC0000] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="">Select Bank</option>
                        {NIGERIAN_BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
                      />
                    </div>
                  </div>

                  <Field
                    label="Account Number"
                    name="accountNo"
                    placeholder="0123456789"
                    value={formData.accountNo}
                    onChange={handleChange}
                    icon={CreditCard}
                  />
                </div>
              </div>

              {/* ── Section 4: Security ── */}
              <div>
                <SectionHeader icon={Lock} title="Security" step={4} />
                {sectionStatus.security && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 mb-4 -mt-2"
                  >
                    <CheckCircle2 size={13} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      Section complete
                    </span>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PasswordField
                    label="Password"
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                {/* Live password match indicator */}
                {formData.confirmPassword.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center gap-1.5 text-xs"
                  >
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} className="text-red-400" />
                        <span className="text-red-500">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </motion.p>
                )}
              </div>

              {/* ── Submit button ── */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#CC0000] hover:bg-[#A30000] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200 active:scale-[0.99]"
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
                    Submitting your application...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#CC0000] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Your information is kept secure and only used for cooperative
          management purposes.
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
