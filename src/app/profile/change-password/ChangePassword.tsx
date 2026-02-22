import { Link } from "react-router-dom";
import { useChangePassword } from "../../../features/profile/change-password/hooks/useChangePassword";

export default function ChangePassword() {
  const { formik } = useChangePassword();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-zinc-300">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-2xl">Change Password</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="input input-bordered w-full bg-zinc-200"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-sm text-error min-h-[1.25rem]">
              {(formik.touched.currentPassword || formik.submitCount > 0) &&
                formik.errors.currentPassword}
            </p>

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="input input-bordered w-full bg-zinc-200"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-sm text-error min-h-[1.25rem]">
              {(formik.touched.newPassword || formik.submitCount > 0) &&
                formik.errors.newPassword}
            </p>

            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              className="input input-bordered w-full bg-zinc-200"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-sm text-error min-h-[1.25rem]">
              {(formik.touched.confirmNewPassword || formik.submitCount > 0) &&
                formik.errors.confirmNewPassword}
            </p>

            <div className="card-actions flex-col gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={formik.isSubmitting}
              >
                Change Password
              </button>
              <Link to="/profile" className="btn btn-outline w-full">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}