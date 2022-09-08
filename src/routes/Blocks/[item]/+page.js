import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
	let encodedParam = encodeURIComponent(params.item);
	let res = await fetch(`/api/blocks/${encodedParam}`);

	if (!res.ok) {
		throw error(500, "not found");
	}

	let data = await res.json();
	let additionalData = "";
	if(data.cubeBlock.additionalData){
		additionalData = JSON.parse(data.cubeBlock.additionalData);
	}

	return {
		cubeBlock: data.cubeBlock,
		totalRows: data.totalRows,
		additionalData: additionalData,
	};
}
