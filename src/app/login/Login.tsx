import { useFormlogin } from "../../features/login/hooks/useFormLogin";

export default function Login() {
    const { formik } = useFormlogin();
    
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="card-lg w-100 bg-base-100 rounded-2xl
                            shadow-2xl shadow-base-300
                            border border-zinc-300">
                <div className="card-body space-y-3">
                    <h2 className="card-title text-2xl justify-center">Log In</h2>

                    {/* LOGIN FORM */}
                    <form
                        onSubmit={formik?.handleSubmit}
                        className="space-y-3"    
                    >

                        <input
                            type="email"
                            name="email"
                            onChange={formik?.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            placeholder="Email"
                            className="input input-bordered w-full bg-zinc-200" 
                        />

                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.email || formik.submitCount > 0) && formik.errors.email}
                            </p>

                        <input
                            type="password"
                            name="password"
                            onChange={formik?.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                            className="input input-bordered w-full bg-zinc-200" 
                        />
                        
                            <p className="text-sm text-error min-h-[1.25rem]">
                                {(formik.touched.password || formik.submitCount > 0) && formik.errors.password}
                            </p>

                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary w-full">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}