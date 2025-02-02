import { productSchema } from '$lib/forms/validations/product';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, fetch }) => {
	const session = await locals.validateUser();
	if (!session.user?.userEmail || session.user?.userRole === 'USER') {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	// const categs = [
	// 	{ id: '1', name: 'Platinum' },
	// 	{ id: '2', name: 'Premium' },
	// 	{ id: '3', name: 'Super Premium' }
	// ];
	const res = await fetch('/api/categories');
	const categories = await res.json();

	if (categories.success) {
		return {
			categories: categories.categories
		};
	}
	throw error(404, 'Categories not found');
}) satisfies PageServerLoad;

export const actions = {
	add: async ({ request, fetch }) => {
		console.log('adding product ---');
		const formdata = await request.formData();
		// console.log(formdata)
		const product = Object.fromEntries(formdata);
		console.log(product);
		// Validate form data
		const result = productSchema.safeParse({
			name: product.name,
			description: product.description,
			img_path: product.img_path,
			category_id: product.category_id
		});
		if (!result.success) {
			console.log(result.error.flatten().fieldErrors);
			return fail(400, {
				data: {
					name: product.name,
					description: product.description,
					img_path: product.img_path,
					img_src: product.img_src,
					category_id: product.category_id
				},
				errors: result.error.flatten().fieldErrors
			});
		}
		// Add product
		const res = await fetch('/api/products/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		});
		const data = await res.json();
		console.log(data);
		if (data.success) {
			console.log('added product');
			throw redirect(303, '/admin/products');
		} else if (!data.success) {
			// Fail to add product
			return fail(400, {
				data: {
					name: product.name,
					description: product.description,
					img_path: product.img_path,
					img_src: product.img_src,
					category_id: product.category_id
				},
				dbFailed: true
			});
		}
		throw error(500, 'Product not added');
	}
} satisfies Actions;
