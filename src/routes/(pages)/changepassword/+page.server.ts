import type { Product } from '$lib/types/product';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validateUser();
	if (!session || session.user?.userRole === "ADMIN") {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}
	console.log(locals.validateUser())
	
	
}) satisfies PageServerLoad;
