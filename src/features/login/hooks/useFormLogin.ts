import { useFormik } from "formik";
import { loginSchema } from "../validations/loginSchema";
import { loginApi } from "../api/login.api";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function useFormlogin() {
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async({ email, password }) => {
            const user = await loginApi({email, password});

            setAuth({username: user?.username, role: user?.role});

            navigate("/", { replace: true });
        },
    });

    return { formik };
}