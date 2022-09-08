<script>
	import CubeContents from "$lib/components/CubeContents.svelte";
	export let data;
	let { totalRows, cubeBlock, additionalData } = data;
	$: ({ totalRows, cubeBlock, additionalData } = data);
</script>

<svelte:head>
	<title>{cubeBlock.name}</title>
	<meta property="og:title" content="{cubeBlock.name}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/Blocks/{cubeBlock.textureName}.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div
		class="item-container flex-column d-flex justify-content-start align-items-center"
	>
		<CubeContents {cubeBlock} {totalRows} {additionalData} />
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";
</style>
