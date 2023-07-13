import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST = (async ({locals, request }) => {
  try{
    let data = await request.json();
    const session = await locals.validateUser();
    const section = await prisma.section.create({
      data:{
        name: data.name,
        isActivated: false,
      }
    });
    return json({success: true, section})
  } catch(err){
    console.log(err)
    return json({success:false, error:"Failed to add section"})
  }
}) satisfies RequestHandler;