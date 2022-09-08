<script>
	import { goto } from "$app/navigation";
	import Thrust from "$lib/components/subcomponents/Thrust.svelte";
	import Generic from "$lib/components/subcomponents/Generic.svelte";
	export let cubeBlock;
	export let totalRows;
	export let additionalData;

	const options = {
		Thrust: Thrust,
	};

	const handleRedirect = function () {
		const RAW_LOCATION = window.location.pathname.slice(0, -6);
		if (cubeBlock.cubeSize === "Large") {
			goto(`${RAW_LOCATION}_Small`);
		} else {
			goto(`${RAW_LOCATION}_Large`);
		}
	};
</script>

<div class="wrap flex-wrap d-flex justify-content-center">
	<div class="itembox d-flex flex-column flex-shrink-0 orderr-first">
		<div class="title recipe">Recipe</div>
		<div class="d-flex flex-column w-100">
			{#each cubeBlock.BlockComponent as cubeComp}
				<a
					class="d-flex compbox compbox-link"
					class:functional={cubeComp.functional && !cubeComp.hack}
					class:hack={cubeComp.hack && !cubeComp.functional}
					class:functional-hack={cubeComp.functional && cubeComp.hack}
					href="/Components/{cubeComp.C.name.replaceAll(' ', '_')}"
				>
					<img
						class="component"
						src="/static/Components/{cubeComp.C.textureName}.webp"
						alt={cubeComp.C.name}
					/>
					<div class="align-self-center name">{cubeComp.C.name}</div>
					<div class="d-flex amount">
						<div class="align-self-center">
							{cubeComp.amount.toLocaleString("en-US")}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="itembox d-flex flex-column align-items-center flex-shrink-0">
		<div class="title">{cubeBlock.name}</div>
		<div class="icon-container">
			<img
				src="/static/Blocks/{cubeBlock.textureName}.webp"
				alt="{cubeBlock.name} block icon"
				title="{cubeBlock.name} block icon"
			/>
			{#if totalRows > 1}
				<i
					class="fa-solid fa-repeat fa-lg"
					title="Switch block size"
					on:click={handleRedirect}
				/>
			{/if}
		</div>
		<div class="title">Properties</div>
		<div class="item">
			Integrity: {cubeBlock.Calculated.maxIntegrity.toLocaleString(
				"en-US"
			)}
		</div>
		<div class="item">
			Mass: {cubeBlock.Calculated.mass.toLocaleString("en-US")} kg
		</div>
		<div class="item">
			Volume: {cubeBlock.Calculated.volume.toLocaleString("en-US")} L
		</div>
		<div class="item">Grid size: {cubeBlock.cubeSize}</div>
		<div class="item">
			Physical size: X: {cubeBlock.Size.X} Y: {cubeBlock.Size.Y} Z: {cubeBlock
				.Size.Z}
		</div>
		<div class="item d-flex pt-0 pb-0">
			<div class="align-self-center">
				PCU: {cubeBlock.pcu.toLocaleString("en-US")}
			</div>
			<img
				class="pcu"
				src="/static/misc/PCU.webp"
				alt="Performance Cost Unit icon"
				title="Performance Cost Unit icon"
			/>
		</div>
		<div class="item">Airtightness: {cubeBlock.isAirtight}</div>
		<div class="item">DLC: {cubeBlock.dlc}</div>
		<div class="title">Internal</div>
		<div class="item">Type: {cubeBlock.type}</div>
		<div class="item">Subtype: {cubeBlock.subType}</div>
	</div>
</div>
<div class="wrap d-flex flex-wrap justify-content-center">
	<div class="textbox">
		<div>{cubeBlock.description}</div>
	</div>
</div>
{#if cubeBlock.additionalData}
	{#if additionalData.isGeneric}
		<Generic {cubeBlock} {additionalData} />
	{/if}
	<svelte:component
		this={options[cubeBlock.type]}
		{cubeBlock}
		{additionalData}
	/>
{/if}

<style lang="scss">
	@import "src/lib/styles/itemContents.scss";

	.fa-repeat {
		cursor: pointer;
		position: relative;
		z-index: 100;
		float: left;
		clear: none;
		left: 85px;
		top: -33px;
		padding: 15px 5px 15px 5px;
	}

	.pcu {
		height: 32px;
		width: 32px;
	}

	.functional-hack {
		box-shadow: 0px -2px 0px 0px rgba(255, 0, 0, 0.452),
			0px -4px 0px 0px rgba(0, 47, 255, 0.658);
	}

	.functional {
		box-shadow: 0px -2px 0px 0px rgba(255, 0, 0, 0.452);
	}

	.hack {
		box-shadow: 0px -2px 0px 0px rgba(0, 47, 255, 0.658);
	}
</style>
