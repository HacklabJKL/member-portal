// place files you want to import through the `$lib` alias in this folder.

import { z } from 'zod';

export const userSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string().email(),
	matrixId: z.string().nullable()
});

export const logInResponseSchema = z.object({
	jwt: z.string(),
	user: userSchema
});

export type LoginResponse = z.infer<typeof logInResponseSchema>;
