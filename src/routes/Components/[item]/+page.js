import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
	let encodedParam = encodeURIComponent(params.item);
	let res = await fetch(`/api/components/${encodedParam}`);
	
	if (!res.ok) {
		throw error(500, "not found");
	}

	let data = await res.json();
	let additionalData = "";
	if (data.component.additionalData) {
		additionalData = JSON.parse(data.component.additionalData);
	}

	return {
		component: data.component,
		blueprint: data.blueprint,
		additionalData: additionalData,
	};
}
