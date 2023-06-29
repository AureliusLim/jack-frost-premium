import { fail, redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ locals }) => {
	const session = await locals.validateUser();
	console.log('USERSESSION');
	console.log('GETTINGORDER:' + session.user?.userEmail);
	let name = session.user?.userEmail;

	// insert code here
	const orders = await prisma.order.findMany({
		where: {
			email: name
		},
		include: {
			order_details: {
				include: {
					product: true,
					offering: true
				}
			}
		}
	});
	console.log(orders);
	return json({
		success: true,
		orders
	});
};
