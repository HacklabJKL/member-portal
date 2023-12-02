import type { PageServerLoad } from './$types';
import { HACKLAB_NAME, STRAPI_URL } from '$env/static/private';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { userSchema } from '$lib';

export const load: PageServerLoad = () => {
	return {
		hacklabName: HACKLAB_NAME
	};
};

const signupFormSchema = z
	.object({
		username: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
		passwordRepeat: z.string().min(8)
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: "Passwords don't match",
		path: ['passwordRepeat']
	});

const signupResponseSchema = z.object({
	jwt: z.string(),
	user: userSchema
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username');
		const email = formData.get('email');
		const password = formData.get('password');
		const passwordRepeat = formData.get('passwordRepeat');

		const parsedData = signupFormSchema.safeParse({ username, email, password, passwordRepeat });

		if (!parsedData.success) {
			const errors = {
				username: '',
				email: '',
				password: ''
			};

			parsedData.error.errors.forEach((error) => {
				if (error.path[0] === 'username') {
					errors.username = error.message;
				}
				if (error.path[0] === 'email') {
					errors.email = error.message;
				}
				if (error.path[0] === 'password') {
					errors.password = error.message;
				}
			});
			return fail(400, { error: true, errors });
		}

		const url = new URL(STRAPI_URL);

		const endpoint = 'api/auth/local/register';
		const route = new URL(endpoint, url);

		const response = await fetch(route.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: parsedData.data.username,
				email: parsedData.data.email,
				password: parsedData.data.password
			})
		});

		if (!response.ok) {
			const body = await response.json();
			return fail(400, { error: true, errors: body.data });
		}

		const body = await response.json();

		const signupData = signupResponseSchema.parse(body);

		cookies.set('jwt', signupData.jwt);
		throw redirect(302, '/');
	}
};
