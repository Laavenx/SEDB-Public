<script>
	import { page } from "$app/stores";
	import "../app.scss";
	let hidden = true;
	$: $page.url.pathname, hidden = true;
</script>

<div class="app-wrapper">
	<header class="navbar navbar-expand-xl navbar-dark py-2 topbar">
		<div class="d-flex">
			<div class="nav">
				<button
					class="navbar-toggler"
					type="button"
					on:click={() => (hidden = !hidden)}
				>
					<span class="navbar-toggler-icon" />
				</button>
				<a class="navbar-brand brand mb-1 pb-0 pt-0 h1" href="/" />
			</div>
		</div>
	</header>
	<div id="app" class="d-flex">
		<aside>
			<div
				class="sidebar-bg d-flex justify-content-center s-desktop"
				role="navigation"
				aria-label="desktop sidebar"
			>
				<div class="sidebar d-flex flex-column align-items-center">
					<a
						href="/"
						on:click={() => (hidden = !hidden)}
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-house" />Home</a
					>
					<a
						href="/Blocks/search?page=1"
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-cube" />Blocks</a
					>
					<a
						href="/Components/search?page=1"
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-table-cells" />Components</a
					>
					<a
						href="/Items/search?page=1"
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-mound" />Items</a
					>
					<a
						href="/Ammo/search?page=1"
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-parachute-box" />Ammo</a
					>
					<a
						href="/Modding"
						class="sidebar-button d-flex align-items-center"
						><i class="fa-solid fa-code" />Modding</a
					>
					<div class="spacer">&nbsp;</div>
				</div>
			</div>
			{#if !hidden}
				<div
					class="sidebar-bg d-flex justify-content-center s-mobile"
					role="navigation"
					aria-label="mobile sidebar"
				>
					<div class="sidebar d-flex flex-column align-items-center">
						<a
							href="/"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-house" />Home</a
						>
						<a
							href="/Blocks/search?page=1"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-cube" />Blocks</a
						>
						<a
							href="/Components/search?page=1"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-table-cells" />Components</a
						>
						<a
							href="/Items/search?page=1"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-mound" />Items</a
						>
						<a
							href="/Ammo/search?page=1"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-parachute-box" />Ammo</a
						>
						<a
							href="/Modding"
							class="sidebar-button d-flex align-items-center"
							><i class="fa-solid fa-code" />Modding</a
						>
						<div class="spacer">&nbsp;</div>
					</div>
				</div>
			{/if}
		</aside>
		<main class="datagrid-container">
			<slot />
		</main>
	</div>
	<footer aria-label="Footer">
		Note: this is a fan site, majority of the assets belong to <a
			href="https://www.keenswh.com/">Keen Software House</a
		>
	</footer>
</div>

<style lang="scss">
	@media (max-width: 800px) {
		.brand::after {
			content: "SEDB" !important;
		}
	}

	@media (max-width: 1200px) {
		.s-desktop {
			display: none !important;
		}
	}

	@media (min-width: 1200px) {
		.s-mobile {
			display: none !important;
		}
	}

	.app-wrapper {
		min-height: 100vh;
		display: flex;
		flex-flow: column;
	}

	.app-wrapper > #app {
		flex: 1 0 auto;
	}

	.topbar {
		background-color: $base-color;
		position: sticky;
		top: 0px;
		z-index: 600;
	}

	.sidebar-bg {
		width: 256px;
		height: 100%;
		background: repeating-linear-gradient(
			#29363df1 0px,
			#29363df1 5px,
			#1c272cf0 5px,
			#1c272cf0 10px
		);
	}

	.s-mobile {
		position: fixed;
		z-index: 600;
		height: 100%;
	}

	.sidebar {
		width: 100%;
		position: sticky;
		top: 63.2px;
		padding-top: 1rem;
		overflow-y: auto;
		max-height: calc(100vh - 63.2px);
	}

	.sidebar-button {
		overflow-x: hidden;
		position: relative;
		background-color: $base-color;
		min-height: 35.2px;
		width: 97%;
		outline: 1px solid;
		text-align: center;
		margin-bottom: 0.4rem;
		color: inherit;
		text-decoration: none;
		padding: 0.35rem 0.45rem 0.35rem 0.45rem;
	}

	.sidebar-button:hover::after {
		content: "";
		transform: translateX(100%);
		width: 100%;
		height: 35.2px;
		position: absolute;
		animation: slide 0.44s;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.8) 80%,
			rgba(128, 186, 232, 0) 99%
		);
	}

	.sidebar-button:hover {
		background-color: $hover-color-blue;
		border-left: 8px solid white;
	}

	@keyframes slide {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(100%);
		}
	}

	.spacer {
		height: 35.2px;
		content: "";
	}

	.fa-solid {
		margin-right: 0.5rem;
	}

	.brand::after {
		font-size: 36px;
		color: white;
		margin-left: 2rem;
		font-family: frauleinregular;
		content: "Space Engineers Database";
	}

	.navbar-toggler {
		margin-left: 1rem;
	}

	.datagrid-container {
		padding-top: 1rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
	}

	footer > a {
		color: red;
	}

	footer {
		flex-shrink: 0;
		background-color: $base-color;
		padding: 2rem 1rem 2rem 1rem;
		text-align: center;
	}
</style>
