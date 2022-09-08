<script>
	import Thrust from "$lib/components/subcomponents/Thrust.svelte";
	import Generic from "$lib/components/subcomponents/Generic.svelte";
	export let component;
	export let additionalData;
	export let blueprint;

	const options = {
		Thrust: Thrust,
	};
</script>

<div class="wrap flex-wrap d-flex justify-content-center">
	<div class="itembox d-flex flex-column flex-shrink-0 orderr-first">
		<div class="title recipe">Recipe</div>
		<div class="d-flex flex-column w-100">
			{#if blueprint}
				{#each blueprint.Prerequisites as prerequisite}
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
								{prerequisite.amount.toLocaleString("en-US")}
							</div>
						</div>
					</a>
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
		<div class="title">{component.name}</div>
		<div class="icon-container">
			<img
				src="/static/Components/{component.textureName}.webp"
				alt="{component.name} block icon"
				title="{component.name} block icon"
			/>
		</div>
		<div class="title">Properties</div>
		<div class="item">
			Integrity: {component.maxIntegrity.toLocaleString("en-US")}
		</div>
		<div class="item">
			Health: {component.health.toLocaleString("en-US")}
		</div>
		<div class="item">
			Mass: {component.mass.toLocaleString("en-US")} kg
		</div>
		<div class="item">
			Volume: {component.volume.toLocaleString("en-US")} L
		</div>
		<div
			class="item"
			title="Chance that an item entity of the given type will be spawned when it is deducted from the parent block due to damage"
		>
			Drop probability: {component.dropProbability * 100}%
		</div>
		<div class="title">Internal</div>
		<div class="item">Type: Component</div>
		<div class="item">Subtype: {component.subType}</div>
	</div>
</div>
{#if component.additionalData}
	{#if additionalData.isGeneric}
		<Generic {component} {additionalData} />
	{/if}
	<svelte:component
		this={options[component.type]}
		{component}
		{additionalData}
	/>
{/if}

<style lang="scss">
	@import "src/lib/styles/itemContents.scss";
</style>
