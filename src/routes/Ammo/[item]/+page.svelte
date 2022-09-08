<script>
	import AmmoContents from "$lib/components/AmmoContents.svelte";
	export let data;
	let { ammo, additionalData, blueprint } = data;
	$: ({ ammo, additionalData, blueprint } = data);
</script>

<svelte:head>
	<title>{ammo.name}</title>
	<meta property="og:title" content="{ammo.name}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/Ammo/{ammo.textureName}.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div
		class="item-container flex-column d-flex justify-content-start align-items-center"
	>
		<AmmoContents {ammo} {additionalData} {blueprint} />
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";
</style>
