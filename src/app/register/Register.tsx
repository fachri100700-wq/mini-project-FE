import RoleCard from "../../components/register/RegisterRoleCard";
import { FaUser, FaCalendarCheck } from "react-icons/fa";
import { useFormRegister } from "../../features/register/hooks/useFormRegister";

export default function Register() {
    const { formik } = useFormRegister();

    return (
        <div className="mt-10 min-h-screen flex items-center justify-center">
            <div className="card-lg w-100 bg-base-100 rounded-2xl
                            shadow-2xl shadow-base-300
                            border border-zinc-300">
                    <div className="card-body space-y-3">
                        <h2 className="card-title text-2xl justify-center">Register</h2>
                        <p className="text-sm text-zinc-500 text-center">
                            Select your role to get started
                        </p>
                        

                        {/* ROLE SELECTION */}
                        <div className="grid grid-cols-2 gap-4">
                            <RoleCard
                            icon={FaUser}
                            title="Customer"
                            description="Browse events and book tickets"
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

                            <label className="text-sm font-medium">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="e.g. John Doe"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="input input-bordered w-full bg-zinc-200" 
                            />
                            
                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.username || formik.submitCount > 0) && formik.errors.username}
                            </p>


                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={formik?.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="e.g. John@email.com"
                                className="input input-bordered w-full bg-zinc-200" 
                            />

                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.email || formik.submitCount > 0) && formik.errors.email}
                            </p>


                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={formik?.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Enter a secure password"
                                className="input input-bordered w-full bg-zinc-200" 
                            />

                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.password || formik.submitCount > 0) && formik.errors.password}
                            </p>

                            <label className="text-sm font-medium">
                                Referral Code <span className="text-zinc-400">(optional)</span>
                            </label>

                            <input
                            type="text"
                            name="referralCode"
                            placeholder="Enter referral code (if any)"
                            value={formik.values.referralCode || ""}
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setStatus(undefined);
                            }}
                            onBlur={formik.handleBlur}
                            className="input input-bordered w-full bg-zinc-200"
                            />

                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.referralCode || formik.submitCount > 0) &&
                                    formik.errors.referralCode}
                            </p>

                            <div className="card-actions justify-end mt-4">
                                <button disabled={!formik.values.role || formik.isSubmitting} className="btn btn-primary w-full">
                                    {formik.isSubmitting ? "Creating account..." : "Create Account"}
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    );
}