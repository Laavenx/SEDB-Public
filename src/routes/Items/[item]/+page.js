import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	let encodedParam = encodeURIComponent(params.item);
	let res = await fetch(`/api/items/${encodedParam}`);

	if (!res.ok) {
		throw error(500, "not found");
	}

	let data = await res.json();
	return {
		item: data.item,
		blueprint: data.blueprint,
	};
}
