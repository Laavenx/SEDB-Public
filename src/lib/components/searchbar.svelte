<script>
	import { createEventDispatcher } from "svelte";
	export let searchParam;
	const dispatch = createEventDispatcher();
	let input = "";
	let lastInput = "";
	let firstTime = Date.now();
	let timerId = null;
	let hidden = true;

	if (searchParam) {
		input = searchParam;
	}

	const handleInput = function () {
		clearTimeout(timerId);
		timerId = setTimeout(handleKeydown, 1000);
		let secondTime = Date.now();
		if (secondTime - firstTime < 5) {
			clearTimeout(timerId);
		}
		lastInput = input;
	};

	$: {
		if (input.length < lastInput.length && input.length > 3) {
			handleInput();
		} else if (input.length < lastInput.length && input.length === 0) {
			handleInput();
		} else if (input.length > 2) {
			handleInput();
		} else {
			//pass
		}
	}

	$: {
		input;
		if (input !== "") {
			hidden = false;
		} else {
			hidden = true;
		}
	}

	const handleSubmit = function () {
		handleKeydown();
	};

	const handleKeydown = function () {
		dispatch("keydown", {
			input: input,
		});
	};
</script>

<div class="searchbar d-flex justify-content-left align-items-center">
	<div
		class="search-wrapper d-flex justify-content-center align-items-center"
	>
		<i class="fa-solid fa-magnifying-glass" />
	</div>
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" placeholder="Search" bind:value={input} />
	</form>
	{#if !hidden}
		<div
			class="search-clear-wrapper d-flex justify-content-center align-items-center"
			on:click={() => (input = "")}
		>
			<i class="fa-solid fa-x" />
		</div>
	{/if}
</div>

<style lang="scss">
	.search-clear-wrapper {
		height: 45px;
		width: 45px;
		cursor: pointer;
	}

	.search-wrapper {
		height: 45px;
		width: 45px;
	}

	.icon-margn {
		margin: 0;
	}

	form {
		width: 85%;
		height: 100%;
	}

	.searchbar {
		border-radius: 10px;
		background-color: $grey-color;
		width: 500px;
		height: 45px;
		margin: 0.35rem;
	}

	input:focus {
		outline: none !important;
	}

	input {
		background-color: $grey-color;
		border: none;
		width: 100%;
		height: 100%;
		color: white;
	}

	::placeholder {
		color: white;
		opacity: 0.5;
	}
</style>
