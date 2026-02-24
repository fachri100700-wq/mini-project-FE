import { useFormForgotPassword } from "../../features/password/hooks/useFormForgotPassword";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const { formik } = useFormForgotPassword();

    return (
        <div className="mt-10 min-h-screen flex items-center justify-center">
            <div className="card-lg w-100 bg-base-100 rounded-2xl
                            shadow-2xl shadow-base-300
                            border border-zinc-300">
                <div className="card-body space-y-3">
                    <h2 className="card-title text-2xl justify-center">
                        Forgot Password
                    </h2>

                    <form
                        onSubmit={formik.handleSubmit}
                        className="space-y-3"
                    >
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            placeholder="Email"
                            className="input input-bordered w-full bg-zinc-200"
                        />

                        <p className="text-sm text-error min-h-[1.25rem]">
                            {(formik.touched.email || formik.submitCount > 0) &&
                                formik.errors.email}
                        </p>

                        <div className="card-actions justify-end mt-4">
                            <button
                                className="btn btn-primary w-full"
                                disabled={formik.isSubmitting}
                            >
                                Send reset link
                            </button>
                        </div>
                    </form>

                    <Link
                        to="/login"
                        className="text-sm text-blue-600 hover:underline text-center"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}