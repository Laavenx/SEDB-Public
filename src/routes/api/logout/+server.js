import { json } from "@sveltejs/kit";
import { removeSession } from "$lib/user_db.js";
import { parse, serialize } from "cookie";

export async function GET({ request }) {
	const cookies = parse(request.headers.get("cookie") || "");

	if (cookies.session_id) {
		const logout = await removeSession(cookies.session_id);

		if (!logout) {
			return json({},
				{
					status: 502, 
				}
		
			);
		}
		return json({},
			{
				status: 200,
				headers: {
					"Set-Cookie": serialize("session_id", "", {
						path: "/",
						expires: new Date(0),
					}),
				},
			}
	
		);
	}
}