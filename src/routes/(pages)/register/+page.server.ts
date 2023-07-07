import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

//const prisma = new PrismaClient();

// export const load: PageServerLoad = async ({ locals }) => {
//   const {user,session} = await locals.validateUser()

//   if (user && session) {

//     throw redirect(302, '/'); // "/admin/login"
//   }

// };

export const actions: Actions = {
  default: async ({ request }) => {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      street,
      cityProvince,
      buildingNumber,
      postalCode,
      password,
      confirmPassword
    } = Object.fromEntries(await request.formData()) as Record<string, string>;
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(contactNumber)) {
      console.log("Phone number is invalid");
      return fail(400, {message: 'Phone number is invalid.'});
    }
    if (!(password === confirmPassword)) {
      console.log('Passwords do not match.');
      return fail(400, { message: 'Passwords do not match.' });
    }

    try {
      // Create a new user in the Prisma database
     

      // Create a new user in the authentication system
      await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: email.toLowerCase(),
          password,
        },
        attributes: {
          email,
          role: 'USER',
        },
      });
			await prisma.user.updateMany({
				where: { email: email },
				data: {
					firstName,
					lastName,
					email,
					contactNumber,
					street,
					cityProvince,
					buildingNumber,
					postalCode
				}
			});

			console.log(`${email} - ${password}`);
			return {
        status: 302,
        headers: {
          location: '/'
        }
      };
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Email is already registered.' });
		}
	}
} satisfies Actions;
