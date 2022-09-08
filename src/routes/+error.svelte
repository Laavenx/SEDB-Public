<script>
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div>{$page.error.message}</div>
