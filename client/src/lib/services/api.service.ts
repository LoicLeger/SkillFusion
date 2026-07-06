import { authStore, getAuth, setAuth } from './localstorage.service.svelte';
import { goto } from '$app/navigation';

interface IUser {
    id: number;
    pseudo: string;
    role: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log(BASE_URL)


export default async function api(endpoint: string, method = 'GET', body?: object) {
    getAuth()
    const { user, token } = authStore
    let response
    if (user==null && token ==null){
        response = await apiWithoutToken(endpoint,method,body!)
    }else{
        response = await apiWithToken(endpoint,method,body!)
    }
    return { data:response.data, status: response.status }
}

async function apiWithoutToken(endpoint: string, method = 'GET', body: object) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
    });

    let data = null;
    if (response.status !== 204 && response.status !== 0) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    }

    return { data, status: response.status };
}

async function refreshAccessToken(): Promise<{
    user: IUser;
    accessToken: { token: string; expiresIn: number };
} | null> {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem('token', data.accessToken.token);
    return data;
}

async function apiWithToken(endpoint: string, method = 'GET', body: object) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (response.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken?.user) {
            setAuth(newToken.user, newToken?.accessToken.token);
        }

        if (newToken) {
            const retry = await fetch(`${BASE_URL}/${endpoint}`, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken.accessToken.token}`
                },
                body: body ? JSON.stringify(body) : undefined
            });

            let data = null;
            if (retry.status !== 204) {
                try {
                    data = await retry.json();
                } catch {
                    data = null;
                }
            }
            return { data, status: retry.status };
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            goto('/connexion');
            return { data: null, status: 401 };
        }
    }

    let data = null;
    if (response.status !== 204 && response.status !== 0) {
        try {
            data = await response.json();
        } catch {
            data = null;
        }
    }

    return { data, status: response.status };
}
