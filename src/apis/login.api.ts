import type { LoginRequestType } from "../payload/request/auth.request";
import type { ApiResponseType } from "../types/utils.type";
import type { IUser } from "../payload/response/auth.request";
import http from "../utils/http";

export const authApi = {
    async login(data: LoginRequestType): Promise<ApiResponseType<IUser>> {
        const response = await http.post("api/account/login", data);
        return response.data;
    },

    async getProfile(userId: string): Promise<IUser> {
        const response = await http.get(`/api/account/profile/${userId}`);
        return response.data;
    }
}