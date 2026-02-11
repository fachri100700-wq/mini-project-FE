import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";
import type { User } from "../../login/types";

export async function registerApi({ email, username, password, role }: Pick<User, "email" | "username" | "password" | "role">) {
    try {const response = await axiosInstance.post<ApiResponse<any>>('/auth/register',{
            email,
            username,
            password,
            role
        });
       
        return response?.data?.data
    } catch (error) {
        console.log(error);
    }
}