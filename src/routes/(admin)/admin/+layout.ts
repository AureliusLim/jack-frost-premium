import type { LayoutLoad } from './$types';

export const load = (() => {
	return {
		// Navigation links
		pages: [
			{ title: 'PRODUCTS', href: '/admin/products' },
			{ title: 'CATEGORIES', href: '/admin/categories' },
			{ title: 'ORDERS', href: '/admin/orders' },
			{title: "SECTIONS", href: '/admin/sections'},
			{title: "COUPONS", href:'/admin/coupons'}
		],
		navbar: 'admin'
	};
}) satisfies LayoutLoad;
