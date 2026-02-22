import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getProfileApi } from "../../api/profile.api";
import { updateProfileApi } from "../api/updateProfile.api";
import type { Profile } from "../../type";
import { editProfileSchema } from "../validations/editProfileSchema";
import { updateAvatarApi } from "../api/profileAvatar.api";

type UseEditProfileState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; profile: Profile };

export function useEditProfile() {
  const navigate = useNavigate();
  const [state, setState] = useState<UseEditProfileState>({
    status: "loading",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfileApi();
        if (!data) {
          setState({ status: "error" });
          return;
        }
        setState({ status: "ready", profile: data });
      } catch {
        toast.error(err?.message || "Failed to load profile");
        setState({ status: "error" });
      }
    }
    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: state.status === "ready" ? state.profile.username : "",
      avatarUrl: state.status === "ready" ? state.profile.avatarUrl ?? "" : "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const payload: Partial<{ username: string; avatarUrl: string | null }> = {};

        if (values.username !== state.profile.username) {
          payload.username = values.username;
        }

        if (values.avatarUrl !== (state.profile.avatarUrl ?? "")) {
          payload.avatarUrl = values.avatarUrl || null;
        }

        if (Object.keys(payload).length === 0) {
          toast("No changes to save");
          return;
        }

        await updateProfileApi(payload);

        toast.success("Profile updated successfully ✨");
        navigate("/profile");
      } catch (err: any) {
        const message = err?.response?.data?.message;


        if (err?.response?.data?.errors) {

          Object.entries(err.response.data.errors).forEach(([field, msg]) => {
            setFieldError(field, msg as string);
          });
        } else if (message) {

          toast.error(message);
        } else {
          toast.error("Failed to update profile");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarUpload = async (file: File) => {
    if (state.status !== "ready") return;

    try {
      const data = await updateAvatarApi(file);
      formik.setFieldValue("avatarUrl", data.avatarUrl);
      toast.success("Avatar uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Avatar upload failed");
    }
  };

  return {
    state,
    formik,
    handleAvatarUpload,
  };
}