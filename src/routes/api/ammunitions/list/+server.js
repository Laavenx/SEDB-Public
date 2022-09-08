import { json } from "@sveltejs/kit";
import { Op } from "sequelize";
import { AmmoMagazine } from "$lib/dbmodels.js";

export async function GET({ url }) {
	const PAGE_NUMBER = url.searchParams.get("page");
	const AMMO_NAME = url.searchParams.get("name");

	if (!PAGE_NUMBER) {
		return new Response(undefined, { status: 400 });
	}

	let whereQuery = {};
	if (AMMO_NAME) {
		whereQuery = {
			name: {
				[Op.like]: "%" + AMMO_NAME + "%"
			}
		};
	}

	const ammunitions = await AmmoMagazine.findAll({
		attributes: ["name", "textureName"],
		limit: 40,
		offset: Number((PAGE_NUMBER) - 1) * 40,
		where: whereQuery,
	});

	const totalRows = await AmmoMagazine.count({
		where: whereQuery,
	});

	return json({
		totalRows,
		ammunitions
	});
}