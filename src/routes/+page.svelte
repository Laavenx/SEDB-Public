<svelte:head>
	<title>Home - SEDB</title>
	<meta property="og:title" content="Space Engineers Database - Home" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/favicon.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div class="item-container flex-column d-flex">
		<div class="d-flex justify-content-center welcome-container">
			<div class="position-relative"> 
				<img
					src="/static/welcome.webp"
					class="image welcome"
					alt="Space Engineers in-game footage"
				/>
				<div class="centered welcome">Space Engineers Database</div>
			</div>
		</div>
		<div>
			Space Engineers is a sandbox game about engineering, construction,
			exploration and survival in space and on planets. Players build
			space ships, space stations, planetary outposts of various sizes and
			uses (civil and military), pilot ships and travel through space to
			explore planets and gather resources to survive. Featuring both
			creative and survival modes, there is no limit to what can be built,
			utilized and explored. Space Engineers features a realistic,
			volumetric-based physics engine: everything in the game can be
			assembled, disassembled, damaged and destroyed. The game can be
			played either in single or multiplayer modes.
		</div>
		<div class="d-flex flex-wrap justify-content-center image-wrapper">
			<div class="image-container position-relative">
				<a
					href="https://support.keenswh.com/spaceengineers/pc/announcements"
				>
					<img
						src="/static/changelog.webp"
						class="image"
						alt="Space Engineers in-game footage"
					/>
					<div class="centered generic-image">Game Changelog</div>
				</a>
			</div>
			<div class="image-container position-relative">
				<a
					href="https://blog.marekrosa.org/2022/04/vrage-volumetric-water.html"
				>
					<img
						src="/static/vrage3.webp"
						class="image"
						alt="Space Engineers in-game footage"
					/>
					<div class="centered generic-image">VRAGE 3 news</div>
				</a>
			</div>
			<div class="image-container position-relative">
				<a
					href="https://www.keenswh.com/careers/"
				>
					<img
						src="/static/wewantyou.webp"
						class="image"
						alt="Space Engineers in-game footage"
					/>
					<div class="centered generic-image">Join KeenSoftwareHouse</div>
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";
	@media (min-width: 1015px) {
    .welcome {
        font-size: 3rem !important;
    	}
	}

	@media (max-width: 1015px) {
    .welcome {
        font-size: 2.5rem !important;
    	}
	}

	@media (max-width: 800px) {
    .welcome {
        font-size: 2.2rem !important;
    	}
	}

	@media (max-width: 610px) {
    .welcome {
        font-size: 1.7rem !important;
    	}
	}

	@media (max-width: 500px) {
    .welcome {
        font-size: 1.3rem !important;
    	}
	}

	@media (min-width: 500px) {
    .generic-image {
        font-size: 1.7rem !important;
    	}
	}


	.centered {
		width: 100%;
		text-align: center;
		font-size: 1.5rem;
		color: white;
		text-shadow: 1.5px 2px #ff0000;
		position: absolute;
		top: 5%;
	}

	.image-wrapper {
		margin-top: 0.75rem;
	}

	.image-container {
		margin: calc(0.1vw + 0.5rem) calc(0.1vw + 0.5rem) calc(0.1vw + 0.5rem)
			calc(0.1vw + 0.5rem);
	}

	.welcome {
		max-height: 500px !important;
		margin-bottom: 1rem;
	}

	.image {
		border: 1px black solid;
		max-height: 250px;
		width: 100%;
		object-fit: contain;
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
