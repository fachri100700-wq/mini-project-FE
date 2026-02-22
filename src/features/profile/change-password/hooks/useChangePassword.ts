import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { changePasswordApi } from "../api/changePassword.api";
import { changePasswordSchema } from "../validations/changePasswordSchema";

export function useChangePassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await changePasswordApi({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        toast.success("Password changed successfully 🔐");
        
        resetForm();
        navigate("/profile");
      } catch (err: any) {
        const message = err?.response?.data?.message;
        toast.error(message || "Failed to change password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik };
}