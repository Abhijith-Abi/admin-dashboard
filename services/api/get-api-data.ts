export class ApiError extends Error {
    constructor(public status: number, public message: string, public data?: unknown) {
        super(message);
        this.name = 'ApiError';
    }
}

export default async function getApiData<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headersData: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(endpoint, {
        ...options,
        headers: {
            ...headersData,
            ...options.headers,
        },
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { message: response.statusText };
        }
        throw new ApiError(response.status, errorData.message || 'An error occurred while fetching data', errorData);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
}
