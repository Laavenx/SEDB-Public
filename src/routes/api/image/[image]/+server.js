/*import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function get({ params }) {
	let image = String(params.image);

	let strippedimage = image.replace(/[^a-zA-Z0-9._-\s]/, "");
	strippedimage = strippedimage.replace("-", "/");

	console.log(strippedimage);
	const dir = process.cwd() + "/static/" + strippedimage + ".webp";

	if (strippedimage.split("/").includes("..") || !existsSync(dir)) {
		return {
			status: 400,
		};
	}

	return {
		headers: {
			"Content-Type": "image/webp",
			"Cache-Control": "max-age=3600",
		},
		body: await readFile(dir)
	};
}
*/
//deprecated for now