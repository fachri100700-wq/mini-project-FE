import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";
import type { RegisterDTO } from "../register.dto";

export async function registerApi({ email, username, password, role, referralCode }: RegisterDTO) {
        const response = await axiosInstance.post<ApiResponse<any>>('/auth/register',{
            email,
            username,
            password,
            role,
            referralCode,
        });
       
        return response?.data?.data
}