import * as Yup from "yup";

export const registerSchema = Yup.object({
  role: Yup.string()
    .oneOf(["customer", "organizer"], "Invalid role")
    .required("Please select a role"),

  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  referralCode: Yup.string()
    .max(20, "Referral code is too long")
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});
