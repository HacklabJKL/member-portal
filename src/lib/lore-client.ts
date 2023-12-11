import { STRAPI_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import { logInResponseSchema, userSchema, type LoginResponse } from './schemas';

export const loreUrl = new URL(STRAPI_URL);

export async function getUser(id: string, jwt: string) {
	const endpoint = `api/users/${id}`;
	const route = new URL(endpoint, loreUrl);

	const response = await fetch(route.toString(), {
		headers: { Authorization: `Bearer ${jwt}` },
		method: 'GET'
	});

	if (response.status === 401) {
		throw redirect(302, '/login');
	}
	if (!response.ok) {
		throw error(404, 'User not found');
	}
	const body = await response.json();

	const user = userSchema.parse(body);
	return user;
}

export async function getMe(jwt: string) {
	const endpoint = 'api/users/me';
	const route = new URL(endpoint, loreUrl);

	const response = await fetch(route.toString(), {
		headers: { Authorization: `Bearer ${jwt}` },
		method: 'GET'
	});

	if (response.status === 401) {
		throw redirect(302, '/login');
	}
	if (!response.ok) {
		throw error(404, 'User not found');
	}

	const body = await response.json();

	const user = userSchema.parse(body);
	return user;
}

export async function logIn(username: string, password: string): Promise<LoginResponse | false> {
	const endpoint = 'api/auth/local';
	const route = new URL(endpoint, loreUrl);

	const response = await fetch(route.toString(), {
		body: JSON.stringify({ identifier: username, password }),
		headers: { 'Content-Type': 'application/json' },
		method: 'POST'
	});

	const body = await response.json();

	if (response.ok) {
		const parsed = logInResponseSchema.parse(body);
		return parsed;
	} else {
		return false;
	}
}
