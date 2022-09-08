import { json } from "@sveltejs/kit";
import * as DB from "$lib/dbmodels.js";

export async function GET({ params }) {
	const COMPONENT_NAME = params.item.replaceAll("_", " ");

	if (!COMPONENT_NAME) {
		return new Response(undefined, { status: 400 });
	}

	const component = await DB.Component.findOne({
		where: {
			name: COMPONENT_NAME,
		},
	});

	if (!component) {
		return new Response(undefined, { status: 404 });
	}

	const blueprint = await DB.Blueprint.findOne({
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
				component_id: component.id,
			},
		}
		],
	});

	return json({
		component,
		blueprint,
	});
}