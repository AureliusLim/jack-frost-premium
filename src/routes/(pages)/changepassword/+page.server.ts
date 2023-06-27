import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	console.log(session);
	if (!session) {
		throw redirect(302, '/');
	}
};

const changePWValid = z.object({
	old_password: z
		.string({ required_error: 'Old Password is required' }),
	new_password: z
		.string({ required_error: 'New Password is required' }),
	confirm_password: z
		.string({ required_error: 'Confirm Password is required' })
		.trim()
})
.refine((data) => data.new_password === data.confirm_password, {
	message: 'Passwords must match',
	path: ['confirm_password']
});

export const actions: Actions = {
	default: async ({ request}) => {
		const formData = Object.fromEntries(await request.formData());
		const old_password = (formData.old_password as string) || '';
		const new_password = (formData.new_password as string) || '';
		const confirm_password = (formData.confirm_password as string) || '';

		
		try {



		} catch (err) {
			console.error(err);
		}


		try {
			const user = await auth.getUser(userId);
			const email = user.userEmail;
			await auth.updateKeyPassword('email', email, new_password);
				
		} catch (err) {
			console.error(err);
		}
	}
};