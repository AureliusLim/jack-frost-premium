import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals, fetch }) => {
  const session = await locals.validateUser();
	if (!session.user?.userEmail || session.user?.userRole === 'USER') {
		throw redirect(303, '/'); // Redirect landing page
	}
  const res = await fetch('/api/coupons');
  const coupons = await res.json();
  console.log(coupons.coupons)
  if(coupons.success){
    return{
      coupons: coupons.coupons,
    }
  }

}) satisfies PageServerLoad