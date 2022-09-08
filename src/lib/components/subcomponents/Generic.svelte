<script>
	export let additionalData;
	const EXCLUDE_LIST = ["isLink"];
	const pathDictionary = {
		"Ammo subtypes": "Ammo",
	};
	const createLink = function (dictionary, value) {
		let path = value.replaceAll(" ", "_");
		return `/${pathDictionary[dictionary]}/${encodeURIComponent(path)}`;
	};
</script>

<div class="wrap flex-wrap d-flex justify-content-center">
	<div
		class="itembox full-width d-flex flex-column align-items-center flex-shrink-0"
	>
		<div class="title mb-1">Additional info</div>
		<div class="w-100 d-flex flex-wrap">
			{#each Object.entries(additionalData) as [key, value]}
				{#if key !== "isGeneric"}
					{#if Array.isArray(value)}
						<div class="list d-flex flex-wrap">
							<div class="title">{key}</div>
							{#if typeof value[0] === "object"}
								{#each Object.entries(value) as [key2, value2]}
									{#each Object.entries(value2) as [key3, value3]}
										<div class="item">{key3}: {value3}</div>
									{/each}
								{/each}
							{:else if value[0] === "isLink"}
								{#each value as val}
									{#if !EXCLUDE_LIST.includes(val)}
										<a
											href={createLink(key, val)}
											class="item">{val}</a
										>
									{/if}
								{/each}
							{:else}
								{#each value as val}
									<div class="item">{val}</div>
								{/each}
							{/if}
						</div>
					{:else if typeof value === "object"}
						{#each Object.entries(value) as [key2, value2]}
							{#each Object.entries(value2) as [key3, value3]}
								<div class="item">{key3}: {value3}</div>
							{/each}
						{/each}
					{:else}
						<div class="item">{key}: {value}</div>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import "src/lib/styles/itemContents.scss";
	@media (min-width: 783px) {
		.full-width {
			width: 42rem !important;
		}

		.item {
			width: 50% !important;
		}
	}

	.item {
		width: 100%;
	}

	.full-width {
		width: 20rem;
	}

	.list {
		width: 100%;
		border: solid 1px black;
		border-radius: 10px;
		padding: 0.40625rem 0.40625rem 0px 0.40625rem;
	}
</style>
