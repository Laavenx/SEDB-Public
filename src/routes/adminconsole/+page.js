import { redirect } from "@sveltejs/kit";

export async function load({ parent }) {
	const { user } = await parent();
	if(user && (user !== "Database Error")){
		throw redirect(302, "/adminconsole/console");
	}
}