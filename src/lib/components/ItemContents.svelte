<script>
	export let item;
	export let blueprint;
</script>

<div class="wrap flex-wrap d-flex justify-content-center">
	<div class="itembox d-flex flex-column flex-shrink-0 orderr-first">
		<div class="title recipe">Recipe</div>
		<div class="d-flex flex-column w-100 align-items-center">
			{#if blueprint}
				{#each blueprint as bp}
					<div class="title blueprint recipe">{bp.subType}</div>
					{#each bp.Prerequisites as prerequisite}
						<a
							href="/Items/{prerequisite.physicalItem.name.replaceAll(
								' ',
								'_'
							)}"
							class="d-flex compbox compbox-link"
						>
							<img
								class="component"
								src="/static/Items/{prerequisite.physicalItem
									.textureName}.webp"
								alt="{prerequisite.physicalItem.name} icon"
							/>
							<div class="align-self-center name">
								{prerequisite.physicalItem.name}
							</div>
							<div class="d-flex amount">
								<div class="align-self-center">
									{prerequisite.amount.toLocaleString(
										"en-US"
									)}
								</div>
							</div>
						</a>
					{/each}
					<div class="title blueprint recipe">Results in</div>
					<div class="d-flex compbox">
						<img
							class="component"
							src="/static/Items/{item.textureName}.webp"
							alt="{item.name} icon"
						/>
						<div class="align-self-center name">{item.name}</div>
						<div class="d-flex amount">
							<div class="align-self-center">
								{bp.Results[0].amount.toLocaleString("en-US")}
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="item">
					Doesn't have a recipe. Obtained in creative console or by
					other means
				</div>
			{/if}
		</div>
	</div>
	<div class="itembox d-flex flex-column align-items-center flex-shrink-0">
		<div class="title">{item.name}</div>
		<div class="icon-container">
			<img
				src="/static/Items/{item.textureName}.webp"
				alt="{item.name} icon"
				title="{item.name} icon"
			/>
		</div>
		<div class="title">Properties</div>
		<div class="item">Mass: {item.mass.toLocaleString("en-US")} kg</div>
		<div class="item">Volume: {item.volume.toLocaleString("en-US")} L</div>
		<div class="title">Internal</div>
		<div class="item">Type: {item.type}</div>
		<div class="item">Subtype: {item.subType}</div>
	</div>
</div>
<div class="spacer" />

<style lang="scss">
	@import "src/lib/styles/itemContents.scss";
	.blueprint {
		width: 98%;
	}

	.compbox {
		width: 98%;
	}
</style>
