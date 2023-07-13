import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Product } from '$lib/types/product';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/products');
	const { success, products } = await res.json();
	const res2 = await fetch('/api/sections')
	const data2 =  await res2.json();
	let activatedSections = [];
	console.log(products); // for debugging purposes
	//console.log(sections)
	let filteredSections = [];

	for(let counter = 0; counter < data2.sections.length; counter++){
		if(data2.sections[counter].isActivated){
			filteredSections.push(data2.sections[counter])
		}
	}
	if (success && data2.success) {
		return {
			products: products as Product[],
			sections: filteredSections
		};
	}

	throw error(404, 'Products not found');
}) satisfies PageServerLoad;
