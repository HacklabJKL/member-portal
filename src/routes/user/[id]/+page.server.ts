import { getUser } from '$lib/lore-client';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = params.id;
	const user = await getUser(id, cookies);
	return { user };
};
