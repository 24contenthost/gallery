import {ref} from 'vue';
import {useAuthStore} from '../stores/auth.ts';
import {useRouter} from 'vue-router';

import {ApiError, apiRequest, ApiValidationError, UnauthorizedError} from "../api/apiRequest.ts";

export type ValidationErrors = Record<string, string[]>;

export type SubmitHandler<T, R> = (values: T) => Promise<R>;

export interface FormRequestHooks<T, R> {
    onSuccess?: (result: R, inputData: T) => void;
    onFormError?: (errors: ValidationErrors) => void;
}


export const applyFormErrors = <T>(
    errors: Record<string, string[]>,
    setFieldError: (field: keyof T, message: string) => void
): void => {
    Object.entries(errors).forEach(([field, messages]) => {
        setFieldError(field as keyof T, messages[0]);
    });
};


export const useFormRequest = <T, R = void>(
    submitHandler: SubmitHandler<T, R>,
    hooks?: FormRequestHooks<T,R>
) => {
    const isLoading = ref(false);
    const authStore = useAuthStore();
    const router = useRouter();

    const submit = async (inputData: T) => {
        isLoading.value = true;
        try {
            await apiRequest('GET', '/sanctum/csrf-cookie');
            const result = await submitHandler(inputData);
            hooks?.onSuccess?.(result, inputData);
            return result;
        } catch (error: unknown) {
            if (error instanceof UnauthorizedError) {
                authStore.setUser(null);
                await router.push({ name: "login" });
            } else if (error instanceof ApiValidationError) {
                hooks?.onFormError?.(error.errors);
            } else if (error instanceof ApiError) {
                console.error(`API error: ${error.message}`);
            } else {
                console.error('Unexpected error:', error);
            }
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, submit };
};
