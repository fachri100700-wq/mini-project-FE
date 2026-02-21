import { Link } from "react-router-dom";
import { useEditProfile } from "../../../features/profile/edit-profile/hooks/useEditProfile";

export default function EditProfile() {
  const { state, formik } = useEditProfile();

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-zinc-300">
        <div className="card-body space-y-4">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <div className="flex flex-col items-center space-y-2">
              <img
                src={formik.values.avatarUrl || "/avatar-placeholder.png"}
                alt="avatar"
                className="w-24 h-24 rounded-full border"
              />
              <input
                type="text"
                name="avatarUrl"
                placeholder="Avatar URL"
                className="input input-bordered w-full bg-zinc-200"
                value={formik.values.avatarUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="text-sm text-error min-h-[1.25rem]">
                {(formik.touched.avatarUrl || formik.submitCount > 0) && formik.errors.avatarUrl}
              </p>
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full bg-zinc-200"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-sm text-error min-h-[1.25rem]">
              {(formik.touched.username || formik.submitCount > 0) && formik.errors.username}
            </p>

            <div className="card-actions flex-col gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={formik.isSubmitting}
              >
                Save Changes
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