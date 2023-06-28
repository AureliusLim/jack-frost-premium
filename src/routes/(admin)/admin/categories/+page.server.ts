import type { Category } from '$lib/types/category';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validateUser();
	
	if (!session || session.user?.userRole === "USER") {
		throw redirect(303, '/'); // Redirect landing page
	}
	const res = await fetch('/api/categories');
	const categs = await res.json();
	console.log(categs);
	if (categs.success) {
		return {
			categs: categs.categories as Category[]
		};
	}
	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;
