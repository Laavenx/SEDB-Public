<script>
	let errorMessage;
	$: errorMessage;

	const isRequired = function (value) {
		return value != null && value !== "";
	};

	const submitForm = async function (event) {
		const formData = new FormData(event.target);
		let error = false;
		for (let field of formData) {
			const [key, value] = field;
			if (!isRequired(value)) {
				error = true;
			}
		}

		if (!error) {
			const response = await fetch("/api/login", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				errorMessage = (await response.json()).message;
				return;
			}else{
				window.location.replace("/adminconsole/console");
			}
		}
	};
</script>

<svelte:head>
	<title>AdminConsole</title>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/favicon.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div class="item-container flex-column d-flex">
		<form
			class="d-flex flex-column align-items-center"
			on:submit|preventDefault={submitForm}
		>
			<label for="Login">Login</label>
			<input id="login" name="login" type="text" />

			<label for="Password">Password</label>
			<input id="password" name="password" type="password" />

			<button type="submit" class="submit">Login</button>
		</form>

		{#if errorMessage}
			<div class="d-flex flex-column align-items-center">
				{errorMessage}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";

	.submit {
		margin-top: 10px;
	}

	.item-container {
		padding-top: 2rem;
		padding-left: calc(1vw + 1rem);
		padding-right: calc(1vw + 1rem);
		padding-bottom: 5rem;
	}

	* {
		font-size: 16px;
	}
</style>
