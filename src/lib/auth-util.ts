import { redirect, type Cookies } from '@sveltejs/kit';

export function getJwtOrRedirect(cookies: Cookies) {
	const jwt = cookies.get('jwt');
	if (!jwt) {
		throw redirect(302, '/login');
	}
	return jwt;
}
