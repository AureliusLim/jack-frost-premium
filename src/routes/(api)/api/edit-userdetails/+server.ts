import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { auth } from '$lib/server/lucia';
export const POST = async ({ locals, request }) => {
	let data = await request.json();

	const session = await locals.validateUser();
	let userid = session.user?.userId;
	let oldemail = session.user?.userEmail;
	const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
	if (existingUser && existingUser.id !== userid) {
		// If a user with the same email already exists and it's not the current user
		return json({ success: false, message: 'Email is already registered' });
	}

	const r = await auth.updateUserAttributes(userid, { email: data.email });
	console.log('Update Result:', r); // Check the result of updateUserAttributes
	const k = await prisma.key.update({
		where: { id: 'email:' + oldemail },
		data: {
			id: 'email:' + data.email
		}
	});

	console.log(k);
	const user = await prisma.user.update({
		where: { id: userid },
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			contactNumber: data.contactNumber,
			street: data.street,
			cityProvince: data.cityProvince,
			buildingNumber: data.buildingNumber,
			postalCode: data.postalCode
		}
	});
	console.log('OLDEMAIL:' + oldemail);
	const update = await prisma.order.updateMany({
		where: { email: oldemail }, // Use existingUser.email as we're updating email
		data: {
			name: data.firstName + ' ' + data.lastName,
			email: data.email,
			first_name: data.firstName,
			last_name: data.last_name,
			delivery_address:
				'#' +
				data.buildingNumber +
				' ' +
				data.street +
				', ' +
				data.cityProvince +
				', ' +
				data.postalCode
		}
	});
	console.log(update);

	return json({ success: true, message: 'User Details Successfully Updated' });
};
