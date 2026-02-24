import { useFormResetPassword } from "../../features/password/hooks/useFormResetPassword";

export default function ResetPassword() {
    const { formik, isTokenMissing } = useFormResetPassword();

    if (isTokenMissing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-error text-lg">
                    Invalid or missing reset token
                </p>
            </div>
        );
    }

    return (
        <div className="mt-10 min-h-screen flex items-center justify-center">
            <div className="card-lg w-100 bg-base-100 rounded-2xl
                            shadow-2xl shadow-base-300
                            border border-zinc-300">
                <div className="card-body space-y-3">
                    <h2 className="card-title text-2xl justify-center">
                        Reset Password
                    </h2>

                    <form
                        onSubmit={formik.handleSubmit}
                        className="space-y-3"
                    >
                        <input
                            type="password"
                            name="password"
                            placeholder="New password"
                            className="input input-bordered w-full bg-zinc-200"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />

                        <p className="text-sm text-error min-h-[1.25rem]">
                            {(formik.touched.password || formik.submitCount > 0) &&
                                formik.errors.password}
                        </p>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            className="input input-bordered w-full bg-zinc-200"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />

                        <p className="text-sm text-error min-h-[1.25rem]">
                            {(formik.touched.confirmPassword || formik.submitCount > 0) &&
                                formik.errors.confirmPassword}
                        </p>

                        <button className="btn btn-primary w-full mt-4">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}