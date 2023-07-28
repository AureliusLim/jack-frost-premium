import type { Order } from '$lib/types/order';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';


export const load = (async ({ locals, params, fetch }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const orderRes = await fetch(`/api/orders`);
  
	const order = await orderRes.json();
  
	if (order.success) {
    
		return {
			order: order.orders
		};
	}
	
	throw error(404, 'Order not found');
}) satisfies PageServerLoad;