<script>
	import changelog from "/static/text/changelog.txt?raw";

	let active = { button1: false };

	const collapseHandle = function () {
		let content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.transition = null;
			content.style.maxHeight =
				content.getBoundingClientRect().height + "px";
			content.style.transition = "max-height 0.2s ease-out";
			setTimeout(() => {
				content.style.maxHeight = null;
			}, 200);
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
			setTimeout(() => {
				window.scrollTo(0, content.firstChild.scrollHeight);
				content.style.maxHeight = "9999px";
			}, 200);
		}
	};
</script>

<svelte:head>
	<title>Modding</title>
	<meta property="og:title" content="Modding" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/favicon.webp" />
</svelte:head>

<div class="d-flex flex-column h-100 align-items-center">
	<div class="item-container flex-column d-flex">
		<span>Useful links for modders:</span>
		<ul>
			<li>
				<a
					href="https://docs.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/"
					>Introduction to <img
						class="csharp-logo"
						alt="Csharp logo icon"
						src="https://cdn.cdnlogo.com/logos/c/27/c.svg"
					/></a
				>
			</li>
			<li>
				<a href="https://visualstudio.microsoft.com/downloads/"
					>Visual Studio 2022</a
				>
			</li>
			<li>
				<a href="https://visualstudio.microsoft.com/vs/older-downloads/"
					>Visual Studio 2019 if you want to use Malware's MDK for
					scripts</a
				>
			</li>
			<li>
				<a href="https://github.com/malware-dev/MDK-SE/wiki"
					>Malware's Developement Kit, API index, guide for scripting</a
				>
			</li>
			<li>
				<a
					href="https://github.com/THDigi/SE-ModScript-Examples/wiki/Quick-Intro-to-Space-Engineers-Modding"
					>Quick intro to modding</a
				>
			</li>
			<li>
				<a
					href="https://steamcommunity.com/sharedfiles/filedetails/?id=2560048279"
					>How to Mod UseObjects (Custom Block Interactions)</a
				>
			</li>
			<li>
				<a
					href="https://steamcommunity.com/workshop/filedetails/?id=1918681825"
					>WeaponCore - Complete rewrite of SE combat system</a
				>
			</li>
			<li>
				<a
					href="https://steamcommunity.com/sharedfiles/filedetails/?id=1521905890"
					>MES - Framework for handling NPC grids and their behaviour</a
				>
			</li>
			<li>
				<a href="https://discord.com/invite/keenswh"
					>Keen Software House discord, read the rules and go into the
					modding section</a
				>
			</li>
			<li>
				<a
					href="https://steamcommunity.com/workshop/filedetails/?id=2407984968"
					>Plugin Loader - load DLL's directly, skipping ModApi</a
				>
			</li>
		</ul>
		<span>Useful links for artists:</span>
		<ul>
			<li>
				<a href="https://www.blender.org/"
					>Blender - Creating 3D models, recommended to use with SEUT
					addon</a
				>
			</li>
			<li>
				<a
					href="https://semref.atlassian.net/wiki/spaces/tools/pages/33261/Space+Engineers+Utilities"
					>SEUT - Addon for blender 3.x, used in importing and
					creating 3D models for Space Engineers</a
				>
			</li>
			<li>
				<a href="https://discord.gg/QtyCsBr">SEUT discord link</a>
			</li>
			<li>
				<a href="https://www.spaceengineersgame.com/modding/"
					>SE Mod Sdk (found in steam/Tools), includes tools, original
					assets</a
				>
			</li>
			<li>
				<a href="https://github.com/mmusu3/SEToolbox/releases"
					>Space Engineers Toolbox - importing images and 3D models,
					editing game save content</a
				>
			</li>
		</ul>
		<span>Others:</span>
		<ul>
			<li>
				<a href="https://torchapi.com/"
					>Torch - Custom dedicated server for SE</a
				>
			</li>
			<li>
				<a href="https://discord.gg/ftAMmrwWfh">Torch discord link</a>
			</li>
		</ul>
		<button
			class="collapsible"
			class:active={active.button1}
			on:click={() => (active.button1 = !active.button1)}
			on:click={collapseHandle}>Latest modapi changelog</button
		>
		<div class="content">
			<p id="changelog">
				{changelog}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	@import "$lib/styles/itemItem.scss";

	.collapsible {
		background-color: $grey-color;
		width: max-content;
		padding: 0.5rem 1rem 0.5rem 1rem;
		border: 1px solid black;
		border-radius: 5px;
		color: inherit;
	}

	.collapsible:hover {
		background-color: $hover-color-blue;
	}

	.active {
		background-color: $hover-color-blue;
	}

	.content {
		padding: 0rem 0.6rem 0rem 0.6rem;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.2s ease-out;
		background-color: $grey-color;
	}

	.content > p {
		white-space: pre-wrap;
	}

	p {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	a:hover {
		color: #4eb9dd;
		text-decoration: underline;
	}

	.csharp-logo {
		width: 24px;
		height: 24px;
	}

	* {
		font-size: 16px;
	}

	.item-container {
		padding-top: 2rem;
		padding-left: calc(1vw + 1rem);
		padding-right: calc(1vw + 1rem);
		padding-bottom: 5rem;
	}
</style>
