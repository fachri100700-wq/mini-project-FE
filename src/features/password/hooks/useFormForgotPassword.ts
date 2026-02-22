import { useFormik } from "formik";
import { forgotPasswordSchema } from "../validations/forgotPasswordSchema";
import { forgotPasswordApi } from "../api/forgotPassword.api";
import toast from "react-hot-toast";

export function useFormForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async ({ email }, { setSubmitting }) => {
            try {
                await forgotPasswordApi(email);

                toast.success(
                    "If an account with that email exists, a reset link has been sent."
                );
            } catch {
                toast.success(
                    "If an account with that email exists, a reset link has been sent."
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return { formik };
}