import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
	let encodedParam = encodeURIComponent(params.item);
	let res = await fetch(`/api/ammunitions/${encodedParam}`);
	
	if (!res.ok) {
		throw error(500, "not found");
	}

	let data = await res.json();
	let additionalData = "";
	if(data.ammo.additionalData){
		additionalData = JSON.parse(data.ammo.additionalData);
	}

	return {
		ammo: data.ammo,
		blueprint: data.blueprint,
		additionalData: additionalData,
	};
}
