import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST = (async ({locals, request }) => {
  try{
    let data = await request.json();
    const session = await locals.validateUser();
    console.log(data.ID)

    // Delete the coupon
    const result = await prisma.coupon.delete({
      where: {
        id: data.ID
      }
    });
    return json({success:true})
  }catch(err){
    console.log(err);
    return json({success:false})
  }
}) satisfies RequestHandler;
