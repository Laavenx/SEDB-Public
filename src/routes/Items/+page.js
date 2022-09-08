import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, "/Items/search?page=1");
}
