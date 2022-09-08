<script>
	import ComponentContents from "$lib/components/ComponentContents.svelte";
	export let data;
	let { component, additionalData, blueprint } = data;
	$: ({ component, additionalData, blueprint } = data);
</script>

<svelte:head>
	<title>{component.name}</title>
	<meta property="og:title" content={component.name} />
	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content="/static/Components/{component.textureName}.webp"
	/>
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div
		class="item-container flex-column d-flex justify-content-start align-items-center"
	>
		<ComponentContents {component} {additionalData} {blueprint} />
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";
</style>
