import { useFormik } from "formik";
import { registerSchema } from "../validations/registerSchema";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/register.api";
import toast from "react-hot-toast";

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
            onSubmit: async({ email, username, password, role }, { setFieldError, setStatus }) => {
                try {
                    await registerApi({ email, username, password, role });

                    toast.success("Account created successfully 🎉")

                    navigate("/login", { replace: true });
                } catch (err: any) {
                    const message = err?.response?.data?.message;

                    if (message?.toLowerCase().includes("email")) {
                        setFieldError("email", message);
                    } else {
                        setStatus(message || "Registration Failed");
                        toast.error(message || "Registration Failed");
                    }
                }
            },
        });

        return { formik }
}