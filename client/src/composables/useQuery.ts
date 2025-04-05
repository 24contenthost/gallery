import {ref} from 'vue';
import {useAuthStore} from '../stores/auth';
import {useRouter} from 'vue-router';
import {ApiError, ForbiddenError, NotFoundError, UnauthorizedError} from '../api/apiRequest';

export const useQuery = <T>(
    fetchHandler: () => Promise<T>,
    options?: {
        onSuccess?: (result: T) => void;
        onError?: (error: unknown) => void;
    }
) => {
    const isLoading = ref(false);
    const data = ref<T | null>(null);
    const authStore = useAuthStore();
    const router = useRouter();

    const query = async () => {
        isLoading.value = true;
        try {
            const result = await fetchHandler();
            data.value = result;
            options?.onSuccess?.(result);
        } catch (err: unknown) {
            if (err instanceof UnauthorizedError) {
                authStore.setUser(null);
                await router.push('/login');
            } else if (err instanceof ForbiddenError || err instanceof NotFoundError || err instanceof ApiError) {
                options?.onError?.(err);
            }
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, data, query };
};
