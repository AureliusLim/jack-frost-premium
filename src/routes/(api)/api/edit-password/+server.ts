import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { auth } from '$lib/server/lucia';

export const POST = async({locals,request})=>{
  let data = await request.json()
  const session = await locals.validateUser();
  let useremail = session.user?.userEmail;
  let userid = session.user?.userId;
  // old password not matching
  try{
    let oldkey = await auth.validateKeyPassword('email',useremail,data.old)
  }
  catch(err){
    return json({success:false, message:'Invalid password. Kindly re-enter your old password.'})
  }

  // new password and confirm password must match
  if(data.new === data.confirmation){
    let update = await auth.updateKeyPassword('email', useremail, data.new)
  }
  else{
    return json({success:false, message:"Fields do not match. Kindly re-enter your new password."})
  }


  return json({success:true, message:'You have successfully changed your password.'})

}