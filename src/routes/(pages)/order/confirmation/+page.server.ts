import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { CartItem } from '$lib/types/cart';
import { z } from 'zod';

const orderSchema = z.object({
	first_name: z
		.string({ required_error: 'First name is required' })
		.min(1, { message: 'first name is required' }),
	last_name: z
		.string({ required_error: 'Last name is required' })
		.min(1, { message: 'last name is required' }),
	contact_number: z
		.string({ required_error: 'Contact number is required' })
		.min(1, { message: 'Contact number is required' }),
	street: z
		.string({ required_error: 'Street is required' })
		.min(1, { message: 'Street is required' }),
	city: z.string({ required_error: 'City is required' }).min(1, { message: 'City is required' }),
	postal_code: z
		.string({ required_error: 'postal code is required' })
		.min(1, { message: 'postal code is required' }),
	payment_method: z
		.string({ required_error: 'Payment method is required' })
		.min(1, { message: 'Payment method is required' })
});

export const actions = {
	order: async ({ request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log(formData);
		const orderitems = JSON.parse(formData.orderitems as string);
		// Validate form data
		const result = orderSchema.safeParse({
			first_name: formData.first_name as string,
			last_name: formData.last_name as string,
			contact_number: formData.contact_number as string,
			street: formData.street as string,
			city: formData.city as string,
			postal_code: formData.postal_code as string,
			payment_method: formData.payment_method as string
		});
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return fail(400, {
				data: {
					first_name: formData.first_name as string,
					contact_number: formData.contact_number as string,
					payment_method: formData.payment_method as string,
					additional_details: formData.additional_details as string
				},
				errors: result.error.flatten().fieldErrors
			});
		}
		// Add order
		const user = await fetch('/api/get-session');
		let userresponse = await user.json();
		const email = userresponse.name;
		console.log('EMAIL:', email);
		const order = {
			name: (formData.first_name as string) + ' ' + formData.last_name,
			delivery_address: ((((((('#' + formData.building_number) as string) +
				' ' +
				formData.street) as string) +
				', ' +
				formData.city) as string) +
				' City, ' +
				formData.postal_code) as string,
			email: email as string,
			contact: formData.contact_number as string,
			payment: formData.payment_method as string,
			total: Number(formData.totalprice),
			details: formData.additional_details as string,
			items: orderitems as CartItem[]
		};
		console.log('order: ', order);
		console.log('adding order ---');

		const res = await fetch('/api/orders/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(order)
		});
		const data = await res.json();
		console.log(data);
		if (data.success) {
			console.log('added order');
			throw redirect(303, `/order/checkout/${data.id}`);
		} else if (!data.success) {
			// Fail to add product
			return fail(400, {
				data: {
					first_name: formData.first_name as string,
					contact_number: formData.contact_number as string,
					payment_method: formData.payment_method as string,
					additional_details: formData.additional_details as string
				},
				dbFailed: true
			});
		}
		throw error(500, { message: 'Order not added' });
	}
} satisfies Actions;
