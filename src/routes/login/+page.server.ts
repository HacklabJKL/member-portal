import { SESSION_COOKIE_NAME } from '$env/static/private';
import { logIn } from '$lib/lore-client';
import { error, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			throw error(400, 'Please provide a username and password');
		}
		if (typeof username !== 'string' || typeof password !== 'string') {
			throw error(400, 'Invalid username or password');
		}

		const response = await logIn(username, password);
		if (!response) {
			throw error(401, 'Invalid username or password');
		}
		cookies.set(SESSION_COOKIE_NAME, response.jwt, { path: '/' });
		throw redirect(302, 'profile');
	}
};
