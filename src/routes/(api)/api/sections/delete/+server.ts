import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST = (async ({locals, request }) => {
  try{
    let data = await request.json();
    const session = await locals.validateUser();

    // Fetch all products associated with the section
    const products = await prisma.product.findMany({
      where: {
        section_id: data.ID
      }
    });

    // Update the section_id of each product to unassigned
    for (let product of products) {
      await prisma.product.update({
        where: {
          id: product.id
        },
        data: {
          section_id: "cljy1q6dy0000zmrktkkduyqd"
        }
      });
    }

    // Delete the section
    const result = await prisma.section.delete({
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
