import { json } from '@sveltejs/kit';
import * as DB from "$lib/dbmodels.js";

export async function GET({ params }) {
	const AMMO_NAME = params.item.replaceAll("_", " ");

	if (!AMMO_NAME) {
		return new Response(undefined, { status: 400 });
	}

	const ammo = await DB.AmmoMagazine.findOne({
		where: {
			name: AMMO_NAME,
		},
	});

	if (!ammo) {
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
				ammoMagazine_id: ammo.id
			}
		}
		],
	});

	if(blueprint.length === 0){
		blueprint = "";
	}

	return json({
		ammo,
		blueprint,
	});
}