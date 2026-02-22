import { useFormik } from "formik";
import { resetPasswordSchema } from "../validations/resetPasswordSchema";
import { resetPasswordApi } from "../api/resetPassword.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useFormResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const isTokenMissing = !token;

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async ({ password }) => {
            try {
                if (!token) return;

                await resetPasswordApi({
                    token,
                    newPassword: password,
                });

                toast.success("Password reset successfully 🔐");

                navigate("/login", { replace: true });
            } catch (err: any) {
                const message = err?.response?.data?.message;
                toast.error(message || "Failed to reset password");
            }
        },
    });

    return { formik, isTokenMissing };
}