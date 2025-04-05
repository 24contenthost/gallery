const BASE_URL = import.meta.env.VITE_BASE_URL || "__VITE_BASE_URL__";

const getCookie = (name: string): string | null => {
    const cookieString = document.cookie;
    if (!cookieString) return null;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
};

export const ApiError = class extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
};

export const NetworkError = class extends ApiError {
    constructor(message: string) {
        super(-1, message);
        this.name = "NetworkError";
    }
};


export const ForbiddenError = class extends ApiError {
    constructor(message: string = 'Forbidden') {
        super(403, message);
        this.name = "ForbiddenError";
    }
};

export const NotFoundError = class extends ApiError {
    constructor(message: string = 'Not Found') {
        super(404, message);
        this.name = "NotFoundError";
    }
};

export const UnauthorizedError = class extends ApiError {
    constructor() {
        super(401, 'Unauthorized');
        this.name = "UnauthorizedError";
    }
};

export const ApiValidationError = class extends ApiError {
    constructor(public errors: Record<string, string[]>) {
        super(422, 'Validation failed');
        this.name = "ApiValidationError";
    }
};

export const apiRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: unknown,
    config?: RequestInit
): Promise<T> => {
    const xsrfToken = getCookie('XSRF-TOKEN');

    const defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    };

    if (!(data instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
    }

    const headers: HeadersInit = {
        ...defaultHeaders,
        ...(config?.headers as Record<string, string> ?? {}),
    };

    if (xsrfToken) {
        headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
        ...config,
    };

    if (data instanceof FormData) {
        options.body = data;
    } else if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(BASE_URL + url, options);
        const text = await response.text();
        const responseData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new UnauthorizedError();
                case 403:
                    throw new ForbiddenError();
                case 404:
                    throw new NotFoundError();
                case 422:
                    throw new ApiValidationError(responseData.errors);
                default:
                    throw new ApiError(response.status, responseData.message || 'Unknown status');
            }
        }
        return responseData as T;
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new NetworkError('Network error');
    }
};
