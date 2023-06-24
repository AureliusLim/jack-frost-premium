
import { fail, redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
export const GET = async ({locals}) => {
  const session = await locals.validateUser();
  console.log("USERSESSION")
  console.log(session.user?.userRole)
  let name;
  let role = session.user?.userRole;
  if(role === "USER"){
    name = session.user?.userEmail;
  }
 
  return json({
    success: true,
    name,
    role
  });
};
