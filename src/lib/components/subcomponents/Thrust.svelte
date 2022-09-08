<script>
	export let cubeBlock;
	export let additionalData;

	let gravity = 1;
	let weight = 1000;

	const calculateThrust = function (gravity, weight) {
		let newtons = Math.round(gravity * weight * 9.807);
		let thrustString = ` of force to maintain altitude or ${Math.ceil(
			newtons / additionalData.forceMagnitude
		)} ${cubeBlock.cubeSize} ${cubeBlock.name}`;

		if (newtons < 10000) {
			return newtons + " N" + thrustString;
		} else if (newtons < 10000000) {
			return newtons / 1000 + " kN" + thrustString;
		} else {
			return newtons / 1000000 + " mN" + thrustString;
		}
	};

	const formatFuel = function (maxPConsumption) {
		return (
			Math.round(maxPConsumption / (0.001556 * 1)).toLocaleString(
				"en-US"
			) + " L/s"
		);
	};

	$: calculated = calculateThrust(gravity, weight);
</script>

<div class="wrap flex-wrap d-flex justify-content-center">
	<div
		class="itembox full-width d-flex flex-column align-items-center flex-shrink-0"
	>
		<div class="title mb-1">Thrust</div>
		<div class="w-100 d-flex flex-wrap justify-content-center">
			<div class="column d-flex flex-column">
				<div class="title sub">Stats</div>
				<div class="item">
					Thruster power: {additionalData.forceMagnitude.toLocaleString(
						"en-US"
					)} N
				</div>
				{#if !additionalData.minPlanetaryInfluence && !additionalData.maxPlanetaryInfluence}
					<div class="item">
						Max fuel consumption:
						{formatFuel(additionalData.maxPowerConsumption)}
					</div>
				{:else}
					<div class="item">
						Max power consumption: {additionalData.maxPowerConsumption} MW
					</div>
				{/if}
				{#if !additionalData.minPlanetaryInfluence && !additionalData.maxPlanetaryInfluence}
					<div class="item">Thruster not affected by gravity</div>
				{:else}
					<div class="item">Minimum planetary influence: {additionalData.minPlanetaryInfluence}</div>
					<div class="item">Maximum planetary influence: {additionalData.maxPlanetaryInfluence}</div>
					<div class="item">Efficiency at minimal influence: {additionalData.effectivenessAtMaxInfluence}</div>
					<div class="item">Efficiency at maximum influence: {additionalData.effectivenessAtMinInfluence}</div>
				{/if}
			</div>
			<div class="column d-flex flex-column align-items-center">
				<div class="title sub">Lift calculator</div>
				<div class="item text-center">Gravity</div>
				<input type="number" min="0" step="0.1" bind:value={gravity} />
				<div class="item text-center">Weight in kg</div>
				<input type="number" min="0" bind:value={weight} />
				<div class="item text-center">
					Ship requires {calculated}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import "src/lib/styles/itemContents.scss";
	@media (min-width: 783px) {
		.full-width {
			width: 42rem !important;
		}

		.column {
			width: 50% !important;
		}
	}

	.full-width {
		width: 20rem;
	}

	.column {
		width: 100%;
	}

	.sub {
		width: 99%;
		align-self: center;
	}

	input {
		width: 75%;
		margin: 0.2rem 0.2rem 0.2rem 0.2rem;
		color: white;
		padding: 0.3em;
		background-color: #282d2f;
		border: 1px solid black;
	}
</style>
