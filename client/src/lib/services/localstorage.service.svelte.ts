interface IUser {
	id: number;
	pseudo: string;
	role: string;
}

export const authStore: { user: IUser | null; token: string | null } = $state({
	user: null,
	token: null
});

export const setAuth = (user: IUser, token: string) => {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));
	authStore.user = user;
	authStore.token = token;
};

export const clearAuth = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	authStore.user = null;
	authStore.token = null;
};

export const getAuth = () => {
	const token = localStorage.getItem('token');
	const user = JSON.parse(localStorage.getItem('user'));
	authStore.user = user ?? null;
	authStore.token = token ?? null;
};

export const isAuthenticated = () => {
	return authStore.token;
};
