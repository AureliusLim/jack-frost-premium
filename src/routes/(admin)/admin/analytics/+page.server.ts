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
  
	const o = order.orders
	let salesdata = [];
	let date, orderquantity, product, paymentstatus, price
	for (let orders of o){
		date = orders.created_at;
		paymentstatus = orders.payment_status;
		orderquantity = 0
		price = 0
		for(let items of orders.order_details){
				orderquantity += items.quantity;
				product = items.product.name;
				price = items.offering.price
		}
	
		salesdata.push({date:date, sales:orderquantity, product:product, paymentstatus: paymentstatus,price: price * orderquantity })
	}

	if (order.success) {
    
		return {
			order: order.orders,
			salesdata: salesdata
		};
	}
	
	throw error(404, 'Order not found');
}) satisfies PageServerLoad;