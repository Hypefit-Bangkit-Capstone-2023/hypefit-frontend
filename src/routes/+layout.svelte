<script>
	import { page } from '$app/stores';
	import BottomNavbar from '$lib/components/BottomNavbar.svelte';
	import '../app.css';
</script>

<div class="mx-auto h-screen max-w-[390px] bg-white border border-x-black">
	<slot />

	{#if $page.route.id !== '/login'}
		<BottomNavbar />
	{/if}
</div>
