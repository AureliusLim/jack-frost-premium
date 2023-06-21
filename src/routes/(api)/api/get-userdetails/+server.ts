import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
  const session = await locals.validateUser();
  const user = await prisma.user.findUnique({
    where: { email: session.user?.userEmail },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      contactNumber: true,
      street: true,
      cityProvince: true,
      buildingNumber: true,
      postalCode: true,
    },
  });

  const {
    firstName,
    lastName,
    email,
    contactNumber,
    street,
    cityProvince,
    buildingNumber,
    postalCode,
  } = user;

  return json({
    success: true,
    firstName,
    lastName,
    email,
    contactNumber,
    street,
    cityProvince,
    buildingNumber,
    postalCode,
  });
};
