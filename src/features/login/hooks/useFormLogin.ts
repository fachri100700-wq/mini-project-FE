import { useFormik } from "formik";
import { loginSchema } from "../validations/loginSchema";
import { loginApi } from "../api/login.api";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useFormlogin() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async({ email, password }, { setFieldError }) => {
            try {
                const user = await loginApi({email, password});

                setAuth({username: user?.username, role: user?.role});

                toast.success("Login successfull 🎉")

                navigate("/profile", { replace: true });
            } catch (err: any) {
                const message = err?.response?.data?.message;

                if (message?.toLowerCase().includes("email")) {
                    setFieldError("email", message);
                } else {
                    toast.error(message || "Login Failed");
                }
            }

        },
    });

    return { formik };
}