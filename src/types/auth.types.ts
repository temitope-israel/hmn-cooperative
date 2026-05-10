export type EmploymentType = "regular" | "contract";

// What the login form collects
export interface LoginFormData {
  email: string;
  password: string;
}

// What the registration form collects
export interface RegistrationFormData {
  fullName: string;
  staffId: string;
  email: string;
  phone: string;
  department: string;
  employmentType: EmploymentType;
  bankName: string;
  accountNo: string;
  password: string;
  confirmPassword: string;
}

// What comes back from the server after a successful login
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: "admin" | "treasurer" | "member";
    fullName: string;
  };
}
