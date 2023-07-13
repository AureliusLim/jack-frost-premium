import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ locals }) => {
  const session = await locals.validateUser();
  let name;
  let role = session.user?.userRole;
  if (role === 'USER') {
    name = session.user?.userEmail;
  }

  console.log("Getting SECTIONS:" + session.user?.userEmail);

  // Retrieve sections from the database
  const sections = await prisma.section.findMany({
    include: {
      products: true
    }
  });

  return json({
    success: true,
    sections
  });
};
