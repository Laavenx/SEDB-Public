import { json } from '@sveltejs/kit';
import { Op } from "sequelize";
import * as DB from "$lib/dbmodels.js";

export async function GET({ params }) {
	let splitedParam = params.item.split("_");
	const BLOCK_SIZE = splitedParam.at(-1);
	splitedParam.pop(-1);
	const BLOCK_NAME = splitedParam.join(" ");

	if (!BLOCK_NAME) {
		return new Response(undefined, { status: 400 });
	}

	let whereQuery;
	if (BLOCK_SIZE) {
		whereQuery = { cubeSize: BLOCK_SIZE };
	}

	const cubeBlock = await DB.CubeBlock.findOne({
		include: [{
			model: DB.CubeBlock_Calculated,
			as: "Calculated",
			attributes: ["mass", "volume", "maxIntegrity"]
		},
		{
			model: DB.CubeBlock_Components,
			as: "BlockComponent",
			attributes: ["amount", "hack", "functional"],
			include: {
				model: DB.Component,
				attributes: ["name", "textureName"],
				as: "C"
			},
		},
		{
			model: DB.Size,
			attributes: ["X", "Y", "Z"],
		}
		],
		where: {
			[Op.and]: [
				{ name: BLOCK_NAME },
				whereQuery
			]
		},
	});

	if (!cubeBlock) {
		return new Response(undefined, { status: 404 });
	}

	const totalRows = await DB.CubeBlock.count({
		where: { name: BLOCK_NAME },
	});

	return json({
		cubeBlock,
		totalRows,
	});
}