import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/utils/supabase';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
// Add a product to the database
export const POST = async ({ request, locals }) => {
	try {
		const account = await request.json();
		console.log(account.email); // Verify the provided email value
		let keyUser = await auth.getKeyUser('email', account.email);
		if (keyUser.user.userRole !== 'USER') {
			return new Response('Incorrect email or password', {
				status: 400,
				headers: {
					'Content-Type': 'text/plain'
				}
			});
		}

		const key = await auth.validateKeyPassword('email', account.email, account.password);
		console.log('Key:', key); // Check the key object to see if it contains the correct user ID and email

		const session = await auth.createSession(key.userId);
		console.log('Session:', session); // Check the created session object
		locals.setSession(session);
	} catch (error) {
		console.error(error); // Log any error that occurs during the login process
		return new Response('Incorrect email or password', {
			status: 400,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
	throw redirect(302, '/');
};
