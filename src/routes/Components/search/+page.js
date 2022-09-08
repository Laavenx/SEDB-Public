import { error } from "@sveltejs/kit";

export async function load({ fetch, url }) {
	const PAGE_NUMBER = url.searchParams.get("page");
	const BLOCK_NAME = url.searchParams.get("name");
	const NAME_PROP = BLOCK_NAME ? `&name=${BLOCK_NAME}` : "";
	let res = await fetch(`/api/components/list${url.search}`);

	if (!res.ok) {
		throw error(500, "not found");
	}

	let data = await res.json();
	return {
		totalRows: data.totalRows,
		components: data.components,
		curpage: Number(PAGE_NUMBER),
		name: NAME_PROP,
		currentURL: url,
	};
}
