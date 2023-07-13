import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Order } from '$lib/types/order';

export const load = (async ({ locals, fetch }) => {
  const session = await locals.validateUser();
	if (!session.user?.userEmail || session.user?.userRole === 'USER') {
		throw redirect(303, '/'); // Redirect landing page
	}
  const res = await fetch('/api/sections');
  const sections = await res.json();
  console.log(sections)
  if(sections.success){
    return{
      sections: sections.sections,
    }
  }

}) satisfies PageServerLoad