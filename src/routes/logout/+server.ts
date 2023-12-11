import { SESSION_COOKIE_NAME } from '$env/static/private';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete(SESSION_COOKIE_NAME);
	throw redirect(302, '/');
};
