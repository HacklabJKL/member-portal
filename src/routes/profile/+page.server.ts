import type { PageServerLoad } from '../$types';
import { getMe } from '$lib/lore-client';
import { getJwtOrRedirect } from '$lib/auth-util';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = getJwtOrRedirect(cookies);

	const me = await getMe(jwt);

	return { user: me };
};
