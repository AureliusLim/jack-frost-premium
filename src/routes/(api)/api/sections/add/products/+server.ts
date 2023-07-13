import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ locals, request }) => {
  const session = await locals.validateUser();

  try {
    // Parse the request body
    const section = await request.json();
    console.log(section)
    console.log("API SECTION:", section.ID)
    console.log("API SECTION:", section.updatedName)
    console.log("API SECTION:", section.productarr)
    //{ID:sectionObj.id, updatedName: newSectionName, productarr: selectedProductNames}
    // Update the specific section in the database
   
    // let productList = await prisma.product.findMany({
    //   where: {
    //     name: {
    //       in: section.productarr
    //     }
    //   }
    // })
    
    //console.log(productList)
    const updatedSection = await prisma.section.updateMany({
      where: { id: section.ID },
      data: {
        name: section.updatedName,
      },
    });

    // Update the sectionID in the product table
    for (let product of section.selected) {
      await prisma.product.updateMany({
        where: { name: product },
        data: { 
          section_id: section.ID
        },
      });
    }
    // set to default if unchecked and was original
    for (let product of section.unselected) {
      await prisma.product.updateMany({
        where: { name: product },
        data: { 
          section_id: 'cljy1q6dy0000zmrktkkduyqd'
        },
      });
    }

    return json({success:true});
  } catch (error) {
    console.error(error);
    return json({success:false, error: 'An error occurred while updating the section.' });
  }
};