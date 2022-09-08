import { json } from '@sveltejs/kit';
import * as DB from "$lib/dbmodels.js";

export async function GET({ params }) {
	const ITEM_NAME = params.item.replaceAll("_", " ");

	if (!ITEM_NAME) {
		return new Response(undefined, { status: 400 });
	}

	const item = await DB.PhysicalItem.findOne({
		where: {
			name: ITEM_NAME,
		},
	});

	if (!item) {
		return new Response(undefined, { status: 404 });
	}
 
	let blueprint;
	blueprint = await DB.Blueprint.findAll({
		include: [{
			model: DB.Blueprint_Prerequisites,
			as: "Prerequisites",
			attributes: ["amount"],
			include: {
				model: DB.PhysicalItem,
				attributes: ["name", "textureName"],
				as: "physicalItem",
			}
		},
		{
			model: DB.Blueprint_Results,
			as: "Results",
			attributes: ["amount"],
			where: {
				physicalItem_id: item.id
			}
		}
		],
	});

	if(blueprint.length === 0){
		blueprint = "";
	}

	return json({
		item,
		blueprint,
	});
}