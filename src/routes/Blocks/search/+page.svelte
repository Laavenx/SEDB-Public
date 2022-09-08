<script>
	import { goto } from "$app/navigation";
	import Item from "$lib/components/Item.svelte";
	import PageBar from "$lib/components/pagination.svelte";
	import SearchBar from "$lib/components/searchbar.svelte";
	export let data;
	let { totalRows, curpage, cubeBlocks, name, currentURL } = data;
	$: ({ totalRows, curpage, cubeBlocks, name, currentURL } = data);

	const PATH = "Blocks";
	let HistoryUpdate = currentURL;
	let fetching = false;

	const fetchItems = async function (name) {
		let res = await fetch(`/api/blocks/list?page=1&name=${name}`);
		let data = await res.json();
		return data;
	};

	const handleRedirect = function (e) {
		cubeBlocks = [];
		fetching = true;
		goto(e.detail.page).then(
			() => {
				fetching = false;
			},
			() => {
				fetching = false;
			}
		);
	};

	const handleKeydown = async function (e) {
		cubeBlocks = [];
		let fetched = await fetchItems(e.detail.input);
		cubeBlocks = fetched.cubeBlocks;
		totalRows = fetched.totalRows;
		name = `&name=${e.detail.input}`;
		curpage = 1;
		HistoryUpdate.searchParams.set("name", e.detail.input);
		HistoryUpdate.searchParams.set("page", 1);
		if (!e.detail.input) {
			HistoryUpdate.search = "page=1";
			name = "";
		}
		history.pushState({}, "", HistoryUpdate);
	};
</script>

<svelte:head>
	<title>Blocks</title>
	<meta property="og:title" content="Blocks" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/favicon.webp" />
</svelte:head>

<div class="d-flex flex-column h-100">
	<div class="d-flex flex-wrap justify-content-center searchbar">
		<SearchBar
			on:keydown={handleKeydown}
			searchParam={currentURL.searchParams.get("name")}
		/>
		<div class="d-flex flex-wrap justify-content-center ">
			{#key name}
				<PageBar
					{name}
					{totalRows}
					{curpage}
					on:pageChange={handleRedirect}
					bind:fetching
				/>
			{/key}
		</div>
	</div>
	<div class="datagrid">
		{#key currentURL}
			{#each cubeBlocks as cube, index}
				<Item
					name={cube.name}
					textureName={cube.textureName}
					animationDelayMultiplier={index}
					cubeSize={cube.cubeSize}
					{PATH}
					on:pageChange={handleRedirect}
				/>
			{/each}
			{#if cubeBlocks.length === 0 && fetching === false}
				<div class="info-wrapper">
					<h2>Couldn't find matching items</h2>
				</div>
			{/if}
		{/key}
	</div>
	<div class="mt-auto">
		<div class="d-flex flex-wrap justify-content-center paginator">
			<div class="filler" />
			<div class="d-flex flex-wrap justify-content-center ">
				{#key name}
					<PageBar
						{name}
						{totalRows}
						{curpage}
						on:pageChange={handleRedirect}
						bind:fetching
					/>
				{/key}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemSearch.css";
</style>
