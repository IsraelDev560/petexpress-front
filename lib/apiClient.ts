import { NEXT_PUBLIC_API_FRONT } from "./ApiUrl";

interface ApiClientOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    token?: string;
    body?: Record<string, any>;
    revalidate?: number;
    tags?: string[];
}

interface ApiResponse<T> {
    res: Response;
    data: T | string;
}

export const apiClient = async <T>(url: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> => {
    const {
        method = 'GET',
        token,
        body,
        revalidate = 0,
        tags = []
    } = options;
    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let nextOptions: { next?: { revalidate: number, tags: string[] } } = {};;

    if (revalidate) {
        nextOptions = { next: { revalidate, tags } };
    }

    const fetchOptions: RequestInit = {
        method,
        headers,
        ...nextOptions
    }

    if (body) {
        headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(body);
    }


    try {
        const res = await fetch(url, fetchOptions);

        if (res.status === 204) {
            return {
                res,
                data: { success: true, message: 'Sem conteúdo (204)' } as T,
            };
        }

        if (res.status === 401) {
            console.log("Unathorized user.")
            await fetch(`${NEXT_PUBLIC_API_FRONT}/api/auth/logout`, {
                method: 'POST'
            })
        }

        const text = await res.text();

        let data: T;
        try {
            data = text ? JSON.parse(text) : null;
        } catch (e) {
            data = text as T;
        }

        return { res, data };
    } catch (err: any) {
        console.error(`Request to ${url} failed:`, err);

        let message = 'Unexpected error.';

        if (err instanceof TypeError && err.message === 'Failed to fetch') {
            message = 'Server is unavailable. Please check your connection or try again later.';
        } else if (typeof err?.message === 'string') {
            message = err.message;
        }

        throw {
            message,
            original: err,
            type: 'NetworkError',
            url,
        };
    }
};
