interface ApiClientOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    token?: string;
    body?: Record<string, any>;
    revalidate?: number;
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
    } = options;
    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    let nextOptions: { next?: { revalidate: number } } = {};;

    if (revalidate) {
        nextOptions = { next: { revalidate } };
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

        const text = await res.text();

        let data: T;
        try {
            data = text ? JSON.parse(text) : null;
        } catch (e) {
            data = text as T;
        }


        return { res, data };
    } catch (err) {
        console.error(`Erro ao fazer requisição para ${url}:`, err);
        throw err;
    }
};
