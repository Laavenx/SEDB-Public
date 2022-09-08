import { json } from '@sveltejs/kit';
import { Op } from "sequelize";
import { Component } from "$lib/dbmodels.js";

export async function GET({ url }) {
	const PAGE_NUMBER = url.searchParams.get("page");
	const COMPONENT_NAME = url.searchParams.get("name");

	if (!PAGE_NUMBER) {
		return new Response(undefined, { status: 400 });
	}

	let whereQuery = {};
	if (COMPONENT_NAME){
		whereQuery = {
			name: {
				[Op.like]: "%"+COMPONENT_NAME+"%"
			}
		};
	}

	const components = await Component.findAll({
		attributes: ["name", "textureName"],
		limit: 40,
		offset: Number((PAGE_NUMBER)-1)*40,
		where: whereQuery,
	});

	const totalRows = await Component.count({
		where: whereQuery,
	});

	return json({
		totalRows, components
	});
}