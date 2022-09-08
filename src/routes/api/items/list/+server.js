import { json } from '@sveltejs/kit';
import { Op } from "sequelize";
import { PhysicalItem } from "$lib/dbmodels.js";

export async function GET({ url }) {
	const PAGE_NUMBER = url.searchParams.get("page");
	const ITEM_NAME = url.searchParams.get("name");

	if (!PAGE_NUMBER) {
		return new Response(undefined, { status: 400 });
	}

	let whereQuery = {};
	if (ITEM_NAME) {
		whereQuery = {
			name: {
				[Op.like]: "%" + ITEM_NAME + "%"
			}
		};
	}

	const items = await PhysicalItem.findAll({
		attributes: ["name", "textureName"],
		limit: 40,
		offset: Number((PAGE_NUMBER) - 1) * 40,
		where: whereQuery,
	});

	const totalRows = await PhysicalItem.count({
		where: whereQuery,
	});

	return json({
		totalRows,
		items
	});
}