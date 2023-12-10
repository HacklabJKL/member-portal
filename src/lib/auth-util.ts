import { redirect, type Cookies } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$env/static/private';

export function getJwtOrRedirect(cookies: Cookies) {
	const jwt = cookies.get(SESSION_COOKIE_NAME);
	if (!jwt) {
		throw redirect(302, '/login');
	}
	return jwt;
}
