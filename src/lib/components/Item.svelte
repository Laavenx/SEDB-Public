<script>
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";
	import { scale } from "svelte/transition";
	export let name;
	export let textureName;
	export let cubeSize;
	export let animationDelayMultiplier = 1;
	export let PATH;
	let element;
	let visible = false;

	onMount(() => {
		let observer = new IntersectionObserver(
			(entries) => {
				let entry = entries[0];
				if (!entry) return;
				if (entry.intersectionRatio == 0) {
					visible = false;
				} else {
					visible = true;
				}
			},
			{
				rootMargin: "0px 0px 100px 0px",
				threshold: [0.0, 0.5, 1],
			}
		);
		observer.observe(element);
	});

	const dispatch = createEventDispatcher();
	function handleClick(name, cubeSize) {
		let page;
		name = name.replace(/ /g, "_");
		if(cubeSize){
			page = `/Blocks/${encodeURIComponent(name)}_${cubeSize}`;
		}else{
			page = `/${PATH}/${encodeURIComponent(name)}`;
		}
		dispatch("pageChange", {
			page: page,
		});
	}

	let imageblob;
	const fetchImage = async function () {
		if (imageblob) {
			return URL.createObjectURL(imageblob);
		}
		let response = await fetch(`/static/${PATH}/${textureName}.webp`);
		imageblob = await response.blob();
		return URL.createObjectURL(imageblob);
	};
</script>

<div
	in:scale={{ duration: Math.min(400 + 50 * animationDelayMultiplier, 1000) }}
	class="block"
	bind:this={element}
	on:click={() => handleClick(name, cubeSize)}
>
	{#if visible}
		{#await fetchImage()}
			<div
				class="justify-content-center align-items-center d-flex w-100 h-100"
			>
				<div class="spinner-border" />
			</div>
		{:then img}
			<div class="wrapper">
				<div class="textbox">{name}</div>
				<img src={img} alt={name} />
				{#if cubeSize}
					<img
						class="cubesize"
						src="/static/misc/{cubeSize}.webp"
						alt={cubeSize}
					/>
				{/if}
			</div>
		{/await}
	{/if}
</div>

<style lang="scss">
	.cubesize {
		position: relative;
		z-index: 100;
		width: 32px;
		height: 32px;
		bottom: 38px;
		left: 160px;
	}

	.wrapper:hover {
		background-color: $hover-color-blue;
	}

	.wrapper {
		border-radius: 18px;
		max-height: 240px;
		outline: solid 1px #29363df1;
	}

	img {
		width: 200px;
		height: 200px;
	}

	.textbox {
		width: 100%;
		height: 40px;
		text-align: center;
		padding-top: 5px;
		padding-left: 2px;
		padding-right: 2px;
	}

	.block:hover {
		transform: scale(0.9);
	}

	.block {
		cursor: pointer;
		transition: transform 0.12s;
		border-radius: 18px;
		font-size: 0.94rem;
		width: 200px;
		height: 240px;
		max-width: 200px;
		max-height: 240px;
		margin: 0.7rem 0.7rem;
		background: repeating-linear-gradient(
			#29363df1 0px,
			#29363df1 2.5px,
			#1c272cf0 2.5px,
			#1c272cf0 5px
		);
	}
</style>
