//import sveltePreprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";

const config = {
	kit: {
		adapter: adapter(),
	},
	vitePlugin: { 
		experimental: {
			useVitePreprocess: true
		},
	},
	/*
	preprocess: [
		sveltePreprocess({
			scss: {
				includePaths: ["src"],
				prependData: "@use \"src/variables.scss\" as *;",
			},
		}),
	],*/
};

export default config;
