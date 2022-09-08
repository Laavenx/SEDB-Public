import { json } from "@sveltejs/kit";
import { Op } from "sequelize";
import { CubeBlock } from "$lib/dbmodels.js";

export async function GET({ url }) {
	const PAGE_NUMBER = url.searchParams.get("page");
	const BLOCK_NAME = url.searchParams.get("name");

	if (!PAGE_NUMBER) {
		return new Response(undefined, { status: 400 });
	}

	let whereQuery = {};
	if (BLOCK_NAME){
		whereQuery = {
			name: {
				[Op.like]: "%"+BLOCK_NAME+"%"
			}
		};
	}

	const cubeBlocks = await CubeBlock.findAll({
		attributes: ["name", "textureName", "cubeSize"],
		limit: 40,
		offset: Number((PAGE_NUMBER)-1)*40,
		where: whereQuery,
	});

	const totalRows = await CubeBlock.count({
		where: whereQuery,
	});

	return json({
		totalRows, cubeBlocks
	});
}