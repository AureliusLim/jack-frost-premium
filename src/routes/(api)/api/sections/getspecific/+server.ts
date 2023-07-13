import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ locals, request }) => {
  const session = await locals.validateUser();
  let d = await request.json()
  let sectionname = d.name;
  let role = session.user?.userRole;
  console.log(sectionname)

  try{
      // Retrieve sections from the database
    
      const sections = await prisma.section.findMany({
        where: {
          name: sectionname
        },
        include: {
          products: true
        }
      });

      return json({
        success: true,
        sections
      });
    }catch(err){
      console.log(err)
      return json({success:false})
    }
};
