import RoleCard from "../../components/register/RegisterRoleCard";
import { FaUser, FaCalendarCheck } from "react-icons/fa";
import { useFormik } from "formik";
import { registerSchema } from "../../features/register/validations/registerSchema";

type Role = "customer" | "organizer";

export default function Register() {

    const formik = useFormik({
        initialValues: {
            role: '' as Role,
            username: '',
            email: '',
            password: ''
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card-lg w-100 bg-base-100 rounded-2xl
                            shadow-2xl shadow-base-300
                            border border-zinc-300">
                    <div className="card-body space-y-3">
                        <h2 className="card-title text-2xl justify-center">Register</h2>

                        {/* ROLE SELECTION */}
                        <div className="grid grid-cols-2 gap-4">
                            <RoleCard
                            icon={FaUser}
                            title="Customer"
                            description="Browse and use the platform"
                            selected={formik.values.role === "customer"}
                            onClick={() => formik.setFieldValue("role", "customer")}
                            />

                            <RoleCard
                            icon={FaCalendarCheck}
                            title="Event Organizer"
                            description="Create and manage events"
                            selected={formik.values.role === "organizer"}
                            onClick={() => formik.setFieldValue("role", "organizer")}
                            />
                        </div>

                        {/* ROLE ERROR */}
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-sm text-error text-center">
                            {formik.errors.role}
                            </p>
                        )}

                        {/* REGISTER FORM */}
                        <form
                            onSubmit={formik?.handleSubmit}
                            className="space-y-3"    
                        >
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="input input-bordered w-full bg-zinc-200" 
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-sm text-error">
                                    {formik.errors.username}
                                </p>
                            )}

                            <input
                                type="email"
                                name="email"
                                onChange={formik?.handleChange}
                                placeholder="Email"
                                className="input input-bordered w-full bg-zinc-200" 
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-error">
                                    {formik.errors.email}
                                </p>
                            )}

                            <input
                                type="password"
                                name="password"
                                onChange={formik?.handleChange}
                                placeholder="Password"
                                className="input input-bordered w-full bg-zinc-200" 
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-sm text-error">
                                    {formik.errors.password}
                                </p>
                            )}

                            <div className="card-actions justify-end mt-4">
                                <button disabled={!formik.values.role} className="btn btn-primary w-full">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    );
}