<script>
	import ItemContents from "$lib/components/ItemContents.svelte";
	export let data;
	let { item, blueprint } = data;
	$: ({ item, blueprint  } = data);
</script>

<svelte:head>
	<title>{item.name}</title>
	<meta property="og:title" content="{item.name}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/Items/{item.textureName}.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div
		class="item-container flex-column d-flex justify-content-start align-items-center"
	>
		<ItemContents {item} {blueprint} />
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";
</style>
