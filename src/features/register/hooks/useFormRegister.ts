import { useFormik } from "formik";
import { registerSchema } from "../validations/registerSchema";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/register.api";
import toast from "react-hot-toast";
import type { RegisterDTO } from "../register.dto";

export function useFormRegister(){
    const navigate = useNavigate();

    const formik = useFormik<RegisterDTO>({
            initialValues: {
                role: '' as RegisterDTO["role"],
                username: '',
                email: '',
                password: '',
                referralCode: undefined,
            },
            validationSchema: registerSchema,
            onSubmit: async({ email, username, password, role, referralCode }, { setFieldError, setStatus }) => {
                try {
                    const payload: RegisterDTO = { email, username, password, role, };

                    if (referralCode?.trim()) {
                        payload.referralCode = referralCode.trim();
                    }

                    await registerApi(payload);

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