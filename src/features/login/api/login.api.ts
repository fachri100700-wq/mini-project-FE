import type { User } from "../types";
import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";

export async function loginApi({ email, password }: Pick<User, "email" | "password">) {
    try {const response = await axiosInstance.post<ApiResponse<any>>('/auth/login', {
            email,
            password
        });

        return response?.data?.data
    } catch (error) {
        console.log(error);
    }
}