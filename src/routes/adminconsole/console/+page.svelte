<script>
	const logout = async function(){
		const res = await fetch("/api/logout");
		if(res.ok){
			window.location.replace("/");
		}else{
			alert("Database Error");
		}
	};
</script>

<svelte:head>
	<title>Console</title>
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div class="item-container flex-column d-flex align-items-center">
		<button class="logout" on:click={logout}>Logout</button>
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";

	* {
		font-size: 16px;
	}

	.logout {
		width: 120px;
	}

	.item-container {
		padding-top: 2rem;
		padding-left: calc(1vw + 1rem);
		padding-right: calc(1vw + 1rem);
		padding-bottom: 5rem;
	}
</style>
