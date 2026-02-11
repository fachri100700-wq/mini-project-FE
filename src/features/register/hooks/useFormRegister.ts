import { useFormik } from "formik";
import { registerSchema } from "../validations/registerSchema";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/register.api";

type Role = "customer" | "organizer";
export function useFormRegister(){
    const navigate = useNavigate();

    const formik = useFormik({
            initialValues: {
                role: '' as Role,
                username: '',
                email: '',
                password: ''
            },
            validationSchema: registerSchema,
            onSubmit: async({ email, username, password, role }) => {
                await registerApi({ email, username, password, role });

                navigate("/login", { replace: true });
            },
        });

        return { formik }
}