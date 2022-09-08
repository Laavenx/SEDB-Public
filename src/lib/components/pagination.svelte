<script>
	import { createEventDispatcher } from "svelte";
	export let totalRows;
	export let curpage;
	export let name;
	export let fetching;

	let pages = Math.ceil(totalRows / 40);
	let arrayOffset = 1;
	let pagewidth;

	const truncateExtraPages = function (curpage) {
		if (pages > 5) {
			if (curpage > pages - 2) {
				arrayOffset = pages - 4;
			} else if (curpage > 3) {
				arrayOffset = curpage - 2;
			} else {
				arrayOffset = 1;
			}
			return 5;
		} else {
			return pages;
		}
	};

	const dispatch = createEventDispatcher();
	function handleClick(page) {
		let gotopage = `search?page=${page}${name}`;
		dispatch("pageChange", {
			page: gotopage,
		});
	}
</script>

<svelte:window bind:innerWidth={pagewidth} />
{#if pagewidth > 550}
	{#if curpage > 3 && pages > 5}
		<button
			class="pageblock d-flex justify-content-center align-items-center"
			on:click={() => handleClick(1)}
			disabled={fetching}
		>
			<i class="fa-solid fa-angles-left" />
		</button>
	{/if}
	{#if curpage > 1}
		<button
			class="pageblock d-flex justify-content-center align-items-center"
			on:click={() => handleClick(curpage - 1)}
			disabled={fetching}
		>
			<i class="fa-solid fa-angle-left" />
		</button>
	{/if}
	{#each Array.from({ length: truncateExtraPages(curpage) }, (_, k) => k + arrayOffset) as page}
		{#if page == curpage}
			<button
				class="pageblock cur d-flex justify-content-center align-items-center"
			>
				{page}
			</button>
		{:else}
			<button
				class="pageblock d-flex justify-content-center align-items-center"
				on:click={() => handleClick(page)}
				disabled={fetching}
			>
				{page}
			</button>
		{/if}
	{/each}
	{#if pages > 1 && curpage < pages}
		<button
			class="pageblock d-flex justify-content-center align-items-center"
			on:click={() => handleClick(curpage + 1)}
			disabled={fetching}
		>
			<i class="fa-solid fa-angle-right" />
		</button>
	{/if}
	{#if pages > 5 && curpage < pages - 2}
		<button
			class="pageblock d-flex justify-content-center align-items-center"
			on:click={() => handleClick(pages)}
			disabled={fetching}
		>
			<i class="fa-solid fa-angles-right" />
		</button>
	{/if}
{:else}
	<div class="d-flex flex-wrap justify-content-center">
		{#each Array.from({ length: truncateExtraPages(curpage) }, (_, k) => k + arrayOffset) as page}
			{#if page == curpage}
				<button
					class="pageblock cur d-flex justify-content-center align-items-center"
				>
					{page}
				</button>
			{:else}
				<button
					class="pageblock d-flex justify-content-center align-items-center"
					on:click={() => handleClick(page)}
					disabled={fetching}
				>
					{page}
				</button>
			{/if}
		{/each}
	</div>
	<div class="d-flex flex-wrap justify-content-center">
		{#if curpage > 3 && pages > 5}
			<button
				class="pageblock d-flex justify-content-center align-items-center"
				on:click={() => handleClick(1)}
				disabled={fetching}
			>
				<i class="fa-solid fa-angles-left" />
			</button>
		{/if}
		{#if curpage > 1}
			<button
				class="pageblock d-flex justify-content-center align-items-center"
				on:click={() => handleClick(curpage - 1)}
				disabled={fetching}
			>
				<i class="fa-solid fa-angle-left" />
			</button>
		{/if}
		{#if pages > 1 && curpage < pages}
			<button
				class="pageblock d-flex justify-content-center align-items-center"
				on:click={() => handleClick(curpage + 1)}
				disabled={fetching}
			>
				<i class="fa-solid fa-angle-right" />
			</button>
		{/if}
		{#if pages > 5 && curpage < pages - 2}
			<button
				class="pageblock d-flex justify-content-center align-items-center"
				on:click={() => handleClick(pages)}
				disabled={fetching}
			>
				<i class="fa-solid fa-angles-right" />
			</button>
		{/if}
	</div>
{/if}

<style lang="scss">
	.cur {
		background-color: $hover-color-blue !important;
	}

	.pageblock {
		border-radius: 7.5px;
		margin: 0.35rem;
		border: 2px solid;
		height: 45px;
		width: 45px;
		cursor: pointer;
		color: white;
		background: rgba(0, 0, 0, 0);
	}

	.pageblock:hover {
		background-color: $hover-color-blue;
	}
</style>
