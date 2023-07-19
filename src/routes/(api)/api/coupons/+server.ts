import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ locals }) => {
  const session = await locals.validateUser();
  let name;
  let role = session.user?.userRole;
  if (role === 'USER') {
    name = session.user?.userEmail;
  }

  console.log("Getting COUPONS:" + session.user?.userEmail);

  // Retrieve coupons from the database
  const coupons = await prisma.coupon.findMany({
    include: { redeemedBy: true },
  });
  
  return json({
    success: true,
    coupons
  });
};
