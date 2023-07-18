import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST = (async ({locals, request }) => {
  try{
    let finalproducts
    let data = await request.json();
    const session = await locals.validateUser();
    console.log(data.coupon)
    // if(data.coupon.selectedProductNames.length === 0){  
    //   finalproducts = ["Any product"]
    // }
    // else{
    //   finalproducts = data.coupon.selectedProductNames
    // }
    finalproducts = data.coupon.selectedProductNames
    const coupon = await prisma.coupon.create({
      data:{
        name: data.coupon.name,
        code: data.coupon.code,
        isActivated: data.coupon.isActivated,
        rate: data.coupon.discountedAmount,
        prodRequirement: finalproducts,
        quantRequirement: data.coupon.orderCountRequirement
      }
    });
    return json({success: true, coupon})
  } catch(err){
    console.log(err)
    return json({success:false, error:"Failed to add  coupon"})
  }
}) satisfies RequestHandler;