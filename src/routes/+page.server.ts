import type { PageServerLoad } from './$types';
import { STRAPI_URL } from '$env/static/private';
import { userSchema } from '$lib';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('jwt');

	if (jwt) {
		const url = new URL(STRAPI_URL);
		const endpoint = 'api/users/me';
		const route = new URL(endpoint, url);

		const response = await fetch(route.toString(), {
			headers: { Authorization: `Bearer ${jwt}` },
			method: 'GET'
		});

		const body = await response.json();

		const user = userSchema.parse(body);
		return {
			loggedIn: true,
			username: user.username
		};
	}

	return {
		loggedIn: false
	};
};
