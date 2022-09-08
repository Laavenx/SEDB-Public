import { json } from "@sveltejs/kit";
import { createSession, getUserByLogin } from "$lib/user_db.js";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

export async function POST({ request }) {
	let currentStatus;
	let currentMessage;
	let currentHeader;

	const body = await request.formData();
	const user = await getUserByLogin(body.get("login"));

	if (user) {
		if (user === "Database Error") {
			return json({
				message: "Database Error"
			}, {
				status: 502
			});
		}

		let res = await bcrypt.compare(body.get("password"), user.password);
		if (res) {
			const { id } = createSession(body.get("login"));
			if (id === "Database Error"){
				return json({
					message: "Database Error"
				}, {
					status: 502
				});
			}
			currentStatus = 201;
			currentHeader = {
				"Set-Cookie": serialize("session_id", id, {
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					secure: import.meta.env.PROD === "true",
					maxAge: 60 * 60 * 24,
				})
			};
		} else {
			currentStatus = 409;
			currentMessage = "Incorrect username or password";
		}
	} else {
		currentStatus = 409;
		currentMessage = "Incorrect username or password";
	}

	return json({
		message: currentMessage,
	}, {
		status: currentStatus,
		headers: currentHeader
	});
}