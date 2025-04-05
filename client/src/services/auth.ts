import {
    AccountEditData,
    AccountEditResponse,
    ForgotPasswordData,
    LoginData,
    RegisterData,
    ResetPasswordData,
    User,
} from "../types/auth.ts";
import {apiRequest} from "../api/apiRequest.ts";

export const authService = {
    async login(loginData: LoginData): Promise<void> {
        await apiRequest("POST", "/login", loginData);
    },

    async register(registerData: RegisterData): Promise<void> {
        await apiRequest("POST", "/register", registerData);
    },

    async getAuthUser(): Promise<User> {
        return apiRequest<User>("GET", "/api/user");
    },

    async editAccount(accountEditData: AccountEditData): Promise<AccountEditResponse> {
        return apiRequest<AccountEditResponse>("PUT", "/api/account", accountEditData);
    },

    async forgotPassword(forgotPasswordData: ForgotPasswordData): Promise<string> {
        const response = await apiRequest<{ status: string }>("POST", "/auth/forgot-password", forgotPasswordData);
        return response.status;
    },

    async resetPassword(resetPasswordData: ResetPasswordData): Promise<string> {
        const response = await apiRequest<{ status: string }>("POST", "/auth/reset-password", resetPasswordData);
        return response.status;
    },

    async logout(): Promise<void> {
        await apiRequest("POST", "/logout");
    },
};
