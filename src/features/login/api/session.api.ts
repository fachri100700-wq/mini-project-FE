import axiosInstance from "../../../app/utils/axiosInstance";
import type { ApiResponse } from "../../../types/api";
export async function sessionApi(){
    try {
        const response = await axiosInstance.get<ApiResponse<any>>('auth/session');

        return response?.data?.data
        
    } catch (error) {
        console.log(error);
    }
}