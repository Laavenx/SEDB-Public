import { parse } from "cookie";
import { getSession } from "$lib/user_db.js";

export async function load({ request }) {
		
	const cookies = parse(request.headers.get("cookie") || "");
	if (cookies.session_id) {
		const session = await getSession(cookies.session_id);
		if(session === "Database Error"){
			return {
				user: session
			};
		}
		return {
			user: JSON.stringify(session?.uID)
		};
	}
	return {
		user: null
	};
}