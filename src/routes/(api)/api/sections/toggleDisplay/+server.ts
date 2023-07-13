import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ locals, request }) => {
  const session = await locals.validateUser();

  try {
    // Parse the request body
    const section= await request.json();
    console.log("API SECTION:", section)
    // Update the specific section in the database
    const updatedSection = await prisma.section.update({
      where: { id: section.section.id },
      data: { isActivated: section.section.isActivated },
    });

    return json({ success: true, updatedSection });
  } catch (error) {
    console.error(error);
    return json({ success: false, error: 'Failed to update section' });
  }
};
