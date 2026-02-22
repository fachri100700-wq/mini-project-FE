import * as Yup from "yup";

export const editProfileSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .required("Username is required"),
  avatarUrl: Yup.string()
    .url("Avatar must be a valid URL")
    .nullable(), // allows empty string or null
});