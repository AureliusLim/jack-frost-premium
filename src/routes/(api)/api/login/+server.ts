import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/utils/supabase';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
// Add a product to the database
export const POST = (async ({ request,locals }) => {
	try{
		const account = await request.json()
		console.log(account.email);
		const key = await auth.validateKeyPassword('email', account.email, account.password);
		const session = await auth.createSession(key.userId);
		locals.setSession(session)
		console.log(`Session: ${session}`);
		
	}
	catch{
		return new Response('Incorrect email or password', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
	}
	throw redirect(302, '/');
	
}) satisfies RequestHandler;
