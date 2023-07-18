import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ locals, request }) => {
  const session = await locals.validateUser();

  try {
    // Parse the request body
    const c = await request.json();
    console.log(c)
    let coupon = c.coupon;
    console.log("API Original COUPON:", coupon.originalname)
    console.log("API New COUPON:", coupon.name)
   
    const updatedSection = await prisma.coupon.updateMany({
      where: { name: coupon.originalname },
      data: {
        name: coupon.name,
        code: coupon.code,
        rate: coupon.discountedAmount,
        quantRequirement: coupon.orderCountRequirement,
        prodRequirement: coupon.selectedProductNames,
        isActivated: coupon.isActivated
      },
    });
    console.log(updatedSection)

    return json({success:true});
  } catch (error) {
    console.error(error);
    return json({success:false, error: 'An error occurred while updating the coupon.' });
  }
};