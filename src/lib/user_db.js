import { v4 as uuidv4 } from "uuid";
import * as DB from "$lib/mariadb.js";

export const getUserByLogin = async (userlogin) => {
	try {
		const User = await DB.User.findOne({
			attributes: ["username", "password"],
			where: {
				username: userlogin,
			},
		});
		return User;
	} catch (err) {
		return "Database Error";
	}
};

export const createSession = (login) => {
	try {
		const session = {
			id: uuidv4(),
			login,
		};
		DB.Session_Storage.create({ uID: session.id, username: session.login });
		return session;
	} catch (err){
		return "Database Error";
	}
};

export const getSession = async (id) => {
	try {
		const session = await DB.Session_Storage.findOne({
			attributes: ["uID"],
			where: {
				uID: id,
			},
		});
		return session;
	} catch (err) {
		return "Database Error";
	}
};

export const removeSession = async (id) => {
	try {
		await DB.Session_Storage.destroy({
			where: { uID: id },
		});
		return "ok";
	} catch (err) {
		return null;
	}
};