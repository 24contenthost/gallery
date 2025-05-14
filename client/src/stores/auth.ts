import {defineStore} from "pinia";

import {AccountEditData, ForgotPasswordData, LoginData, RegisterData, ResetPasswordData, User} from "../types/auth.ts";
import {authService} from "../services/auth.ts";
import {ref} from "vue";
import router from "../router";


export const useAuthStore = defineStore("auth", () => {

    const user = ref<User | null>(null);

    const setUser = (userData: User | null) => {
        user.value = userData;
    };


    const login = async (loginData: LoginData) => {
        await authService.login(loginData)
        await getAuthUser()
    };

    const register = async (registerData: RegisterData) => {
        await authService.register(registerData)
        await getAuthUser()
    };


    const getAuthUser = async () => {
        try {
            const authUser = await authService.getAuthUser();
            setUser(authUser);
        } catch (error) {
            console.log('authError');
            setUser(null);
            await router.push({ name: "login" });
        }
    };

    const accountEdit = async (accountEditData: AccountEditData) => {
        const accountEditResponse = await authService.editAccount(accountEditData)
        setUser(accountEditResponse.user)
    }

    const forgotPassword = async (forgotPasswordData: ForgotPasswordData) => {
        return authService.forgotPassword(forgotPasswordData)
    }

    const resetPassword = async (resetPasswordData: ResetPasswordData) => {
        return authService.forgotPassword(resetPasswordData)
    }


    const logout = async () => {
        try {
            await authService.logout()
            console.debug("Successfully logged out.");
        } catch (error) {
            console.warn("Api logout failed:", error);
        } finally {
            setUser(null)
        }
    }


    return {
        user,
        login,
        register,
        setUser,
        getAuthUser,
        accountEdit,
        forgotPassword,
        resetPassword,
        logout,
    };
}, {
    persist: {
        storage: localStorage,
        pick: ['user'],
    },
});
