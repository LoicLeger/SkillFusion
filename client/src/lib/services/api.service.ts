/*
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function api(endpoint:string, method = "GET", body?:{}) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  let data=null
    if (response.statusText!="No Content"){
      data = await response.json();
    }
  return {data,status:response.status};
}
*/

import { setAuth } from './localstorage.service.svelte';

interface IUser {
	id: number;
	pseudo: string;
	role: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

export default async function api(endpoint: string, method = 'GET', body?: {}) {
	const response = await fetch(`${BASE_URL}/${endpoint}`, {
		method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: body ? JSON.stringify(body) : undefined
	});

	// Token expiré → refresh automatique
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
			window.location.href = '/connexion';
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
