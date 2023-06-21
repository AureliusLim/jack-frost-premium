import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';


//const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ locals }) => {
  const {user,session} = await locals.validateUser()
  
  if (user && session) {
    
    throw redirect(302, '/'); // "/admin/login"
  }
  
};

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
      password
    } = Object.fromEntries(await request.formData()) as Record<string, string>;

    try {
      // Create a new user in the Prisma database
     

      // Create a new user in the authentication system
      await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: email,
          password,
        },
        attributes: {
          email,
          role: 'USER',
        },
      });
			await prisma.user.updateMany({
        where: { email: email},
        data: {
          firstName,
					lastName,
					email,
					contactNumber,
					street,
          cityProvince,
          buildingNumber,
          postalCode,
        },
      });
			
      console.log(`${email} - ${password}`);
      throw redirect(302, '/');
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Could not register user' });
    }
  },

};
